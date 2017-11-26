

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
var inputloc = "47.659064, -122.354199";
var scale = 1;
var gridRadius = 3;
var loc = inputloc.split(", ");
var elevationData = data_1_3;
var contourStepSize = 50;


// Defaults
var tileRadius = 10;
var tileLength = 2 * tileRadius + 1;
var resolutionWidth = 0.001265; // Fremont city block length North-South
var gridLength = 2* gridRadius + 1;
var step = resolutionWidth * scale;
var tileSize = tileLength ** 2;
var gridSize = gridLength ** 2;


// Set Up Display
container = document.getElementById('container');
defaultCellSize = Math.round(0.85 * window.innerHeight / tileLength / gridLength);
defaultContainerSize = defaultCellSize * tileLength * gridLength;
container.style.width = defaultContainerSize + "px";

var minElv = Number.MAX_VALUE
var maxElv = -1

var elevationMatrix = [];
var elevationStepMatrix = [];
var elevationStepData = [];
var contoursObjectMatrix = [];
var contoursObjectMatrixFiltered = [];
var contoursData = [];
var contoursDataFiltered = [];


var matrixSize = tileLength * gridLength;

function calculateContours(){

	for (var i = 0; i < matrixSize; i++ ){
		elevationMatrix.push([]);
		elevationStepMatrix.push([]);
		contoursObjectMatrix.push([]);
		contoursObjectMatrixFiltered.push([]);
	}
	for (var i = 0; i < matrixSize; i++){
		for (var j = 0; j< matrixSize; j++){
			elevationMatrix[i][j] = elevationData[matrixSize*i + j].elv;
			
			elevationStepMatrix[i][j] = Math.max(Math.floor((elevationData[matrixSize*i + j].elv)/contourStepSize),-1)*contourStepSize;
			elevationStepData.push({
				lat: 0,
				lng: 0,
				elv: elevationStepMatrix[i][j]
			});

			// Calculate Edges

			var edge = false;
			var leftEdge = false;
			var topEdge = false;
			var movedLeftIncrease = false;
			var movedLeftDecrease = false;
			var movedDownIncrease = false;
			var movedDownDecrease = false;
			var contourElevation = elevationStepMatrix[i][j];

			
			if ( j > 0 && elevationStepMatrix[i][j] != elevationStepMatrix[i][j-1]) {
				leftEdge = true;
				if (elevationStepMatrix[i][j] > elevationStepMatrix[i][j-1]){
					movedLeftIncrease = true;
				} else {
					movedLeftDecrease = true;
				}
			} 
			if ( i > 0 && elevationStepMatrix[i][j] != elevationStepMatrix[i-1][j]) {
				topEdge = true;
				if ( elevationStepMatrix[i][j] > elevationStepMatrix[i-1][j]){
					movedDownIncrease = true;
				} else {
					movedDownDecrease = true;
				}
			} 
			if (leftEdge || topEdge){
				edge = true;
				contourElevation = 10 * contourStepSize;
			}
			
			contoursObjectMatrix[i][j] = {
				edge: edge,
				leftEdge: leftEdge,
				topEdge: topEdge,
				movedLeftIncrease: movedLeftIncrease,
				movedLeftDecrease: movedLeftDecrease,
				movedDownIncrease: movedDownIncrease,
				movedDownDecrease: movedDownDecrease,
				elv: elevationStepMatrix[i][j]
			};

			contoursData.push({
				lat: 0,
				lng: 0,
				elv: contourElevation
			});
		}
	}
	// Filter edges

	contoursObjectMatrixFiltered = contoursObjectMatrix;
	for (var i = 0; i < matrixSize; i++){
		for (var j=0; j < matrixSize; j++){

			if ( j > 0 && (contoursObjectMatrix[i][j-1].movedLeftIncrease && contoursObjectMatrix[i][j].movedLeftDecrease)){
				contoursObjectMatrixFiltered[i][j-1] = elevationStepMatrix[i,j-1];	
				console.log("yess");	
			}	

			contoursDataFiltered.push({
				lat: 0,
				lng: 0,
				elv: contoursObjectMatrixFiltered[i][j].elv
			});


		}
	}

}
calculateContours();





function visualizeResults(elevationDataArray){

	tableHTMLString = ""
	tableHTMLStringNoElv = ""
	for (var i = 0; i < elevationDataArray.length; i++){
		tableHTMLString += "<div class='cell' id='cell" + i +"''>"+Math.max(Math.round(elevationDataArray[i].elv),-1)+"</div>";
		tableHTMLStringNoElv += "<div class='cell' id='cell" + i +"''> </div>";
		if (elevationDataArray[i].elv < minElv){ minElv = elevationDataArray[i].elv} 
		if (elevationDataArray[i].elv > maxElv){ maxElv = elevationDataArray[i].elv} 
	}
	container.innerHTML = tableHTMLStringNoElv;

	var activeCell;
	for (var i = 0; i < elevationDataArray.length; i++){
		cellColor = Shade( (elevationDataArray[i].elv - minElv) / (maxElv - minElv))
		activeCell = document.getElementById('cell' + i);
		activeCell.style.background = cellColor
		activeCell.style.width = defaultCellSize + "px"
		activeCell.style.height = defaultCellSize + "px"
		activeCell.style.lineheight = defaultCellSize + "px"
	}


	document.getElementById('cell'+Math.floor((elevationDataArray.length)/2)).style.color = '#ccffff';

	// Load THREEJS model
	//loadScene()
}
visualizeResults(elevationStepData);

document.getElementById('scaleDown').addEventListener('click', scaleTableDown, false);
document.getElementById('scaleUp').addEventListener('click', scaleTableUp, false);




var currentCellSize = defaultCellSize;
var currentContainerSize = defaultContainerSize;


function scaleTableDown(event) {
	var activeCell;
	var scale = 0.8;

	currentCellSize = scale * currentCellSize;
	currentContainerSize = scale * currentContainerSize;

	for (var i = 0; i < elevationData.length; i++){
		activeCell = document.getElementById('cell' + i);
		activeCell.style.width = currentCellSize + 'px'
		activeCell.style.height = currentCellSize + 'px'
		activeCell.style.lineheight = currentCellSize + 'px'
	}
	container.style.width = currentContainerSize + 'px'
}
function scaleTableUp(event) {
	var activeCell;
	var scale = 1/0.8;

	currentCellSize = scale * currentCellSize;
	currentContainerSize = scale * currentContainerSize;

	for (var i = 0; i < elevationData.length; i++){
		activeCell = document.getElementById('cell' + i);
		activeCell.style.width = currentCellSize + 'px'
		activeCell.style.height = currentCellSize + 'px'
		activeCell.style.lineheight = currentCellSize + 'px'
	}
	container.style.width = currentContainerSize + 'px'
}



