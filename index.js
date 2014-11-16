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
    db         = monk('localhost:27017/nodetest1'),
    lib        = require('./lib'),

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

app.post('/post', function (req, res) {
  var dump = req.body
  console.log(dump)

  var db         = req.db,
      collection = db.get('dumps')

  collection.insert(dump, function (err, doc) {
    if (err) {
      res.status(500).send('There was a problem adding the information to the database.')
    } else {
      res.status(200).end()
    }
  })

})

app.get('/', function (req, res) {

  res.status(200).send('<h1>mta-status-parser</h1><p>hello world.</p>')

})

app.listen(app.get('port'), function () {
  winston.info('Listening on port ' + app.get('port'))
})

