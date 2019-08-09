
let sudokuGridCSSselector = "td"; // input?

function sendToContent(action) {
    console.log("sendToContent");

    let params = {
        active: true,
        currentWindow: true
    }
    chrome.tabs.query(params, gotTab);

    function gotTab(tabs) {
        console.log("gotTabs");
        chrome.tabs.sendMessage(tabs[0].id, action, ((response) => {
            console.log("res " + response);
            if (response != undefined) {
                updateSudokuGrid(response);
            }
        }));
    }

}

function updateSudokuGrid(sudoku) {
    console.log("Update sudoku grid " + sudoku.resp);
    let extensionSudokuGrid = document.querySelectorAll(sudokuGridCSSselector);
    for (let i = 0; i < extensionSudokuGrid.length; i++) {
        //console.log(extensionSudokuGrid[i] + " " + sudoku[i]);
        extensionSudokuGrid[i].innerHTML = sudoku.resp[i];
    }

}

function importSudoku() {
    console.log("import popup");
    let msg = { txt: "import" }
    sendToContent(msg);
}

function solveSudoku() {
    console.log("solve popup");
    let msg = { txt: "solve" }
    sendToContent(msg);
}

function exportSudoku() {
    console.log("export popup");
    let msg = { txt: "export" }
    sendToContent(msg);
}

window.addEventListener("load", function () {
    let el = document.getElementById("import");
    el.addEventListener("click", importSudoku);
});

window.addEventListener("load", function () {
    let el = document.getElementById("solve");
    el.addEventListener("click", solveSudoku);
});

window.addEventListener("load", function () {
    let el = document.getElementById("export");
    el.addEventListener("click", exportSudoku);
});