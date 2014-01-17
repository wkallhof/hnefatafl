

require.config({
    paths: {
        'jQuery': 'lib/jquery'
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});


define(["jQuery", "utilities/graphics", "models/gameboard", "models/gamestate"], function($,Graphics,GameBoard,GameState) {
	"use strict";
	var graphics = new Graphics($("#canvas"));
	var gameBoard = new GameBoard();
	var state = new GameState();
	
	function run()
	{
		gameBoard.draw(graphics);
		state.draw(graphics);
		graphics.fetchFrame(run);

	}

	run();
});