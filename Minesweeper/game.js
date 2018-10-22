var mycanvas, menu_open, cols, rows, tile_px, grid, totalBees, new_button, easy_button, med_button, hard_button, size_slider, winTime, isWin, isLose, font, hasStarted, timer, fontSize = 30;

function reset()
{
	menu_open = false;
	easy_button.hide();
	med_button.hide();
	hard_button.hide();
	isWin = false;
	isLose = false;
	hasStarted = false;
	tile_px = 40;
	totalBees = Math.floor(cols*rows*0.125);

	// create a canvas the size of the game board
	mycanvas = createCanvas(cols*tile_px+20, rows*tile_px+100);
	mycanvas.parent('gameBox');

	// create 2D array
	grid = create2Darray(cols, rows);

	// fill each tile in 2D array
	for (var i = 0; i < cols; i++)
	{
		for (var j = 0; j < rows; j++)
		{
			grid[i][j] = new Cell(i, j, tile_px);
		}
	}

	// Pick totalBees spots
	var options = [];
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			options.push([i,j]);
		}
	}

	for (var x = 0; x < totalBees; x++){
		var index = floor(random(options.length));
		var choice = options[index];
		var i = choice[0];
		var j = choice[1];
		// Delete the spot where the bee was placed
		options.splice(index, 1);
		grid[i][j].bee = true;
	}



	// count neighboring bees
	for (var i = 0; i < cols; i++)
	{
		for (var j = 0; j < rows; j++)
		{
			grid[i][j].countBees();
		}
	}
}

function preload()
{
	font = loadFont('Minesweeper/heavy_data.ttf');
}

function newGame()
{
	if (!menu_open)
	{
		easy_button.show();
		med_button.show();
		hard_button.show();
		menu_open = true;
	}
	else if (menu_open)
	{
		easy_button.hide();
		med_button.hide();
		hard_button.hide();
		menu_open = false;
	}
}

function easyGame()
{
	rows = 8;
	cols = 8;

	reset();
}

function medGame()
{
	rows = 12;
	cols = 12;

	reset();
}

function hardGame()
{
	rows = 16;
	cols = 16;

	reset();
}

function setup()
{
	textFont(font);
	textSize(fontSize);
	textAlign(CENTER, CENTER);
	menu_open = false;

	new_button = createButton('New Game');
	new_button.parent('gameBox');
	new_button.position(15, 20);
	new_button.mousePressed(newGame);

	easy_button = createButton('Easy');
	easy_button.parent('gameBox');
	easy_button.position(110, 20);
	easy_button.mousePressed(easyGame);
	easy_button.hide();

	med_button = createButton('Medium');
	med_button.parent('gameBox');
	med_button.position(165, 20);
	med_button.mousePressed(medGame);
	med_button.hide();

	hard_button = createButton('Hard');
	hard_button.parent('gameBox');
	hard_button.position(238, 20);
	hard_button.mousePressed(hardGame);
	hard_button.hide();

	easyGame();
}	

function create2Darray(c, r)
{
	// create array of rows x cols
	var matrix = new Array(c);
	for (var i = 0; i < r; i++)
	{
		matrix[i] = new Array(r);
	}
	return matrix;
}

function GameOver()
{
	isLose = true;

	if (hasStarted)
	{
	var end = new Date();
	endTime = (end.getTime() - timer.getTime()) / 1000;
	hasStarted = false;
	}

	for (var i = 0; i < cols; i++)
	{
		for (var j = 0; j < rows; j++)
		{
			grid[i][j].open = true;
		}
	}
}

function checkForWin()
{
	var bee_count = 0;
	var num_count = 0;

	for (var i = 0; i < cols; i++)
	{
		for (var j = 0; j < rows; j++)
		{
			if (grid[i][j].bee && grid[i][j].flag && !grid[i][j].open)
			{
				bee_count++;
			}
			if (!grid[i][j].bee && grid[i][j].open)
			{
				num_count++;
			}
		}
	}

	if (bee_count == totalBees && num_count == (rows*cols)-totalBees)
	{
		if (hasStarted)
		{
		var end = new Date();
		endTime = (end.getTime() - timer.getTime()) / 1000;
		hasStarted = false;
		}

		return true;
	}
	else
	{
		return false;
	}
}

function mousePressed()
{

	if (!isWin && !isLose && !menu_open)
	{
		for (var i = 0; i < cols; i++)
		{
			for (var j = 0; j < rows; j++)
			{
				if (grid[i][j].contains(mouseX, mouseY))
				{
					if (!hasStarted) // start the game timer
					{
						hasStarted = true;
						timer = new Date();
					}

					if (mouseButton == LEFT){
						grid[i][j].reveal();
					}

					else if (mouseButton == RIGHT)
					{
						if (grid[i][j].flag == false)
						{
							grid[i][j].flag = true;
						}
						else if (grid[i][j].flag == true)
						{
							grid[i][j].flag = false;
						}
					}

					if (grid[i][j].bee && grid[i][j].open)
					{
						GameOver();
					}
					else
					{
						isWin = checkForWin();
					}
				}
			}
		}
	}
}

function draw()
{
	// set backround color
	background(255);

	// draw each tile
	for (var i = 0; i < cols; i++)
	{
		for (var j = 0; j < rows; j++)
		{
			grid[i][j].show();
		}
	}

	if (isWin)
	{
		textAlign(CENTER);
		fill(0);
		text('GAME!', rows*tile_px - 25, cols*tile_px + 70);
		textAlign(LEFT);
		fill(0);
		text(endTime, 10, cols*tile_px + 70);
	}
	else if(isLose)
	{
		textAlign(CENTER);
		fill(0);
		text('LOSE!', rows*tile_px - 25, cols*tile_px + 70);
		textAlign(LEFT);
		fill(0);
		text(endTime, 10, cols*tile_px + 70);
	}
	else if(hasStarted)
	{
		var curr_time = new Date();
		var elapsed_time = curr_time.getTime() - timer.getTime();
		textAlign(LEFT);
		fill(0);
		text(elapsed_time / 1000, 10, cols*tile_px + 70);
	}
}