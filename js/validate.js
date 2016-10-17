let validate = function(inB) {

	let board = inB.slice(0);

	let r = 0;

	let b = 0;

	let winner = false;

	//utility function that checks the value and updates the correct values...
	let checker = (val) => {

		if(val !== '-'){
			if(val === 'B'){
				b++;
				r = 0;
			}
			if(val === 'R'){
				r++;
				b = 0;
			}
			if(r === 4 || b === 4){
				winner = r > b ? 'R' : 'B';
			}
		}else{
			r = 0;
			b = 0;
		}
	};

	//a function that iterates over the board from left to righ checking for winners...
	let horizontal = (board) => {
		_.each(board, (arr) => {
			_.each(arr, (val) => {
				//call checker...
				checker(val);
			});
		});
		return winner;
	};

	//add a function that will check all the columns for winners...
	let columns = (board) => {
		//declare a varaible and assigin it zero, this will be to track which column we are checking...
		let columnInd = 0;
		//write a recursive function that will iterate through each sub array...
		(function recur(){
			//write a base cast that checks if ind === 6, then return....
			if(columnInd === board[0].length)return;
			//iterate over the arrays checking if ind in each array...
			_.each(board, (arr, ind, coll) => {
				checker(board[ind][columnInd]);
			});
			columnInd++;
			recur();
		})()

		return winner;
	};

	// //add a method that will add the appropriate extra indexes to each sub array, does both diag directions at one time
	// //and compines them into on bigger array...
	let diagnols = function(board){
		let count = 6;
		let bLeft = [];
		let bRight = [];
		let square = (arr) => {
			return _.map(arr, (arr, ind, coll) => {
					for(let i = arr.length; i < coll[0].length; i++){
						arr.push('-')
					}
					return arr;
			});
		};		 
		// using each to iterate the subarrays, will push the outcome to the appropriate array... 
		_.each(board.slice(0), (arr, ind, coll)=>{
			//declaring a function to iterate over sub array...
			let iterate = (z) => {
				let f = z;
				//use a for loop to add the spaces...
				for(let i = 0; i < count; i++){
					f.splice(0, 0, '-');
				}
				return f;
			}
			count--;
			bLeft.push(iterate(arr.slice()));
			bRight.push(iterate(arr.slice().reverse()));
		});	
		//comgining both diagnol boards into one...
		let combined = _.reduce(square(bRight), (both, arr, ind, coll) => {
			both.push(arr);
			return both;
		}, square(bLeft));
		//call and return columns on comined
		return columns(combined);
	};

	if(horizontal(board)){
		return winner;
	}else if(columns(board)){
		return winner;
	}else if(diagnols(board)){
		return winner;
	}
	
};




























