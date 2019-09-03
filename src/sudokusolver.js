//const process = require('process');

const possibleValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
const subGridCoordinates = [
	[ 0, 1, 2, 9, 10, 11, 18, 19, 20 ],
	[ 3, 4, 5, 12, 13, 14, 21, 22, 23 ],
	[ 6, 7, 8, 15, 16, 17, 24, 25, 26 ],
	[ 27, 28, 29, 36, 37, 38, 45, 46, 47 ],
	[ 30, 31, 32, 39, 40, 41, 48, 49, 50 ],
	[ 33, 34, 35, 42, 43, 44, 51, 52, 53 ],
	[ 54, 55, 56, 63, 64, 65, 72, 73, 74 ],
	[ 57, 58, 59, 66, 67, 68, 75, 76, 77 ],
	[ 60, 61, 62, 69, 70, 71, 78, 79, 80 ]
];

const functions = {
	totalFreeSlots: (sudoku) => {
		let undef = 0;
		for (let i = 0; i <= 80; i++) {
			if (sudoku[i] === undefined) {
				undef++;
			}
		}
		return undef;
	},
	getNextFreeSlot: (sudoku) => {
		for (let i = 0; i < sudoku.length; i++) {
			if (sudoku[i] === undefined) {
				return i;
			}
		}
		return null;
	},
	rowIndex: (indx) => {
		return Math.floor(indx / 9);
	},
	columnIndex: (indx) => {
		return indx % 9;
	},
	subgridIndex: (indx) => {
		for (let i = 0; i < subGridCoordinates.length; i++) {
			if (subGridCoordinates[i].includes(indx)) {
				return i;
			}
		}
	},
	getAvailableValues: (sudoku, indx) => {
		let collidingValues = functions.getCollidingValues(sudoku, indx);
		return possibleValues.filter((value) => {
			return !collidingValues.includes(value);
		});
	},
	getCollidingValues: (sudoku, indx) => {
		let values = [];
		for (let i = 0; i < sudoku.length; i++) {
			if (functions.collidingIndex(indx, i)) {
				values.push(sudoku[i]);
			}
		}
		return values;
	},
	collidingIndex: (indx, indx2) => {
		if (
			functions.rowIndex(indx) === functions.rowIndex(indx2) ||
			functions.columnIndex(indx) === functions.columnIndex(indx2) ||
			functions.subgridIndex(indx) === functions.subgridIndex(indx2)
		) {
			return true;
		}
		return false;
	},
	allEmptyIndexesHasPossibleValues: (sudoku) => {
		for (let i of sudoku) {
			let available = functions.getAvailableValues(sudoku, i);
			if (i == undefined && available.length === 0) {
				return false;
			}
		}
		return true;
	},
	noDublicatesInArray: (arr) => {
		let uniqueL = arr.filter(function(value, index, self) {
			return self.indexOf(value) === index;
		});
		return arr.length === uniqueL.length;
	},
	validateSudoku: async (sudoku) => {
		// TODO: Refactor - extract method

		return new Promise((resolve, reject) => {
			try {
				if (functions.totalFreeSlots(sudoku) === 81) {
					resolve(false);
				}
				// 1. subgrids have on only unique values
				// 2. rows have only unique values
				// 3. columns have only unique values
				let tepRows = [ [], [], [], [], [], [], [], [], [] ];
				let tempColumns = [ [], [], [], [], [], [], [], [], [] ];
				let tempSubGrids = [ [], [], [], [], [], [], [], [], [] ];
				// 4. row & clumn stack has max 3
				let tempRowArray = [ [], [], [] ];
				let tempColumnArray = [ [], [], [] ];

				// fill values from sudoku to temp arrays (expext)
				for (let i = 0; i < 81; i++) {
					if (sudoku[i] != undefined) {
						let row = functions.rowIndex(i);
						tepRows[row].push(sudoku[i]);

						let column = functions.columnIndex(i);
						tempColumns[column].push(sudoku[i]);

						let subG = functions.subgridIndex(i);
						tempSubGrids[subG].push(sudoku[i]);

						let indexVal = sudoku[i];
						// get row/colum stack (0-2)
						let rowS = functions.getRowStack(i);
						let columnS = functions.getColumnStack(i);
						// set value how many times has the value appeared
						let tempR = parseInt(tempRowArray[rowS][indexVal]);
						tempRowArray[rowS][indexVal] = isNaN(tempR) ? 1 : tempR + 1;
						let tempC = parseInt(tempColumnArray[columnS][indexVal]);
						tempColumnArray[columnS][indexVal] = isNaN(tempC) ? 1 : tempC + 1;
					}
				}

				// TEST FOR VALID
				let valid = true;

				for (let i = 0; i < tepRows.length; i++) {
					if (
						!functions.noDublicatesInArray(tepRows[i]) ||
						!functions.noDublicatesInArray(tempColumns[i]) ||
						!functions.noDublicatesInArray(tempSubGrids[i])
					) {
						valid = false;
					}
				}

				for (let i = 0; i < tempRowArray.length; i++) {
					for (let x = 0; x < tempRowArray[i].length; x++) {
						if (tempRowArray[i][x] > 3) {
							valid = false;
						}
					}
				}
				for (let i = 0; i < tempColumnArray.length; i++) {
					for (let x = 0; x < tempColumnArray[i].length; x++) {
						if (tempColumnArray[i][x] > 3) {
							valid = false;
						}
					}
				}

				resolve(valid);
			} catch (error) {
				reject('Error when validating: ' + error);
			}
		});
	},
	isValidValue: (sudoku, index) => {
		let value = sudoku[index];
		let colliding = functions.getCollidingValues(sudoku, index);
		var countColliding = 0;
		colliding.forEach((x) => x === value && countColliding++);
		return countColliding < 2 && possibleValues.includes(value);
	},
	getRowStack: (index) => {
		let ri = functions.rowIndex(index);
		if (ri >= 0 && ri <= 2) {
			return 0;
		}
		if (ri >= 3 && ri <= 5) {
			return 1;
		}
		if (ri >= 6 && ri <= 8) {
			return 2;
		}
	},
	getColumnStack: (index) => {
		let ci = functions.columnIndex(index);
		if (ci >= 0 && ci <= 2) {
			return 0;
		}
		if (ci >= 3 && ci <= 5) {
			return 1;
		}
		if (ci >= 6 && ci <= 8) {
			return 2;
		}
	}
};

//module.exports = functions;
export { functions };
