class Person {

	constructor() { 
		this.name = '' || "unknown"
		this.age = '' || "unknown"
	}

	getName() { 
      console.log("This persons' name is " + this.name)
    }
    setName(name) { 
      this.name = name;
    }
}

var mark = new Person
mark.getName()
mark.name = "Mark"
mark.getName() 
console.log(mark.name + "'s age is " + mark.age)
mark.age = 30
console.log(mark.name + "'s age is " + mark.age)