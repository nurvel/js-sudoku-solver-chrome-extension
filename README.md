# Chrome Extension Sudoku Solver

## Functionalities
- Input sudoku
    - trough UI
    - import from sudoku puzzle site (http://www.free-sudoku.com)
- Solve and validate sudoku with a click of a button
- Export the solved sudoku back to website (http://www.free-sudoku.com)

## Interesting stuff
- Sudoku solver algorithms sudokugame.js
    - recursive
    - backtracking with recursion
    - backtracking without recursion
- Chrome Extension implementation
    - DOM scraping and manipulation

## Try it out
Extension is waiting to be released in Chrome App Store.
In the mean while local testing is possible as follows.

1. clone repo
2. npm install
3. npm run build
4. in Chrome navigate to chrome://extensions/
5. enable developer mode
6. "Load Unpacked" and navigate to dist -directory created by build
7. Enjoy!