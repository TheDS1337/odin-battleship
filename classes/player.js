const Gameboard = require("./gameboard.js");

class Player
{
    constructor(name)
    {
        this.gameboard = new Gameboard();
        this.name = name;
    }
}

module.exports = Player;