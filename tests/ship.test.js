import { Ship } from '../src/modules/ship.js'

describe("Ship in BattleShip game", () => {
    test("A new ship has 0 hits", () => {
        const ship = new Ship(3)
        expect(ship.hits).toBe(0)
    })
})
