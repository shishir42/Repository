var http = require("http");
var requestModule = require("request");
var url = require("fast-url-parser");

// For debug - using google chrome
//node --debug server.js
// Start - node-inspector
//Ping : localhost:8080/debug?port=5858

console.log("Starting Server...");

var host = "192.168.1.15";
var port = "1988";

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

var server = http.createServer(function(httpRequest, httpResponse){
    url.queryString = require("querystring");
    var parsed = url.parse(httpRequest.url, true);
    //console.log(parsed.query);
    //console.log(isEmptyObject(parsed.query));
    if(!isEmptyObject(parsed.query)){
      var parsedData = JSON.parse(Object.keys(parsed.query)[0]);
      console.log(parsedData);
    }

    //var query = require('url').parse(httpRequest.url,true).query;
    //var queryString = require('querystring').parse(httpRequest.url);
     //console.log(queryString);
     //console.log("Request data..." + httpRequest.param);
     //console.log("Request body..." + JSON.stringify(httpRequest.body));

     //console.log("Request headers..." + JSON.stringify(httpRequest.headers));
     //console.log(httpRequest);
     //console.log("Request headers..." + JSON.stringify(httpRequest.headers));
    //  httpResponse.setHeader('Content-Type', 'application/json');
    //  httpResponse.writeHead(200, {"content-type" : 'application/json'});
     //
    //  /*Method, URL and Headers*/
    //  httpResponse.write("Method: " + httpRequest.method + "\n");
    //  httpResponse.write("Url: " + httpRequest.url + "\n");
    //  httpResponse.write("Headers: " + httpRequest.headers + "\n");
    //  httpResponse.write("Headers User Agent: " + httpRequest.headers['user-agent'] + "\n");

    

     requestModule('http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topsongs/limit=10/json', function (error, response, body) {
       if (!error && response.statusCode == 200) {
         //console.log("response :" + body);
         httpResponse.write(body);
         //httpResponse.send(JSON.stringify(body));
         //httpResponse.writeHead(200, {'Content-Length': Buffer.byteLength(body),'Content-Type': 'application/json' });
         httpResponse.end();
       }
     });
});

server.listen(port, host, function(){
	console.log("Listensing ..." + "Port:" + port + " " + "Host:" + host);
});
