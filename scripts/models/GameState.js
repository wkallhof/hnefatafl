
define(function (require) {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    var GameBoard = require("models/gameboard");
    var _ = require("lodash");

    function GameState() {
        if (!(this instanceof GameState)) {
            throw new TypeError("GameState constructor cannot be called as a function.");
        }

        
        this.activePiece = null;
        this.gameBoard = new GameBoard();
    }

    /*------------------------------------------
    |            PUBLIC METHODS                |
    -------------------------------------------*/
    GameState.prototype = {
    	
    	constructor: GameState,
    	
        draw: function (graphics) {
            //Draw the board
            this.gameBoard.draw(graphics);
            //Highlight active piece
            if(this.activePiece) graphics.drawHover(this.activePiece.x, this.activePiece.y);
        },

        setActivePiece: function(x,y)
        {
            this.activePiece = _.find(this.gameBoard.pieces, {"x":x, "y":y});
        }
    };

    return GameState;
});