const Ship = require("./ship.js");

class Gameboard
{
    #fleet = [];

    constructor()
    {
        this.fleetGrid = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.missedShotsGrid = Array.from({ length: 10 }, () => Array(10).fill(false));
    }

    placeShipX(ship, x, y)
    {
        for( let i = 0; i < ship.length; i++ ) {
            if( x + i >= 10 || this.fleetGrid[x + i][y] )
                return false;
        }

        for( let i = 0; i < ship.length; i++ ) {
            this.fleetGrid[x + i][y] = ship;
            this.#fleet.push(ship);
        }

        return true;
    }

    placeShipY(ship, x, y)
    {
        for( let i = 0; i < ship.length; i++ ) {
            if( y + i >= 10 || this.fleetGrid[x][y + i] )
                return false;
        }

        for( let i = 0; i < ship.length; i++ ) {
            this.fleetGrid[x][y + i] = ship;
            this.#fleet.push(ship);
        }

        return true;
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
        if( x < 0 || x >= 10 )
            return null;

        if( y < 0 || y >= 10 )
            return null;

        return this.fleetGrid[x][y];
    }

    allSunk() 
    {
        return this.#fleet.length === 0;
    }

    randomlyPopulate()
    {
        for( let i of ["destroyer",
                        "submarine",
                        "cruiser",
                        "battleship",
                        "carrier"] ) {
            const ship = new Ship(i);
            let success = false;

            do {
                const x = Math.floor(Math.random() * 8);
                const y = Math.floor(Math.random() * 8);

                success = Math.random() < 0.5 ? this.placeShipX(ship, x, y) : this.placeShipY(ship, x, y);
            } while( !success );
        }
    }
}

module.exports = Gameboard;