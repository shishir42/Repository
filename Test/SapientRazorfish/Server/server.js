var http = require('http');
var fs = require('fs');
var port = 8081;
var host = "localhost"

var server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('../app.html',function (error, data){
      if (error) {
              res.writeHead(404);
          } else {
              res.write(data);
          }
        res.end();
    });
}).listen(8081);

server.listen(port, host, function(){
	console.log("Listensing ..." + "Port:" + port + " " + "Host:" + host);
});
