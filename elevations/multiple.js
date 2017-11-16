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
var radius = 10;
var resolutionWidth = 0.001265; // Fremont city block length North-South

// Stage Grid
var step = resolutionWidth * scale;
var sampleSize = ( 2 * radius + 1 ) ** 2;
var anchorLocation = {
	lat: parseFloat(loc[0]), 
	lng: parseFloat(loc[1])
};
var topLeftLocation = {
	lat: anchorLocation.lat + radius * step, 
	lng: anchorLocation.lng - radius * step
};
var requestInputs = [];
for ( var i = 0; i < 2 * radius + 1; i++) {
	for (var j = 0; j < 2 * radius + 1; j ++){
		requestInputs.push({
				lat: topLeftLocation.lat - step * i , 
				lng: topLeftLocation.lng + step * j, 
		})
	}
}



container = document.getElementById('container');

  	
var multipleResults = []



function initMap() {

	var elevator = new google.maps.ElevationService;
	elevator.getElevationForLocations({'locations': requestInputs}, function(results, status) {
		var elevations = [];
		if (status === 'OK') {
			//Create elevation table
			for (var i = 0; i < sampleSize; i++){
				elevations.push(results[i].elevation)
			}
			multipleResults.push(elevations)
		} else {
			console.log("Elevation service failed due to: " + status);
		}
		console.log(multipleResults)
	});
}

var deltaTime = 3*1000;

for (var i = 0; i < 9; i++){
	setTimeout(function(){initMap();},i*deltaTime);
}

	