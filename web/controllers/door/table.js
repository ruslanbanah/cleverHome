const db = require('../../db');

module.exports = function(req, res, next) {
  db('door')
      .orderBy('created_at', 'desc')
      .then(result => {
        res.render('door', {title: 'Door logs', message: 'Door logs', logs: result})
        next()
      })
}