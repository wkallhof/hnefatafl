
define(function (require) {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
    var Tween = require("models/tween");

    function Anim(options) {
        if (!(this instanceof Anim)) {
            throw new TypeError("Anim constructor cannot be called as a function.");
        }
    }

    Anim.movePiece = function(id,startPoint,endPoint)
    {


        return new Tween({
            id: id,
            start: startPoint,
            end: endPoint,
            delay: 0,
            duration: 500,
            delta: makeEaseOut(circ),
            step: function(delta)
            {
                var diffX = this.end.x - this.start.x;
                var diffY = this.end.y - this.start.y;

                this.current = {
                    x: this.start.x + (diffX*delta),
                    y: this.start.y + (diffY*delta)
                } 
            }
        });
    }

    /*------------------------------------------
    |            PUBLIC METHODS                |
    -------------------------------------------*/
 
    Anim.prototype = {
    	constructor: Anim
    };

    /*------------------------------------------
    |            PRIVATE METHODS                |
    -------------------------------------------*/
    function fetchDelta(type)
    {
        switch(type)
        {
            case "makeEaseOutCirc" : return makeEaseOut(circ);
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

    function makeEaseOut(delta) {  
      return function(progress) {
        return 1 - delta(1 - progress)
      }
    }

    function makeEaseInOut(delta) {  
      return function(progress) {
        if (progress < .5)
          return delta(2*progress) / 2
        else
          return (2 - delta(2*(1-progress))) / 2
      }
    }



    return Anim;
});