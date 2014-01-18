

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
	var graphics = new Graphics(canvas);
	var input = new Input(canvas);

	var state = new GameState();

	input.subscribeToClick(handleInput);
	input.subscribeToHover(handleHover);

	function handleHover(x,y)
	{
		var tileX = graphics.translateX(x);
		var tileY = graphics.translateY(y);
		//state.setActivePiece(tileX, tileY);
	}

	function handleInput(x,y)
	{
		var tileX = graphics.translateX(x);
		var tileY = graphics.translateY(y);
		state.setActivePiece(tileX, tileY);
	}
	
	function run()
	{
		state.draw(graphics);
		graphics.fetchFrame(run);
	}

	run();
});