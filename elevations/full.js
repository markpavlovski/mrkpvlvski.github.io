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
var tileRadius = 10; // Tile size resolves to 21 by 21 grid which is close to max individual request for elevation API
var tileLength = 2 * tileRadius + 1;
var resolutionWidth = 0.001265; // Fremont city block length North-South
var gridRadius = 1; // gridRadius of 1 is equivalent to 3 x 3 tiling, gridRadius of 2 equivalent to 5 x 5 tiling, etc.
var gridLength = 2* gridRadius + 1
var step = resolutionWidth * scale;
var sampleSize = tileLength ** 2;
var gridSize = gridLength ** 2;



// Stage Grid
var anchorLocation = {
	lat: parseFloat(loc[0]), 
	lng: parseFloat(loc[1])
};
var topLeftLocation = {
	lat: anchorLocation.lat + tileRadius * step + gridRadius*tileLength*step, 
	lng: anchorLocation.lng - tileRadius * step - gridRadius*tileLength*step
};


var allInputLocations = [];
for(var i = 0; i < gridLength ** 2; i++){
    allInputLocations[i] = [];     
}

for (var k = 0; k < gridLength**2; k++ ){
	for ( var i = 0; i < tileLength; i++) {
		for (var j = 0; j < tileLength; j ++){
			allInputLocations[k].push({
				lat: topLeftLocation.lat - step * i - tileLength * (k - k % gridLength)/gridLength *step,
				lng: topLeftLocation.lng + step * j + tileLength * (k % gridLength)*step
			})
		}
	}
}
console.log(allInputLocations)

var inputLocations = allInputLocations[4];


var elevations = [];
var vertices = [];

for (var i = 0; i < gridSize; i++){
	document.getElementById('grid').innerHTML += "<div class='container' id='container" + i +"''></div>"
}

function initMap() {
	var elevator = new google.maps.ElevationService;
	var j = 0;
	elevator.getElevationForLocations({'locations': inputLocations}, function(results, status) {
		if (status === 'OK') {
			//Create elevation table, set negative elevations to -1.
			for (var i = 0; i < sampleSize; i++){
				elevations.push(Math.max(results[i].elevation,-1))
				vertices.push([inputLocations[i].lng,inputLocations[i].lat,elevations[i]])
				document.getElementById('container'+j).innerHTML += "<div class='cell' id='cell" + i +"''>"+Math.round(elevations[i])+"</div>";
			}


			// Shade cells by elevation
			maxElv = Math.max.apply(null, elevations)
			minElv = Math.min.apply(null, elevations)
			for (var i = 0; i < sampleSize; i++){
				document.getElementById('cell' + i).style.background = Shade( (elevations[i] - minElv) / (maxElv - minElv))
			}
			document.getElementById('cell'+(sampleSize-1)/2).style.color = '#ccffff';

			// Load THREEJS model
			//loadScene()

		} else {
			console.log("Elevation service failed due to: " + status);
		}
	});
}
	

// var arr = [];
// for(var x = 0; x < 100; x++){
//     arr[x] = [];    
//     for(var y = 0; y < 100; y++){ 
//         arr[x][y] = y**2;    
//     }    
// }

// console.log(arr[1]);