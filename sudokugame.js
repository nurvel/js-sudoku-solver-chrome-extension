//const functions = require('./sudokusolver');
import { functions } from './sudokusolver.js';

// const sudokuprint = require('./sudokuprint');
// const sudokudata = require('./sudoku-data');
// const sudoku = sudokudata.correct[1];

async function playSudoku(sudoku) {

    console.log("start validate " + sudoku.length);
    console.log(sudoku);
    let valid = await functions.validateSudoku(sudoku);
    console.log("end validate " + valid);

    if (!valid) {
        console.log(sudoku);
        throw ("Sudoku not valid!");
    }

    console.log("start solve");
    let solvedSudoku = await solveBackTracking(sudoku);
    console.log("end solve");
    console.log(solvedSudoku);

    return solvedSudoku;
}

async function solveSudoku(sudoku) {
    // console.log("start solveSudoku");

    if (functions.totalFreeSlots(sudoku) === 0) {
        console.log("found solution: " + sudoku.length);
        console.log(sudoku);
        return sudoku;
    }

    let nextFreeSlot = functions.getNextFreeSlot(sudoku);
    if (nextFreeSlot === null) {
        console.log("No more solutions to test");
        console.log(sudoku);
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

// backtracking algo due evil sudokus cause run out of stack
async function solveBackTracking(sudoku) {
    console.log("trying: " + sudoku);

    try {
        if (functions.getNextFreeSlot(sudoku) === null) {
            console.log("Resolved!");
            console.log(sudoku);
            return (sudoku);
        }

        let nextFreeSlot = functions.getNextFreeSlot(sudoku);
        let availableValues = functions.getAvailableValues(sudoku, nextFreeSlot);

        for (let availableValue of availableValues) {
            sudoku[nextFreeSlot] = availableValue;

            let solution = await solveBackTracking(sudoku);

            if (solution) {
                //console.log(solution);
                return (sudoku);
            } else {
                sudoku[nextFreeSlot] = undefined;
            }
        }

    } catch (error) {
        console.log("Bubuu " + error);
        reject("I made an error :/ : " + error);
    }

}

async function solveBackTrackingNonRecursive(sudoku) {

    let solved = false;
    let lockedOrgindexes = (sudoku) => {
        let arr = [];
        for (let i = 0; i < sudoku.length; i++) {
            if (sudoku[i] != null) {
                arr.push[i];
            }
        }
    }


    while (!solved) {

        let nextFreeSlot = functions.getNextFreeSlot(sudoku);


    }



}


export { playSudoku, solveSudoku, solveBackTracking };
//module.exports = playSudoku;