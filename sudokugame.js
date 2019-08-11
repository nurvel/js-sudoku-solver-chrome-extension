// const sudokusolver = require('./sudokusolver');
// const sudokuprint = require('./sudokuprint');
// const sudokudata = require('./sudoku-data');

// const sudoku = sudokudata.correct[1];
//console.log(sudoku);

async function playSudoku(sudoku) {

    let nextFreeSlot = functions.getNextFreeSlot(sudoku);
    if (nextFreeSlot === null) {
        return sudoku;
    }

    // let allIndexesHasAvailableValues = functions.allEmptyIndexesHasPossibleValues(sudoku);
    // if (!allIndexesHasAvailableValues) {
    //     return sudoku;
    // }

    let availableValues = functions.getAvailableValues(sudoku, nextFreeSlot);
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
        if (bestCandidate === undefined || functions.getAvailableValues(bestCandidate).length > functions.getAvailableValues(i).length) {
            bestCandidate = i;
        }
    }
    return bestCandidate;
}
