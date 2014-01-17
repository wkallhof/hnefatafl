

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


define(["jQuery", "utilities/graphics", "models/gameboard"], function($,Graphics,GameBoard) {
	"use strict";
	var graphics = new Graphics($("#canvas"));
	var gameBoard = new GameBoard();
	
	function run()
	{
		gameBoard.draw(graphics);

		graphics.fetchFrame(run);

	}

	run();
});