
define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    function GamePiece(id,x,y,type) {
        if (!(this instanceof GamePiece)) {
            throw new TypeError("GamePiece constructor cannot be called as a function.");
        }

        this.id = id;
        this.x = x;
        this.y = y;
        this.type = type;
    }

 
    /*------------------------------------------
    |            PUBLIC METHODS                |
    -------------------------------------------*/
    GamePiece.prototype = {
    	constructor: GamePiece
    };

    return GamePiece;
});