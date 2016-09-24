var validate = function(board){
	//write a function that will take an array of unknown length
	var check = function(reorgBoard){
		//declare a variable called count, start the value at 0...
		var count = {
			y: 0,
			r: 0,
			totalCount: 0,
			winner: false
		};
		reorgBoard.forEach((arr, ind, coll)=>{
			arr.forEach((val, ind, coll2)=>{
				if(val === 'Y'){
					count.y++;
					count.r = 0;
					count.totalCount++;
				}else if(val === 'R'){
					count.r++;
					count.y = 0;
					count.totalCount++;
				}else{
					count.y = 0;
					count.r = 0;
				}
				if(count.r === 4 || count.y === 4){
					count.winner = count.y === 4 ? 'Y' : 'R';
					coll.length = 0;
					coll2.length = 0;
				}
			});
			count.r = 0;
			count.y = 0;
		});
		if(count.winner){
			return count.winner;
		}else{
			return count.totalCount;
		}	
	};
	//write a function that converts all the vertical columns into horizontal sub arrays...
	var convertColumns = function(board){
		//declare a variable and assign it an empty string...
		var solution = [];
		// board[0].forEach((val, ind, coll)=>{solution.push([])});
		for(var i = 0; i < board.length; i++){
			for(var j = 0; j < board[i].length; j++){
			if(solution[j] === undefined){
				solution.push([]);
			}
				solution[j].push(board[i][j]);
			}
		}
		// return check(solution);
		return check(solution);	
	};
	//write a function that converts diagnols into horizontal arrays...
	var convertDiags = function(board){
		//declare acounter variable in order to add the correct amount of extra indexes to the front of the
		//array...
		var count = 6;
		//declare a variable and assign it sliced board...
		//implement map on the board...
		var shiftArray = board.slice().map((arr, ind, coll)=>{
			//use a for loop to add a '-' to the front half of the array...
			for(var i = 1; i <= count; i++){
				arr.splice(0, 0, '-')
			}
			count--;
			return arr;
		});
		//return shiftarray, converted to using convertColumns....
		return convertColumns(shiftArray);
	};
	//declare a variable that contains an array contianing each possible directions...
	//I want to loop through all the possible winning patterns, if one of them mins I want to return and end the function call...

	var funcs = [check/*horizontal*/, convertColumns/*vertical*/, convertDiags/*diagright*/, convertDiags/*diagleft*/];
	var winOrNot;
	// // implement a forEach loop that loops through the functions, passing in the appropriate argument...
	funcs.forEach((func, ind, coll)=>{
		var runIt = ind < coll.length-1 ? func(board) : func(board.map((arr)=>{return arr.reverse()}));
		if(typeof runIt !== 'number'){
			winOrNot = runIt;
			coll.length = 0;
		}else{
			winOrNot = runIt;
		}	
	});
	if(typeof winOrNot !== 'number'){
		return winOrNot;
	}else{
		return winOrNot >= 42 ? 'draw' : 'in progress';
	}
}; 
