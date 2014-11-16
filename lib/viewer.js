'use strict';

exports.get = function (req, res) {

  var db         = req.db,
      collection = db.get('raw')

  collection.find({}, function (err, doc) {
    if (err) {
      res.status(500).send('error: ' + err)
      return
    }

    res.render('index', { title: 'MTA service status parser', data: JSON.stringify(doc) })
  })


}