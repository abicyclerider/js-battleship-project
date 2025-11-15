class GameBoard {
    #dimension = [10, 10] //[num rows, num columns]
    #board
    #attacks = new Set()
    #ships = []

    constructor() {
        this.#board = Array.from({ length: this.#dimension[0] }, () => new Array(this.#dimension[1]).fill(null))
    }

    get dimensions() {
        return this.#dimension;
    }

    get attacks() {
        return this.#attacks
    }

    get ships() {
        return this.#ships
    }


    getShipAt(row, col) {
        return this.#board[row][col]
    }

    placeShip(ship, row, col, direction) {
        if (!this.#isValidPlacement(ship, row, col, direction)) {
            return false
        }
        this.#ships.push(ship)
        for (let i = 0; i < ship.length; i++) {
            const newRow = row + (i * direction[0])
            const newCol = col + (i * direction[1])
            //Need to check that the position is on the board and unocupied
            this.#board[newRow][newCol] = ship
        }
        return true
    }

    receiveAttack(row, col) {
        if (!this.#isValidCoordinates(row, col)) {
            console.log('Invalid attack coordinates')
            return false
        }
        const key = `${row},${col}`
        if (this.#attacks.has(key)) {
            console.log('Location has been attacked')
            return false
        }
        this.#attacks.add(key)
        let ship = this.getShipAt(row, col)
        if ( ship === null) {
            return false
        } else {
            ship.hit()
            return true
        }

    }

    attackAt(row, col) {
        const key = `${row},${col}`
        return this.#attacks.has(key)
    }

    allShipsSunk() {
        return this.#ships.length > 0 && this.#ships.every(ship => ship.isSunk());
    }

    placeShipsRandomly(ships) {
        for (const ship of ships) {
            let notPlaced = true
            while (notPlaced) {
                const direction = this.#getRandomDirection()
                const location = this.#getRandomLocation()
                notPlaced = !this.placeShip(ship, location[0], location[1], direction)
            }
        }
    }

    #getRandomDirection() {
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        return directions[Math.floor(Math.random() * directions.length)]
    }
    #getRandomLocation() {
        const randRow = Math.floor(Math.random() * this.#dimension[0])
        const randCol  = Math.floor(Math.random() * this.#dimension[1])

        return [randRow, randCol]
    } 

    #isValidCoordinates(row, col) {
        const validRow = row >= 0 && row < this.#dimension[0]
        const validCol = col >= 0 && col < this.#dimension[1]
        return validRow && validCol
    }

    #isValidPlacement(ship, row, col, direction) {
        for (let i = 0; i < ship.length; i++) {
            const newRow = row + (i * direction[0])
            const newCol = col + (i * direction[1])
            //Check valid coordinates first
            if (!this.#isValidCoordinates(newRow, newCol) || this.getShipAt(newRow, newCol) !== null ) {
                return false
            }
        }
        return true

    }
}

export { GameBoard }
