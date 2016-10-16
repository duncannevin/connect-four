   let playBoard = [['-', '-', '-', '-', '-', '-', '-'],
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

		for(let i = 0; i <= 5; i++){
			this.board.append('<div class="row r' + i + '"></div>');
			for(let j = 0; j <= 6; j++){
				$('.r' + i).append('<div class="square s' + i + j + '"><div class="circle c' + i + j + '"></div></div>');
				if(i === 0){
					//adding droppable to all the first rows squares...
					$('.s' + i + j).droppable({
						drop: function(event, ui){
							dropToken(this, event);
						}
					});
				}
			}
		}
		this.board.prepend('<div class="row invisible"></div>');
	
	};
	//function that appends the tokens to board. which is which token is to be added...
	this.appendTokens = (which) => {
		//object conataining the token divs...
		let tokens = {
			red: '<div class="token red"></div>',
			blue: '<div class="token blue"></div>'
		};
		//function to control the revert for draggable...
		let controlDrag = (who) => {
			
		};	
		//if null is passed in append both sets of tokens...
		if(which === null){
			_.each(tokens, (node) => {
				this.board.append(node);
			});
		}else{
			//else append the color that was passed in...
			this.board.append(tokens[which]);
		}	
		//initially sets the first player as the only token then is draggable...
		this.controlDrag();	
	};	
	//function fills in the board and calls the validator...
	this.updateBoard = (player, position) => {
		//adds correct value to the playboard...
		playBoard[position[0]][position[1]] = player;

		//call the validator to check the game status...

	};	
	//function that controls if a token is daraggable...
	this.controlDrag = () => {
		//determine which class should be disabled...
		let disable = turn === 'red' ? 'blue' : 'red';
		//disable draggable...
		$('.' + disable).draggable({disabled: true});
		//removes draggable from player...	
		$('.' + turn).draggable({
			disabled: false,
			revert: 'invalid'
		});
	};
	//function gets finds the last available div in the column...
	this.getLast = (start) => {
		//helper function to send updateBoard the correct info...
		let update = (pos) => {
			this.updateBoard(turn.split('').shift().toUpperCase(), pos)
		};

		let i = 0;
		//iterates through the play board and looks for the first available spot below dropped token...
		for(i; i < playBoard.length; i++){
			if(playBoard[i][start[1]] !== '-'){
				//updates gameboard with data...
				update([i - 1, start[1]]);
				return [i - 1, start[1]];
			}
		}
		//updates gameboard with data...
		update([i - 1, start[1]]);
		//returns the available spaces coordinates...
		return [i - 1, start[1]];
	};
	//function that resets everything on the board after the animation is finished...
	this.reset = (div) => {
		//changes the circles background color to the appropriate color so that the token can be appended...
		$('.c' + div.join('')).addClass('back-ground-' + turn);
		//resets whos turn it is...
		turn = turn === 'red' ? 'blue' : 'red';
		//reset draggable...
		this.controlDrag();
	};	 	
	//function handles a token drop once it is in the droppable div...
	this.dropToken = (dis, ev) => {
		//grabs the correct data for the first square, essentially which div the token was placed...
		let dropPoint = dis.classList[1].split('').splice(1).map(Number);
		//get the bottom most available div...
		let bottomDiv = this.getLast(dropPoint);
		// grabs the position of the start div...
		let begin = $('.s' + dropPoint.join('')).position();
		//left didn't quite line up correctly...
		begin.left = begin.left + 5;
		// grabs the position of the bottom most available div...
		let end = $('.s' + bottomDiv.join('')).position();
		//animates the token dropping...
		(function recur (){	
			//changes the location using jquery css...
			$('.' + turn).css({top: begin.top, left: begin.left});
			//base case...
			if(begin.top === end.top){
				//adds new token for the next round...
				this.appendTokens(turn);
				//resets board...
				this.reset(bottomDiv.slice());
				return;	
			}
			//adds one to the top position each iteration...	
			begin.top += 1;
			//controls time between iteration...
			setTimeout(recur, 3);
		})()
	};

	return this;
};				 	

var make = Play('.board');
make.boardBuilder();
make.appendTokens(null);

	
})(window);	







