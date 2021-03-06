
define(function (require) {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
 
    var GameBoard = require("models/game-board");
    var _ = require("lodash");

    function GameState(graphics) {
        if (!(this instanceof GameState)) {
            throw new TypeError("GameState constructor cannot be called as a function.");
        }

        this.graphics = graphics;
        this.activePiece = null;
        this.gameBoard = new GameBoard(graphics);
    }

    /*------------------------------------------
    |            PUBLIC METHODS                |
    -------------------------------------------*/
    
    GameState.prototype = {
    	
    	constructor: GameState,
    	
        draw: function () {
            //draw the board tiles
            this.gameBoard.drawTiles();
            //Highlight active piece
            if(this.activePiece) this.graphics.drawHover(this.activePiece.x, this.activePiece.y);
            //Draw the board pieces
            this.gameBoard.drawPieces();
        },

        handleClick: function(x,y,button)
        {
            //Right Click
            if(button == 2)
            {
                this.gameBoard.removePiece(x,y);
            }
            //Left Click
            else{
                if(!this.activePiece)
                {
                    this.setActivePiece(x,y);
                    return;
                }

                this.gameBoard.movePiece(this.activePiece,x,y);
                this.activePiece = null;
            }

        },

        setActivePiece: function(x,y)
        {
            this.activePiece = this.gameBoard.getPiece(x,y);
        }
    };

    return GameState;
});