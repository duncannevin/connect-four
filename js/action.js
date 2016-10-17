//document ready...
(() => {

	let control = () => {

		let playBoard = [['-', '-', '-', '-', '-', '-', '-'],
			 		  	 ['-', '-', '-', '-', '-', '-', '-'],
			 		 	 ['-', '-', '-', '-', '-', '-', '-'],
			 		 	 ['-', '-', '-', '-', '-', '-', '-'],
			 		 	 ['-', '-', '-', '-', '-', '-', '-'],
			 		 	 ['-', '-', '-', '-', '-', '-', '-']];

		return function(){
			let obj = {};

			obj.board = playBoard;
			obj.update = (ind1, ind2, value) => {
				playBoard[ind1][ind2] = value;
			};
			obj.val = function(){
				console.log(validate.call(this, playBoard));
			}

			return obj;
		}	 		 	 
	}
			 		 	 

	let play = (board) => {
		//keeps track of whos turn it is...
		let turn = 'red';

		let $board = $(board);

		let bControl = control();

		let current = bControl();

		let playBoard = current.board.slice(0);
		//function that controls if a token is daraggable...
		let controlDrag = () => {
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
		//function that builds the board...
		let boardBuilder = () => {
			for(let i = 0; i <= 5; i++){
				$board.append('<div class="row r' + i + '"></div>');
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
			$board.prepend('<div class="row invisible"></div>');
		};
		//function that appends the tokens to board. which is which token is to be added...
		let appendTokens = (which) => {
			//object conataining the token divs...
			let tokens = {
				red: '<div class="token red"></div>',
				blue: '<div class="token blue"></div>'
			};	
			//if null is passed in append both sets of tokens...
			if(which === null){
				_.each(tokens, (node) => {
					$board.append(node);
				});
			}else{
				//else append the color that was passed in...
				$board.append(tokens[which]);
			}	
			//initially sets the first player as the only token then is draggable...
			controlDrag();	
		};	
		//function gets finds the last available div in the column...
		let getLast = (start) => {
			//helper function to send updateBoard the correct info...
			let update = (pos) => {
				// this.updateBoard(turn, pos);
				current.update(pos[0], pos[1], turn.split('').shift().toUpperCase());
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
		let reset = (div) => {
			//changes the circles background color to the appropriate color so that the token can be appended...
			$('.c' + div.join('')).addClass('back-ground-' + turn);
			//resets whos turn it is...
			turn = turn === 'red' ? 'blue' : 'red';
			//reset draggable...
			controlDrag();
		};	 	
		//function handles a token drop once it is in the droppable div...
		let dropToken = (dis, ev) => {
			//grabs the correct data for the first square, essentially which div the token was placed...
			let dropPoint = dis.classList[1].split('').splice(1).map(Number);
			//get the bottom most available div...
			let bottomDiv = getLast(dropPoint);
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
					appendTokens(turn);
					//resets board...
					reset(bottomDiv.slice());
					//runs the validator...
					current.val(playBoard);
					return;	
				}
				//adds one to the top position each iteration...	
				begin.top += 1;
				//controls time between iteration...
				setTimeout(recur, 3);
			})()
		};
		boardBuilder();
		appendTokens(null);
	};				 	

	play('.board');
	
})(window);	







