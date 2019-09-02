//const functions = require('./sudokusolver.js');
//const sudokusolver = functions;

import { functions } from './sudokusolver.js';
const sudokusolver = functions;

const sudokudata = require('./sudoku-data');
const sudoku = sudokudata.testCorrect[0];
const sudokuFilledWrong = sudokudata.testWrong[0];
const evil = sudokudata.evil;
const juukeli = sudokudata.juukeli;
const debugvalidatation = sudokudata.debugvalidatation;



test('All empty indexes has available values - true', () => {
    let availableValues = sudokusolver.allEmptyIndexesHasPossibleValues(sudoku, 0);
    expect(availableValues).toBe(true);

});

// test('All empty indexes has available values - false', () => {
//     let availableValues = sudokusolver.allEmptyIndexesHasPossibleValues(sudokuFilledWrong, 0);
//     expect(availableValues).toBe(false);
// });


test('Check available values in incorrect sudoku', () => {
    let availableValues = sudokusolver.getAvailableValues(sudokuFilledWrong, 0);
    expect(availableValues.length).toBe(0);
    expect(availableValues).not.toContain(8);
    expect(availableValues).not.toContain(1);
    expect(availableValues).not.toContain(3);
    expect(availableValues).not.toContain(2);
    expect(availableValues).not.toContain(9);
    expect(availableValues).not.toContain(7);
    expect(availableValues).not.toContain(4);
    expect(availableValues).not.toContain(5);
    expect(availableValues).not.toContain(6);
});

test('Total free slots', () => {
    let freeValues = sudokusolver.totalFreeSlots(sudoku);
    expect(freeValues).toBe(47);
})

test('Check available values', () => {
    let availableValues = sudokusolver.getAvailableValues(sudoku, 1);
    expect(availableValues).not.toContain(8);
    expect(availableValues).not.toContain(1);
    expect(availableValues).not.toContain(3);
    expect(availableValues).not.toContain(2);
    expect(availableValues).not.toContain(9);
    expect(availableValues).not.toContain(7);
    expect(availableValues).toContain(4);
    expect(availableValues).toContain(5);
    expect(availableValues).toContain(6);
});

test('Check colliding values with sudoku filled wrong', () => {
    let collidingValues = sudokusolver.getCollidingValues(sudokuFilledWrong, 0);
    expect(collidingValues.length).toBeGreaterThanOrEqual(9);
    expect(collidingValues).toContain(8);
    expect(collidingValues).toContain(1);
    expect(collidingValues).toContain(3);
    expect(collidingValues).toContain(2);
    expect(collidingValues).toContain(9);
    expect(collidingValues).toContain(7);
    expect(collidingValues).toContain(4);
    expect(collidingValues).toContain(5);
    expect(collidingValues).toContain(6);
});

test('Check colliding values', () => {
    let collidingValues = sudokusolver.getCollidingValues(sudoku, 1);
    expect(collidingValues).toContain(8);
    expect(collidingValues).toContain(1);
    expect(collidingValues).toContain(3);
    expect(collidingValues).toContain(2);
    expect(collidingValues).toContain(9);
    expect(collidingValues).toContain(7);
    expect(collidingValues).not.toContain(4);
    expect(collidingValues).not.toContain(5);
    expect(collidingValues).not.toContain(6);
});

test('Check next empty slot', () => {
    expect(sudokusolver.getNextFreeSlot(sudoku)).toBe(1);
});

test('Check row of empty slot', () => {
    expect(sudokusolver.rowIndex(0)).toBe(0);
    expect(sudokusolver.rowIndex(1)).toBe(0);
    expect(sudokusolver.rowIndex(9)).toBe(1);
    expect(sudokusolver.rowIndex(10)).toBe(1);
    expect(sudokusolver.rowIndex(80)).toBe(8);
});

test('Check column of empty slot', () => {
    expect(sudokusolver.columnIndex(0)).toBe(0);
    expect(sudokusolver.columnIndex(1)).toBe(1);
    expect(sudokusolver.columnIndex(9)).toBe(0);
    expect(sudokusolver.columnIndex(10)).toBe(1);
    expect(sudokusolver.columnIndex(80)).toBe(8);
});

test('Check subgrid of empty slot', () => {
    expect(sudokusolver.subgridIndex(0)).toBe(0);
    expect(sudokusolver.subgridIndex(1)).toBe(0);
    expect(sudokusolver.subgridIndex(3)).toBe(1);
    expect(sudokusolver.subgridIndex(10)).toBe(0);
    expect(sudokusolver.subgridIndex(80)).toBe(8);
});

test('Check if two indexes collide', () => {
    expect(sudokusolver.collidingIndex(0, 2)).toBe(true);
    expect(sudokusolver.collidingIndex(0, 9)).toBe(true);
    expect(sudokusolver.collidingIndex(0, 13)).toBe(false);
    expect(sudokusolver.collidingIndex(8, 80)).toBe(true);
    expect(sudokusolver.collidingIndex(0, 80)).toBe(false);
});

test('Test getRowStack by index', () => {
    expect(sudokusolver.getRowStack(0)).toBe(0);
    expect(sudokusolver.getRowStack(8)).toBe(0);
    expect(sudokusolver.getRowStack(26)).toBe(0);
    expect(sudokusolver.getRowStack(27)).toBe(1);
    expect(sudokusolver.getRowStack(53)).toBe(1);
    expect(sudokusolver.getRowStack(54)).toBe(2);
});

test('Test get rowindex', () => {
    expect(sudokusolver.rowIndex(0)).toBe(0);
    expect(sudokusolver.rowIndex(8)).toBe(0);
    expect(sudokusolver.rowIndex(9)).toBe(1);
    expect(sudokusolver.rowIndex(27)).toBe(3);
});


test('Test getColumnStack by index', () => {
    expect(sudokusolver.getColumnStack(0)).toBe(0);
    expect(sudokusolver.getColumnStack(2)).toBe(0);
    expect(sudokusolver.getColumnStack(3)).toBe(1);
    expect(sudokusolver.getColumnStack(5)).toBe(1);
    expect(sudokusolver.getColumnStack(6)).toBe(2);
    expect(sudokusolver.getColumnStack(8)).toBe(2);
});



test('Test validate sudoku - valid input', async () => {
    expect.assertions(1);
    let valid = await sudokusolver.validateSudoku(sudoku);
    expect(valid).toBe(true);
});

test('Test validate sudoku - invalid input', async () => {
    expect.assertions(1);
    let valid = await sudokusolver.validateSudoku(sudokuFilledWrong);
    expect(valid).toBe(false);
});

test('Test validate sudoku - valid input - evil', async () => {
    expect.assertions(1);
    let valid = await sudokusolver.validateSudoku(evil);
    expect(valid).toBe(true);
});


test('Test validate sudoku - valid input - debugvalidatation', async () => {
    expect.assertions(1);
    let valid = await sudokusolver.validateSudoku(debugvalidatation);
    expect(valid).toBe(true);
});
