var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var req = new XMLHttpRequest(); 
var htmlString; 
req.open('GET', 'https://github.com/mrkpvlvski/mrkpvlvski.github.io/tree/master/byExample/js', false);   
req.send(null);  
if(req.status == 200) {
	htmlString = req.responseText;
	//console.log(req.responseText);
}

//console.log(htmlString);

var myString = "hello, how are you how?";
var ind;
ind = myString.indexOf("how", 20);
console.log(ind);

var startingPositions = [];
var endPositions = [];
ind = 0;
while (ind !== -1){
	ind++;
	ind = htmlString.indexOf("/mrkpvlvski/mrkpvlvski.github.io/blob/master/byExample/js/", ind);
	startingPositions.push(ind);
	endPositions.push(htmlString.indexOf("\"", ind))
} 
console.log(startingPositions.slice(0,-1))
console.log(endPositions.slice(0,-1))
//console.log("https://github.com/" + htmlString.substr(startingPositions[0],endPositions[0]-startingPositions[0]))

var links =[];
for (var i = 0; i < startingPositions.length - 1; i++){
	links.push("https://github.com/" + htmlString.substr(startingPositions[i],endPositions[i]-startingPositions[i]))
	console.log(links[i])
}

console.log(htmlString)

//JQuery
