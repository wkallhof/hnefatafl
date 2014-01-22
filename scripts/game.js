

require.config({
    paths: {
        'jQuery': 'lib/jquery',
        'lodash': 'lib/lodash'
    },
    shim: {
        'jQuery': { exports: '$'},
        'lodash': { exports: '_'}
    }
});

define(function(require){

	var $ = require("jQuery");
	var Graphics = require("utilities/graphics");
	var Input = require("utilities/input");
	var GameBoard = require("models/gameboard");
	var GameState = require("models/gamestate");

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