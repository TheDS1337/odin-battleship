class Ship
{
    static lengthByType = {
        destroyer: 2,
        submarine: 3,
        cruiser: 3,
        battleship: 4,
        carrier: 5
    };

    constructor(type)
    {
        this.type = type;
        this.length = Ship.lengthByType[type];
        this.hits = 0;
    }

    hit()
    {
        this.hits++;
    }

    isSunk()
    {
        return this.hits >= this.length;
    }
}

module.exports = Ship;