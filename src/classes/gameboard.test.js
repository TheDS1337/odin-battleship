const Ship = require("./ship.js");
const Gameboard = require("./gameboard.js");

let gameboard;

beforeEach(() => {
    gameboard = new Gameboard(10);
});

test("Empty board has no ship", () => {
    expect(gameboard.getShip(5, 5)).toBeNull();
});

test("Ship is placed is placed in board", () => {
    gameboard.placeShipX(new Ship(2), 5, 5);
    expect(gameboard.getShip(5, 5)).not.toBeNull();
});

test("Ship is big to be placed in board", () => {
    gameboard.placeShipX(new Ship(10), 5, 5);
    expect(gameboard.getShip(5, 5)).toBeNull();
});

test("Ship can be as big as the board, in both x and y axis", () => {
    gameboard.placeShipX(new Ship(9), 0, 5);
    expect(gameboard.getShip(0, 5)).not.toBeNull();

    gameboard.placeShipY(new Ship(10), 9, 0);
    expect(gameboard.getShip(9, 0)).not.toBeNull();
});

test("Empty board has no missed shots", () => {
    expect(gameboard.missedShotsGrid).toEqual([
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false]]);
});

test("Not hitting a ship registers as missed shot", () => {
    gameboard.placeShipX(new Ship(5), 3, 5);
    gameboard.receiveAttack(0, 0)

    expect(gameboard.missedShotsGrid).toEqual([
        [true, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false]]);
});

test("Hitting a ship does not register as missed shot", () => {
    gameboard.placeShipX(new Ship(5), 3, 5);
    gameboard.receiveAttack(3, 5)

    expect(gameboard.missedShotsGrid).toEqual([
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false]]);
});