var _ = require('lodash');				

//create a constructor function that takes a multiemensional board...
var Validate = function(board) {
	this.board = board;
	return this;
};
//a function that iterates through sortedBoard to see if there are any 
//four in a row, if this is the case will return the winner...
Validate.prototype.checkIt = function(board){
	//declare a variable and assign it a filtered version of the adjusted board, filter out
	//any arr that does not contain 'Y' or 'R'...
	var prepBoard = board.filter((arr) => {
		arr = _.pull(arr, '-');
		if(arr.length >= 4)return arr;
	});

	var winners = [];

	_.each(prepBoard, (arr) => {
		var totalY = 0;
		var totalR = 0;

		_.each(arr, (val) => {
			if(val === 'Y')totalY++;
			if(val === 'R')totalR++;
		});	

		if(totalY >= 4)winners.push('Y');
		if(totalR >= 4)winners.push('R');
	});

	return winners;
};
//add a function that will convert all columns into horizontal arrays...
Validate.prototype.horiZise = function(board){
	var solution = [];
	_.each(board, (arr, ind, coll)=>{
		for(var i = 0; i < arr.length; i++){
			if(!solution[i]){solution.push([])}
			solution[i].push(arr[i]);
		}
	});
	return solution;
};
//add a method that will add the appropriate extra indexes to each sub array, does both diag directions at one time
//and compines them into on bigger array...
Validate.prototype.shiftEm = function(board){
	var count = 6;
	var bLeft = [];
	var bRight = [];
	//using each to iterate the subarrays, will push the outcome to the appropriate array... 
	_.each(board.slice(), (arr, ind, coll)=>{
		//declaring a function to iterate over sub array...
		var iterate = function(z){
			var f = z;
			//use a for loop to add the spaces...
			for(var i = 0; i < count; i++){
				f.splice(0, 0, '-');
			}
			return f;
		}	
		bLeft.push(iterate(arr.slice()));
		bRight.push(iterate(arr.slice().reverse()));
		count--;
	});
	return this.horiZise(bLeft).concat(this.horiZise(bRight));
};
//getter that converts diagnols, columns, and horizontals into only arrays contianing 4 r's or y's...
Object.defineProperty(Validate.prototype, 'sorted', {
	get: function(){
		var diagnols = this.checkIt(this.shiftEm(this.board.slice()));
		var columns = this.checkIt(this.horiZise(this.board.slice()));
		var horizontal = this.checkIt(this.board.slice());

		return [diagnols, columns, horizontal];
	}
}); 
//add a prototype that announces who the winner is or if it is a tie...
Validate.prototype.weHaveAWinner = function(){
	var checked = _.filter(this.sorted, (arr) => {
		if(arr.length)return arr;
	});
	
	return _.flatten(checked);
};

var gameOn = new Validate(playBoard);
console.log(gameOn.weHaveAWinner());






















