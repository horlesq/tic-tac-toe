import view from "./view.js";

class GameBoard {
    _rows = 3;
    _columns = 3;
    _board = [];

    initGameBoard() {
        for (let i = 0; i < this._rows; i++) {
            this._board[i] = [];
            for (let j = 0; j < this._columns; j++) {
                this._board[i].push("");
            }
        }
    }

    printBoard() {
        const boardWithCellValues = this._board.map((row) =>
            row.map((cell) => cell)
        );
        console.log(boardWithCellValues);
    }

    dropToken(row, column, player) {
        this.getToken(row, column) === ""
            ? (this._board[row][column] = player.token)
            : console.log("INVALID MOVE");

        if (this.checkWin() === true) console.log(`${player.name} WON`);
        if (this.checkWin() === false) console.log(`DRAW`);
    }

    getToken(row, column) {
        return this._board[row][column];
    }

    // Return TRUE if active player WON
    // Return FALSE if draw
    checkWin() {
        const board = this._board;

        // Check rows and columns for a win
        for (let i = 0; i < this._rows; i++) {
            // Check row i
            if (
                board[i][0] !== "" &&
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2]
            ) {
                return true;
            }
            // Check column i
            if (
                board[0][i] !== "" &&
                board[0][i] === board[1][i] &&
                board[1][i] === board[2][i]
            ) {
                return true;
            }
        }

        // Check diagonals for a win
        if (
            board[0][0] !== "" &&
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2]
        ) {
            return true;
        }
        if (
            board[0][2] !== "" &&
            board[0][2] === board[1][1] &&
            board[1][1] === board[2][0]
        ) {
            return true;
        }

        // Check for draw (if there are no empty cells left)
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._columns; j++) {
                if (board[i][j] === "") {
                    return; // Return undefined if the game is still ongoing
                }
            }
        }

        return false; // Return false if it's a draw
    }
}

class GameController {
    _players = [
        { name: "Player One", token: "X" },
        { name: "Player Two", token: "0" },
    ];

    _activePlayer = this._players[0];

    switchPlayerTurn = () => {
        this._activePlayer =
            this._activePlayer === this._players[0]
                ? this._players[1]
                : this._players[0];
    };

    getActivePlayer() {
        return this._activePlayer;
    }
}

//(function () {
const gameBoard = new GameBoard();
const gameController = new GameController();

gameBoard.initGameBoard();

// gameBoard.dropToken(0, 1, gameController._activePlayer);
// gameController.switchPlayerTurn();
// gameBoard.dropToken(0, 2, gameController._activePlayer);
// gameController.switchPlayerTurn();
// gameBoard.dropToken(2, 2, gameController._activePlayer);
// gameController.switchPlayerTurn();
// gameBoard.dropToken(1, 1, gameController._activePlayer);
// gameController.switchPlayerTurn();
// gameBoard.dropToken(1, 0, gameController._activePlayer);
// gameController.switchPlayerTurn();
// gameBoard.dropToken(2, 0, gameController._activePlayer);

gameBoard.printBoard();
//})();

const init = function () {
    view.addHandlerStart();
};

init();
