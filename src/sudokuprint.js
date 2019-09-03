const process = require('process');

function printSudoku(sudoku) {

    for (let i = 0; i < 81; i++) {
        // console.log(i);

        let val = sudoku[i] === undefined ? "." : sudoku[i];
        process.stdout.write(val + " ");

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

    process.stdout.write("\n");
}

module.exports = printSudoku;