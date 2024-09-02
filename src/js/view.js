class View {
    _startBtn = document.querySelector(".button-container");
    _grid = document.querySelector(".grid");
    _score = document.querySelector(".score-container");
    _scorePlayer1 = document.querySelector(".player1-score");
    _scorePlayer2 = document.querySelector(".player2-score");
    _data;

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

    addHandlerStart() {
        this._startBtn.addEventListener("click", (event) => {
            event.preventDefault();
            this._startGame();
            //handler();
        });
    }
}

export default new View();
