const sudokuURL = 'https://www.websudoku.com/';
const possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
        let juttu = Math.floor((indx % 9) / 10);
        console.log(juttu);
        return juttu;
        return Math.floor(indx % 9.0);
    },
    columnIndex: (indx) = {},
    gridIndex: (indx) = {},
    possibleHorizontalValues: (sudoku) => {
    },
    possibleVerticalValues: () => null,
    possibleGridValues: () => null

}

module.exports = functions;