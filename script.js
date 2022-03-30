// HTML elements
const grid = document.querySelector('.grid');
let gridSquares, gridLines;
const colorsPalette = document.querySelector('.palette');
const currentColorSelector = document.querySelector('.current-color');

const rgbInputs = document.querySelectorAll('.rgb input');
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
    let newColorValues = colorValues(newColor);
    newColor = 'rgb(' + newColorValues.join(',') + ')';
    color = newColor;

    currentColorSelector.style['background-color'] = color;

    console.log(this);
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

function colorValues(color)
{
    // NOT MY CODE - look at README.md
    // return array of [r,g,b,a] from any valid color. if failed returns undefined
	if (!color)
		return;
	if (color.toLowerCase() === 'transparent')
		return [0, 0, 0, 0];
	if (color[0] === '#')
	{
		if (color.length < 7)
		{
			// convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
			color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
		}
		return [parseInt(color.substr(1, 2), 16),
			parseInt(color.substr(3, 2), 16),
			parseInt(color.substr(5, 2), 16),
			color.length > 7 ? parseInt(color.substr(7, 2), 16)/255 : 1];
	}
	if (color.indexOf('rgb') === -1)
	{
		// convert named colors
		var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
		var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
		temp_elem.style.color = flag;
		if (temp_elem.style.color !== flag)
			return; // color set failed - some monstrous css rule is probably taking over the color of our object
		temp_elem.style.color = color;
		if (temp_elem.style.color === flag || temp_elem.style.color === '')
			return; // color parse failed
		color = getComputedStyle(temp_elem).color;
		document.body.removeChild(temp_elem);
	}
	if (color.indexOf('rgb') === 0)
	{
		if (color.indexOf('rgba') === -1)
			color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
		return color.match(/[\.\d]+/g).map(function (a)
		{
			return +a
		});
	}
}

// Event listeners

function setSquaresListeners()
{
    gridSquares.forEach(square => square.addEventListener('mouseover', paintSquare));
}

rgbInputs.forEach(rgbInput => {
    rgbInput.addEventListener('input', () => {
        let newColorValues = [];
        
        rgbInputs.forEach(input => {
            if (input.value == '' || isNaN(rgbInput.value)) return;

            let tempValue = parseInt(input.value);
            if (tempValue >= 0 && tempValue <= 255)
                newColorValues.push(input.value);
        });

        if (newColorValues.length === 3)
        {
            let newColor = 'rgb(' + newColorValues.join(',') + ')';
            setColor(newColor);
        }
    });
});

// Grid setup

setGrid(gridSize);
setColorPalette(predefinedColors);
