import { Player } from './player.js'
import { Ship } from './ship.js'

class Game {
    #players
    #currentPlayerIndex = 0

    constructor(computerOponent = true) {
        this.#players = [new Player(), new Player(computerOponent)]
    }

    start() {
        this.#players.forEach((player) => {player.board.placeShipsRandomly(this.#generateShips())})
    }

    get players() {
        return this.#players
    }

    takeTurn(attackRow, attackCol) {
        const targetPlayer = this.nextPlayer
        const success = targetPlayer.board.receiveAttack(attackRow, attackCol)
        if (!success) {
            this.#currentPlayerIndex = (this.#currentPlayerIndex + 1)%this.#players.length
        }
        return success

    }

    get losers() {
        return this.#players.filter(player => player.board.allShipsSunk())
    }

    isGameOver() {
        return this.losers.length > 0
    }

    get winner() {
        if (!this.isGameOver()) return null
        // For 2-player: find the player who's NOT a loser
        // For 3+ player: find the player(s) who are NOT losers
        return this.#players.find(player => !this.losers.includes(player))
    }

    get currentPlayer() {
        return this.#players[this.#currentPlayerIndex]
    }

    get nextPlayer() {
        const nextPlayerIndex = (this.#currentPlayerIndex + 1)%this.#players.length
        return this.#players[nextPlayerIndex]
    }


    #generateShips() {
        const ships = [
            new Ship(5),
            new Ship(4),
            new Ship(3),
            new Ship(3),
            new Ship(2),
        ]
        return ships
    }

}

export { Game }
