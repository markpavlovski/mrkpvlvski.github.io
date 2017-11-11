//Latitude is N-S, longitude i E-W


function Shade(pct) {

	pct = 1 - pct
	rgbComponent = Math.round(255 * pct)
	var hexComponent
	if (rgbComponent < 16 ){
		hexComponent = "0" + rgbComponent.toString(16)
	} else {
		hexComponent = rgbComponent.toString(16)
	}

	hex = "#" + hexComponent + hexComponent + hexComponent
	return hex
}



var myElevation = {
	elevation: 0,
	status : "",
	latlng: "",
	resolution: 0
};


var inputloc = prompt("Please enter coordinates:", "47.659803, -122.353963");
var scale = prompt("Please input scale:", 1);

var loc = inputloc.split(", ");


// Inputs:
radius = 10;
//scale = .5; 


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
vertices = [];

container = document.getElementById('container');
container.innerHTML = ""


function initMap() {
	elevator = new google.maps.ElevationService;
		elevator.getElevationForLocations({
		    'locations': requestInputs
		}, function(results, status) {
			if (status === 'OK') {
				for (var i = 0; i < sampleSize; i++){
					console.log("The point is " + requestInputs[i].lat + ",  " + requestInputs[i].lng);
					console.log("The elevation at this point is " + results[i].elevation + " meters.");
					elevations.push(results[i].elevation)
					vertices.push([requestInputs[i].lng,requestInputs[i].lat,results[i].elevation])
					container.innerHTML += "<div class='cell' id='cell" + i +"''>"+Math.round(results[i].elevation)+"</div>";
				}
				maxElv = Math.max.apply(null, elevations)
				minElv = Math.min.apply(null, elevations)
				for (var i = 0; i < sampleSize; i++){
					document.getElementById('cell' + i).style.background = Shade( (elevations[i] - minElv) / (maxElv - minElv))
				}
				document.getElementById('cell'+(sampleSize-1)/2).style.color = '#ccffff';

			} else {
				console.log("Elevation service failed due to: " + status);
			}
		});

}
