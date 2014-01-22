

require.config({
    paths: {
        'jQuery': 'Lib/jquery',
        'lodash': 'Lib/lodash'
    },
    shim: {
        'jQuery': { exports: '$'},
        'lodash': { exports: '_'}
    }
});

define(function(require){

	var $ = require("jQuery");
	var Graphics = require("Utilities/graphics");
	var Input = require("Utilities/Input");
	var GameBoard = require("Models/GameBoard");
	var GameState = require("Models/GameState");

	"use strict";
	var canvas = $("#canvas");
	canvas.on('contextmenu',function(){ return false;});
	
	var graphics = new Graphics(canvas);
	var input = new Input(canvas);
	var state = new GameState(graphics);

	input.subscribeToClick(handleInput);

	function handleInput(x,y,button)
	{
		var tileX = graphics.translateX(x);
		var tileY = graphics.translateY(y);
		state.handleClick(tileX, tileY, button);
	}
	
	function run()
	{
		//Update graphics
		graphics.update();
		//Clear the screen
		graphics.clearScreen();
		//Draw the game state / board
		state.draw();
		//Fetch a new frame
		graphics.fetchFrame(run);
	}

	graphics.loadGraphics(function()
	{
		run();
	});
	
});