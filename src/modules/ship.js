class Ship {
    #hits
    #length

    constructor(length) {
        this.#length = length
        this.#hits = 0
    }

    get length() {
        return this.#length
    }

    get hits() {
        return this.#hits
    }

    hit() {
        this.#hits += 1
    }

    isSunk() {
        return this.#hits >= this.#length
    }
}

export { Ship }
