const process = require('process');

let sudoku = [8, 5, 6, 1, 3, 9, 4, 2, 7, 2, 3, 4, 7, 5, 6, 1, 8, 9, 7, 9, 1, 4, 2, 8, 5, 6, 3, 5, 8, 9, 3, 7, 4, 6, 1, 2, 3, 4, 2, 9, 6, 1, 8, 7, 5, 1, 6, 7, 2, 8, 5, 9, 3, 4, 4, 1, 3, 8, 9, 7, 2, 5, 6, 9, 2, 5, 6, 1, 3, 7, 4, 8, 6, 7, 8, 5, 4, 2, 3, 9, 1];

function printSudoku(sudoku) {


    for (let i = 0; i < sudoku.length; i++) {

        process.stdout.write(sudoku[i] + " ");

        if ((i + 1) % 9 == 0) {
            process.stdout.write("\n");
        }

        if ((i + 1) % 3 == 0 && (i + 1) % 9 != 0) {
            process.stdout.write("| ");
        }

        if ((i + 1) % 27 == 0 && i != 80) {
            process.stdout.write("---------------------\n");
        }
    }
}

printSudoku(sudoku);