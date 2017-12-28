/*
Goal: Implement https://www.codeproject.com/Articles/336915/Connected-Component-Labeling-Algorithm
use Union Find algorithm: http://www.cs.duke.edu/courses/cps100e/fall09/notes/UnionFind.pdf

This is a simplified problem with only one non-background elevation

*/


// Step 1: Define Helper Classes and Functions;
function randomInt(a,b){
	if ( b === undefined ){
		if ( a === undefined){
			b = 1;
			a = 0;
		} else {
			b = a;
			a = 0;
		}
	}
	return a + Math.floor(Math.random()*(b +1 -a));
}
function conditionalIncludeFactor(prob){
	if (Math.random() < prob){
		return 1;
	} else {
		return 0;
	}
}


class Matrix {
	constructor(rows, columns) {
		if(rows !== undefined && columns === undefined){
			this.rows = rows;
			this.columns = rows;
		} else {
			this.rows = rows;
			this.columns = columns;
		}

		this.data = [];
		for (var i = 0; i< this.rows; i++){
			this.data.push([]);
			for (var j=0; j< this.columns; j++){
				this.data[i].push(null);
			}
		}

		this.size = this.rows + "x" + this.columns;

	}
	setToValue(val){
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.columns; j++){
				this.data[i][j] = val;
			}
		}
	}
	setToRandom(k,prob){
		if (prob === undefined){
			prob = 1;
		}
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.columns; j++){
				this.data[i][j] = randomInt(k)*conditionalIncludeFactor(prob);
			}
		}
	}
	setToZero(){
		this.setToValue(0);
	}
	setToMax(){
		this.setToValue(Number.MAX_SAFE_INTEGER);
	}
	getMin(){
		var min = Number.MAX_SAFE_INTEGER;
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.columns; j++){
				if (this.data[i][j] !== undefined && this.data[i][j] !== null){
					min = Math.min(min, this.data[i][j]);
				}
			}
		}
		if( min === Number.MAX_SAFE_INTEGER ){
			return null;
		} else {
			return min;
		}
	}
	getMax(){
		var max = Number.MIN_SAFE_INTEGER;
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.columns; j++){
				if (this.data[i][j] !== undefined && this.data[i][j] !== null){
					max = Math.max(max, this.data[i][j]);
				}
			}
		}
		if( max === Number.MIN_SAFE_INTEGER ){
			return null;
		} else {
			return max;
		}
	}
}

class SingleLabelMatrix extends Matrix {
	constructor(maxtrix){
		super(matrix.rows, matrix.columns);
		this.inputData = matrix.data;
		this.buffer = new Matrix(3);
		this.buffer.setToValue(null);
		this.parents = [];
	}
	setBuffer(k,l){
		this.buffer.setToValue(null);
		for (var i = 0; i < 3; i++){
			for (var j = 0; j < 3; j++){
				if ( k-1+i >= 0 && k-1+i <= this.rows -1  && l-1+j >= 0 && l-1+j <= this.columns -1 && this.inputData[k-1+i][l-1+j] === 1){
					this.buffer.data[i][j] = this.parents[this.data[k-1+i][l-1+j]];
				}
			}
		}
	}

	// Set labels Logic:
	// 1. Set buffer to be parents of all nearby cells
	// 2. If the min of the buffer is null
	//		2.1 Set to a new label
	//		2.2 Add that label to the parent list
	// 3. If the min of the buffer is not null, for every discovered nearby element:
	//		3.1 Set the current label to that min.
	//		3.2 Set the parent of the current label to that min.

	setLabels(){
		var log = document.getElementById("log");
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.columns; j++){

				if (this.inputData[i][j] === 1){
					this.setBuffer(i,j);

							// Write to debugging log:
							log.innerHTML += "("+ i + ", " + j +")<br>" +
							"Buffer Before: <br>" +
							this.buffer.data[0][0] + ", " + this.buffer.data[0][1] + ", "  + this.buffer.data[0][2] + "<br>" +
							this.buffer.data[1][0] + ", " + this.buffer.data[1][1] + ", "  + this.buffer.data[1][2] + "<br>" +
							this.buffer.data[2][0] + ", " + this.buffer.data[2][1] + ", "  + this.buffer.data[2][2] + "<br>" +
							"Min Value: <br>" +
							this.buffer.getMin()+
							"<br>Parents: <br>" +
							this.parents
							;

					if (this.buffer.getMin() === null){
						this.data[i][j] = this.parents.length;
						this.parents.push(this.parents.length);
					} else {
						this.data[i][j] = this.parents[this.parents[this.buffer.getMin()]];
						for (var m = 0; m < 3; m++){
							for (var n = 0; n < 3; n++){
								if ( i-1+m >= 0 && i-1+m <= this.rows -1  && j-1+n >= 0 && j-1+n <= this.columns -1 && this.inputData[i-1+m][j-1+n] === 1 && this.data[i-1+m][j-1+n] !== null){
									log.innerHTML += "<br> Parent getting reassigned: <br>";
									log.innerHTML += this.parents[this.data[i-1+m][j-1+n]] + "<br>";
									this.parents[this.data[i-1+m][j-1+n]] = this.parents[this.parents[this.buffer.getMin()]];
								}
							}
						}
					}

					this.setBuffer(i,j);
					log.innerHTML +=
					"<br> This value: <br>" +
					this.data[i][j] +
					"<br> this parent: <br>" +
					this.parents[this.data[i][j]] +
					"<br> Buffer After: <br>" +
					this.buffer.data[0][0] + ", " + this.buffer.data[0][1] + ", "  + this.buffer.data[0][2] + "<br>" +
					this.buffer.data[1][0] + ", " + this.buffer.data[1][1] + ", "  + this.buffer.data[1][2] + "<br>" +
					this.buffer.data[2][0] + ", " + this.buffer.data[2][1] + ", "  + this.buffer.data[2][2] + "<br>" +
					"Min Value: <br>" +
					this.buffer.getMin() +
					"<br>New Parents: <br>" +
					this.parents +
					"<br><br>";
				}
			}
		}
	}
	optimizeParents(){
		for (var i=0; i < this.parents.length; i++){
			while (this.parents[this.parents[i]] !== this.parents[i]){
				this.parents[i] = this.parents[this.parents[i]];
			}
		}
	}
	relabelParents(){
		var uniqueParents = [];
		for (var i=0; i < this.parents.length; i++){
			if(uniqueParents.indexOf(this.parents[i]) === -1){
				uniqueParents.push(this.parents[i])
			}
		}
		for (var i=0; i < this.parents.length; i++){
			this.parents[i] = uniqueParents.indexOf(this.parents[i])
		}
	}
	relabelMatrix(){
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.columns; j++){
				if (this.data[i][j] === null){
					this.data[i][j] = "x";
				} else {
					this.data[i][j] = this.parents[this.data[i][j]];
				}
			}
		}
	}

	// getLabels method consolidates all steps into one and generates final labeled matrix.
	getLabels(){
		this.setLabels();
		this.optimizeParents();
		//this.relabelParents();
		this.relabelMatrix();
		var outputMatrix = new Matrix(this.rows,this.columns);
		outputMatrix.data = this.data;
		return outputMatrix;
	}

}

class ShadedTable {
	constructor(matrix, labelMatrix, cellSize, targetDivId) {
		this.matrix = matrix;
		this.labelMatrix = labelMatrix;
		this.rows = matrix.rows;
		this.columns = matrix.columns;
		this.cellSize = cellSize;
		this.targetDivId = targetDivId;
		this.colorMatrix = new Matrix(matrix.rows,matrix.columns);
		this.HTMLString = "";
	}
	assignColor(){
		var max = this.matrix.getMax();
		var min = this.matrix.getMin();
		for (var i =0; i< this.rows; i++){
			for (var j =0; j< this.columns; j++){
				this.colorMatrix.data[i][j] = 255-100*this.matrix.data[i][j]/(max-min);
			}
		}
	}
	render(){
		this.assignColor();

		for (var i =0; i< this.rows; i++){
			for (var j =0; j< this.columns; j++){
				this.HTMLString += "<div class='cell' id = 'cell' style='width: "+ this.cellSize + "px; height: "+ this.cellSize + "px; background: RGB("+ this.colorMatrix.data[i][j] + ", " + this.colorMatrix.data[i][j] + ", " + this.colorMatrix.data[i][j] + ");'>"+this.labelMatrix.data[i][j]+"</div>"
			}
		}

		var targetDiv = document.getElementById(this.targetDivId);
		targetDiv.style.width = this.columns * this.cellSize;
		targetDiv.innerHTML = this.HTMLString;
	}
}





// Step 2: Testing;
testData2 =
[
[1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0],
[1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1],
[1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0],
[0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1],
[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
[1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
[1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
[0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0],
[1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1],
[0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
[0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0],
[1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0],
[0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
[1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
[1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1],
[1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
[0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0],
[0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
[1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1]
]



var matrix = new Matrix(20,20);
matrix.data = testData2;
//matrix.setToRandom(1,.9)

var l = new SingleLabelMatrix(matrix);
var z = l.getLabels();
var x = new ShadedTable(matrix,z, 25, "display");
x.render();
