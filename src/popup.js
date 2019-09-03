//const playSudoku = require('./sudokugame.js');
import { playSudoku } from './sudokugame.js';

import './styles/style.css';
import './img/icon_128.png';
import './img/icon.png';

let sudokuGridCSSselector = '.sudoku-grid';

async function sendToContent(action) {
	return new Promise((resolve, reject) => {
		try {
			console.log('sendToContent');
			let params = {
				active: true,
				currentWindow: true
			};

			chrome.tabs.query(params, (tabs) => {
				chrome.tabs.sendMessage(tabs[0].id, action, (response) => {
					console.log('res ' + response);
					resolve(response);
				});
			});
		} catch (error) {
			reject('Error in sendContent');
		}
	});
}

function updateSudokuGrid(sudoku) {
	console.log('Update sudoku grid ' + sudoku.resp);
	errorVisibility('hidden');
	let extensionSudokuGrid = document.querySelectorAll(sudokuGridCSSselector);
	for (let i = 0; i < extensionSudokuGrid.length; i++) {
		if (sudoku.resp[i] != null) {
			extensionSudokuGrid[i].innerHTML = sudoku.resp[i];
		} else {
			extensionSudokuGrid[i].innerHTML = '';
		}
	}
}

async function readSudokuGrid() {
	return new Promise((resolve, reject) => {
		console.log('Read sudoku from popup grid');
		errorVisibility('hidden');
		try {
			let extensionSudokuGrid = document.querySelectorAll(sudokuGridCSSselector);
			let sudoku = [];
			for (let i = 0; i < extensionSudokuGrid.length; i++) {
				let value = extensionSudokuGrid[i].innerHTML;
				value = value === '' ? undefined : parseInt(value);
				sudoku.push(value);
			}
			console.log('sudo length: ' + sudoku.length);
			resolve(sudoku);
		} catch (error) {
			reject('Error reading popup sudoku grid - ' + error);
		}
	});
}

async function importSudoku() {
	console.log('import popup');
	errorVisibility('hidden');
	let msg = { txt: 'import' };
	let sudoku = await sendToContent(msg);

	if (sudoku != undefined) {
		updateSudokuGrid(sudoku);
		saveToStorage(sudoku.resp);
	}
}

async function solveSudoku() {
	console.log('solve popup');
	errorVisibility('hidden');

	let sudokuFromGrid = await readSudokuGrid();

	try {
		let solvelSudoku = await playSudoku(sudokuFromGrid);
		if (solvelSudoku != undefined) {
			updateSudokuGrid({ resp: solvelSudoku });
			saveToStorage(solvelSudoku);
		}
	} catch (error) {
		errorVisibility('visible', error);
		console.error('Sudoku not valid - cannot solve - ' + error);
	}
}

async function exportSudoku() {
	console.log('export popup');
	errorVisibility('hidden');
	let sudokuFromGrid = await readSudokuGrid();
	let msg = { txt: 'export', sudoku: sudokuFromGrid };
	sendToContent(msg);
}

function clearSudokuGrid() {
	console.log('clear sudoku');
	errorVisibility('hidden');
	updateSudokuGrid({ resp: [] });
	saveToStorage([]);
}

function saveToStorage(value) {
	chrome.storage.local.set({ sudoku: value }, function() {
		console.log('Sudoku is set to ' + value);
	});
}

function getFromStorage() {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get([ 'sudoku' ], function(result) {
			console.log('Settings retrieved', result.sudoku);
			const error = false;
			if (!error) {
				resolve({ resp: result.sudoku });
			} else {
				reject('Error: something went wrong');
			}
		});
	});
}

async function updateStateAfterInput() {
	console.log('updateStateAfterInput');
	let sudokuFromGrid = await readSudokuGrid();
	saveToStorage(sudokuFromGrid);
	updateSudokuGrid(sudokuFromGrid);
}

function numberSelectorPosition(event) {
	let numberSelectorDOM = document.getElementsByClassName('number-inputter')[0];
	numberSelectorDOM.style.left = event.clientX - 50 + 'px';
	numberSelectorDOM.style.top = event.clientY - 50 + 'px';
	numberSelectorDOM.style.visibility = 'visible';
	return event.target.id;
}

// updated grid when pop-up opens
window.addEventListener('load', function() {
	getFromStorage()
		.then((response) => {
			updateSudokuGrid(response);
		})
		.catch((err) => console.log(err));
});

window.addEventListener('load', function() {
	let el = document.getElementById('import');
	el.addEventListener('click', importSudoku);
});

window.addEventListener('load', function() {
	let el = document.getElementById('solve');
	el.addEventListener('click', solveSudoku);
});

window.addEventListener('load', function() {
	let el = document.getElementById('export');
	el.addEventListener('click', exportSudoku);
});

window.addEventListener('load', function() {
	let el = document.getElementById('clear');
	el.addEventListener('click', clearSudokuGrid);
});

window.addEventListener('load', function() {
	let inputs = document.querySelectorAll('input');
	inputs.forEach((inputField) => {
		inputField.addEventListener('click', updateStateAfterInput);
	});
});

function handlePopUpInput(element) {
	console.log('openPopUp called');
	let elems = document.getElementsByClassName('nr-input');
	for (let e of elems) {
		e.onclick = (event) => updateValueAfterClick(event, element);
	}
}

function updateValueAfterClick(event, target) {
	console.log(event);
	let inputValue = event.srcElement.innerHTML;
	switch (inputValue) {
		case '-':
			document.getElementById(target).innerHTML = '';
			break;
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			document.getElementById(target).innerHTML = inputValue;
			break;
		default:
			console.error('Error updating sudoku grid with value: ' + inputValue);
			break;
	}
	document.getElementsByClassName('number-inputter')[0].style.visibility = 'hidden';
}

window.addEventListener('load', function() {
	let inputs = document.getElementsByClassName('sudoku-grid');

	for (let e of inputs) {
		e.addEventListener('click', (event) => {
			let element = numberSelectorPosition(event);
			this.console.log(element);
			handlePopUpInput(element);
		});
	}
});

function errorVisibility(visibility, msg) {
	if (msg == null) {
		document.getElementsByClassName('error-msg')[0].innerHTML = 'Error - sudoku is not valid';
	} else {
		document.getElementsByClassName('error-msg')[0].innerHTML = msg;
	}

	document.getElementsByClassName('error-msg')[0].style.visibility = visibility;
}