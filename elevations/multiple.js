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
var tileSize = tileLength ** 2;
var gridSize = gridLength ** 2;

// Stage Request Inputs
var middleTileCenter = {
	lat: parseFloat(loc[0]), 
	lng: parseFloat(loc[1])
};
console.log(middleTileCenter)
var middleTileTopLeft = {
	lat: middleTileCenter.lat + tileRadius * step, 
	lng: middleTileCenter.lng - tileRadius * step
};
console.log(middleTileTopLeft)
var gridTopLeft = {
	lat: middleTileTopLeft.lat + gridRadius*tileLength*step,
	lng: middleTileTopLeft.lng - gridRadius*tileLength*step
};
console.log(gridTopLeft)
var tileAnchors = [];
for (var i = 0; i < gridLength; i++ ){
	for (var j = 0; j < gridLength; j++){
		tileAnchors.push({
			lat: gridTopLeft.lat - tileLength * step * i,
			lng: gridTopLeft.lng + tileLength * step * j
		})
	}
}
console.log("tile anchors array ")
console.log(tileAnchors)



//var inputArray = ["47.659064, -122.354199","47, -122","47.659064, -122.354199","47, -122"];


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
			for (var i = 0; i < tileSize; i++){
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


var deltaTime = 3000; // in milliseconds
var j = 0;
for (var i = 0; i < tileAnchors.length; i++){
	setTimeout(function(){
		initMap(tileAnchors[j]);
		j++;
	},i*deltaTime);
}
setTimeout(function(){visualizeResults();},tileAnchors.length*deltaTime);



function visualizeResults(){
	console.log("hello")
	container = document.getElementById('container');
	container.style.width = 25 * tileLength * gridLength + "px";
	var elevationData = []
	var row = []
	for (var l =0; l < gridLength; l++){
		row = multipleResults.slice(l*gridLength, (l+1)*gridLength)
		console.log(row)
		
		var minElv = Number.MAX_VALUE
		var maxElv = -1

		for (var k =0; k < tileLength; k++){
			for (var i =0; i < gridLength; i++){
				for (var j=0; j < tileLength; j++){

					var position = row[i][tileLength*k + j]
					var cellNumber = l*tileSize*gridLength + k*gridLength*tileLength + i*tileLength + j	

					elevationData.push(position);
					container.innerHTML += "<div class='cell' id='cell" + cellNumber+"''>"+Math.max(Math.round(position.elv),-1)+"</div>";

					if (position.elv < minElv){ minElv = position.elv} 
					if (position.elv > maxElv){ maxElv = position.elv} 
				}
			}
		}

		for (var i = 0; i < elevationData.length; i++){
			cellColor = Shade( (elevationData[i].elv - minElv) / (maxElv - minElv))
			document.getElementById('cell' + i).style.background = cellColor
			//document.getElementById('cell' + i).style.color = cellColor
		}


	}
	console.log(elevationData)
}