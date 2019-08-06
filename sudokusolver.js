const sudokuURL = 'https://www.websudoku.com/';
const possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const subGridCoordinates = [
    [0, 1, 2, 9, 10, 11, 18, 19, 20],
    [3, 4, 5, 12, 13, 14, 21, 22, 23],
    [6, 7, 8, 15, 16, 17, 24, 25, 26],
    [27, 28, 29, 36, 37, 38, 45, 46, 47],
    [30, 31, 32, 39, 40, 41, 48, 49, 50],
    [33, 34, 35, 42, 43, 44, 51, 52, 53],
    [54, 55, 56, 63, 64, 65, 72, 73, 74],
    [57, 58, 59, 66, 67, 68, 75, 76, 77],
    [70, 61, 62, 69, 70, 71, 78, 79, 80]
]

const functions = {

    nextFreeSlot: (sudoku) => {
        for (let i = 0; i < sudoku.length; i++) {
            if (sudoku[i] === undefined) {
                return i;
            }
        }
    },
    rowIndex: (indx) => {
        return Math.floor(indx / 9);
    },
    columnIndex: (indx) => {
        return indx % 9;
    },
    subgridIndex: (indx) => {
        for (let i = 0; i < subGridCoordinates.length; i++) {
            if (subGridCoordinates[i].includes(indx)) {
                return i;
            }
        }
    },
    possibleValues: (sudoku, indx) => { },
    possibleHorizontalValues: (sudoku, indx) => {
        let row = rowIndex(indx);
    },
    possibleVerticalValues: () => null,
    possibleGridValues: () => null,
    getValues: (sudoku, indx, dimension) => {
        let values = [];
        for (let i = 0; i < sudoku.length; i++) {
            if (collidingIndex(indx, i)) {
                values.push(sudoku[i]);
            }
        }
    },
    test: (x) => { console.log("hello") },
    collidingIndex: (indx, indx2) => {
        // console.log("rowIndex " + typeof possibleValues);
        // console.log("test " + typeof test);
        // functions.test();
        if (functions.rowIndex(indx) === functions.rowIndex(indx2) ||
            functions.columnIndex(indx) === functions.columnIndex(indx2) ||
            functions.subgridIndex(indx) === functions.subgridIndex(indx2)
        ) {
            return true;
        }
        return false;
    }

}

module.exports = functions;