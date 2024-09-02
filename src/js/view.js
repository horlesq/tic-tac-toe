class View {
    _startBtn = document.querySelector(".button-container");
    _grid = document.querySelector(".grid");
    _score = document.querySelector(".score-container");
    _scorePlayer1 = document.querySelector(".player1-score");
    _scorePlayer2 = document.querySelector(".player2-score");
    _cells = document.querySelectorAll(".cell");
    _token = "X";

    /**
     * Starts the game by hiding the start button, resetting the cells, and showing the game grid and score.
     */
    _startGame() {
        // Hide start button
        this._startBtn.classList.add("hidden");
        // Empty cells
        this._cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("filled");
        });
        // Show game grid
        this._grid.classList.remove("hidden");
        // Show game score
        this._score.classList.remove("hidden");
        //
        this._switchTurn();
    }

    /**
     * Switches the visual indication of the current player's turn.
     */
    _switchTurn() {
        if (this._token == "X") {
            this._scorePlayer1.style.color = "#2dc200";
            this._scorePlayer2.style.color = "#d32e2e";
        }
        if (this._token == "0") {
            this._scorePlayer2.style.color = "#2dc200";
            this._scorePlayer1.style.color = "#d32e2e";
        }
    }

    /**
     * Updates the score display for both players.
     * @param {number[]} scores - An array containing the scores of Player One and Player Two.
     */
    setScore(scores) {
        this._scorePlayer1.textContent = `Player One: ${scores[0]}`;
        this._scorePlayer2.textContent = `Player Two: ${scores[1]}`;
    }

    /**
     * Sets the current player's token and updates the visual indication of the turn.
     * @param {string} token - The token of the current player ('X' or '0').
     */
    setToken(token) {
        this._token = token;
        this._switchTurn();
    }

    /**
     * Alerts the user that a player has won and starts a new turn after a short delay.
     * @param {Object} player - The player object who won the game.
     */
    alertWin(player) {
        setTimeout(() => {
            // Alert message
            alert(`${player.name} WON! 🥳`);
            // New turn
            this._startGame();
        }, 50);
    }

    /**
     * Alerts the user that the game is a draw and starts a new turn after a short delay.
     */
    alertDraw() {
        setTimeout(() => {
            // Alert message
            alert(`It's a DRAW! 😕`);
            // New turn
            this._startGame();
        }, 50);
    }

    /**
     * Adds an event listener to the start button to start the game when clicked.
     */
    addHandlerStart() {
        this._startBtn.addEventListener("click", (event) => {
            event.preventDefault();
            this._startGame();
        });
    }

    /**
     * Adds hover effects to the cells to indicate where the player's token will be placed.
     */
    addHandlerHover() {
        this._cells.forEach((cell) => {
            cell.addEventListener("mouseenter", () => {
                cell.setAttribute("data-hover", this._token);
            });
            cell.addEventListener("mouseleave", () => {
                cell.setAttribute("data-hover", "");
            });
        });
    }

    /**
     * Adds click event handlers to the cells to place the token and trigger the game logic.
     * @param {Function} handler - The function to call when a cell is clicked.
     */
    addHandlerClick(handler) {
        this._cells.forEach((cell) => {
            cell.addEventListener("click", () => {
                // Check if cell is already filled
                if (cell.textContent !== "") return; // Prevent overwriting

                const row = cell.getAttribute("data-row");
                const column = cell.getAttribute("data-column");

                // Place the current player's token in the cell
                cell.textContent = this._token;
                cell.classList.add("filled");

                handler(row, column);
            });
        });
    }
}

export default new View();
