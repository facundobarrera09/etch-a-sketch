// HTML elements
const grid = document.querySelector('.grid');
let gridSquares, gridLines;
const colorsPalette = document.querySelector('.palette');
const currentColorSelector = document.querySelector('.current-color');

const rgbRed = document.querySelector('#rgb-red');
const rgbGreen = document.querySelector('#rgb-green');
const rgbBlue = document.querySelector('#rgb-blue');

// Variables and constants

let predefinedColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

let gridSize = 16;
let color = 'none';

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

function setColor(newColor)
{
    console.log(colorValues(newColor));
    let newColorValues = colorValues(newColor);

    color = 'rgb(' + newColorValues.join(',') + ')';
    console.log(color);

    currentColorSelector.style['background-color'] = color;

    rgbRed.value = newColorValues[0];
    rgbGreen.value = newColorValues[1];
    rgbBlue.value = newColorValues[2];
}

function setColorPalette(colors)
{
    predefinedColors = colors;

    // Add squares
    let square;

    for (let x = 0; x < predefinedColors.length; x++)
    {
        square = document.createElement('div');
        square.classList.add('color-square');
        square.setAttribute('data-id', `${x}`);
        square.style['background-color'] = predefinedColors[x];

        square.addEventListener('click', () => {
            setColor(predefinedColors[x]);
        });

        colorsPalette.appendChild(square);
    }
}

const colorValues = color => {
    /**
     * Convert any color string to an [r,g,b,a] array.
     * @author Arjan Haverkamp (arjan-at-avoid-dot-org)
     * @param {string} color Any color. F.e.: 'red', '#f0f', '#ff00ff', 'rgb(x,y,x)', 'rgba(r,g,b,a)', 'hsl(180, 50%, 50%)'
     * @returns {array} [r,g,b,a] array. Caution: returns [0,0,0,0] for invalid color.
     */
    const div = document.createElement('div');
    div.style.backgroundColor = color;
    document.body.appendChild(div);
    let rgba = getComputedStyle(div).getPropertyValue('background-color');
    div.remove();

    if (rgba.indexOf('rgba') === -1) {
        rgba += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
    }

    return rgba.match(/[\.\d]+/g).map(a => {
        return +a
    });
}

// Event listeners

function setSquaresListeners()
{
    gridSquares.forEach(square => square.addEventListener('mouseover', paintSquare));
}

// Grid setup

setGrid(gridSize);
setColorPalette(predefinedColors);
