/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// window.findNRooksSolution = function(n, startCoords, board, rookInserted) {
//   board = board || new Board({n:n});

//   rookInserted = rookInserted || 0;
//   startCoords = startCoords || [0,0];

//   if (!board.hasRowConflictAt(startCoords[0]) && !board.hasColConflictAt(startCoords[1])) {
//     debugger;
//     board.rows()[startCoords[0]][startCoords[1]] = 1;
//     rookInserted++;
//   };

//   var newRow;
//   var newCol = startCoords[1] + 1;
//   if (newCol === n){
//     newRow = startCoords[0] + 1;
//     newCol = 0;
//   } else {
//     newRow = startCoords[0];
//   }

//   if (rookInserted === n){
//     console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
//     return board;
//   }
//   return window.findNRooksSolution(n, [newRow, newCol], board, rookInserted);

// };

window.findNRooksSolution = function(n){
  var board = new Board({n:n});
  var grid = board.rows();
  var numToInsert = n;

  for (var row = 0; row < grid.length; row++){
    for (var col = 0; col < grid.length; col ++){
      grid[row][col] = 1;
      if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(col)){
        numToInsert--;
      } else {
        grid[row][col] = 0;
      }
      if (numToInsert === 0){
        return grid;
      }
    }
  }
  return undefined;
};




// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n:n});

  var count = function(rowIndex){

    //if row === n , solution ++ because we have reached the end, if not exit return
    //
    //find targetRow from rowIndex, iterate through and insert Rook if no column, then count(next), if there is column, then toggle back to zero, and iterate to next row index
    //
    if (rowIndex >= n){
      solutionCount++;
      return;
    }
    var targetRow = board.attributes[rowIndex];

    for (var col = 0; col < board.attributes.n; col ++){
      // var cell = targetRow[col];
      // cell = 1;
      board.togglePiece(rowIndex, col);
      if (!board.hasColConflictAt(col)){
        count(rowIndex+1);
      }
      board.togglePiece(rowIndex, col);
    }
  };
  count(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;

};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //var solutionCount = 0;
  var board = new Board({n:n});
  var result;

  //debugger;
  var count = function(rowIndex){

    //if row === n , solution ++ because we have reached the end, if not exit return
    //
    //find targetRow from rowIndex, iterate through and insert Rook if no column, then count(next), if there is column, then toggle back to zero, and iterate to next row index
    //debugger;
    if (rowIndex >= n){

      console.log('inside count', board.rows());
      result =  board.rows();
      return result;
    }

    //var targetRow = board.attributes[rowIndex];

    for (var col = 0; col < board.attributes.n; col ++){
      board.togglePiece(rowIndex, col);

      if (!board.hasAnyQueensConflicts()){
        result = count(rowIndex+1);
        if (!result) {
          board.togglePiece(rowIndex, col);
        }
      } else {
        board.togglePiece(rowIndex, col);
      }
    }

    return result;
  };

  count(0);

  //var result = count(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(result));
  return result;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  //var solutionCount = 0;
  var board = new Board({n:n});
  var resultCount = 0;
  var result;

  //debugger;
  var count = function(rowIndex){

    //if row === n , solution ++ because we have reached the end, if not exit return
    //
    //find targetRow from rowIndex, iterate through and insert Rook if no column, then count(next), if there is column, then toggle back to zero, and iterate to next row index
    //debugger;
    if (rowIndex >= n){

      console.log('inside count', board.rows());
      result =  board.rows();
      resultCount++;
      return;
    }

    //var targetRow = board.attributes[rowIndex];

    for (var col = 0; col < board.attributes.n; col ++){
      board.togglePiece(rowIndex, col);

      if (!board.hasAnyQueensConflicts()){
        result = count(rowIndex+1);
        if (!result) {
          board.togglePiece(rowIndex, col);
        }
      } else {
        board.togglePiece(rowIndex, col);
      }
    }

    return result;
  };

  count(0);

  //var result = count(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(result));
  return resultCount;
};
