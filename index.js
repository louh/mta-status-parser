'use strict';

var PORT    = 3000,
    http    = require('http'),
    path    = require('path'),
    express = require('express'),
    winston = require('winston'),
    lib     = require('./lib')

var app = express()

// Express application setup
app.set('port', process.env.PORT || PORT)
app.use(express.static(path.join(__dirname, 'public')))

app.post('/post', function (req, res) {
  console.log(req)
  res.status(202).end()
})

app.get('/', function (req, res) {

  res.status(200).send('<h1>mta-status-parser</h1><p>hello world.</p>')

})

app.listen(app.get('port'), function () {
  winston.info('Listening on port ' + app.get('port'))
})

