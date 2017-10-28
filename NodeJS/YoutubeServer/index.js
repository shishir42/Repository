// var request = require('request');
// request('http://www.google.com', function(error, response, body){
//   if(!error && response.statusCode == 200){
//     console.log(body)
//   }
// })

var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/', function (req, res) {
   res.send('Hello World');
})

// This responds a GET request for the /Get Home page.
app.get('/get_home', function (req, res) {
   console.log("Got a GET request for /Get Home");
   var myObj = { "name":"John", "age":31, "city":"New York" };
   var myJSON = JSON.stringify(myObj);
   res.send(myJSON);
})

// This responds a GET request for the /Get Home page.
app.get('/get_data', function (req, res) {
   console.log("Got a GET request for /Get Home");
   var myObj = { "name":"John", "age":31, "city":"New York" };
   var myJSON = JSON.stringify(myObj);
   res.send(myJSON);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
