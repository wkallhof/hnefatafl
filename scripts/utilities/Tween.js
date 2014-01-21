
define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    function Tween(options) {
        if (!(this instanceof Tween)) {
            throw new TypeError("Tween constructor cannot be called as a function.");
        }

        this.id = options.id;

        this.start = options.start;
        this.current = options.start;
        this.end = options.end;

        this.duration = options.duration || 1000;
        this.delay = options.delay;
        this.timeStarted = new Date();

        this.delta = fetchDelta(options.type);

        this.finished = false;
        this.delayState = 0;
    }


    /*------------------------------------------
    |            PUBLIC METHODS                |
    -------------------------------------------*/
 
    Tween.prototype = {
    	constructor: Tween,

        tick: function()
        {

            if(this.finished) return;
            if(this.delayState < this.delay)
            {
                this.delayState++;
                return this.current;
            }

            this.delayState = 0;
            var timePassed = new Date() - this.timeStarted;
            var progress = timePassed / this.duration;

            if (progress > 1) progress = 1;

            var delta = this.delta(progress);

            if (progress == 1) {
                this.finished = true;
            }

            this.step(delta);
            return this.current;
        },

        step: function(delta)
        {
            var diffX = this.end.x - this.start.x;
            var diffY = this.end.y - this.start.y;

            this.current = {
                x: this.start.x + (diffX*delta),
                y: this.start.y + (diffY*delta)
            }  
        }
    };

    /*------------------------------------------
    |            PRIVATE METHODS                |
    -------------------------------------------*/
    function fetchDelta(type)
    {
        switch(type)
        {
            default: return makeEaseInOut(circ);
        }
    }

    function linear(progress)
    {
        return progress;
    }

    function circ(progress) {
      return 1 - Math.sin(Math.acos(progress))
    }


    function makeEaseInOut(delta) {  
      return function(progress) {
        if (progress < .5)
          return delta(2*progress) / 2
        else
          return (2 - delta(2*(1-progress))) / 2
      }
    }



    return Tween;
});