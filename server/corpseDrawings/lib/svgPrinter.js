const request = require('request')

module.exports = {
  send(svg) {

    if (!process.env.AXIDRAW_URL) return

    var postData = {
      svg: svg,
      options: {
        name: "Exquisite Corpse...",
        "noresize": true
      }
    }

    var url = `${process.env.AXIDRAW_URL}/robopaint/v1/print`
    
    var options = {
      method: 'POST',
      body: postData,
      json: true,
      url: url
    }
    request(options, function (err, res, body) {
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }
      var headers = res.headers
      var statusCode = res.statusCode
      console.log('headers: ', headers)
      console.log('statusCode: ', statusCode)
      console.log('body: ', body)
    })

    return
  }
}
