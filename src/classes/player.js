const Gameboard = require("./gameboard.js");

class Player
{
    constructor(name)
    {
        this.gameboard = new Gameboard();
        this.name = name;
    }

    getName() 
    {
        return this.name;
    }
}

module.exports = Player;