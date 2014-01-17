

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


define(["jQuery", "utilities/graphics", "models/gameboard", 
	"models/gamestate", "utilities/input"], function($, Graphics, GameBoard, GameState, Input) {

	"use strict";
	var canvas = $("#canvas");
	var graphics = new Graphics(canvas);
	var input = new Input(canvas);

	var gameBoard = new GameBoard();
	var state = new GameState();

	input.subscribeToClick(handleInput);

	function handleInput(x,y)
	{
		var tileX = graphics.translateX(x);
		var tileY = graphics.translateY(y);
		gameBoard.handleClick(tileX,tileY);
	}
	
	function run()
	{
		gameBoard.draw(graphics);
		state.draw(graphics);
		graphics.fetchFrame(run);
	}

	run();
});