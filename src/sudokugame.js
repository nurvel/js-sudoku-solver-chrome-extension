import { functions } from './sudokusolver.js';

async function playSudoku(sudoku) {
	console.log('Start validate ');

	let valid = await functions.validateSudoku(sudoku);
	if (!valid) {
		console.log(sudoku);
		throw 'Sudoku not valid!';
	}

	let freeslots = functions.totalFreeSlots(sudoku);
	console.log(freeslots);
	if (freeslots >= 55) {
		console.log(sudoku);
		throw 'No evil sudokus please :/';
	}

	console.log('Start solve');
	// DIFFERENT ALGOS AVAILABLE BELOW: backTracking with and without recursion
	let solvedSudoku = await solveSudoku(sudoku);
	console.log('End solve');
	console.log(solvedSudoku);
	
	return solvedSudoku;
}

async function solveSudoku(sudoku) {
	// console.log("start solveSudoku");

	if (functions.totalFreeSlots(sudoku) === 0) {
		console.log('Found solution: ' + sudoku);
		return sudoku;
	}

	let nextFreeSlot = functions.getNextFreeSlot(sudoku);
	if (nextFreeSlot === null) {
		console.log('No more solutions to test - unresolved');
		return sudoku;
	}

	let availableValues = functions.getAvailableValues(sudoku, nextFreeSlot);
	let candidatePromises = [];

	for (let value of availableValues) {
		let candidate = [ ...sudoku ];
		candidate[nextFreeSlot] = value;
		let candidatesBestChildPromise = solveSudoku(candidate);
		candidatePromises.push(candidatesBestChildPromise);
	}

	let candidates = await Promise.all(candidatePromises);
	let bestCandidate = getBestCandidate(candidates);
	return bestCandidate;
}

function getBestCandidate(candidates) {
	let bestCandidate;
	for (let i of candidates) {
		if (i === undefined) {
			continue;
		}
		if (
			bestCandidate === undefined ||
			functions.getAvailableValues(bestCandidate).length > functions.getAvailableValues(i).length
		) {
			bestCandidate = i;
		}
	}
	return bestCandidate;
}

async function solveBackTracking(sudoku) {
	try {
		if (functions.getNextFreeSlot(sudoku) === null) {
			console.log('Found solution: ' + sudoku);
			return sudoku;
		}

		let nextFreeSlot = functions.getNextFreeSlot(sudoku);
		let availableValues = functions.getAvailableValues(sudoku, nextFreeSlot);

		for (let availableValue of availableValues) {
			sudoku[nextFreeSlot] = availableValue;

			let solution = await solveBackTracking(sudoku);

			if (solution) {
				return sudoku;
			} else {
				sudoku[nextFreeSlot] = undefined;
			}
		}
	} catch (error) {
		console.log('Error: ' + error);
		reject('I made an error :/ : ' + error);
	}
}

async function solveBackTrackingNonRecursive(inputSudoku) {
	let sudoku = [ ...inputSudoku ];

	let lockedOrgindexes = [];
	for (let i = 0; i < sudoku.length; i++) {
		if (sudoku[i] != null) {
			lockedOrgindexes.push(i);
		}
	}

	let pointer = 0;
	let solved = false;

	while (!solved) {
		if (functions.isValidValue(sudoku, pointer) || lockedOrgindexes.includes(pointer)) {
			//console.log("value " + sudoku[pointer] + " OK in index " + pointer + " - move to next pointer");
			pointer++;
		} else {
			sudoku[pointer] = sudoku[pointer] == null ? 1 : sudoku[pointer] + 1;
			//console.log("increment value in index " + pointer + " to " + sudoku[pointer]);
		}

		if (sudoku[pointer] > 9) {
			//console.log("index " + pointer + " higher than 9 : " + sudoku[pointer]);
			sudoku[pointer] = undefined;
			pointer--;
			while (lockedOrgindexes.includes(pointer)) {
				pointer--;
			}
			sudoku[pointer] = sudoku[pointer] + 1;
			//console.log("increment previous non-locked index " + pointer + " to value " + sudoku[pointer]);
		}

		if (functions.totalFreeSlots(sudoku) === 0 && functions.isValidValue(sudoku, pointer)) {
			console.log('Found solution: ' + sudoku);
			solved = true;
			break;
		}
	}

	return sudoku;
}

export { playSudoku, solveSudoku, solveBackTracking, solveBackTrackingNonRecursive };
//module.exports = playSudoku;