'use strict';

var PORT       = 3000,
    MONGO_URI  = process.env.MONGOLAB_URI || 'mongodb://localhost/mta_status',
    http       = require('http'),
    path       = require('path'),
    express    = require('express'),
    bodyParser = require('body-parser'),
    winston    = require('winston'),
    mongo      = require('mongodb'),
    monk       = require('monk'),
    db         = monk(MONGO_URI),
    lib        = require('./lib')

var app = express()

// Express application setup
app.set('port', process.env.PORT || PORT)
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

// Make our db accessible to our router
app.use(function (req, res, next) {
  req.db = db
  next()
})

app.post('/post', lib.dumper.post)
app.get('/', lib.viewer.get)

app.listen(app.get('port'), function () {
  winston.info('Listening on port ' + app.get('port'))
})

