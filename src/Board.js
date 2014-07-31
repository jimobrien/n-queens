// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var grid = this.rows();
      var targetRow = grid[rowIndex];

      if (targetRow.indexOf(1) !== targetRow.lastIndexOf(1)){
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var i = 0; i < this.attributes.n; i++){
        var rowIndex = i;
        if (this.hasRowConflictAt(rowIndex)){ return true; }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var grid = this.rows();
      var counter = 0;
      for (var i = 0; i < grid.length; i ++){
        if (grid[i][colIndex] === 1){ counter ++; }
        if (counter === 2) { return true; }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var i = 0; i < this.attributes.n; i++){
        var colIndex = i;
        if (this.hasColConflictAt(colIndex)){ return true; }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var grid = this.rows();
      var aboveDiagonalLine = majorDiagonalColumnIndexAtFirstRow;
      if (majorDiagonalColumnIndexAtFirstRow === 0) {
        var belowDiagonalLine = 0;
        console.log("im in IF", belowDiagonalLine);
      } else {
        var belowDiagonalLine = majorDiagonalColumnIndexAtFirstRow;
        console.log("im in ELSE", belowDiagonalLine);
      }

      // var belowDiagonalLine = majorDiagonalColumnIndexAtFirstRow === 0 ? aboveDiagonalLine : - majorDiagonalColumnIndexAtFirstRow;

      var aboveCellCol = aboveDiagonalLine;
      var aboveCellRow = 0;

      var belowCellCol = 0;
      var belowCellRow = belowDiagonalLine;

      var cellAbove = grid[aboveCellRow][aboveCellCol];
      var cellBelow = grid[belowCellRow][belowCellCol];

      var aboveCounter = 0;
      var belowCounter = 0;

      while (cellAbove !== undefined && cellBelow !== undefined) {
        if (cellAbove === 1) {
          aboveCounter += 1;
        }

        if (cellBelow === 1) {
          belowCounter += 1;
        }

//         if (aboveCounter === 2) {
        if (aboveCounter === 2 || belowCounter === 2) {
          return true;
        }

        aboveCellRow += 1;
        aboveCellCol += 1;

        belowCellRow += 1;
        belowCellCol += 1;

        cellAbove = grid[aboveCellRow] !== undefined ? grid[aboveCellRow][aboveCellCol] : undefined;
        cellBelow = grid[belowCellRow] !== undefined ? grid[belowCellRow][belowCellCol] : undefined;
      }
      console.log('broken');
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var grid = this.rows();

      for (var i = 0; i < grid.length; i++) {
        var majorDiagonalColumnIndexAtFirstRow = this._getFirstRowColumnIndexForMajorDiagonalOn(0, i);

        if (this.hasMajorDiagonalConflictAt(majorDiagonalColumnIndexAtFirstRow)) {
          return true;
        }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
