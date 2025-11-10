import { Ship } from '../src/modules/ship.js'

describe("Ship in BattleShip game", () => {
    let ship
    beforeEach(() => {
        ship = new Ship(3)
    })
    test("A new ship has 0 hits", () => {
        expect(ship.hits).toBe(0)
    })
    test("A new ship is not sunk", () => {
        expect(ship.isSunk()).toBe(false)
    })
    test("A ship with hits < length is not sunk", () => {
        ship.hit()
        expect(ship.isSunk()).toBe(false)
    })
    test("Calling hit increases hits to one", () => {
        ship.hit()
        expect(ship.hits).toBe(1)
    })
    test("A ship with hits === length is sunk", () => {
        ship.hit()
        ship.hit()
        ship.hit()
        expect(ship.isSunk()).toBe(true)
    })

})
