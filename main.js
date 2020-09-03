
function createCellElement(row, col, cellSize) {
    const cell = document.createElement("div")
    cell.className = "cell"
    cell.row = row
    cell.col = col
    cell.style.height = `${cellSize - 6}px`
    cell.style.width = `${cellSize - 6}px`

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

function handleBoardClicked(event) {
    const targetCell = event.target
    if (targetCell.className != "cell") {
        return
    }
    console.log(targetCell)


}

function handleInputChange() {
    console.log("input changed")
    generateCells()
}

function handleMouseOver(event) {
    const column = event.target.parentElement
    if (column.className != "column")
        return
    column.style.background = "green"
}

function handleMouseLeave(event) {
    const column = event.target.parentElement
    if (column.className != "column")
        return
    column.style.background = "white"
}


const board = document.getElementById("board")
board.addEventListener("click", handleBoardClicked)
Array.from(document.getElementsByClassName("input")).forEach(
    element => element.addEventListener("change", handleInputChange)
)

board.addEventListener("mouseover", handleMouseOver)
board.addEventListener("mouseout", handleMouseLeave)

generateCells()