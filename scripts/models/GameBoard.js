
define(function (require) {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    "use strict";
    
    var BoardTile = require("models/boardtile");
    var GamePiece = require("models/gamepiece");
    var _ = require("lodash");

    /* Represents the physical game board and pieces */
    function GameBoard() {
        if (!(this instanceof GameBoard)) {
            throw new TypeError("GameBoard constructor cannot be called as a function.");
        }

        this.pieces = initPieces(loadPieceMap());
        this.tiles = initTiles(loadTileMap());
    }


    /*------------------------------------------
    |            PUBLIC METHODS                |
    -------------------------------------------*/
    GameBoard.prototype = {
    	
    	constructor: GameBoard,

        movePiece: function(piece,x,y)
        {
            if(!this.getPiece(x,y)){
                piece.x = x;
                piece.y = y;
            }
        },

        removePiece: function(x,y)
        {
            _.remove(this.pieces,function(piece)
            {
                return piece.x == x && piece.y == y;
            });
        },

        getPiece: function(x,y)
        {
            return _.find(this.pieces, {"x":x, "y":y});
        },

        drawTiles: function (graphics) {
            _.forEach(this.tiles,function(tile){
                graphics.drawTile(tile.x,tile.y,tile.type);
            });
        },

        drawPieces: function(graphics) {
            _.chain(this.pieces)
                .sortBy("y")
                .forEach(function(piece){
                    graphics.drawPiece(piece.x,piece.y,piece.type);
            }); 
        }
    };

    /*------------------------------------------
    |            PRIVATE METHODS                |
    -------------------------------------------*/
    function loadTileMap() {
        return [
        [1,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0,1]
        ];
    };

    function initTiles(map){
        var x,y;
        var tiles = [];

        for(x = 0; x < map.length; x++)
        {
            for(y = 0; y < map[x].length; y++)
            {
                tiles.push(new BoardTile(x,y,map[x][y]));
            }
        }
        return tiles;
    }

    function loadPieceMap() {
        return [
        [0,0,0,1,1,1,1,1,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,2,0,0,0,0,1],
        [1,0,0,0,2,2,2,0,0,0,1],
        [1,1,0,2,2,3,2,2,0,1,1],
        [1,0,0,0,2,2,2,0,0,0,1],
        [1,0,0,0,0,2,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,1,1,1,1,1,0,0,0]
        ];
    };

    function initPieces(map)
    {
        var x,y;
        var pieces = [];
        for(x = 0; x < map.length; x++)
        {
            for(y = 0; y < map[x].length; y++)
            {
                if(map[x][y] != 0) pieces.push(new GamePiece(x,y,map[x][y]));
            }
        }
        return pieces;
    }

    return GameBoard;
});