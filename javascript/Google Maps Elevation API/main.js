//Latitude is N-S, longitude i E-W


var myElevation = {
	elevation: 0,
	status : "",
	latlng: "",
	resolution: 0
};


var inputloc = prompt("Please enter coordinates:", "47.611038, -122.311168");
var loc = inputloc.split(", ");


// Inputs:
radius = 5;
scale = 1; 


resolutionWidth = 0.001265; // Fremont city block length North-South
step = resolutionWidth * scale;
sampleSize = ( 2 * radius + 1 ) ** 2;


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

var myLocation = {
	lat: parseFloat(loc[0]), 
	lng: parseFloat(loc[1])
};

var elevator;


elevations = [];
vertices = [sampleSize];

// function initMap() {
// 	elevator = new google.maps.ElevationService;
// 	for (var i = 0; i < sampleSize; i++ ){
// 		elevator.getElevationForLocations({
// 		    'locations': [requestInputs[i]]
// 		}, function(results, status) {
// 			if (status === 'OK') {
// 				myElevation.elevation  = results[0].elevation;
// 				myElevation.status = status;
// 				myElevation.latlng = results[0].location;
// 				myElevation.resolution = results[0].resolution;

// 				console.log("The elevation at this point is " + results[0].elevation + " meters.");
// 				elevations.push(results[0].elevation)
// 				vertices.push({
// 					lat: requestInputs[vertices.length-1].lat,
// 					lng: requestInputs[vertices.length-1].lng,
// 					elv: results[0].elevation
// 				})

// 			} else {
// 				console.log("Elevation service failed due to: " + status);
// 			}
// 		});
// 	}
// }



function initMap() {
	elevator = new google.maps.ElevationService;
	for (var i = 0; i < sampleSize; i++ ){
		elevator.getElevationForLocations({
		    'locations': requestInputs
		}, function(results, status) {
			if (status === 'OK') {
				for (var i = 0; i < sampleSize; i++){
					console.log("The point is " + requestInputs[i].lat + ",  " + requestInputs[i].lng);
					console.log("The elevation at this point is " + results[i].elevation + " meters.");
					vertices.push([requestInputs[i].lng,requestInputs[i].lat,results[i].elevation])
				}
			} else {
				console.log("Elevation service failed due to: " + status);
			}
		});
	}
}
