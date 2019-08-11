let sudokuGridCSSselector = "td input";

async function sendToContent(action) {
    return new Promise((resolve, reject) => {

        try {
            console.log("sendToContent");

            let params = {
                active: true,
                currentWindow: true
            }

            chrome.tabs.query(params, ((tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, action, ((response) => {
                    console.log("res " + response);
                    resolve(response);
                }));
            }));

        } catch (error) {
            reject("Error in sendContent");
        }
    });
}

function updateSudokuGrid(sudoku) {
    console.log("Update sudoku grid " + sudoku.resp);
    let extensionSudokuGrid = document.querySelectorAll(sudokuGridCSSselector);
    for (let i = 0; i < extensionSudokuGrid.length; i++) {
        if (sudoku.resp[i] != null) {
            extensionSudokuGrid[i].setAttribute("value", sudoku.resp[i]);
        } else {
            extensionSudokuGrid[i].setAttribute("value", "");
        }
    }
}

async function readSudokuGrid() {
    return new Promise((resolve, reject) => {
        console.log("Read sudoku from popup grid");
        try {
            let extensionSudokuGrid = document.querySelectorAll(sudokuGridCSSselector);
            let sudoku = [];
            for (let i = 0; i < extensionSudokuGrid.length; i++) {
                let value = extensionSudokuGrid[i].getAttribute("value");
                value = value === "" ? undefined : parseInt(value);
                sudoku.push(value);
            }
            resolve(sudoku);
        } catch (error) {
            reject("Error reading popup sudoku grid");
        }
    });
}

async function importSudoku() {
    console.log("import popup");
    let msg = { txt: "import" }
    let sudoku = await sendToContent(msg);

    if (sudoku != undefined) {
        updateSudokuGrid(sudoku);
        saveToStorage(sudoku);
    }
}

async function solveSudoku() {
    console.log("solve popup");
    let sudokuFromGrid = await readSudokuGrid();
    let solvelSudoku = await playSudoku(sudokuFromGrid);

    if (solvelSudoku != undefined) {
        updateSudokuGrid({ resp: solvelSudoku });
        saveToStorage(solvelSudoku);
    }
}

async function exportSudoku() {
    console.log("export popup");
    let sudokuFromGrid = await readSudokuGrid();
    let msg = { txt: "export", sudoku: sudokuFromGrid }
    sendToContent(msg);
}

function clearSudokuGrid() {
    console.log("clear sudoku");
    updateSudokuGrid({ resp: [] });
}

function saveToStorage(value) {
    chrome.storage.local.set({ sudoku: value }, function () {
        console.log('Sudoku is set to ' + value);
    });
}

function getFromStorage() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['sudoku'], function (result) {
            console.log('Settings retrieved', result.sudoku);
            const error = false;
            if (!error) {
                resolve({ resp: result.sudoku });
            } else {
                reject('Error: something went wrong');
            }
        });
    })
}

window.addEventListener("load", function () {
    getFromStorage()
        .then((response) => {
            updateSudokuGrid(response);
        })
        .catch((err) => console.log(err));
});

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

window.addEventListener("load", function () {
    let el = document.getElementById("clear");
    el.addEventListener("click", clearSudokuGrid);
});
