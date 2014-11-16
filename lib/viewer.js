'use strict';

exports.get = function (req, res) {

  var db         = req.db,
      collection = db.get('raw')

  collection.find({}, function (err, doc) {
    if (err) {
      res.status(500).send('error: ' + err)
      return
    }

    // TODO: Parse this once and cache in MongoDB instead of on each view
    var data = []
    for (var i = 0; i < doc.length; i++) {
      var record = doc[0].service
      for (var j = 0; j < record['subway'][0].line.length; j++) {
        if (record['subway'][0].line[j].text[0].length > 0) {
          data.push(record['subway'][0].line[j])
        }
      }
      for (var j = 0; j < record['bus'][0].line.length; j++) {
        if (record['bus'][0].line[j].text[0].length > 0) {
          data.push(record['bus'][0].line[j])
        }
      }
      for (var j = 0; j < record['LIRR'][0].line.length; j++) {
        if (record['LIRR'][0].line[j].text[0].length > 0) {
          data.push(record['LIRR'][0].line[j])
        }
      }
      for (var j = 0; j < record['MetroNorth'][0].line.length; j++) {
        if (record['MetroNorth'][0].line[j].text[0].length > 0) {
          data.push(record['MetroNorth'][0].line[j])
        }
      }
      for (var j = 0; j < record['BT'][0].line.length; j++) {
        if (record['BT'][0].line[j].text[0].length > 0) {
          data.push(record['BT'][0].line[j])
        }
      }
    }

    res.render('index', { title: 'MTA service status parser', data: data })
  })


}