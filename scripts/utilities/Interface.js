
define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    function Interface(x,y,type) {
        if (!(this instanceof Interface)) {
            throw new TypeError("Interface constructor cannot be called as a function.");
        }
    }

 
    /*------------------------------------------
    |            PUBLIC METHODS                |
    -------------------------------------------*/
    Interface.prototype = {
    	constructor: Interface
    };

    return Interface;
});