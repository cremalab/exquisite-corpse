const AWS = require('aws-sdk')
const svg2png = require('svg2png')
const corpsesDB = require('../../corpses/db/corpsesDB')
const corpseRt = require('../../corpses/realtime/corpsesRT')
const lobbyRT = require('../../lobby/realtime/lobbyRT')

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION
})

const s3 = new AWS.S3()

const baseDir = 'uploads'
const corpseDir = 'corpses'
const basePath = `${baseDir}/${corpseDir}`

module.exports = {
  convertToPNG(svg) {
    return svg2png(svg)
  },
  upload(server, file, filename, extension) {
    let contentType
    switch (extension) {
      case 'svg':
        contentType = 'image/svg+xml'
        break
      case 'png':
        contentType = 'image/png'
        break
      default:
        contentType = 'image/svg+xml'

    }
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `${basePath}/${filename}.${extension}`,
      Body: file,
      ContentType: contentType,
      ACL: 'public-read',
    }
    return new Promise((resolve, reject) => {
      s3.putObject(params, (err) => {
        if (err) { return reject(err) }
        const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${basePath}/${filename}.${extension}`
        resolve(url)
      })
    })
  },
  uploadAssets(server, svg, filename) {
    return Promise.all([
      this.upload(server, svg, filename, 'svg'),
      this.convertToPNG(svg).then((png) => this.upload(server, png, filename, 'png'))
    ])
    .then((results) => {
      return {
        svgUrl: results[0],
        pngUrl: results[1]
      }
    })
    .catch((err) => console.log('upload error', err))
  },
  uploadAndUpdate(server, svg, filename) {
    return this.uploadAssets(server, svg, filename, 'svg').then((urls) => {
      return corpsesDB.update(server.mongo.db, filename, urls)
    })
    .then((result) => {
      corpseRt.notifyChange(server, result)
      lobbyRT.notifyCorpseChange(server, result)
      return result
    })
  }
}
