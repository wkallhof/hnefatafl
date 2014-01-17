
define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    function Graphics(canvas) {
        if (!(this instanceof Graphics)) {
            throw new TypeError("Graphics constructor cannot be called as a function.");
        }

        if(canvas)
        {
        	this.context = canvas.get(0).getContext("2d");
        	this.width = canvas.width;
        	this.height = canvas.height;
        	this.tileHeight = 32;
        	this.tileWidth = 32;
        	this.pieceSize = 10;
        }
    }
 
    Graphics.STATIC_PROPERTY = false;
 
    Graphics.publicStaticMethod = function () {
        //return something
    };
 


    /*------------------------------------------
    |            PUBLIC METHODS                |
    -------------------------------------------*/
 
    Graphics.prototype = {
    	
    	constructor: Graphics,
    	
        drawTile: function (x,y,value) {
            this.context.beginPath();
			this.context.rect(x*this.tileWidth,y*this.tileHeight,x+this.tileWidth,y+this.tileHeight);
			this.context.fillStyle = fetchTileFillStyle(value);
			this.context.fill();
			this.context.lineWidth = 2;
			this.context.strokeStyle = 'black';
			this.context.stroke();
        },

        drawPiece: function (x,y,value) {
        	if(value == 0) return;

        	var centerX = (x*this.tileWidth)+(this.tileWidth/2);
        	var centerY = (y*this.tileHeight)+(this.tileHeight/2);
			this.context.beginPath();
			this.context.arc(centerX, centerY , this.pieceSize, 0, 2 * Math.PI, false);
			this.context.fillStyle = fetchPieceFillStyle(value);
			this.context.fill();
			this.context.lineWidth = 1;
			this.context.strokeStyle = 'black';
			this.context.stroke();
        },

        // shim layer with setTimeout fallback
		fetchFrame : function (callback){
		  return  requestAnimFrame(callback);
		},

		translateX : function (x) { return Math.floor(x / this.tileWidth); },

		translateY : function (y) { return Math.floor(y / this.tileHeight); }
    };

    /*------------------------------------------
    |            PRIVATE METHODS                |
    -------------------------------------------*/
    function fetchTileFillStyle(value) {
    	switch(value)
    	{
    		case 1 : return 'black';
    		case 2 : return 'white';
    		default : return 'grey';
    	}

    };

    function fetchPieceFillStyle(value) {
    	switch(value)
    	{
    		case 2 : return 'white';
    		default : return 'grey';
    	}

    };


    var requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
	})();
    return Graphics;
});