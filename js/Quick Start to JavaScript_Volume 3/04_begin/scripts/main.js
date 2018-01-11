// object literal:

var mark = {
	name: "Mark",
	tshirtColor: "Navy Blue"
};

var lisa = {
	name: "Lisa",
	tshirtColor: "Red"
};


// Object constructor:
function Friend(name, tshirtColor){
	this.name = name;
	this.tshirtColor = tshirtColor;
}

var denny = new Friend("Denny", "Green");
alert(denny.name);
alert(denny.tshirtColor);
