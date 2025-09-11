const Ship = require("./ship.js");

let ship;

beforeEach(() => {
    ship = new Ship(12);
});

test("Ship has hits equal to 2 after taking damage twice", () => {
    ship.hit();

    expect(ship.hits).toBe(1);
});

test("Ship is not sunk if hits is less than 12", () => {
    expect(ship.isSunk()).toBe(false);
})

test("Ship is sunk if hits is greater or equal to 12", () => {
    for( let i = 0; i < 12; i++ )
        ship.hit();

    expect(ship.isSunk()).toBe(true);
})