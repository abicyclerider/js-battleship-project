import { GameBoard } from './gameboard.js'

class Player {
    #board;
    #isComputer;

    constructor(isComputer = false) {
        this.#board = new GameBoard();
        this.#isComputer = isComputer;
    }

    generateMove(opponentBoard) {
        let attacked = true
        let randRow, randCol
        while (attacked) {
            randRow = Math.floor(Math.random() * this.#board.dimensions[0])
            randCol = Math.floor(Math.random() * this.#board.dimensions[1])
            const key = `${randRow},${randCol}`
            attacked = opponentBoard.attacks.has(key)
        }
        return [randRow, randCol]
    }

    get board() {
        return this.#board;
    }
  
    get isComputer() {
        return this.#isComputer;
    }

}

export { Player }
