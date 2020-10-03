
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
const CSS_VARS = {
    BORDER_WIDTH: "--border-width",
    CELL_SIZE: "--cell-size",
    PLAYER_1_COLOR: "--player-1-color",
    PLAYER_2_COLOR: "--player-2-color",
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

    const numOfRows = rowsInput.value
    const numOfColumns = colsInput.value

    board.style.setProperty(CSS_VARS.BORDER_WIDTH, BOARD_WIDTH_IN_PX)

    cellSizeInPx = BOARD_WIDTH_IN_PX / numOfColumns

    board.style.setProperty(CSS_VARS.CELL_SIZE, `${cellSizeInPx}px`)
    board.style.setProperty(CSS_VARS.PLAYER_1_COLOR, PLAYER_1.color)
    board.style.setProperty(CSS_VARS.PLAYER_2_COLOR, PLAYER_2.color)

    for (let colNum = 1; colNum <= numOfColumns; colNum++) {
        board.appendChild(createColumnElement(colNum, numOfRows))
    }
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
        targetCol.classList.add(turn.class)
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

function onMouseOver(event) {
    const column = getParentColumnOfNode(event.target)
    if (column !== undefined) {
        column.classList.add(turn.class);
    }
}

function onMouseLeave(event) {
    const column = getParentColumnOfNode(event.target)
    if (column !== undefined) {
        column.className = COLUMN_CLASS
    }
}


board.addEventListener("click", onBoardClicked)
board.addEventListener("mouseover", onMouseOver)
board.addEventListener("mouseout", onMouseLeave)

document.getElementById("input-rows").addEventListener("change", startBoardWithWarn)
document.getElementById("input-cols").addEventListener("change", startBoardWithWarn)
document.getElementById("restart-btn").addEventListener("click", startBoardWithWarn)


startBoard()