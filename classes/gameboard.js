import Ship from "./ship.js";

export default class Gameboard
{
    #grid
    #missed

    constructor()
    {
        this.#grid = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.#missed = Array.from({ length: 10 }, () => Array(10).fill(false));
    }

    placeShipX(ship, x, y)
    {
        let placeShip = true;

        for( let i = 0; i < ship.length; i++ ) {
            if( x + i >= this.#grid.length || this.#grid[x + i][y] ) {
                placeShip = false;
                break;
            }
        }

        if( placeShip ) {
            for( let i = 0; i < ship.length; i++ )
                this.#grid[x + i][y] = ship;
        }
    }

    placeShipY(ship, x, y)
    {
        let placeShip = true;

        for( let i = 0; i < ship.length; i++ ) {
            if( y + i >= this.#grid[0].length || this.#grid[x][y + i] ) {
                placeShip = false;
                break;
            }
        }

        if( placeShip ) {
            for( let i = 0; i < ship.length; i++ )
                this.#grid[x][y + i] = ship;
        }
    }

    receiveAttack(x, y)
    {
        let ship = this.#grid[x][y];

        if( ship ) {
            ship.hit();

            if( ship.isSunk() ) {
                this.allSunk = true;

                for( let i = 0; i < this.#grid.length; i++ ) {
                    for( let j = 0; j < this.#grid[0].length; j++ ) {
                        let ship = this.#grid[i][j];

                        if( !ship || ship.isSunk() )
                            continue;

                        this.allSunk = false;
                        break;
                    }

                    if( !this.allSunk )
                        break;
                }
            }
        } else
            this.#missed[x][y] = true;
    }
}