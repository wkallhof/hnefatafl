
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
            this.hoverSubscribers = [];
        	this.canvas = canvas;
        	this.width = canvas.width;
        	this.height = canvas.height;
            bindClick(this);
            bindHover(this);
        }
    }


    /*------------------------------------------
    |            PUBLIC METHODS                |
    -------------------------------------------*/
 
    Input.prototype = {
    	
    	constructor: Input,
    	
        subscribeToClick: function (callback) {
            this.clickSubscribers.push(callback);
        },

        subscribeToHover: function (callback){
            this.hoverSubscribers.push(callback);
        }
    };

    /*------------------------------------------
    |            PRIVATE METHODS                |
    -------------------------------------------*/
    function bindClick(input)
    {
        input.canvas.on('mousedown',function(e)
        {
            for(var i = 0; i < input.clickSubscribers.length; i++)
            {
                var x = (e.pageX-input.canvas.offset().left);
                var y = (e.pageY-input.canvas.offset().top);
                input.clickSubscribers[i](x,y,e.button);
            }
        });
    }

    function bindHover(input)
    {
        input.canvas.on('mousemove',function(e)
        {
            for(var i = 0; i < input.hoverSubscribers.length; i++)
            {
                var x = (e.pageX-input.canvas.offset().left);
                var y = (e.pageY-input.canvas.offset().top);
                input.hoverSubscribers[i](x,y);
            }
        });
    }

    return Input;
});