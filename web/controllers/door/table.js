module.exports = function(req, res) {
  db.query('SELECT * FROM door ORDER BY created_at DESC').then(result => {
    console.log("Result test: ", result);
    res.render('door/index', {title: 'Door logs', message: 'Door logs', logs: result})
    next()
  })
}