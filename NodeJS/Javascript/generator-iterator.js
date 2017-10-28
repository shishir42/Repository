let i = [1, 2, 3, 4];

let iterator = i[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

function *generator(){
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}

let iterator = generator();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

function request(url) {
  return new Promise(function(resolve, reject){
    makeAjaxCall(url, function(err, text){
        if(err) reject(err);
        else resolve(text);
    });
  });
}

function *generator(){
  yield request('url1');
  yield request('url2');
}


// JS have Sets, Weak sets, Maps, Weak maps

let myset = new Set([1, 2, 3, 1, 2]);

for(let val of myset){
  console.log(val);
}

// Iterator
let anObject = {
  name: 'bob',
  age: 20,
  friends: ['abc', 'xyz', 'uvw'],
  getName: function(){
    return this.name;
  }
}


for(let key of anObject){
  console.log(key);
}

for(let key in anObject){
  console.log(key);
}
