
define(function (require) {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    var Anim = require("Utilities/Anim");

    function Graphics(canvas) {
        if (!(this instanceof Graphics)) {
            throw new TypeError("Graphics constructor cannot be called as a function.");
        }

        if(canvas)
        {
        	this.tileHeight = 64;
        	this.tileWidth = 64;

            this.borderWidth = 25;

            this.tweens = [];

        	this.pieceHeight = 80;
            this.pieceWidth = 45;
            this.pieceHeightOffset = -19;
            this.pieceWidthOffset = 8;

            this.spriteCropHeight = 80;
            this.spriteCropWidth = 45;
            this.spriteMap = null;
            this.spritePath = "images/game/spritesheet.png";

            this.moveTween = null;

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

        update: function()
        {
            _.remove(this.tweens, {"finished":true});

            _.forEach(this.tweens, function(tween) { tween.tick();});
        },

        drawTile: function (x,y,value) {
            var point = fetchCanvasPointByTilePoint(x,y,this);

            this.context.beginPath();
			this.context.rect(point.x,point.y,this.tileWidth,this.tileHeight);
			this.context.fillStyle = fetchTileFillStyle(value);
			this.context.fill();
			this.context.lineWidth = 2;
			this.context.strokeStyle = 'black';
			this.context.stroke();
        },

        drawPiece: function (piece) {
         	if(piece.value == 0) return;

            //Grab draw point from either a tween or tile point
            var point = isMoveTween(this.moveTween,piece) ?
                //Get draw point from current animation
                this.moveTween.tick():
                //Get draw point by tile point
                fetchCanvasPointByTilePoint(piece.x,piece.y,this);

            //Fetch spritesheet offset
            var offset = fetchPieceSpriteOffset(piece.type);

            //Draw image
            this.context.drawImage(
                this.spriteMap, //Image to draw
                offset * this.spriteCropWidth, //crop x
                0, //crop y
                this.spriteCropWidth, //crop width
                this.spriteCropHeight, //crop height
                point.x+this.pieceWidthOffset, //draw x
                point.y+this.pieceHeightOffset, //draw y
                this.pieceWidth, //draw width
                this.pieceHeight //draw height
            );
        },

        drawHover: function (x,y,value){
            var point = fetchCanvasPointByTilePoint(x,y,this);

        	this.context.beginPath();
			this.context.rect(point.x,point.y,this.tileWidth,this.tileHeight);
			this.context.lineWidth = 3;
			this.context.strokeStyle = 'brown';
			this.context.stroke();
        },

        movePiece: function(piece,x,y){
            var startPoint = fetchCanvasPointByTilePoint(piece.x, piece.y, this);
            var endPoint = fetchCanvasPointByTilePoint(x,y,this);
            
            this.moveTween = Anim.movePiece(piece.id,startPoint,endPoint);
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
        
		fetchFrame : function (callback){ return  requestAnimFrame(callback); },

		translateX : function (x) { return Math.floor((x - this.borderWidth) / this.tileWidth); },

		translateY : function (y) { return Math.floor((y - this.borderWidth) / this.tileHeight); }
    };

    /*------------------------------------------
    |            PRIVATE METHODS                |
    -------------------------------------------*/
    function isMoveTween(tween, piece)
    {
        return tween && tween.id == piece.id && !tween.finished;
    }

    function fetchCanvasPointByTilePoint(x,y,graphics)
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