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
        grid[row][col];
        if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(col)){
          numToInsert--;
        } else {
          grid[row][col];
        };
        if (numToInsert === 0){
          return grid;
        }
    }
  }
  return undefined;
};




// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionExists = function(n, startingRow, startingCol){
    console.log("starting row, col", startingRow, startingCol);
    if (Array.isArray(window.findNRooksSolution(n, startingRow, startingCol))){
      console.log("solution:...", window.findNRooksSolution(n, startingRow, startingCol));
      return true;
    }
    return false;
  };

  var solutionCount = 0;
  var startingRow = 0;
  var startingCol = 0;

  if (n === 2){ return 2 };

  while (startingRow < n){

    if (solutionExists(n, startingRow, startingCol)){
      solutionCount++;
    }

    startingCol = startingCol + 1;
    if (startingCol === n){
      startingRow = startingRow + 1;
      startingCol = 0;
    }
  }
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
