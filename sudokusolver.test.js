const functions = require('./sudokusolver');

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


test('Check next empty slot', () => {
    expect(functions.nextFreeSlot(sudoku)).toBe(1);
})

test('Check row of empty slot', () => {
    expect(functions.rowIndex(0)).toBe(0);
    expect(functions.rowIndex(1)).toBe(0);
    expect(functions.rowIndex(9)).toBe(1);
    expect(functions.rowIndex(10)).toBe(1);
    expect(functions.rowIndex(80)).toBe(8);
})

test('Check column of empty slot', () => {
    expect(functions.columnIndex(0)).toBe(0);
    expect(functions.columnIndex(1)).toBe(1);
    expect(functions.columnIndex(9)).toBe(0);
    expect(functions.columnIndex(10)).toBe(1);
    expect(functions.columnIndex(80)).toBe(8);
})

test('Check subgrid of empty slot', () => {
    expect(functions.subgridIndex(0)).toBe(0);
    expect(functions.subgridIndex(1)).toBe(0);
    expect(functions.subgridIndex(3)).toBe(1);
    expect(functions.subgridIndex(10)).toBe(0);
    expect(functions.subgridIndex(80)).toBe(8);
})

test('Check if two indexes collide', () => {
    expect(functions.collidingIndex(0, 2)).toBe(true);
    expect(functions.collidingIndex(0, 9)).toBe(true);
    expect(functions.collidingIndex(0, 13)).toBe(false);
    expect(functions.collidingIndex(8, 80)).toBe(true);
    expect(functions.collidingIndex(0, 80)).toBe(false);
})
