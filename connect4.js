/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  board = [];
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }).fill(null));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "board" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  let top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  for (var x = 0; x < WIDTH; x++) {
    let headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.appendChild(headCell);
  }
  htmlBoard.appendChild(top);

  // Refactor JQuery
  for (let y = 0; y < HEIGHT; y++) {
    let row = document.createElement('tr');
    for (let x = 0; x < WIDTH; x++) {
      let cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.appendChild(cell);
    }
    htmlBoard.appendChild(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function markCellFilled(y, x) {
  board[y][x] = currPlayer;
}

function findSpotForCol(x) {
  // We're scanning from the bottom of the column to see if the spot is filled. If not, return y.
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!isCellFilled(y, x)) {
      markCellFilled(y, x);
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let targetCell = document.getElementById(`${y}-${x}`);
  let targetDiv = document.createElement('div');
  targetDiv.setAttribute('class', `piece p${currPlayer}`);
  console.log(`${y}-${x}`);
  targetCell.appendChild(targetDiv);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

function isCellFilled(y, x) {
  return board[y][x];
}

function isBoardFilled() {
  console.log(board[0]);
  return board[0].every(cell => cell !== null);
}
/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // this never updates the board variable with the player #. Fix.

  // add a check for “is the entire board filled” [hint: the JS every method on arrays
  // would be especially nice here!]

  // add code to switch currPlayer between 1 and 2. This would be a great place for a ternary function.
  if (isBoardFilled()) {
    endGame('Board is full!');
    return;
  }

  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table

  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // loop through entire "board"
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // create horizontal array of
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
