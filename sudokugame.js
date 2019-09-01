//const functions = require('./sudokusolver');
import { functions } from './sudokusolver.js';

// const sudokuprint = require('./sudokuprint');
// const sudokudata = require('./sudoku-data');
// const sudoku = sudokudata.correct[1];

async function playSudoku(sudoku) {

    let valid = await functions.validateSudoku(sudoku);

    if (!valid) {
        throw ("Sudoku no valid!");
    }

    return solveSudoku(sudoku);
}

async function solveSudoku(sudoku) {
    let nextFreeSlot = functions.getNextFreeSlot(sudoku);
    if (nextFreeSlot === null) {
        return sudoku;
    }

    let availableValues = functions.getAvailableValues(sudoku, nextFreeSlot);
    let candidatePromises = [];

    for (let value of availableValues) {
        let candidate = [...sudoku];
        candidate[nextFreeSlot] = value;
        let candidatesBestChildPromise = solveSudoku(candidate);
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
        if (bestCandidate === undefined || functions.getAvailableValues(bestCandidate).length > functions.getAvailableValues(i).length) {
            bestCandidate = i;
        }
    }
    return bestCandidate;
}

export { playSudoku, solveSudoku };
//module.exports = playSudoku;