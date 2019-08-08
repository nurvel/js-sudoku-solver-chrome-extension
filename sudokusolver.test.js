const sudokusolver = require('./sudokusolver');

const sudoku = [
    8, , , 1, 3, , , 2, ,
    2, , , , , 6, 1, , 9,
    , 9, , , , , 5, , 3,
    5, , 9, , 7, , 6, , 2,
    , , 2, , , , 8, , ,
    1, , 7, , 8, , 9, , 4,
    4, , 3, , , , , 5, ,
    9, , 5, 6, , , , , 8,
    , 7, , , 4, 2, , , 1
];

const sudokuFilledWrong = [
    , 3, 5, 6, 1, 4, 8, 9, 2,
    8, 4, 2, 9, 7, 3, 5, 6, 1,
    9, 6, 1, 2, 8, 5, 3, 7, 4,
    7, , , , , , , , ,
    , , , , , , , , ,
    , , , , , , , , ,
    , , , , , , , , ,
    , , , , , , , , ,
    , , , , , , , ,
];

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
    expect(sudokusolver.nextFreeSlot(sudoku)).toBe(1);
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
