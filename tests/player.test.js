import { Player } from '../src/modules/player.js'
import { GameBoard } from '../src/modules/gameboard.js'

describe("Player in a battleship game", () => {
    let player

    beforeEach(() => {
        player = new Player
    })
    test("Player exists", () => {
        expect(player).toBeDefined()
    })
    test("Player has a gameboard", () => {
        expect(player.board).toBeInstanceOf(GameBoard);
    })
    test("Player has a computer flag", () => {
        expect(typeof player.isComputer).toBe('boolean')
    })
    test("Randomly generated move is valid", () => {
        const board = new GameBoard
        const move = player.generateMove(board)
        expect(Array.isArray(move)).toBe(true)
        expect(move).toHaveLength(2)
        expect(move[0]).toBeGreaterThanOrEqual(0)
        expect(move[0]).toBeLessThan(10)
        expect(move[1]).toBeGreaterThanOrEqual(0)
        expect(move[1]).toBeLessThan(10)
    })
})
