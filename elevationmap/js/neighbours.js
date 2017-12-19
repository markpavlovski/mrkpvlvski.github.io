/* 
Goal: Implement https://www.codeproject.com/Articles/336915/Connected-Component-Labeling-Algorithm
use Union Find algorithm: http://www.cs.duke.edu/courses/cps100e/fall09/notes/UnionFind.pdf

This is a simplified problem with only one non-background elevation

*/


// Step 1: Define Helper Classes and Functions;
function randomInt(a,b){
	if ( b === undefined ){
		b = a;
		a = 0;
	}
	return a + Math.floor(Math.random()*(b +1 -a));
}
//console.log(randomInt(4,5));

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
	setZero(){
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.columns; j++){
				this.data[i][j] = 0;
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

}
//console.log(matrix.data)

// Step 2: Generate input matrix and define core data structures;

var matrix = new Matrix(10,10);
matrix.setRandom(1);

var labelMatrix = new Matrix(matrix.rows,matrix.columns);
var neighbourLabelBuffer = new Matrix(3);

var labels = [];
var labelParents = [];

var labelIndex = 0;


// Step 3: Set up core methods;

getNeighbourLabels = function(matrix,k,l){
	buffer = new Matrix(3);
	for (var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++){
			buffer.data[i][j] = matrix.data[k-1+i][l-1+j];
		}
	}
	buffer.data[1][1] = null;
	return buffer.data;
}

console.log(matrix.data)
console.log(getNeighbourLabels(matrix,1,1))