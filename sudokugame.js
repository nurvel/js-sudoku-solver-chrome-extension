const sudokusolver = require('./sudokusolver');
const sudokuprint = require('./sudokuprint');


const sudoku = [
    3, , 9, 5, 7, , 1, , 6,
    , , 5, 8, , , , , ,
    , 6, 2, , 4, , , , 7,
    9, , , , , 7, 5, , ,
    6, , , , 1, , , , 8,
    , , 1, 3, , , , , 2,
    2, , , , 8, , 9, 3, ,
    , , , , , 3, 2, , ,
    4, , 6, , 2, 9, 8, , 5
];

const sudoku2 = [
    8, , , 1, 3, , , 2, ,
    2, , , , , 6, 1, , 9,
    , 9, , , , , 5, , 3,
    5, , 9, , 7, , 6, , 2,
    , , 2, , , , 8, , ,
    1, , 7, , 8, , 9, , 4,
    4, , 3, , , , , 5, ,
    9, , 5, 6, , , , , 8,
    , 7, , , 4, 2, , , 1
];

async function playSudoku(sudoku) {

    let nextFreeSlot = sudokusolver.nextFreeSlot(sudoku);
    if (nextFreeSlot === null) {
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
    .then((solved) => sudokuprint(solved))
    .catch((err) => console.log(err));
