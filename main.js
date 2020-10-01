
const board = document.getElementById("board")
let turn = "red"

function createCoinElement(diameterInPx) {
    const coin = document.createElement("div")
    coin.className = "coin"
    coin.style.height = diameterInPx
    coin.style.width = diameterInPx
    coin.style.background = turn
    coin.style.borderRadius = diameterInPx
    return coin
}

function createCellElement(row, col, cellSize) {
    const cell = document.createElement("div")
    cell.className = "cell"
    cell.row = row
    cell.col = col
    cell.style.height = `${cellSize - 6}px`
    cell.style.width = `${cellSize - 6}px`
    cell.style.background = "white"

    return cell;
}

function createColumnElement(colNum, numOfRows, cellSize) {
    const column = document.createElement("div")
    column.className = "column"
    column.number = colNum

    for (let rowNum = 1; rowNum <= numOfRows; rowNum++) {
        column.appendChild(createCellElement(rowNum, colNum, cellSize))
    }
    return column;

}

function startBoard() {
    const numOfRows = document.getElementById("input-rows").value
    const numOfColumns = document.getElementById("input-cols").value

    board.innerHTML = ""
    boardWidthPx = 400;
    boardHeighPx = boardWidthPx * numOfRows / numOfColumns;

    cellSize = boardWidthPx / numOfColumns

    board.style.height = `${boardHeighPx}px`
    board.style.width = `${boardWidthPx}px`
    for (let colNum = 1; colNum <= numOfColumns; colNum++) {
        board.appendChild(createColumnElement(colNum, numOfRows, cellSize))
    }
}

function handleBoardClicked(event) {
    const targetCol = getColumnFromEventTarget(event.target)
    if (targetCol === undefined)
        return

    cells = Array.from(targetCol.getElementsByClassName("cell"))
    const lastCell = getLastFreeCell(cells);

    if (lastCell !== undefined) {
        lastCell.appendChild(createCoinElement(lastCell.style.height))
        turn = turn === "red" ? "blue" : "red"
        targetCol.style.background = turn
    }

}

function getColumnFromEventTarget(target) {
    const targetCol = target.className == "column" ?
        target :
        target.className == "cell" ?
            target.parentElement :
            target.className == "coin" ?
                target.parentElement.parentElement :
                undefined

    return targetCol;
}

function getLastFreeCell(cells) {
    let lastCell = undefined;
    cells.forEach(cell => {
        if (!cell.hasChildNodes()) {
            lastCell = cell;
        }
    })
    return lastCell
}

function startBoardWithWarn() {
    if (confirm("Are you sure you want to restart your game?")) {
        startBoard()
    }
}

function handleMouseOver(event) {
    const column = getColumnFromEventTarget(event.target)
    if (column !== undefined) {
        column.style.background = turn;
    }
}

function handleMouseLeave(event) {
    const column = getColumnFromEventTarget(event.target)
    if (column !== undefined) {
        column.style.background = "white"
    }
}


board.addEventListener("click", handleBoardClicked)
board.addEventListener("mouseover", handleMouseOver)
board.addEventListener("mouseout", handleMouseLeave)

document.getElementById("input-rows").addEventListener("change", startBoardWithWarn)
document.getElementById("input-cols").addEventListener("change", startBoardWithWarn)
document.getElementById("restart-btn").addEventListener("click", startBoardWithWarn)


startBoard()