// HTML elements
const grid = document.querySelector('.grid');
let gridSquares, gridLines;
const colorsPalette = document.querySelector('.colors');
const currentColorSelector = document.querySelector('.current-color');

const rgbRed = document.querySelector('#rgb-red');
const rgbGreen = document.querySelector('#rgb-green');
const rgbBlue = document.querySelector('#rgb-blue');

// Variables

let gridSize = 16;
let color = 'red';

// Functions

function resetGrid()
{
    if (gridLines === undefined || gridLines === null) return;
    gridLines.forEach(line => grid.removeChild(line));
}

function setGrid(size)
{
    gridSize = size;

    resetGrid();

    // Add squares
    let line, square;

    for (let row = 0; row < gridSize; row++)
    {
        line = document.createElement('div');
        line.classList.add('line');

        for (let col = 0; col < gridSize; col++)
        {
            square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('data-id', `${col + (gridSize*row)}`);

            line.appendChild(square);
        }

        grid.appendChild(line);
    }

    gridLines = document.querySelectorAll('.grid div.line');
    gridSquares = document.querySelectorAll('.grid div.square');

    setSquaresListeners();
}

function paintSquare(e)
{
    this.style['background-color'] = color;
}

// Event listeners

function setSquaresListeners()
{
    gridSquares.forEach(square => square.addEventListener('mouseover', paintSquare));
}

// Grid setup

setGrid(gridSize);
