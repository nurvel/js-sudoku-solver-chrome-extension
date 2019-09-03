//const playSudoku = require('./sudokugame.js');
import { playSudoku } from '/sudokugame.js';

let sudokuGridCSSselector = 'td input';

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
			extensionSudokuGrid[i].setAttribute('value', sudoku.resp[i]);
		} else {
			extensionSudokuGrid[i].setAttribute('value', '');
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
				let value = extensionSudokuGrid[i].getAttribute('value');
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
	console.log(sudokuFromGrid);

	try {
		let solvelSudoku = await playSudoku(sudokuFromGrid);
		if (solvelSudoku != undefined) {
			updateSudokuGrid({ resp: solvelSudoku });
			saveToStorage(solvelSudoku);
		}
	} catch (error) {
		errorVisibility('visible');
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

	// var active = document.activeElement.tagName;
	// console.log(active);
	// active[0].setAttribute('value', 1);

	let sudokuFromGrid = await readSudokuGrid();
	console.log(sudokuFromGrid);
	saveToStorage(sudokuFromGrid);
	updateSudokuGrid(sudokuFromGrid);
}

function numberSelectorPosition(event) {
	console.log('you clicked me!');
	let numberSelectorDOM = document.getElementsByClassName('number-inputter')[0];
	let x = event.clientX;
	let y = event.clientY;
	numberSelectorDOM.style.left = x + 'px';
	numberSelectorDOM.style.top = y + 'px';
	numberSelectorDOM.style.visibility = 'visible';
    console.log(event.target.id);
	return event.target.id;
}

function inputValue(value) {
	console.log('my value: ' + input);
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

function openPopUp(element) {
	console.log('openPopUp called');
	//let numberSelectorDOM = document.getElementsByClassName('number-inputter')[0];
    let elems = document.getElementsByClassName('nr-input');
    for(let e of elems){
        e.onclick = () => console.log('hihhihih, kutittaa');
        e.onclick = (event) => updateValueAfterClick(event, element);
    }

    //document.getElementById('1').onclick = (event) => updateValueAfterClick(1, element);

}

function updateValueAfterClick(event, target) {
    console.log(event);
    document.getElementById(target).innerHTML = event.srcElement.innerHTML;
	document.getElementsByClassName('number-inputter')[0].style.visibility = 'hidden';
}

window.addEventListener('load', function() {
	let inputs = document.getElementsByClassName('testi');
	console.log('moikka' + inputs[0]);
	// inputs[0].addEventListener('click', numberSelectorPosition);

	inputs[0].addEventListener('click', (event) => {
		let element = numberSelectorPosition(event);
		console.log('jii ' + element);
		openPopUp(element);
	});

	// let ins = document.getElementsByClassName('nr-input');
	// for (let index = 0; index < ins.length; index++) {
	// 	ins[index].addEventListener('click', (numberSelectorPosition) => {
	// 		let value = this.innerHTML;
	// 		let position = numberSelectorPosition();
	// 		position.innerHTML = '1';
	// 	});
	// }
});

window.addEventListener('load', function() {
	let inputs = document.getElementsByClassName('nr-input');

	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el;
	}
});

function errorVisibility(visibility) {
	document.getElementsByClassName('error-msg')[0].style.visibility = visibility;
}

// TODO: check state of extention sudoku - update state of local storage? Does not save state if modified after import if toggle extention
