const sudokusolver = require('./sudokusolver');
const sudokuprint = require('./sudokuprint');
const sudokudata = require('./sudoku-data');

const sudoku = sudokudata.correct[2];

// console.log(sudoku);
var testijuttu = 0;

async function playSudoku(sudoku) {

    let nextFreeSlot = sudokusolver.nextFreeSlot(sudoku);
    if (nextFreeSlot === null) {
        testijuttu = testijuttu + 1;
        return sudoku;
    }

    let availableValues = sudokusolver.getAvailableValues(sudoku, nextFreeSlot);
    let candidatePromises = [];

    for (let value of availableValues) {
        let candidate = [...sudoku];
        candidate[nextFreeSlot] = value;
        let candidatesBestChildPromise = playSudoku(candidate);
        candidatePromises.push(candidatesBestChildPromise);
    }

    let candidates = await Promise.all(candidatePromises);
    let bestCandidate = getBestCandidate(candidates);

    return bestCandidate;
}

function getBestCandidate(candidates) {
    let bestCandidate;
    for (let i of candidates) {
        if (i === undefined) { continue; }
        if (bestCandidate === undefined || sudokusolver.getAvailableValues(bestCandidate).length > sudokusolver.getAvailableValues(i).length) {
            bestCandidate = i;
        }
    }
    return bestCandidate;
}

playSudoku(sudoku)
    .then((solved) => {
        sudokuprint(solved);
        console.log("kväs: " + testijuttu);
    })
    .catch((err) => console.log(err));

module.exports = {
    playSudoku: playSudoku,
    getBestCandidate: getBestCandidate
}