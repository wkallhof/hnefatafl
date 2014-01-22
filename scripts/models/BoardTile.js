
define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    function BoardTile(x,y,type) {
        if (!(this instanceof BoardTile)) {
            throw new TypeError("BoardTile constructor cannot be called as a function.");
        }

        this.type = type;
        this.x = x;
        this.y = y;
    }
 
 
    /*------------------------------------------
    |            PUBLIC METHODS                |
    -------------------------------------------*/
    BoardTile.prototype = {
        constructor: BoardTile
    };

    return BoardTile;
    
});