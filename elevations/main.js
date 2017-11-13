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





				var scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xccffff );
				var camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight / .6, 1, 10000);
				var renderer = new THREE.WebGLRenderer();
				renderer.setSize(window.innerWidth, window.innerHeight * .6);

				mouse = new THREE.Vector3()

				function onDocumentMouseMove(event) {
				    event.preventDefault();
				    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
				    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
				    mouse.z = -1.6;
				}
				document.addEventListener('mousemove', onDocumentMouseMove, false);
				containerThree = document.getElementById( 'canvas' );
				document.body.appendChild( containerThree );
				containerThree.appendChild( renderer.domElement );
				var geometry = new THREE.Geometry();

				// Define Vertices

				// geometry.vertices.push(
				//   new THREE.Vector3( -250, 250, elevations[0] ),
				//   new THREE.Vector3( -225, 250, elevations[1] ),
				//   new THREE.Vector3( -250, 225, elevations[2] )
				// );


				fullRow = 2*radius+1;
				cellSize = (maxElv-minElv)/21
				topHeight = maxElv - minElv
				heightScale = 2

				for (var i =0; i < fullRow; i++){
					for (var j=0; j < fullRow; j++){
						geometry.vertices.push(
							new THREE.Vector3( cellSize* j, (elevations[fullRow*i+j]-minElv)/heightScale, cellSize*i)
						);
					}
				}

				console.log(geometry.vertices);

				// Define Faces

				//geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
				
				for (var j =  0; j < fullRow - 1; j++){
					for (var i=0; i < fullRow- 1; i++){
						geometry.faces.push( new THREE.Face3( fullRow * (j + 1) + i, fullRow*j + i+1, fullRow* j + i) );
						geometry.faces.push( new THREE.Face3( fullRow* j + i+1,fullRow * (j + 1) + i, fullRow * (j + 1) + i + 1, fullRow* j + i+1) );

					}
				}





				geometry.computeBoundingSphere();
				geometry.center()
				geometry.computeVertexNormals()
				geometry.computeFaceNormals()


				var material = new THREE.MeshLambertMaterial({color: 0x1EAEDB, wireframe: false});
				var cube = new THREE.Mesh(geometry, material);
				scene.add(cube);
				camera.position.z = topHeight*1.3;    
				camera.position.x = 0*cellSize;    
				camera.position.y = 15*cellSize;  
				camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), -0.5);      


				var materialtest = new THREE.MeshLambertMaterial({color: 0x1EAEDB, wireframe: false});
				var sphere = new THREE.Mesh(new THREE.SphereGeometry( 5, 32, 32 ), materialtest);
				sphere.position.set(-maxElv/2,maxElv/2,0);
				//scene.add(sphere);

				var sphere2 = new THREE.Mesh(new THREE.SphereGeometry( 5, 32, 32 ), materialtest);
				sphere2.position.set(maxElv/2,maxElv/2,0);
				//scene.add(sphere2);

				var sphere3 = new THREE.Mesh(new THREE.SphereGeometry( 5, 32, 32 ), materialtest);
				sphere3.position.set(0,maxElv/2,-maxElv/2);
				//scene.add(sphere3);

				var sphere4 = new THREE.Mesh(new THREE.SphereGeometry( 2, 32, 32 ), materialtest);
				sphere3.position.set(0,maxElv/4,maxElv/2);
				//scene.add(sphere3);

    			

				var light = new THREE.PointLight( 0x9999ff, 3, 100  ); // soft white light
				light.position.set(-maxElv/2,maxElv/2,0);
				scene.add( light );

				var light2 = new THREE.PointLight( 0x99ff99, 2, 100  ); // soft white light
				light2.position.set(maxElv/2,maxElv/2,0);
				scene.add( light2 );

				var light3 = new THREE.PointLight( 0xffffff, 3, 100  ); // soft white light
				light3.position.set(0,maxElv/2,-maxElv/2);
				scene.add( light3 );

				var light4 = new THREE.PointLight( 0xff9999, 2, 100  ); // soft white light
				light4.position.set(0,maxElv/4,maxElv/2);
				scene.add( light4 );


    			clock = new THREE.Clock();


    
				function render() {
					requestAnimationFrame(render);

					var y_axis = new THREE.Vector3(0, -1, 0);
					var z_axis = new THREE.Vector3(0, 0, -1);
					time = clock.getElapsedTime();
					cube.quaternion.setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), time/2.2);
					
					//cube.quaternion.setFromUnitVectors(mouse, z_axis.clone().normalize());
					renderer.render(scene, camera);
				};
				render();











			} else {
				console.log("Elevation service failed due to: " + status);
			}
		});

}
	     	


