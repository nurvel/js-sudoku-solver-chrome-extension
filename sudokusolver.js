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

    totalFreeSlots: (sudoku) => {
        let defined = sudoku.filter(x => x !== undefined).length;
        return sudoku.length - defined;
    },
    getNextFreeSlot: (sudoku) => {
        for (let i = 0; i < sudoku.length; i++) {
            if (sudoku[i] === undefined) {
                return i;
            }
        }
        return null;
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
    getAvailableValues: (sudoku, indx) => {
        let collidingValues = functions.getCollidingValues(sudoku, indx);
        return possibleValues.filter((value) => {
            return !collidingValues.includes(value);
        });
    },
    getCollidingValues: (sudoku, indx) => {
        let values = [];
        for (let i = 0; i < sudoku.length; i++) {
            if (functions.collidingIndex(indx, i)) {
                values.push(sudoku[i]);
            }
        }
        return values;
    },
    collidingIndex: (indx, indx2) => {
        if (functions.rowIndex(indx) === functions.rowIndex(indx2) ||
            functions.columnIndex(indx) === functions.columnIndex(indx2) ||
            functions.subgridIndex(indx) === functions.subgridIndex(indx2)
        ) {
            return true;
        }
        return false;
    },
    allEmptyIndexesHasPossibleValues: (sudoku) => {
        for (let i of sudoku) {
            let available = functions.getAvailableValues(sudoku, i);
            if (i == undefined && available.length === 0) {
                return false;
            }
        }
        return true;
    },
    validateSudoku: (sudoku) => {

        // 1. subgrids have on only unique values
        // 2. rows have only unique values
        // 3. columns have only unique values

        // row stack has max 3
        // columnstack has max 3



    },
    getSRowStack: (index) => {
        let rowIndex = rowIndex(index);
        if (rowIndex == 0 && rowIndex <= 2) {
            return 0;
        }
        if (rowIndex >= 3 && rowIndex <= 5) {
            return 1;
        }
        if (rowIndex == 6 && rowIndex <= 8) {
            return 2;

        }
    }
    // getColumnStack: (index) => {
    //     let columnIndex = columnIndex(index);
    //     if (columnIndex == 0 && columnIndex <= 2) {
    //         return 0;
    //     }
    //     if (columnIndex >= 3 && columnIndex <= 5) {
    //         return 1;
    //     }
    //     if (columnIndex == 6 && columnIndex <= 8) {
    //         return 2;

    //     }
    // }
}

//module.exports = functions;
export { functions };