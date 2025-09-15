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
        const player = new Player(name);
        player.gameboard.randomlyPopulate();

        const playerId = this.players.push(player) - 1;

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
                const cell = document.createElement("button");

                cell.id = `${playerId}-${i}-${j}`;
                cell.classList.add("cell");

                const ship = player.gameboard.getShip(i, j);
                
                if( ship )
                    cell.classList.add(ship.type);
                
                cell.addEventListener("click", this.#onCellClick);

                row.push(board.appendChild(cell));
            }

            cells.push(row);
        }

        this.boards.push({ board: board, cells: cells });

        container.appendChild(playerName);
        container.appendChild(board);

        return container;
    }

    #onCellClick(event) 
    {
        let cell = event.target;
        console.log(`clicked: ${cell.id}`);
    }
})();