//const sudokusolver = require('./sudokusolver');
//import { sudokugame } from './sudokugame.js';


console.log("Content extention go!");

let webSudokuGrid;
let webSudokuGridCSSselector = "#letour div:not(#yunex82)";

async function importSudoku() {
    console.log("import sudoku");
    let sudoku = [];
    for (let i of webSudokuGrid) {
        let value = i.innerHTML;
        let FormatedValue = value === "" ? null : parseInt(value);
        sudoku.push(FormatedValue);
    }
    console.log("imported len: " + sudoku.length + " sudoku: " + sudoku);
    return { resp: sudoku };
}

function exportSudoku(sudoku) {
    console.log("export sudoku");
    for (let i = 0; i < webSudokuGrid.length; i++) {
        webSudokuGrid[i].innerHTML = sudoku[i];
    }
}

async function gotMessage(message, sender, sendResponse) {
    console.log(message.txt);
    switch (message.txt) {
        case 'import':
            console.log("import content");
            let sudoku = await importSudoku();
            console.log("returning after import: ");
            console.log(sudoku);
            sendResponse(sudoku);
            break;
        case 'export':
            console.log("export content");
            exportSudoku(message.sudoku);
            sendResponse(null);
            break;
        default:
            console.error("Unknown method receved to content.js");
    }
}

window.addEventListener("load", function () {
    webSudokuGrid = document.querySelectorAll(webSudokuGridCSSselector);
    chrome.runtime.onMessage.addListener(gotMessage);
});
