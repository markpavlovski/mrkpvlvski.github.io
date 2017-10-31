//alert("hello, world");


var myElevation = {
	elevation: 0,
	status : "",
	latlng: "",
	resolution: 0
};

var myLocation = {
	lat: 47.6279538, 
	lng: -122.3228368
};

function initMap() {
	var elevator = new google.maps.ElevationService;
	elevator.getElevationForLocations({
	    'locations': [myLocation]
	}, function(results, status) {
		if (status === 'OK') {
			myElevation.elevation  = results[0].elevation;
			myElevation.status = status;
			myElevation.latlng = results[0].location;
			myElevation.resolution = results[0].resolution;

			alert("The elevation at this point is " + results[0].elevation + " meters.");
		} else {
			alert("Elevation service failed due to: " + status);
		}
	});
}

