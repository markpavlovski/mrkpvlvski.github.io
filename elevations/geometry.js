

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight / .4, 1, 10000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight * .4);

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

geometry.vertices.push(
  new THREE.Vector3( -200,  200, elevations[0] ),
  new THREE.Vector3( -200, -200, elevations[1] ),
  new THREE.Vector3(  200, -200, elevations[2] )
);

// Define Faces

geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );


geometry.computeBoundingSphere();






var material = new THREE.MeshBasicMaterial({color: 0x1EAEDB, wireframe: true});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 700;        
function render() {
	requestAnimationFrame(render);

	var y_axis = new THREE.Vector3(0, -1, 0);
	var z_axis = new THREE.Vector3(0, 0, -1);
	cube.quaternion.setFromUnitVectors(mouse, y_axis.clone().normalize());
	cube.quaternion.setFromUnitVectors(mouse, z_axis.clone().normalize());
	renderer.render(scene, camera);
};
render();