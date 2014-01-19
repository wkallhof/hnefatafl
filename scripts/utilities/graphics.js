
define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    function Graphics(canvas) {
        if (!(this instanceof Graphics)) {
            throw new TypeError("Graphics constructor cannot be called as a function.");
        }

        if(canvas)
        {
        	this.tileHeight = 60;
        	this.tileWidth = 60;
        	this.pieceSize = 20;

        	canvas.get(0).width = this.tileWidth*11;
        	canvas.get(0).height = this.tileHeight*11;

        	this.context = canvas.get(0).getContext("2d"); 	
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
			this.context.rect(x*this.tileWidth,y*this.tileHeight,this.tileWidth,this.tileHeight);
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

        drawHover: function (x,y,value){
        	this.context.beginPath();
			this.context.rect(x*this.tileWidth,y*this.tileHeight,this.tileWidth,this.tileHeight);
			this.context.lineWidth = 3;
			this.context.strokeStyle = 'brown';
			this.context.stroke();
        },
        
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