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
		this.buffer.setToMax();
		this.parents = [];
	}
	setBuffer(k,l){
		this.buffer.setToMax();
		for (var i = 0; i < 3; i++){
			for (var j = 0; j < 3; j++){
				if ( k-1+i >= 0 && k-1+i <= this.rows -1  && l-1+j >= 0 && l-1+j <= this.columns -1 ){
					this.buffer.data[i][j] = this.data[k-1+i][l-1+j];
				}
			}
		}
	}
	setLabels(){
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.columns; j++){
				if (this.inputData[i][j] === 1){
					this.setBuffer(i,j);
					if (this.buffer.getMin() === null){
						this.data[i][j] = this.parents.length;
						this.parents.push(this.parents.length);
					} else {
						this.data[i][j] = this.parents[this.buffer.getMin()];

						for (var m = 0; m < 3; m++){
							for (var n = 0; n < 3; n++){
								if ( i-1+m >= 0 && i-1+m <= this.rows -1  && j-1+n >= 0 && j-1+n <= this.columns -1 && this.inputData[i-1+m][j-1+n] === 1 && this.data[i-1+m][j-1+n] !== null){
									this.parents[this.data[i-1+m][j-1+n]] = this.buffer.getMin();
								}
							}
						}
					}
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
					this.data[i][j] = 0;
				} else {
					this.data[i][j] = this.parents[this.data[i][j]]+1;
				}
			}
		}
	}

	// getLabels method consolidates all steps into one and generates final labeled matrix.
	getLabels(){
		this.setLabels();
		this.optimizeParents();
		this.relabelParents();
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
				console.log();
				this.HTMLString += "<div class='cell' id = 'cell' style='width: "+ this.cellSize + "px; height: "+ this.cellSize + "px; background: RGB("+ this.colorMatrix.data[i][j] + ", " + this.colorMatrix.data[i][j] + ", " + this.colorMatrix.data[i][j] + ");'>"+this.labelMatrix.data[i][j]+"</div>"
			}
		}

		var targetDiv = document.getElementById(this.targetDivId);
		targetDiv.style.width = this.columns * this.cellSize;
		targetDiv.innerHTML = this.HTMLString;
	}
}





// Step 2: Testing;

var matrix = new Matrix(15,20);
matrix.setToRandom(1,0.8);
var l = new SingleLabelMatrix(matrix);
var z = l.getLabels();
var x = new ShadedTable(matrix,z, 25, "display");
x.render();

/// Stil infrequent error in labels - most likely in the parent reassingnment process;