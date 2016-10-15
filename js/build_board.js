let BoardBuilder = (board) => {

	this.board = $(board);

	this.appendSquares = () => {
		let count = 1;//gives each square a unique number.
		for(let i = 0; i <= 5; i++){
			this.board.append('<div class="row r' + i + '"></div>');
			for(var j = 0; j <= 6; j++){
				$('.r' + i).append('<div class="square s' + j + '"><div class="circle"></div></div>');
				count++;
			}
		}	
	};

	return this;
};

let game = BoardBuilder('.board');

game.appendSquares();
