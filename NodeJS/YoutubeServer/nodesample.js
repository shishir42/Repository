var file = fs.readFile('readme.txt');
console.log(file);

var sum = 3 + 2
console.log(sum);


// ---- callback
var file = fs.readFile('readme.txt', function(err, file){
  console.log(file);
});


// node is concept of callback
