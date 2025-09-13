const Ship = require("./ship.js");

class Gameboard
{
    #size;
    #fleet = [];

    constructor(size = 10)
    {
        this.fleetGrid = Array.from({ length: size }, () => Array(size).fill(null));
        this.missedShotsGrid = Array.from({ length: size }, () => Array(size).fill(false));
        this.#size = size;
    }

    placeShipX(ship, x, y)
    {
        let placeShip = true;

        for( let i = 0; i < ship.length; i++ ) {
            if( x + i >= this.#size || this.fleetGrid[x + i][y] ) {
                placeShip = false;
                break;
            }
        }

        if( placeShip ) {
            for( let i = 0; i < ship.length; i++ ) {
                this.fleetGrid[x + i][y] = ship;
                this.#fleet.push(ship);
            }
        }
    }

    placeShipY(ship, x, y)
    {
        let placeShip = true;

        for( let i = 0; i < ship.length; i++ ) {
            if( y + i >= this.#size || this.fleetGrid[x][y + i] ) {
                placeShip = false;
                break;
            }
        }

        if( placeShip ) {
            for( let i = 0; i < ship.length; i++ ) {
                this.fleetGrid[x][y + i] = ship;
                this.#fleet.push(ship);
            }
        }
    }

    receiveAttack(x, y)
    {
        let ship = this.fleetGrid[x][y];

        if( ship ) {
            ship.hit();

            if( ship.isSunk() )
                this.#fleet.splice(this.#fleet.indexOf(ship), 1);
        } else
            this.missedShotsGrid[x][y] = true;
    }

    getShip(x, y)
    {
        if( x < 0 || x >= this.#size )
            return null;

        if( y < 0 || y >= this.#size )
            return null;

        return this.fleetGrid[x][y];
    }

    allSunk() 
    {
        return this.#fleet.length === 0;
    }
}

module.exports = Gameboard;