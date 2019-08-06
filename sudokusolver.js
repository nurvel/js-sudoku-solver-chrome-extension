const sudokuURL = 'https://www.websudoku.com/';


const sudoku = [
    8, , , 1, 3, , , 2, ,
    2, , , , , 6, 1, , 9,
    , 9, , , , , 5, , 3,
    5, , 9, , 7, , 6, , 2,
    , , 2, , , , 8, , ,
    1, , 7, , 8, , 9, , 4,
    4, , 3, , , , , 5, ,
    9, , 5, 6, , , , , 8,
    , 7, , , 4, 2, , , 1];

console.log(sudoku.length);
console.log(sudoku[1]);

const functions = {

    nextFreeSlot: (sudoku) => {
        for (let i = 0; i < sudoku.length; i++) {
            if (sudoku[i] === undefined) {
                return i;
            }
        }
    },
    possibleHorizontal: () => null,
    possibleVertical: () => null,
    possibleGrid:() => null

}

module.exports = functions;