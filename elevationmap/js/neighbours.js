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
	setValue(val){
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.columns; j++){
				this.data[i][j] = val;
			}
		}
	}
	setRandom(k){
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.columns; j++){
				this.data[i][j] = randomInt(k);
			}
		}
	}
	setZero(){
		this.setValue(0);
	}
	setMax(){
		this.setValue(Number.MAX_SAFE_INTEGER);
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
}

class SingleLabelMatrix extends Matrix {
	constructor(maxtrix){
		super(matrix.rows, matrix.columns);
		this.inputData = matrix.data;
		this.buffer = new Matrix(3);
		this.buffer.setMax();
		this.parents = [];
	}
	setBuffer(k,l){
		this.buffer.setMax();
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



// Step 2: Testing;

var matrix = new Matrix(40);
matrix.setRandom(1);
var l = new SingleLabelMatrix(matrix);
var z = l.getLabels();