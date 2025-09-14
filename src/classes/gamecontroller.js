const Player = require("./player.js");

module.exports = new (class GameController 
{
    constructor()
    {
        this.startButton = document.querySelector("#button-start");
        this.players = [];
        this.boards = [];
    }

    listen()
    {
        this.startButton.addEventListener("click", (event) => {
            const parent = this.startButton.parentElement;

            while( parent.lastChild )
                parent.removeChild(parent.lastChild);

            this.startRound(parent);
        });
    }

    startRound(parent)
    {
        parent.classList.add("game");

        parent.appendChild(this.createBoard("DS"));
        parent.appendChild(this.createBoard("Computer"));
    }

    createBoard(name)
    {
        this.players.push(new Player(name));

        const container = document.createElement("div");

        const playerName = document.createElement("div");
        playerName.classList.add("player-name");
        playerName.textContent = name;

        const board = document.createElement("div");
        board.classList.add("board");

        let cells = [];

        for( let i = 0; i < 10; i++ ) {
            let row = [];

            for( let j = 0; j < 10; j++ ) {
                const cell = document.createElement("div");
                cell.classList.add("cell");                
                row.push(board.appendChild(cell));
            }

            cells.push(row);
        }


        this.boards.push({ board: board, cells: cells });

        container.appendChild(playerName);
        container.appendChild(board);

        return container;
    }
})();