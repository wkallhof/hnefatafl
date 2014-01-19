
define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    function Graphics(canvas) {
        if (!(this instanceof Graphics)) {
            throw new TypeError("Graphics constructor cannot be called as a function.");
        }

        if(canvas)
        {
        	this.tileHeight = 64;
        	this.tileWidth = 64;
        	this.pieceSize = 64;
            this.spriteMap = null;
            this.spritePath = "images/game/sprites.png";

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
    	loadGraphics: function(callback)
        {
            this.spriteMap = new Image();
            this.spriteMap.src = this.spritePath;
            this.spriteMap.onload = function () {
                callback();
            };
        },

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
            var offset = fetchPieceSpriteOffset(value);
            this.context.drawImage(this.spriteMap, offset * this.pieceSize, 0, this.pieceSize, this.pieceSize, (x*this.tileWidth), (y*this.tileHeight), this.pieceSize, this.pieceSize);
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
    function loadSpriteSheet()
    {

    };

    function fetchTileFillStyle(value) {
    	switch(value)
    	{
    		case 1 : return 'black';
    		case 2 : return 'white';
    		default : return 'grey';
    	}

    };

    function fetchPieceSpriteOffset(value) {
    	switch(value)
    	{
    		case 2 : return 1; // White Team
            case 3: return 2; // King
    		default : return 0; // Black Team
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