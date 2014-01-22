
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
        this.step = options.step;
        this.delta = options.delta;

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
        }
    };
    return Tween;
});