import { Game } from '../src/modules/game.js'

describe("Game in a battleship game", () => {
    let game

    beforeEach(() => {
        game = new Game
    })

    test("Game exists", () => {
        expect(game).toBeDefined()
    })

    test("Game has two players", () => {
        expect(game.players.length).toBe(2)
    })

    test("Ships are placed on each board", () => {
        game.start()
        game.players.forEach(player => {
            expect(player.board.ships.length).toBe(5)
    })

    })

    test("Take turn switches the player on a miss", () => {
        game.start()
        const initialPlayer = game.currentPlayer

        jest.spyOn(game.nextPlayer.board, 'receiveAttack').mockReturnValue(false)
        game.takeTurn(0, 0)
        expect(game.currentPlayer).not.toBe(initialPlayer)
    })

    test("Take turn does NOT switch player on hit", () => {
    game.start()
    const initialPlayer = game.currentPlayer

    // Mock receiveAttack to return true (hit)
    jest.spyOn(game.nextPlayer.board, 'receiveAttack').mockReturnValue(true)

    game.takeTurn(0, 0)
    expect(game.currentPlayer).toBe(initialPlayer) // Same player!
    })

    test("Take turn attacks opponents board", () => {
        game.start()
        game.takeTurn(9, 9)
        expect(game.currentPlayer.board.attacks.has("9,9")).toBe(true)
    })
})
