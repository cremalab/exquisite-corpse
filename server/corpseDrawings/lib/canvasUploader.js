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
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `${basePath}/${filename}.svg`,
      Body: svg,
    }
    return new Promise((resolve, reject) => {
      s3.putObject(params, (err) => {
        if (err) { return reject(err) }
        delete params['Body']
        const url = s3.getSignedUrl('getObject', params)
        resolve(url)
      })
    })
  }
}
