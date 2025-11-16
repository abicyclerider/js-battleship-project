import { GameBoard } from '../src/modules/gameboard.js'
import { Ship } from '../src/modules/ship.js'

describe("board in a battleship game", () => {
    let ship
    let board
    beforeEach(() => {
        ship = new Ship(3)
        board = new GameBoard()
    })

    test("A new gameboard can be created", () => {
        expect(board).toBeDefined()
    })

    test("A valid empty position is null", () => {
        expect(board.getShipAt(0, 0)).toBe(null)
    })

    test("A ship can be placed", () => {
        let success = board.placeShip(ship, 0, 0, [1, 0])
        expect(success).toBe(true)
        expect(board.getShipAt(0, 0)).toBe(ship)
        expect(board.getShipAt(1, 0)).toBe(ship)
        expect(board.getShipAt(2, 0)).toBe(ship)
    })

    test("A ship attempted to be placed out of bounds leaves the board unmodified and returns false", () => {
        let failure = board.placeShip(ship, 8, 0, [1, 0])
        expect(failure).toBe(false)
    })
    
    test("A ship can't be placed on another ship", () => {
        let success = board.placeShip(ship, 0, 0, [1, 0])
        let ship2 = new Ship(3)

        let failure = board.placeShip(ship2, 0, 0, [1, 0])
        expect(success).toBe(true)
        expect(failure).toBe(false)
    })

    test("Attacking an empty cell records a miss", () => {
        let miss = board.receiveAttack(5, 5)
        let attacked = board.attackAt(5, 5)
        let notAttacked = board.attackAt(4, 4) //cell not being attacked
        expect(miss).toBe(false)
        expect(attacked).toBe(true)
        expect(notAttacked).toBe(false)
    })

    test("Attacking a ship records a hit", () => {
        board.placeShip(ship, 0, 0, [1, 0])
        let hit = board.receiveAttack(0, 0)
        expect(hit).toBe(true)
        expect(ship.hits).toBe(1)
    })

    test("Attacking same coordinate twice returns false", () => {
        board.receiveAttack(5, 5);  // first attack
        let duplicate = board.receiveAttack(5, 5);  // second attack
        expect(duplicate).toBe(false);
    });

    test("Attacking out of bounds returns false", () => {
        let invalid = board.receiveAttack(10, 10);  // or (-1, 0)
        expect(invalid).toBe(false);
    });

    test("All ships sunk", () => {
        board.placeShip(ship, 0, 0, [1, 0])
        expect(board.allShipsSunk()).toBe(false)
        board.receiveAttack(0, 0)
        expect(board.allShipsSunk()).toBe(false)
        board.receiveAttack(1, 0)
        expect(board.allShipsSunk()).toBe(false)
        board.receiveAttack(2, 0)
        expect(ship.isSunk()).toBe(true)
        expect(board.allShipsSunk()).toBe(true)
    })

})

describe("Initial game setup", () => {
    let board
    let ships 

    beforeEach(() => {
        board = new GameBoard()
        ships = [
            new Ship(5),
            new Ship(4),
            new Ship(3),
            new Ship(3),
            new Ship(2),
        ]
    })
    test("Ships are placed on the board with correct total cells", () => {
        board.placeShipsRandomly(ships)

        let occupied = 0
        for (let row = 0; row < board.dimensions[0]; row++) {
            for (let col = 0; col < board.dimensions[1]; col++) {
                if (board.getShipAt(row, col) !== null) {
                    occupied++
                }
            }
        }

        expect(occupied).toBe(5 + 4 + 3 + 3 + 2) //Total length of all ships added

    })
})

describe("GameBoard getters for ship positions, hits, and misses", () => {
    let ship;
    let board;

    beforeEach(() => {
        ship = new Ship(3);
        board = new GameBoard();
    });

    test("shipPositions contains all ship cell positions after placing a ship", () => {
        board.placeShip(ship, 2, 5, [0, 1]); // Horizontal ship at (2,5)
        expect(board.shipPositions.has("2,5")).toBe(true);
        expect(board.shipPositions.has("2,6")).toBe(true);
        expect(board.shipPositions.has("2,7")).toBe(true);
        expect(board.shipPositions.size).toBe(3);
    });

    test("hits contains positions where attacks hit ships", () => {
        board.placeShip(ship, 0, 0, [1, 0]); // Vertical ship at (0,0)
        board.receiveAttack(0, 0); // Hit
        board.receiveAttack(1, 0); // Hit
        expect(board.hits.has("0,0")).toBe(true);
        expect(board.hits.has("1,0")).toBe(true);
        expect(board.hits.size).toBe(2);
    });

    test("misses contains positions where attacks missed ships", () => {
        board.receiveAttack(5, 5); // Miss
        board.receiveAttack(6, 6); // Miss
        expect(board.misses.has("5,5")).toBe(true);
        expect(board.misses.has("6,6")).toBe(true);
        expect(board.misses.size).toBe(2);
    });

    test("hits and misses are correctly separated", () => {
        board.placeShip(ship, 3, 3, [0, 1]); // Horizontal ship
        board.receiveAttack(3, 3); // Hit
        board.receiveAttack(5, 5); // Miss
        board.receiveAttack(3, 4); // Hit
        board.receiveAttack(7, 7); // Miss

        expect(board.hits.size).toBe(2);
        expect(board.misses.size).toBe(2);
        expect(board.hits.has("3,3")).toBe(true);
        expect(board.hits.has("3,4")).toBe(true);
        expect(board.misses.has("5,5")).toBe(true);
        expect(board.misses.has("7,7")).toBe(true);
    });
});
