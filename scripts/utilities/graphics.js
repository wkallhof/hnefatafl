
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
			this.context.fillStyle = 'grey';
			this.context.fill();
			this.context.lineWidth = 2;
			this.context.strokeStyle = 'black';
			this.context.stroke();
        },

        // shim layer with setTimeout fallback
		fetchFrame : function (callback){
		  return  requestAnimFrame(callback);
		}
    };

    /*------------------------------------------
    |            PRIVATE METHODS                |
    -------------------------------------------*/
    function privateMethod(object) {

    };

    var requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
	})();
    return Graphics;
});