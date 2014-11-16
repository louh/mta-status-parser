'use strict';

exports.post = function (req, res) {

  var db         = req.db,
      collection = db.get('raw'),
      data       = req.body

  collection.insert(data, function (err, doc) {
    if (err) {
      res.status(500).send('There was a problem adding the information to the database.')
    } else {
      res.status(200).end()
    }
  })

}
