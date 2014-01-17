
define(function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    function GameBoard() {
        if (!(this instanceof GameBoard)) {
            throw new TypeError("GameBoard constructor cannot be called as a function.");
        }

        this.map = initMap();
    }

    function initMap() {
        return [
        [1,0,0,1,1,1,1,1,0,0,1],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,1,0,0,0,0,1],
        [1,0,0,0,1,1,1,0,0,0,1],
        [1,1,0,1,1,1,1,1,0,1,1],
        [1,0,0,0,1,1,1,0,0,0,1],
        [1,0,0,0,0,1,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [1,0,0,1,1,1,1,1,0,0,1]
        ];
    };
 
    GameBoard.prototype = {
    	
    	constructor: GameBoard,
    	
        draw: function (graphics) {
            var x,y;
            for(x = 0; x < this.map.length; x++)
            {
                for(y = 0; y < this.map[x].length; y++)
                {
                    graphics.drawTile(x,y,this.map[x][y]);
                }
            }
        }
    };

    return GameBoard;
});