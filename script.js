// HTML elements
const grid = document.querySelector('.grid');
const colorsPalette = document.querySelector('.colors');
const currentColorSelector = document.querySelector('.current-color');

const rgbRed = document.querySelector('#rgb-red');
const rgbGreen = document.querySelector('#rgb-green');
const rgbBlue = document.querySelector('#rgb-blue');

// Functions

function setGrid(size)
{
    // Add squares
    let line, square;

    for (let row = 0; row < size; row++)
    {
        line = document.createElement('div');
        line.classList.add('line');

        for (let col = 0; col < size; col++)
        {
            square = document.createElement('div');
            square.classList.add('square');

            line.appendChild(square);
        }

        grid.appendChild(line);
    }
}

// Event listeners


// Grid setup
let gridSize = 16;

setGrid(gridSize);
