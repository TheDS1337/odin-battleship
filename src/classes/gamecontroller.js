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

        parent.appendChild(this.createBoard("DS", true));
        parent.appendChild(this.createBoard("Computer", false));

        this.computerThinking = false;
    }

    createBoard(name, drawShips)
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

                if( drawShips ) {
                    const ship = player.gameboard.getShip(i, j);
                
                    if( ship )
                        cell.classList.add(ship.type);
                }
                
                cell.addEventListener("click", event => this.#onCellClick(event));

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
        if( this.computerThinking )
            return;

        const cell = event.target;
        const strs = cell.id.split("-");
        const playerId = parseInt(strs[0]);
        
        if( playerId == 0 )
            return;

        const gameboard = this.players[playerId].gameboard;

        if( gameboard.receiveAttack(parseInt(strs[1]), parseInt(strs[2])) )
            cell.classList.add("ship-hit");
        else 
            cell.classList.add("ship-miss");

        if( gameboard.allSunk() ) 
            console.log("Player won the game!");
        else {
            this.computerThinking = true;
            setTimeout(() => this.#makeComputerMove(), Math.floor(Math.random() * 5000));
        }
    }

    #makeComputerMove()
    {
        const gameboard = this.players[0].gameboard;

        while( true ) {
            const x = Math.floor(Math.random() * 8);
            const y = Math.floor(Math.random() * 8);

            if( !gameboard.missedShotsGrid[x][y] ) {
                const cell = this.boards[0].cells[x][y];

                if( gameboard.receiveAttack(x, y) ) 
                    cell.classList.add("ship-hit");
                else 
                    cell.classList.add("ship-miss");

                break;
            }
        }

        if( gameboard.allSunk() ) 
            console.log("Computer won the game!");

        this.computerThinking = false;
    }
})();