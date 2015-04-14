'use strict';

// Note: run for local testing ONLY

var MONGO_URI  = 'mongodb://localhost/mta_status',
    fs         = require('fs'),
    mongo      = require('mongodb'),
    monk       = require('monk'),
    db         = monk(MONGO_URI)

var collection = db.get('raw'),
    testData   = JSON.parse(fs.readFileSync('./test/data/mta.json'))

for (var i = 0; i < testData.length; i++) {
  collection.insert(testData, function (err, doc) {
    if (err) {
      console.log('error inserting test data #' + i + ' into collection')
      process.exit(1)
    } else {
      console.log('inserting test data object #' + i)
    }
  })
}

process.exit(0)