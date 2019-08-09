//const sudokusolver = require('./sudokusolver');

console.log("Extention go!");

let sudoku = [];
let solvedSudoku = [];
let webSudokuGrid;
let webSudokuGridCSSselector = "#letour div:not(#yunex82)";

function importSudoku() {
    console.log("import sudoku");
    webSudokuGrid = document.querySelectorAll(webSudokuGridCSSselector);

    for (let i of webSudokuGrid) {
        let value = i.innerHTML;
        let FormatedValue = value === "" ? undefined : parseInt(value);
        sudoku.push(FormatedValue);
    }
    console.log("imported:" + sudoku);
}

async function solveSudoku() {
    console.log("solve sudoku");
    solvedSudoku = await playSudoku(sudoku)
    console.log("solved:" + solvedSudoku);
}

function exportSudoku() {
    console.log("export sudoku");
    console.log(webSudokuGrid);
    for (let i = 0; i < webSudokuGrid.length; i++) {
        console.log(webSudokuGrid[i] + " " + solvedSudoku[i]);
        webSudokuGrid[i].innerHTML = solvedSudoku[i];
    }
}


function fillSudokuToPopUp() {
    // todo fill the table in popup. Should this be in popup.js?
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    console.log(message.txt);

    switch (message.txt) {
        case 'import':
            console.log("import content");
            importSudoku();
            break;
        case 'solve':
            console.log("solve content");
            solveSudoku();
            break;
        case 'export':
            console.log("export content");
            exportSudoku();
            break;
        default:
            console.error("Unknown method receved to content.js");
    }

}
