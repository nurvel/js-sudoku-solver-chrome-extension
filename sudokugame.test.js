import { solveSudoku } from 'sudokugame.js';
const sudokudata = require('./sudoku-data');
//const playSudoku = require('./sudokugame');

const sudoku = sudokudata.testCorrect[0];
const sudokuFilledWrong = sudokudata.testWrong[0];

test('Test solver to return 81 values', async () => {
    expect.assertions(1);
    let solvedSudoku = await solveSudoku(sudoku);
    expect(solvedSudoku.length).toBe(81);
});

test('Test solver to return every value 9 times', async () => {
    expect.assertions(9);
    let solvedSudoku = await solveSudoku(sudoku);

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