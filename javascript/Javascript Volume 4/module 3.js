// (1)

"use strict";

var arr = ["red", "blue", "green"];
var arr2 = ["a","b","c"];

var last = arr[arr.length-1];
Object.defineProperty(Array.prototype, "last", {
  get: function(){
    return this[this.length-1];
  }
})



display(last);


display(arr.last);
display(arr2.last);


display(Array);

// (2)

"use strict";

var myFunc = function(){
  
}

display(myFunc.prototype);

var cat = {
  name: "Fluffy"
};

display(cat.__proto__);


// (3)

function Cat(name, color){
  this.name = name;
  this.color = color;
}
var fluffy = new Cat("Fluffy", "White");

display(Cat.prototype);
display(fluffy.__proto__);

var muffin = new Cat("Muffin", "green");
display(muffin.__proto__);


//(4)


function Cat(name, color){
  this.name = name;
  this.color = color;
}
Cat.prototype.age = 4;


var fluffy = new Cat("Fluffy", "White");

display(Cat.prototype);


display(fluffy.__proto__.age);
display(fluffy.age);
display(Object.keys(fluffy));
display(fluffy.hasOwnProperty("age"));
display(fluffy.hasOwnProperty("color"));



var muffin = new Cat("Muffin", "green");



display(muffin.__proto__);


//(5)

function Cat(name, color){
  this.name = name;
  this.color = color;
}
Cat.prototype.age = 4;


var fluffy = new Cat("Fluffy", "White");
var muffin = new Cat("Muffin", "green");


Cat.prototype = {age:5};
muffin.__proto__ = {age:6};


display(fluffy.age);
display(muffin.age);


var snowbell = new Cat("Snowbell", "White");

display(snowbell.age);

display(fluffy.__proto__)
display(fluffy.__proto__.__proto__)
display(fluffy.__proto__.__proto__.__proto__)



//(6)


function Animal(voice){
  this.voice = voice || "Grunt"
}
Animal.prototype.speak = function(){
  display(this.voice);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
function Cat(name, color){
  Animal.call(this, "Murrr!")
  this.name = name;
  this.color = color;
}


var fluffy = new Cat("Fluffy", "White");
fluffy.speak()

display(fluffy);

display(fluffy instanceof Animal)
display(fluffy instanceof Cat)

display(fluffy.__proto__)
display(fluffy.__proto__.__proto__)
display(fluffy.__proto__.__proto__.__proto__)
display(fluffy.__proto__.__proto__.__proto__.__proto__)



//(7)


class Animal {
  constructor(voice){
    this.voice = voice || "grunt";
  }
  speak(){
    display(this.voice);
  }
}

class Cat extends Animal {
  constructor(name,color){
    super("meow"); // calls parent's constructor
    this.name = name;
    this.color = color;
  }
}



var fluffy = new Cat("Fluffy", "White");
fluffy.speak()
display(fluffy.constructor);

display(Object.keys(fluffy.__proto__.__proto__))


display(fluffy instanceof Animal)
display(fluffy instanceof Cat)

display(fluffy.__proto__)
display(fluffy.__proto__.__proto__)
display(fluffy.__proto__.__proto__.__proto__)
display(fluffy.__proto__.__proto__.__proto__.__proto__)