const express = require('express');
const app = express();
const db = require('./db')
const routes = require('./routes')

db.then( () => {
  app.set('view engine', 'jade');
  app.locals.moment = require('moment');
  app.use('/door', routes.door)
  console.log(db().then(data=>console.log).catch( err => console.log))
  console.log('Data Base: connected.')
  console.log('Server : started.')
  app.listen(3030);
}).catch( err => console.log)
