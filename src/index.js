import "./style.css";
import {  renderBoard, updateCell, displayShips, setupAttackHandler, updateBoardDisplay } from "./modules/ui.js";
import { Game } from "./modules/game.js"

const game = new Game()
game.start()

console.log('Player 1 ships:', game.players[0].board.ships.length, 'positions:', game.players[0].board.shipPositions.size)
console.log('Player 2 ships:', game.players[1].board.ships.length, 'positions:', game.players[1].board.shipPositions.size)

const yourGrid = document.querySelector('#your-grid .player-grid')
const opponentGrid = document.querySelector('#opponent-grid .player-grid')

renderBoard(yourGrid)
renderBoard(opponentGrid)

// Display player's ships
const playerBoard = game.players[0].board
for (const position of playerBoard.shipPositions) {
    const [row, col] = position.split(',').map(Number)
    updateCell(yourGrid, row, col, 'ship')
}

console.log('Opponent ships:', game.players[1].board.ships)
console.log('Opponent ship positions:', game.players[1].board.shipPositions)


setupAttackHandler(opponentGrid, game, game.players[1].board, yourGrid, playerBoard)



