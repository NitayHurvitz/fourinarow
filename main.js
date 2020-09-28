
const board = document.getElementById("board")
let turn = "red"

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

function generateCells() {
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

function getColumnFromTarget(target) {
    const targetCol = target.className == "column" ?
        target :
        target.className == "cell" ?
            target.parentElement :
            target.className == "coin" ?
                target.parentElement.parentElement :
                undefined

    return targetCol;
}

function getLastCellFreeCell(cells) {
    let lastCell = undefined;
    cells.forEach(cell => {
        if (!cell.hasChildNodes()) {
            lastCell = cell;
        }
    })
    return lastCell
}

function handleBoardClicked(event) {
    const targetCol = getColumnFromTarget(event.target)
    if (targetCol === undefined)
        return

    cells = Array.from(targetCol.getElementsByClassName("cell"))
    const lastCell = getLastCellFreeCell(cells);

    if (lastCell !== undefined) {
        lastCell.appendChild(getCoin(lastCell.style.height, turn))
    }

    turn = turn === "red" ? "blue" : "red"
}

function getCoin(diameter, turn) {
    const coin = document.createElement("div")
    coin.className = "coin"
    coin.style.height = diameter
    coin.style.width = diameter
    coin.style.background = turn
    coin.style.borderRadius = diameter
    return coin
}

function handleInputChange() {
    console.log("input changed")
    generateCells()
}

function handleMouseOver(event) {
    const column = getColumnFromTarget(event.target)
    if (column !== undefined) {
        //column.style.borderStyle = "solid"
        //column.style.borderColor = turn;
        column.style.background = turn;
    }
}

function handleMouseLeave(event) {
    const column = getColumnFromTarget(event.target)
    if (column !== undefined) {
        //column.style.borderStyle = "None"
        column.style.background = "white"

    }
}


board.addEventListener("click", handleBoardClicked)
board.addEventListener("mouseover", handleMouseOver)
board.addEventListener("mouseout", handleMouseLeave)

document.getElementById("input-rows").addEventListener("change", handleInputChange)
document.getElementById("input-cols").addEventListener("change", handleInputChange)
document.getElementById("restart").addEventListener("click", generateCells)


generateCells()