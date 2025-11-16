function renderBoard(boardElement, size = 10) {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col ++) {
            const cellDiv = document.createElement('div')
            cellDiv.setAttribute('class', 'cell')
            cellDiv.dataset.row = row
            cellDiv.dataset.col = col
            boardElement.appendChild(cellDiv)
        }
    }
}

function updateCell(boardElement, row, col, state) {
    const cell = boardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    cell.classList.add(state)
}

function displayShips(boardElement, board) {
    for (const position of board.shipPositions) {
        const [row, col] = position.split(',').map(Number)
        updateCell(boardElement, row, col, 'ship')
    }
}

function updateBoardDisplay(boardElement, board) {
    // Clear all hit/miss classes
    const cells = boardElement.querySelectorAll('.cell')
    cells.forEach(cell => {
        cell.classList.remove('hit', 'miss')
    })
    
    // Re-render all hits
    for (const position of board.hits) {
        const [row, col] = position.split(',').map(Number)
        updateCell(boardElement, row, col, 'hit')
    }
    
    // Re-render all misses
    for (const position of board.misses) {
        const [row, col] = position.split(',').map(Number)
        updateCell(boardElement, row, col, 'miss')
    }
}

function setupAttackHandler(opponentGrid, game, opponentBoard, yourGrid, playerBoard) {
    opponentGrid.addEventListener('click', async (event) => {
        if (!event.target.classList.contains('cell')) {
            return
        }
        const row = Number(event.target.dataset.row)
        const col = Number(event.target.dataset.col)

        game.takeTurn(row, col)
        updateBoardDisplay(opponentGrid, opponentBoard)

        // Check if player won
        if (opponentBoard.allShipsSunk()) {
            alert('You win! All enemy ships destroyed!')
            return // Stop the game
        }

        await executeComputerTurns(game, yourGrid, playerBoard)
    })
}

async function executeComputerTurns(game, yourGrid, playerBoard) {
    while (game.currentPlayer.isComputer) {
        await new Promise(resolve => setTimeout(resolve, 500))
        const [row, col] = game.currentPlayer.generateMove(game.nextPlayer.board)
        game.takeTurn(row, col)
        updateBoardDisplay(yourGrid, playerBoard)

        // Check if computer won
        if (playerBoard.allShipsSunk()) {
            alert('You lose! All your ships were destroyed!')
            return // Stop the game
        }
    }
}

export { renderBoard, updateCell, displayShips, setupAttackHandler, updateBoardDisplay }

