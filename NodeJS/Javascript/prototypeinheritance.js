//prototype concept
// Javascript has prototype based inheritence


var x = function(j) {
  this.i = 0;
  this.j = j;

  this.getJ = function() {
    return this.j;
  };
};

var x1 = new x(1);
var x2 = new x(2);

// Problem : if you create 1000 objects then 'getJ' property get create 1000 times
// to avoid this, used prototype

var x = function(j) {
  this.i = 0;
  this.j = j;
};

x.prototype.getJ = function() {
  return this.j;
};

var x1 = new x(1);
var x2 = new x(2);

console.log(x1.getJ()); //1
console.log(x2.getJ()); //2


// x -- function -- object through prototype chain


//prototype inheritance

//base class
var Job = function() {
  this.pays = true;
}

// prototype methods
Job.prototype.print = function() {
  console.log(this.pays ? 'Please hire me' : 'no thank u');
}

// subclass

var TechJob = function(title, pays) {
  Job.call(this);  //called the constructor

  this.title = title;
  this.pays = pays;
}

// inheritence
TechJob.prototype = Object.create(Job.prototype); //inherite job's prototype tp TechJob
TechJob.prototype.constructor = TechJob; // set the constructor

// override method
TechJob.prototype.print = function () {
  console.log(this.pays ? this.title + " Greate Job" : "Learn Language");
}


var softwarePosition1 = new TechJob("JS", true);
console.log(softwarePosition1.print());
var softwarePosition2 = new TechJob("C#", false);
console.log(softwarePosition2.print());
