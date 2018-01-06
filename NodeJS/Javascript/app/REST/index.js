const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const moongoose = require('mongoose');

// set up express apps
const app = express();

// connect to mongo db
moongoose.connect('mongodb://localhost/ninjago');
moongoose.Promise = global.Promise;

app.use(express.static('public')); // search any file in public folder


// initilize body parser
app.use(bodyParser.json());

// initilize routes
app.use('/api', routes);

// error handling middleware
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message});
});


// app.get('/api', function(req, res){
//   console.log('Get Request');
//   res.send({name: "abc"});
//   res.end();
// });

// listen for request
app.listen(process.env.port || 4000, function(){
  console.log("Now listening for request....");
});
