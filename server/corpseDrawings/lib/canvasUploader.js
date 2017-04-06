const AWS = require('aws-sdk')

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
  upload(server, svg, filename) {
    const buff = new Buffer(svg, 'binary')
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `${basePath}/${filename}.svg`,
      Body: buff,
      ContentType: 'image/svg+xml',
      ACL: 'public-read',
    }
    return new Promise((resolve, reject) => {
      s3.putObject(params, (err) => {
        if (err) { return reject(err) }
        const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${basePath}/${filename}.svg`
        resolve(url)
      })
    })
  }
}
