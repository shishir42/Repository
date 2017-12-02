var express = require('express'),
    mongoose = require('mongoose'),
    http = require('http');

// setup database
var db = mongoose.connect('monogodb://localhost/bookAPI');


// setup Model
//var Book = require('./models/bookModel');

// setup express
var app = express();

// setup port number
var port = process.env.PORT || 3225;




// setup handler for routes
app.get('/', function(req, res){
  var responseJson = {hello:"This is my api"};
  res.json(responseJson);
  //res.send('Welcome to Rest api');
});

// Better way for routes
var bookRouter = express.Router();
bookRouter.route('/Books').
    get(function(req, res){
       var responseJson = {hello:"This is my api"};
       res.json(responseJson);

      // Book.find(function(error, books){
      //     if(error){
      //       console.log("Error " + error);
      //     }
      //     else {
      //       res.json(books);
      //     }
      // });

    });


app.use('/api', bookRouter);

app.listen(port, function(){
  console.log("Gulp Running on port -- " + port);
});



// var fs = require('fs');
// var http = require('http');
// var https = require('https');
// var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
//
// var credentials = {key: privateKey, cert: certificate};
// var express = require('express');
// var app = express();
//
// // your express configuration here
//
// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);
//
// httpServer.listen(8080);
// httpsServer.listen(8443);
