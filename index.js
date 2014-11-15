'use strict';

var PORT    = 3000,
    http    = require('http'),
    path    = require('path'),
    express = require('express'),
    winston = require('winston'),
    xml     = require('xml2js').parseString

var app = express()

var API = 'http://web.mta.info/status/serviceStatus.txt'

// Express application setup
app.set('port', process.env.PORT || PORT)
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {

  var request = http.get(API, function (response) {

    var stream = '',
        data

    response.on('data', function (chunk) {
      stream += chunk
    })

    response.on('end', function () {

      xml(stream, function (error, result) {
        if (error) {
          winston.error('Error!', error)
          res.status(500).send(error)
        } else {
          winston.info('Retrieved!')
          res.status(200).send(result)
        }
      })

    })
  })

  request.on('error', function (err) {
    console.log('Error: ' + err.message)
  })
})

app.listen(app.get('port'), function () {
  winston.info('Listening on port ' + app.get('port'))
})

