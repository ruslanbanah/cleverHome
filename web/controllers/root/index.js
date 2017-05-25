module.exports = function(req, res, next) {
  res.render('home', {title: 'Door logs', message: 'Door logs'})
  next()
}