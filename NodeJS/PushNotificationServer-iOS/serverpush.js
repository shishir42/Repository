var apns = require('apns');
var options = {
  keyFile : "myapnsappprivatekey.pem",
  certFile : "aps_development.pem",
   debug : true
};

var connection = new apns.Connection(options);
var notification = new apns.Notification();


notification.payload = {"description" : "A good news !"};
notification.badge = 1;
notification.sound = "dong.aiff";
notification.alert = "Hello World !";
notification.device = new apns.Device("cbc41ae11de29b35dadeb0616612695d6536d11e6f68d4d8136b9237d0c0e634");
console.log("tlsConnection" + connection.tlsConnection);
connection.sendNotification(notification);
