var express = require('express');
var mysql = require('promise-mysql');

mysql.createConnection({
  host: "localhost",
  user: "home",
  password: "120183boom",
  database: "home"
}).then( (con) => {

  var app = express();
  app.listen(3030);
  app.locals.moment = require('moment');
  app.set('view engine', 'jade');

  app.get('/', (req, res, next)=>{
    con.query('SELECT * FROM door').then((result)=>{
     console.log("Result: ", result);
     res.render('index', { title: 'Door logs', message:'Door logs', logs: result})
     next()
    }).catch(function(error){
        //logs out the error
        console.log(error);
      })
  })

});
