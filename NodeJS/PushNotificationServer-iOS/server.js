/*Push Notification Service*/

//https://blog.engineyard.com/2013/developing-ios-push-notifications-nodejs
//https://www.npmjs.com/package/apns
//https://www.npmjs.com/package/node-pushnotifications
//https://github.com/alexlds/node-push-notify
//https://github.com/node-apn/node-apn
//https://github.com/node-apn/node-http2
//https://eladnava.com/send-push-notifications-to-ios-devices-using-xcode-8-and-swift-3/
//http://stackoverflow.com/questions/21250510/generate-pem-file-used-to-setup-apple-push-notification
//http://stackoverflow.com/questions/1762555/creating-pem-file-for-apns
//https://github.com/node-apn/node-apn/issues/48
//http://codesamplez.com/development/apple-push-notification-backend-nodejs
//https://www.pubnub.com/blog/2014-12-22-sending-ios-push-notifications-via-apns-javascript-using-apns-phonegap/
//http://devgirl.org/2012/10/19/tutorial-apple-push-notifications-with-phonegap-part-1/
//http://stackoverflow.com/questions/26590109/how-to-implement-apns-notifications-through-nodejs
// http://docs.aws.amazon.com/sns/latest/dg/mobile-push-apns.html

var http = require("http");
var apns = require("apns"), options, connection, notification;
options = {
   keyFile : "myapnsappprivatekey.pem",
   certFile : "aps_development.pem",
   debug : true,
   port: 2195,
   passphrase: 'pushnotifcation',
   errorCallback: errorCallback,
   //enhanced: true,
   gateway: 'gateway.push.apple.com'
};

function errorCallback(err, notification){
  console.log("Error" + err);
  console.log("Error Notification" + notification);
}

connection = new apns.Connection(options);
notification = new apns.Notification();
// notification.payload = {"description" : "A good news !"};
// notification.badge = 1;
// notification.sound = "dong.aiff";
// notification.alert = "Hello World !";
// notification.device = new apns.Device("8447D53DD677CDA11515C1C28D355725CC8D47C62163040B153CAF4E3AFCD533");
// connection.sendNotification(notification);

console.log("Starting Server...");

var host = "localhost";
var port = "2000";

var server = http.createServer(function(httpRequest, httpResponse){
  //httpResponse.write("Server Running Successfully");
  httpResponse.writeHeader(200, {"Content-Type": "text/html"});
  console.log("hittttt.......");
  notification.payload = {"description" : "A good news !"};
  notification.badge = 1;
  notification.sound = "dong.aiff";
  notification.alert = "Hello World !";
  notification.device = new apns.Device("CBC41AE11DE29B35DADEB0616612695D6536D11E6F68D4D8136B9237D0C0E634");
  connection.sendNotification(notification);
  httpResponse.end();
});

server.listen(port, host, function(){
	console.log("Listensing ..." + "Port:" + port + " " + "Host:" + host);
});
