let add = function(n){
  if(n <= 0){
    return 0;
  }else{
    return n + add(n - 1);
  }
}

console.log(add(4));


// function scope


// lexical scope - things defined outside is avaliable inside

// Hoisting - 
