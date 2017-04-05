const baseDir = 'uploads'
const corpseDir = 'corpses'
const basePath = `${baseDir}/${corpseDir}`

module.exports = {
  upload(server, svg, filename) {
    const s3 = server.plugins['hapi-aws'].aws.s3
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `${basePath}/${filename}`,
      Body: svg,
    }

    return new Promise((resolve, reject) => {
      s3.putObject(params, (err, data) => {
        console.log('error', err);
        if (err) { return reject(err) }
        resolve(data)
      })
    })
  }
}
