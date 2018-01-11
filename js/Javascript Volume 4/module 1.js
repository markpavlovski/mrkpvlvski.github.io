http://plnkr.co/edit/ZmCXxhBEoVgKG1I8wu1O?p=preview
'use strict';

//(1)

var cat = {
  name: "Fluffy",
  color: "White"
};


cat.age = 3;
cat.speak = function(){
  display("Meow");
}

display(cat.name);
display(cat.age);
cat.speak();

//(2)
function Cat(name, color) {
  this.name = name;
  this.color = color;
}

var cat = new Cat("Fluffy","Red");
display(cat);

//(3)

display("hi");


var cat = Object.create(Object.prototype, 
  {
    name: {
      value: "Fluffy",
      enumerable: true,
      writable: true,
      configurable: true
    },
    color: {
      value: "White",
      enumerable: true,
      writable: true,
      configurable: true
    }
  })
  
  
  display(cat);

  
//(4)

class Cat {
  constructor(name,color){
    this.name = name;
    this.color = color;
  }
  speak(){
    display("Meow");
  }
  
  
}

var cat = new Cat("Fluffy", "white");

display(cat)
cat.speak();