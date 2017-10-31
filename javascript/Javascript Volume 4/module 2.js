//(1)

"use strict";

var cat = {
	name = "Fluffy";
	color = "White";
}

display(cat["color"]);

//(2)


var cat = {
	name: "Fluffy",
	color: "White"
};

cat["Eye Color"] = "green";

display(cat["color"]);
display(cat["Eye Color"]);
display(cat);

//(3)


var cat = {
	name: "Fluffy",
	color: "White"
};


cat.name = 'Scratchy';
display(Object.getOwnPropertyDescriptor(cat, 'name'));


//(4)



var cat = {
	name: {
	  first: "Fluffy",
	  last: "Kittie"
	},
	color: "White"
};

for (var propertyName in cat){
  display(propertyName + ": " + cat[propertyName]);
}


Object.defineProperty(cat, "name", {enumerable: true});
display(JSON.stringify(cat))

// (5)

var cat = {
	name: {
	  first: "Fluffy",
	  last: "Kittie"
	},
	color: "White"
};

for (var propertyName in cat){
  display(propertyName + ": " + cat[propertyName]);
}


Object.defineProperty(cat, "name", {enumerable: true});
display(JSON.stringify(cat))
display(cat.name.first);
delete cat.name
display(cat.name);
display(cat.name.first);


// (6)

var cat = {
	name: {
	  first: "Fluffy",
	  last: "Kittie"
	},
	color: "White"
};

Object.defineProperty(cat, "fullName", {
  get: function() {
    return this.name.first + " " + this.name.last;
  },
  set: function(fullNameInput) {
    var nameParts = fullNameInput.split(" ");
    this.name.first = nameParts[0];
    this.name.last = nameParts[1];
  }
})

display(cat.fullName);
display(cat.name.first);
display(cat.name.last);

cat.fullName = "Gregor Meowzers";

display(cat.name.first);
display(cat.name.last);

display(cat.fullName);

