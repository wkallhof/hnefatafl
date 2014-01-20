
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

            this.borderWidth = 25;

        	this.pieceHeight = 80;
            this.pieceWidth = 45;
            this.pieceHeightOffset = -19;
            this.pieceWidthOffset = 8;

            this.spriteCropHeight = 80;
            this.spriteCropWidth = 45;
            this.spriteMap = null;
            this.spritePath = "images/game/spritesheet.png";

            this.canvasWidth = (this.tileWidth*11)+(2*this.borderWidth);
            this.cavnasHeight = (this.tileHeight*11)+(2*this.borderWidth);

        	canvas.get(0).width = this.canvasWidth;
        	canvas.get(0).height = this.cavnasHeight;

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
            var coords = fetchCanvasCoordsByTileCoords(x,y,this);

            this.context.beginPath();
			this.context.rect(coords.x,coords.y,this.tileWidth,this.tileHeight);
			this.context.fillStyle = fetchTileFillStyle(value);
			this.context.fill();
			this.context.lineWidth = 2;
			this.context.strokeStyle = 'black';
			this.context.stroke();
        },

        drawPiece: function (x,y,value) {
         	if(value == 0) return;

            var coords = fetchCanvasCoordsByTileCoords(x,y,this);
            var offset = fetchPieceSpriteOffset(value);
            this.context.drawImage(
                this.spriteMap, //Image to draw
                offset * this.spriteCropWidth, //crop x
                0, //crop y
                this.spriteCropWidth, //crop width
                this.spriteCropHeight, //crop height
                coords.x+this.pieceWidthOffset, //draw x
                coords.y+this.pieceHeightOffset, //draw y
                this.pieceWidth, //draw width
                this.pieceHeight //draw height
                );
        },

        drawHover: function (x,y,value){
            var coords = fetchCanvasCoordsByTileCoords(x,y,this);

        	this.context.beginPath();
			this.context.rect(coords.x,coords.y,this.tileWidth,this.tileHeight);
			this.context.lineWidth = 3;
			this.context.strokeStyle = 'brown';
			this.context.stroke();
        },

        clearScreen: function(){
            this.context.beginPath();
            this.context.rect(0,0,this.canvasWidth,this.cavnasHeight);
            this.context.fillStyle = '#755533';
            this.context.fill();
            this.context.lineWidth = 2;
            this.context.strokeStyle = '#523B24';
            this.context.stroke();
        },
        
		fetchFrame : function (callback){
		  return  requestAnimFrame(callback);
		},

		translateX : function (x) { return Math.floor((x - this.borderWidth) / this.tileWidth); },

		translateY : function (y) { return Math.floor((y - this.borderWidth) / this.tileHeight); }
    };

    /*------------------------------------------
    |            PRIVATE METHODS                |
    -------------------------------------------*/
    function fetchCanvasCoordsByTileCoords(x,y,graphics)
    {
        return {
            x:graphics.borderWidth + (x*graphics.tileWidth),
            y:graphics.borderWidth + (y*graphics.tileHeight)
        }
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