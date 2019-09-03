import { solveSudoku, solveBackTracking, solveBackTrackingNonRecursive } from '../src/sudokugame.js';
const sudokudata = require('./sudoku-data');
const printSudoku = require('../src/sudokuprint');

//const playSudoku = require('./sudokugame');

const sudoku = sudokudata.testCorrect[0];
const sudokuFilledWrong = sudokudata.testWrong[0];
const evil = sudokudata.evil;
const juukeli = sudokudata.juukeli;



test('Test solver to return 81 values', async () => {
    expect.assertions(1);
    let solvedSudoku = await solveSudoku(evil);
    //console.log("print solved from test");
    printSudoku(solvedSudoku);
    expect(solvedSudoku.length).toBe(81);
});

test('Test solver to return every value 9 times', async () => {
    expect.assertions(9);
    let solvedSudoku = await solveSudoku(evil);
    //console.log("print solved from test");
    printSudoku(solvedSudoku);

    let one = solvedSudoku.filter(x => x == 1);
    let two = solvedSudoku.filter(x => x == 2);
    let tree = solvedSudoku.filter(x => x == 3);
    let four = solvedSudoku.filter(x => x == 4);
    let five = solvedSudoku.filter(x => x == 5);
    let six = solvedSudoku.filter(x => x == 6);
    let seven = solvedSudoku.filter(x => x == 7);
    let eigth = solvedSudoku.filter(x => x == 8);
    let nine = solvedSudoku.filter(x => x == 9);

    expect(one.length).toBe(9);
    expect(two.length).toBe(9);
    expect(tree.length).toBe(9);
    expect(four.length).toBe(9);
    expect(five.length).toBe(9);
    expect(six.length).toBe(9);
    expect(seven.length).toBe(9);
    expect(eigth.length).toBe(9);
    expect(nine.length).toBe(9);

});

test('Backtracking algo - Test solver to return 81 values', async () => {
    expect.assertions(1);
    let solvedSudoku = await solveBackTracking(sudoku);
    expect(solvedSudoku.length).toBe(81);
});


test('Backtracking algo - Test solver to return every value 9 times', async () => {
    expect.assertions(9);
    let solvedSudoku = await solveBackTracking(sudoku);

    let one = solvedSudoku.filter(x => x == 1);
    let two = solvedSudoku.filter(x => x == 2);
    let tree = solvedSudoku.filter(x => x == 3);
    let four = solvedSudoku.filter(x => x == 4);
    let five = solvedSudoku.filter(x => x == 5);
    let six = solvedSudoku.filter(x => x == 6);
    let seven = solvedSudoku.filter(x => x == 7);
    let eigth = solvedSudoku.filter(x => x == 8);
    let nine = solvedSudoku.filter(x => x == 9);

    expect(one.length).toBe(9);
    expect(two.length).toBe(9);
    expect(tree.length).toBe(9);
    expect(four.length).toBe(9);
    expect(five.length).toBe(9);
    expect(six.length).toBe(9);
    expect(seven.length).toBe(9);
    expect(eigth.length).toBe(9);
    expect(nine.length).toBe(9);

});

 

test('Backtracking algo  EVIL- Test solver to return 81 values', async () => {
    // console.log(evil);
    expect.assertions(1);
    let solvedSudoku = await solveBackTracking(evil);
    //printSudoku(solvedSudoku);

    expect(solvedSudoku.length).toBe(81);
});


test('Backtracking algo  EVIL - Test solver to return every value 9 times', async () => {
    expect.assertions(9);
    let solvedSudoku = await solveBackTracking(evil);
    //printSudoku(solvedSudoku);

    let one = solvedSudoku.filter(x => x == 1);
    let two = solvedSudoku.filter(x => x == 2);
    let tree = solvedSudoku.filter(x => x == 3);
    let four = solvedSudoku.filter(x => x == 4);
    let five = solvedSudoku.filter(x => x == 5);
    let six = solvedSudoku.filter(x => x == 6);
    let seven = solvedSudoku.filter(x => x == 7);
    let eigth = solvedSudoku.filter(x => x == 8);
    let nine = solvedSudoku.filter(x => x == 9);

    expect(one.length).toBe(9);
    expect(two.length).toBe(9);
    expect(tree.length).toBe(9);
    expect(four.length).toBe(9);
    expect(five.length).toBe(9);
    expect(six.length).toBe(9);
    expect(seven.length).toBe(9);
    expect(eigth.length).toBe(9);
    expect(nine.length).toBe(9);

});


test('backtrack nonrecuresive', async () => {
    expect.assertions(1);
    let solvedSudoku = await solveBackTrackingNonRecursive(sudoku);
    printSudoku(sudoku);
    printSudoku(solvedSudoku);
    expect(solvedSudoku.length).toBe(81);
});

test('backtrack nonrecuresive juukeli', async () => {
    expect.assertions(1);
    let solvedSudoku = await solveBackTrackingNonRecursive(juukeli);
    printSudoku(juukeli);
    printSudoku(solvedSudoku);
    expect(solvedSudoku.length).toBe(81);
});

// solves in 176.604s
test('backtrack nonrecuresive evil', async () => {
    console.log(evil);
    console.log("starting test");

    expect.assertions(1);

    let solvedSudoku = await solveBackTrackingNonRecursive(evil);
    printSudoku(sudoku);
    printSudoku(solvedSudoku);
    expect(solvedSudoku.length).toBe(81);
});
