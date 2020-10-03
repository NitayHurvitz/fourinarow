
const board = document.getElementById("board")
const rowsInput = document.getElementById("input-rows")
const colsInput = document.getElementById("input-cols")

let turn;
let gameStarted = false;

const PLAYER_1 = {
    class: "player-1",
    color: "red"
}
const PLAYER_2 = {
    class: "player-2",
    color: "blue"
}
const CSS_PROP_NAMES = {
    BORDER_WIDTH: "--border-width",
    CELL_SIZE: "--cell-size",
    PLAYER_1_COLOR: "--player-1-color",
    PLAYER_2_COLOR: "--player-2-color",
    COLUMN_HOVER_BACKGROUND: "--column-hover-background"
}

const COIN_CLASS = "coin"
const CELL_CLASS = "cell"
const COLUMN_CLASS = "column"
const BOARD_WIDTH_IN_PX = 400

function createCoinElement() {
    const coin = document.createElement("div")
    coin.classList.add(COIN_CLASS)
    coin.classList.add(turn.class)

    return coin
}

function createCellElement(row, col) {
    const cell = document.createElement("div")
    cell.className = CELL_CLASS
    cell.row = row
    cell.col = col

    return cell;
}

function createColumnElement(colNum, numOfRows) {
    const column = document.createElement("div")
    column.className = COLUMN_CLASS
    column.number = colNum

    for (let rowNum = 1; rowNum <= numOfRows; rowNum++) {
        column.appendChild(createCellElement(rowNum, colNum))
    }

    return column;
}

function startBoard() {
    gameStarted = false;
    turn = PLAYER_1
    board.innerHTML = ""

    setCssProps()

    const numOfRows = rowsInput.value
    const numOfColumns = colsInput.value

    for (let colNum = 1; colNum <= numOfColumns; colNum++) {
        board.appendChild(createColumnElement(colNum, numOfRows))
    }
}

function setCssProps() {
    cellSizeInPx = BOARD_WIDTH_IN_PX / colsInput.value

    board.style.setProperty(CSS_PROP_NAMES.BORDER_WIDTH, BOARD_WIDTH_IN_PX)
    board.style.setProperty(CSS_PROP_NAMES.CELL_SIZE, `${cellSizeInPx}px`)
    board.style.setProperty(CSS_PROP_NAMES.PLAYER_1_COLOR, PLAYER_1.color)
    board.style.setProperty(CSS_PROP_NAMES.PLAYER_2_COLOR, PLAYER_2.color)
    board.style.setProperty(CSS_PROP_NAMES.COLUMN_HOVER_BACKGROUND, turn.color)
}

function onBoardClicked(event) {
    const targetCol = getParentColumnOfNode(event.target)
    if (targetCol === undefined)
        return

    const lastCell = getFreeCellOfColumn(targetCol);

    if (lastCell !== undefined) {
        gameStarted = true;
        lastCell.appendChild(createCoinElement())
        turn = turn === PLAYER_1 ? PLAYER_2 : PLAYER_1
        board.style.setProperty(CSS_PROP_NAMES.COLUMN_HOVER_BACKGROUND, turn.color)
    }
}

function getParentColumnOfNode(node) {
    if (node.classList.contains(COLUMN_CLASS))
        return node
    if (node.classList.contains(CELL_CLASS))
        return node.parentElement
    if (node.classList.contains(COIN_CLASS))
        return node.parentElement.parentElement
    return undefined
}

function getFreeCellOfColumn(column) {
    cells = Array.from(column.getElementsByClassName(CELL_CLASS))
    return cells.reverse().find(isCellFree)
}

function isCellFree(cell) {
    return cell.getElementsByClassName(COIN_CLASS).length == 0
}

function startBoardWithWarn() {
    if (gameStarted) {
        if (confirm("Are you sure you want to restart your game?")) {
            startBoard()
        }
    }
    else {
        startBoard()
    }
}


board.addEventListener("click", onBoardClicked)

document.getElementById("input-rows").addEventListener("change", startBoardWithWarn)
document.getElementById("input-cols").addEventListener("change", startBoardWithWarn)
document.getElementById("restart-btn").addEventListener("click", startBoardWithWarn)


startBoard()