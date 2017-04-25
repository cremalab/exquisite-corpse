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
    const buff = new Buffer(file, 'binary')
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
    console.log('contentType', contentType)
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `${basePath}/${filename}.${extension}`,
      Body: buff,
      ContentType: contentType,
      ACL: 'public-read',
    }
    console.log('s3 params:', params)
    return new Promise((resolve, reject) => {
      s3.putObject(params, (err) => {
        console.log('s3 putObject err', err);
        if (err) { return reject(err) }
        const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${basePath}/${filename}.${extension}`
        resolve(url)
      })
    })
  },
  // uploadAsset(server, file, filename, type) {
  //   this.upload(server, file, filename, 'svg'),
  //   return Promise.all([
  //     this.convertToPNG(svg).then((png) => this.upload(server, png, filename, 'png'))
  //   ])
  //   .then((results) => {
  //     return {
  //       svgUrl: results[0],
  //       pngUrl: results[1]
  //     }
  //   })
  //   .catch((err) => console.log('upload error', err))
  // },
  uploadAndUpdate(server, svg, filename) {
    // SVG
    this.upload(server, svg, filename, 'svg')
    .then(url =>
      corpsesDB.update(server.mongo.db, filename, { svgUrl: url })
    )
    .then((result) => {
      corpseRt.notifyChange(server, result)
      lobbyRT.notifyCorpseChange(server, result)
      return result
    })

    // PNG
    this.convertToPNG(svg).then((png) => this.upload(server, png, filename, 'png'))
    .then(url =>
      corpsesDB.update(server.mongo.db, filename, { pngUrl: url })
    )
    .then((result) => {
      corpseRt.notifyChange(server, result)
      lobbyRT.notifyCorpseChange(server, result)
      return result
    })
    .catch((err) => {
      console.log('ERROR FROM PNG CONVERSION:', err);
    })
  }
}
