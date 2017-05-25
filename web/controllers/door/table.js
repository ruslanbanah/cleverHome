const db = require('../../db');

module.exports = function(req, res) {
  db('door')
      .orderBy('created_at', 'desc')
      .then(result => {
        console.log("Result test: ", result);
        res.render('door', {title: 'Door logs', message: 'Door logs', logs: result})
        next()
      })
}