
define(["jQuery"], function ($) {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    function Input(canvas) {
        if (!(this instanceof Input)) {
            throw new TypeError("Input constructor cannot be called as a function.");
        }

        if(canvas)
        {
            this.clickSubscribers = [];
        	this.canvas = canvas;
        	this.width = canvas.width;
        	this.height = canvas.height;
            bindClick(this);
        }
    }


    /*------------------------------------------
    |            PUBLIC METHODS                |
    -------------------------------------------*/
 
    Input.prototype = {
    	
    	constructor: Input,
    	
        subscribeToClick: function (callback) {
            this.clickSubscribers.push(callback);
        }
    };

    /*------------------------------------------
    |            PRIVATE METHODS                |
    -------------------------------------------*/
    function bindClick(input)
    {
        input.canvas.on('click',function(e)
        {
            for(var i = 0; i < input.clickSubscribers.length; i++)
            {
                var x = (e.pageX-input.canvas.offset().left);
                var y = (e.pageY-input.canvas.offset().top);
                input.clickSubscribers[i](x,y);
            }
        });
    }
    return Input;
});