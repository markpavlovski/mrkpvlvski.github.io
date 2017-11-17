//Note to self: latitude is N-S, longitude i E-W


// Convert percentage into hexadecimal greyscale color
function Shade(pct) {
	pct = 1 - pct
	var rgbComponent = Math.round(255 * pct)
	var hexComponent
	if (rgbComponent < 16 ){
		hexComponent = "0" + rgbComponent.toString(16)
	} else {
		hexComponent = rgbComponent.toString(16)
	}
	var hex = "#" + hexComponent + hexComponent + hexComponent
	return hex
}

// Get User Inputs
var inputloc = prompt("Please enter coordinates (default is Lighthouse Roasters in Fremont):", "47.659064, -122.354199");
var scale = prompt("Please input scale: (1 corresponds to the length of one block N-S)", 1);
var loc = inputloc.split(", ");

// Defaults
var tileRadius = 10;
var gridRadius = 1; // gridRadius of 0 is equivalent to 1 x 1 tiling, gridRadius of 2 equivalent to 5 x 5 tiling, etc.

var tileLength = 2 * tileRadius + 1;
var resolutionWidth = 0.001265; // Fremont city block length North-South
var gridLength = 2* gridRadius + 1;
var step = resolutionWidth * scale;
var sampleSize = tileLength ** 2;
var gridSize = gridLength ** 2;

// Stage Request Inputs
var anchorTileCenter = {
	lat: parseFloat(loc[0]), 
	lng: parseFloat(loc[1])
};
var anchorTileTopLeft = {
	lat: anchorTileCenter.lat + tileRadius * step, 
	lng: anchorTileCenter.lng - tileRadius * step
};
var gridTopLeft = {
	lat: anchorTileTopLeft.lat + tileRadius * step,  
	lng: anchorTileTopLeft.lng - tileRadius * step
};
var topLeftArray = [];
for (var i = 0; i < gridSize; i++ ){
	topLeftArray.push({
		lat: gridTopLeft.lat - step * i, //fix formula
		lng: gridTopLeft.lng + step * j
	})
}



//var inputArray = ["47.659064, -122.354199","47, -122","47.659064, -122.354199","47, -122"];

container = document.getElementById('container');
var multipleResults = []


function initMap(inputTopLeft) {

	var requestLocations = [];
	for ( var i = 0; i < 2 * tileRadius + 1; i++) {
	for (var j = 0; j < 2 * tileRadius + 1; j ++){
		requestLocations.push({
				lat: inputTopLeft.lat - step * i , 
				lng: inputTopLeft.lng + step * j, 
		})
	}
	}

	var elevator = new google.maps.ElevationService;
	elevator.getElevationForLocations({'locations': requestLocations}, function(results, status) {
		var elevations = [];
		if (status === 'OK') {
			//Create elevation table
			for (var i = 0; i < sampleSize; i++){
				elevations.push(results[i].elevation)
				requestLocations[i].elv = results[i].elevation
			}
			multipleResults.push(requestLocations)
		} else {
			console.log("Elevation service failed due to: " + status);
		}
		console.log(multipleResults)
	});
}


var deltaTime = 5000; // in milliseconds
var j = 0;
for (var i = 0; i < topLeftArray.length; i++){
	setTimeout(function(){
		initMap(topLeftArray[j]);
		j++;
	},i*deltaTime);
}
setTimeout(function(){visualizeResults();},topLeftArray.length*deltaTime);


function visualizeResults(){
	console.log("hello")
	var elevationData = []
	var row = []
	for (var l =0; l < gridLength; l++){
		row = multipleResults.slice(l*gridLength, (l+1)*gridLength)
		console.log(row)
		for (var k =0; k < tileLength; k++){
			for (var i =0; i < gridLength; i++){
				for (var j=0; j < tileLength; j++){

					elevationData.push(row[i][tileLength*k + j]);

				}
			}
		}
	}
	console.log(elevationData)
}
