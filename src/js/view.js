class View {
    _startBtn = document.querySelector(".button-container");
    _grid = document.querySelector(".grid");
    _score = document.querySelector(".score-container");
    _scorePlayer1 = document.querySelector(".player1-score");
    _scorePlayer2 = document.querySelector(".player2-score");
    _cells = document.querySelectorAll(".cell");
    _token = "X";

    _startGame() {
        // Hide start button
        this._startBtn.classList.add("hidden");
        // Show game grid
        this._grid.classList.remove("hidden");
        // Show game score
        this._score.classList.remove("hidden");
    }

    _player1Turn() {
        this._scorePlayer1.style.color = "#2dc200";
        this._scorePlayer2.style.color = "#d32e2e";
    }

    _player2Turn() {
        this._scorePlayer2.style.color = "#2dc200";
        this._scorePlayer1.style.color = "#d32e2e";
    }

    setToken(token) {
        this._token = token;
    }

    addHandlerStart() {
        this._startBtn.addEventListener("click", (event) => {
            event.preventDefault();
            this._startGame();

            this._player1Turn();
        });
    }

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

                this._token === "X" ? this._player2Turn() : this._player1Turn();

                handler(row, column);
            });
        });
    }
}

export default new View();
