class GameBoard {
    constructor() {
        this._rows = 3;
        this._columns = 3;
        this._board = Array.from({ length: this._rows }, () =>
            Array(this._columns).fill("")
        );
    }

    /**
     * Initializes the game board by resetting all cells to an empty string.
     */
    initGameBoard() {
        this._board = this._board.map((row) => row.fill(""));
    }

    /**
     * Prints the current state of the game board to the console.
     */
    printBoard() {
        console.log(this._board);
    }

    /**
     * Places a player's token at the specified row and column on the board.
     * @param {number} row - The row index where the token will be placed.
     * @param {number} column - The column index where the token will be placed.
     * @param {Object} player - The player object containing the token to be placed.
     * @returns {boolean|undefined} - Returns true if the player wins, false if it's a draw, or undefined if the game is still ongoing.
     */
    dropToken(row, column, player) {
        this.getToken(row, column) === ""
            ? (this._board[row][column] = player.token)
            : console.log("INVALID MOVE");

        return this.checkWin();
    }

    /**
     * Gets the token at the specified row and column on the board.
     * @param {number} row - The row index of the desired token.
     * @param {number} column - The column index of the desired token.
     * @returns {string} - The token at the specified position, or an empty string if no token is present.
     */
    getToken(row, column) {
        return this._board[row][column];
    }

    /**
     * Checks the board for a winning condition or a draw.
     * @returns {boolean|undefined} - Returns true if a player has won, false if it's a draw, or undefined if the game is still ongoing.
     */
    checkWin() {
        const board = this._board;
        const winningConditions = [
            // Rows
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            // Columns
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            // Diagonals
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]],
        ];

        for (const condition of winningConditions) {
            if (
                condition[0] !== "" &&
                condition.every((cell) => cell === condition[0])
            ) {
                return true;
            }
        }

        // Check for a draw (if there are no empty cells left)
        if (board.flat().includes("")) {
            return null; // Game is still ongoing
        }

        return false; // Return false if it's a draw
    }
}

class GameController {
    _players = [
        { name: "Player One", token: "X", score: 0 },
        { name: "Player Two", token: "0", score: 0 },
    ];

    _activePlayer = this._players[0];

    /**
     * Switches the turn to the next player.
     */
    switchPlayerTurn = () => {
        this._activePlayer =
            this._activePlayer === this._players[0]
                ? this._players[1]
                : this._players[0];
    };

    /**
     * Gets the currently active player.
     * @returns {Object} - The active player object.
     */
    getActivePlayer() {
        return this._activePlayer;
    }

    /**
     * Increments the score of the currently active player.
     */
    markScore() {
        this._activePlayer.score++;
    }

    /**
     * Gets the current scores of both players.
     * @returns {number[]} - An array containing the scores of Player One and Player Two.
     */
    getScore() {
        return [this._players[0].score, this._players[1].score];
    }
}

export const gameBoard = new GameBoard(),
    gameController = new GameController();
