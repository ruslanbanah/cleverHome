const express = require('express');
const app = express();
const db = require('./db')
const routes = require('./routes')

app.set('view engine', 'jade');
app.locals.moment = require('moment');

app.use('/door', routes.door)
app.use('/', routes.root)

console.log('Server : started.')
app.listen(3030);

