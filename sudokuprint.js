const process = require('process');

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

module.exports = printSudoku;