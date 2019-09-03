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

let juttu = [,2,,,4,,,9,,,,,,,7,3,2,,6,,3,8,,,,,,3,,,2,7,,,,9,,,1,,5,,8,,,8,,,,3,9,,,5,,,,,,5,4,,6,,1,7,9,,,,,,,8,,,2,,,1,];

// printSudoku(juttu);
// console.log(juttu.length);

// let testi1 = [,2];
// console.log(testi1.length);

module.exports = printSudoku;