
define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    function GameState() {
        if (!(this instanceof GameState)) {
            throw new TypeError("GameState constructor cannot be called as a function.");
        }

        this.pieceMap = initPieceMap();
    }

    function initPieceMap() {
        return [
        [1,0,0,1,1,1,1,1,0,0,1],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,2,0,0,0,0,1],
        [1,0,0,0,2,2,2,0,0,0,1],
        [1,1,0,2,2,2,2,2,0,1,1],
        [1,0,0,0,2,2,2,0,0,0,1],
        [1,0,0,0,0,2,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [1,0,0,1,1,1,1,1,0,0,1]
        ];
    };
 
    GameState.prototype = {
    	
    	constructor: GameState,
    	
        draw: function (graphics) {
            var x,y;
            for(x = 0; x < this.pieceMap.length; x++)
            {
                for(y = 0; y < this.pieceMap[x].length; y++)
                {
                    graphics.drawPiece(x,y,this.pieceMap[x][y]);
                }
            }
        }
    };

    return GameState;
});