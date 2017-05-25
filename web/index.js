const express = require('express');
const app = express();
const connetct = require('./db')
const routes = require('./routes')
let db;

app.set('view engine', 'jade');
app.locals.moment = require('moment');
app.use('/door', routes.door)

connetct.then( (database)=>{
  db = database
  console.log('Data Base: connected.')
  console.log('Server : started.')
  app.listen(3030);
}).catch( err => {
  console.log(err)
})

