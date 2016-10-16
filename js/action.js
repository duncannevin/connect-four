window.playBoard = [['-', '-', '-', '-', '-', '-', '-'],
			 		['-', '-', '-', '-', '-', '-', '-'],
			 		['-', '-', '-', '-', '-', '-', '-'],
			 		['-', '-', '-', '-', '-', '-', '-'],
			 		['-', '-', '-', '-', '-', '-', '-'],
			 		['-', '-', '-', '-', '-', '-', '-']];			 	

//document ready...
(() => {

//keeps track of whos turn it is...
let turn = 'red';	

let Play = (board) => {

	this.board = $(board);	

	this.boardBuilder = () => {

		let count = 1;//gives each square a unique number.

		for(let i = 0; i <= 5; i++){
			this.board.append('<div class="row r' + i + '"></div>');
			for(var j = 0; j <= 6; j++){
				$('.r' + i).append('<div class="square s' + i + j + '"><div class="circle"></div></div>');
				if(i === 0){
					//adding droppable to all the first rows squares...
					$('.s' + i + j).droppable({
						drop: function(event, ui){
							dropToken(this, event);
						}
					});
				}
				count++;
			}
		}	
	};
		//function that appends the tokens to board. which is which token is to be added...
	this.appendTokens = (which) => {

		let tokens = {
			red: '<div class="token red"></div>',
			blue: '<div class="token blue"></div>'
		};

		if(which === null){
			_.each(tokens, (node) => {
				this.board.append(node);
			});
		}else{
			this.board.append(tokens[which]);
		}	
		$('.token').draggable({
			revert: 'invalid',
		});	
	};	
	//function fills in the board and calls the validator...
	this.updateBoard = (player, position) => {
		playBoard[position[0]][position[1]] = player;
		console.log(playBoard);
	};	
	//function gets finds the last available div in the column...
	this.getLast = (start) => {
		//helper function to send updateBoard the correct info...
		let update = (pos) => {
			this.updateBoard(turn.split('').shift().toUpperCase(), pos)
		};

		let i = 0;

		for(i; i <= 5; i++){
			if(playBoard[i][start[1]] !== '-'){
				//updates gameboard with data...
				update([i - 1, start[1]]);
				return [i - 1, start[1]];
			}
		}
		//updates gameboard with data...
		update([i - 1, start[1]]);
		return [i - 1, start[1]];
	};	 	

	this.dropToken = (dis, ev) => {
		//grabs to correct data for the first square, essentially where the token was placed...
		let dropPoint = dis.classList[1].split('').splice(1).map(Number);
		//get the bottom most available div...
		let bottomDiv = this.getLast(dropPoint);
		// grabs the location for the start div...
		let begin = $('.s' + dropPoint.join('')).position();
		//left didn't quite line up correctly...
		begin.left = begin.left + 5;
		// grabs the location of the last div...
		let end = $('.s' + bottomDiv.join('')).position();//will need to alter this later....
		//function that resets everything on the board after the animation is finished...
		let reset = () => {
			//changing background color of end to appropriate color...
			$('.s5' + dropPoint[1]).css({'background-color': turn});
			//resets whos turn it is...
			turn = turn === 'red' ? 'blue' : 'red';
		};
		//animates the token dropping...
		(function recur (){	
			$('.' + turn).css({top: begin.top, left: begin.left});
			
			if(begin.top === end.top){
				this.appendTokens(turn);
				reset();
				return;	
			}	
			begin.top += 1;
			setTimeout(recur, 3);
		})()
	};

	return this;
};				 	

var make = Play('.board');
make.boardBuilder();
make.appendTokens(null);

	
})(window);	







