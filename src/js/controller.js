import view from "./view.js";
import { gameBoard, gameController } from "./model.js";

/**
 * Controls the game turn by processing the player's move and updating the game state.
 * @param {string} row - The row index as a string.
 * @param {string} column - The column index as a string.
 */
const controlTurn = function (row, column) {
    // Convert row and column from string to number
    const rowNum = parseInt(row);
    const colNum = parseInt(column);

    // Update the game board
    const gameResult = gameBoard.dropToken(
        rowNum,
        colNum,
        gameController.getActivePlayer()
    );

    if (gameResult === true) {
        // Active player WON
        gameController.markScore();
        // Alert winning
        view.alertWin(gameController.getActivePlayer());
        // Set new score view
        view.setScore(gameController.getScore());
        // Reset game
        gameBoard.initGameBoard();
    } else if (gameResult === false) {
        // DRAW
        view.alertDraw();
        // Reset game
        gameBoard.initGameBoard();
    } else {
        // Game continues
        // Switch player turn after updating the board
        gameController.switchPlayerTurn();
        // Update the token in the view to reflect the active player
        view.setToken(gameController.getActivePlayer().token);
    }
};

/**
 * Initializes the game by setting up the game board and attaching event handlers.
 */
const init = function () {
    gameBoard.initGameBoard();
    view.addHandlerStart();
    view.addHandlerHover();
    view.addHandlerClick(controlTurn);
};

init();
