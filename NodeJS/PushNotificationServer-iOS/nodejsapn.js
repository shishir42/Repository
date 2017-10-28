var http = require("http");
var apn = require('apn');
var fs = require('fs');

var host = "localhost";
var port = "2000";

var options = {
          cert: 'aps_development.pem',         // Certificate file path
          key:  'myapnsappprivatekey.pem',         // Key file path
          passphrase: 'pushnotification',                             // A passphrase for the Key file
          ca: 'aps_development.cer',// String or Buffer of CA data to use for the TLS connection
          production:false,
          gateway: 'gateway.sandbox.push.apple.com',      // gateway address
          port: 2195,                                     // gateway port
          enhanced: true                                  // enable enhanced format
};

var server = http.createServer(function(httpRequest, httpResponse){
  httpResponse.writeHeader(200, {"Content-Type": "text/html"});
  httpResponse.write("Connection Successfully");
  console.log("Connection Successfully.......");
  var apnProvider = new apn.Provider(options);

  var deviceToken = "cbc41ae11de29b35dadeb0616612695d6536d11e6f68d4d8136b9237d0c0e634"

  var note = new apn.Notification();
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = 3;
  note.sound = "ping.aiff";
  note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
  note.payload = {'messageFrom': 'John Appleseed'};
  note.topic = "<your-app-bundle-id>";

  apnProvider.send(note, deviceToken).then( (result) => {
      // see documentation for an explanation of result
      console.log("sent:", result.sent.length);
	    console.log("failed:", result.failed.length);
	    console.log("failed detailed:", result.failed);
  });

//
//   // A submission action has completed. This just means the message was submitted, not actually delivered.
// connection.on('completed', function(a) {
//     console.log('APNS: Completed sending', a);
// });
//
// // A message has been transmitted.
// connection.on('transmitted', function(notification, device) {
//     console.log('APNS: Successfully transmitted message');
// });
//
// // There was a problem sending a message.
// connection.on('transmissionError', function(errorCode, notification, device) {
//     var deviceToken = device.toString('hex').toUpperCase();
//
//     if (errorCode === 8) {
//         console.log('APNS: Transmission error -- invalid token', errorCode, deviceToken);
//         // Do something with deviceToken here - delete it from the database?
//     } else {
//         console.error('APNS: Transmission error', errorCode, deviceToken);
//     }
// });
//
// connection.on('connected', function() {
//     console.log('APNS: Connected');
// });
//
// connection.on('timeout', function() {
//     console.error('APNS: Connection timeout');
// });
//
// connection.on('disconnected', function() {
//     console.error('APNS: Lost connection');
// });
//
// connection.on('socketError', function(){
//   console.error('socket error');
// });

  httpResponse.end();
});

server.listen(port, host, function(){
	console.log("Listensing ..." + "Port:" + port + " " + "Host:" + host);
});
