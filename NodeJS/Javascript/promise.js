let promiseToCleanTheRoom = new Promise(function(resolve, reject){
  // Cleaning the room

  // status

  let isClean = true;

  if(isClean){
    resolve('Clean');
  }else {
    reject('Not Clean');
  }

});

promiseToCleanTheRoom.then(function(fromResolve){
  console.log("this room is " + fromResolve);
}).catch(function(fromReject){
  console.log("this room is " + fromReject);
}); //this method is fired when promise is resolve


//

let cleanRoom = function(){
  return new Promise(function(resolve, reject){
    resolve('Cleaned the Room');
  });
};

let removeGarbage = function(message){
  return new Promise(function(resolve, reject){
    resolve(message + 'remove garbage');
  });
};

let winIceCream = function(message){
  return new Promise(function(resolve, reject){
    resolve(message + 'won icecream');
  });
};


cleanRoom().then(function(result){
  return removeGarbage(result);
}).then(function(result){
  return winIceCream(result);
}).then(function(result){
  console.log(result + 'finished');
})


// Execute all in parallel

Promise.all(cleanRoom(), removeGarbage(), winIceCream()).then(function(){
  console.log('al finished');
});

// One of them finished
Promise.race(cleanRoom(), removeGarbage(), winIceCream()).then(function(){
  console.log('al finished');
});

http://davidshariff.com/blog/futures-and-promises-in-javascript/
