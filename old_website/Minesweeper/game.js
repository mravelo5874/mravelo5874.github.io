var mycanvas, input, input_button, menu_open, cols, rows, tile_px, grid, totalBees, new_button, easy_button, med_button, hard_button, size_slider, winTime, isWin, isLose, data_font, c_font,  hasStarted, timer;
var easy_name_1, easy_name_2, easy_name_3, med_name_1, med_name_2, med_name_3, hard_name_1, hard_name_2, hard_name_3;
var easy_time_1, easy_time_2, easy_time_3, med_time_1, med_time_2, med_time_3, hard_time_1, hard_time_2, hard_time_3;
tile_px = 40;

function reset()
{
	loadTimes();

	// console.log("reset:");
	// console.log(easy_name_1);
	// console.log(easy_name_2);
	// console.log(easy_name_3);

	// console.log(med_name_1);
	// console.log(med_name_2);
	// console.log(med_name_3);

	// console.log(hard_name_1);
	// console.log(hard_name_2);
	// console.log(hard_name_3);

	menu_open = false;
	easy_button.hide();
	med_button.hide();
	hard_button.hide();
	isWin = false;
	isLose = false;
	hasStarted = false;
	totalBees = Math.floor(cols*rows*0.125);

	// create a canvas the size of the game board
	mycanvas = createCanvas(cols*tile_px+275, rows*tile_px+100);
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

function loadTimes()
{
	//localStorage.clear();


	// easy times:
	
	if (localStorage.getItem("easy1"))
	{
		easy_name_1 = JSON.parse(localStorage.getItem("easy1"));
		easy_time_1 = parseFloat(easy_name_1.split(" ", 1));
	}
	else 
	{
		easy_time_1 = 0;
		easy_name_1 = '0 ---'
	}
	
	if (localStorage.getItem("easy2"))
	{
		easy_name_2 = JSON.parse(localStorage.getItem("easy2"));
		easy_time_2 = parseFloat(easy_name_2.split(" ", 1));
	}
	else 
	{
		easy_time_2 = 0;
		easy_name_2 = '0 ---'
	}

	if (localStorage.getItem("easy3"))
	{
		easy_name_3 = JSON.parse(localStorage.getItem("easy3"));
		easy_time_3 = parseFloat(easy_name_3.split(" ", 1));
	}
	else 
	{
		easy_time_3 = 0;
		easy_name_3 = '0 ---'
	}


	// med times:

	if (localStorage.getItem("med1"))
	{
		med_name_1 = JSON.parse(localStorage.getItem("med1"));
		med_time_1 = parseFloat(med_name_1.split(" ", 1));
	}
	else 
	{
		med_time_1 = 0;
		med_name_1 = '0 ---'
	}
	
	if (localStorage.getItem("med2"))
	{
		med_name_2 = JSON.parse(localStorage.getItem("med2"));
		med_time_2 = parseFloat(med_name_2.split(" ", 1));
	}
	else 
	{
		med_time_2 = 0;
		med_name_2 = '0 ---'
	}

	if (localStorage.getItem("med3"))
	{
		med_name_3 = JSON.parse(localStorage.getItem("med3"));
		med_time_3 = parseFloat(med_name_3.split(" ", 1));
	}
	else 
	{
		med_time_3 = 0;
		med_name_3 = '0 ---'
	}


	// hard times:

	if (localStorage.getItem("hard1"))
	{
		hard_name_1 = JSON.parse(localStorage.getItem("hard1"));
		hard_time_1 = parseFloat(hard_name_1.split(" ", 1));
	}
	else 
	{
		hard_time_1 = 0;
		hard_name_1 = '0 ---'
	}
	
	if (localStorage.getItem("hard2"))
	{
		hard_name_2 = JSON.parse(localStorage.getItem("hard2"));
		hard_time_2 = parseFloat(hard_name_2.split(" ", 1));
	}
	else 
	{
		hard_time_2 = 0;
		hard_name_2 = '0 ---'
	}

	if (localStorage.getItem("hard3"))
	{
		hard_name_3 = JSON.parse(localStorage.getItem("hard3"));
		hard_time_3 = parseFloat(hard_name_3.split(" ", 1));
	}
	else 
	{
		hard_time_3 = 0;
		hard_name_3 = '0 ---'
	}
}

function enterScore()
{
	var name = input.value(); 
	var time = nf(endTime);

	var score = time.concat(" ");
	score = score.concat(name);

	if (rows == 8 && cols == 8) // easy
	{	
		if (endTime < easy_time_3 && endTime >= easy_time_2 || (easy_time_2 != 0 && easy_time_3 == 0 && endTime >= easy_time_2))
		{
			//localStorage.clear();

			localStorage.setItem("easy1", JSON.stringify(easy_name_1));
			localStorage.setItem("easy2", JSON.stringify(easy_name_2));
			localStorage.setItem("easy3", JSON.stringify(score));
		}
		else if ((endTime < easy_time_2 && endTime >= easy_time_1) || (easy_time_1 != 0 && easy_time_3 == 0 && endTime >= easy_time_1))
		{
			//localStorage.clear();

			localStorage.setItem("easy1", JSON.stringify(easy_name_1));
			localStorage.setItem("easy2", JSON.stringify(score));
			localStorage.setItem("easy3", JSON.stringify(easy_name_2));	
		}
		else if (endTime < easy_time_1 || easy_time_1 == 0)
		{
			//localStorage.clear();

			localStorage.setItem("easy1", JSON.stringify(score));
			localStorage.setItem("easy2", JSON.stringify(easy_name_1));
			localStorage.setItem("easy3", JSON.stringify(easy_name_2));
		}	
	}
	else if (rows == 12 && cols == 12) // medium
	{
		if (endTime < med_time_3 && endTime >= med_time_2 || (med_time_2 != 0 && med_time_3 == 0 && endTime >= med_time_2))
		{
			//localStorage.clear();

			localStorage.setItem("med1", JSON.stringify(med_name_1));
			localStorage.setItem("med2", JSON.stringify(med_name_2));
			localStorage.setItem("med3", JSON.stringify(score));
		}
		else if ((endTime < med_time_2 && endTime >= med_time_1) || (med_time_1 != 0 && med_time_3 == 0 && endTime >= med_time_1))
		{
			//localStorage.clear();

			localStorage.setItem("med1", JSON.stringify(med_name_1));
			localStorage.setItem("med2", JSON.stringify(score));
			localStorage.setItem("med3", JSON.stringify(med_name_2));	
		}
		else if (endTime < med_time_1 || med_time_1 == 0)
		{
			//localStorage.clear();

			localStorage.setItem("med1", JSON.stringify(score));
			localStorage.setItem("med2", JSON.stringify(med_name_1));
			localStorage.setItem("med3", JSON.stringify(med_name_2));
		}
	}
	else if (rows == 15 && cols == 15) // hard
	{
		if (endTime < hard_time_3 && endTime >= hard_time_2 || (hard_time_2 != 0 && hard_time_3 == 0 && endTime >= hard_time_2))
		{
			//localStorage.clear();

			localStorage.setItem("hard1", JSON.stringify(hard_name_1));
			localStorage.setItem("hard2", JSON.stringify(hard_name_2));
			localStorage.setItem("hard3", JSON.stringify(score));
		}
		else if ((endTime < hard_time_2 && endTime >= hard_time_1) || (hard_time_1 != 0 && hard_time_3 == 0 && endTime >= hard_time_1))
		{
			//localStorage.clear();

			localStorage.setItem("hard1", JSON.stringify(hard_name_1));
			localStorage.setItem("hard2", JSON.stringify(score));
			localStorage.setItem("hard3", JSON.stringify(hard_name_2));	
		}
		else if (endTime < hard_time_1 || hard_time_1 == 0)
		{
			//localStorage.clear();

			localStorage.setItem("hard1", JSON.stringify(score));
			localStorage.setItem("hard2", JSON.stringify(hard_name_1));
			localStorage.setItem("hard3", JSON.stringify(hard_name_2));
		}
	}



	input.hide();
	input_button.hide();
	input.value(''); // clear value
}

function preload()
{
	loadTimes();
	data_font = loadFont('Minesweeper/heavy_data.ttf');
	c_font = loadFont('Minesweeper/courier.ttf');
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
	rows = 15;
	cols = 15;
	reset();
}



function setup()
{
	textFont(data_font);
	textSize(30);
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

	input = createInput();
	input.parent('gameBox');
	input.position(110, 20);
	input.hide();

	input_button = createButton('Enter');
	input_button.parent('gameBox');
	input_button.position(280, 20);
	input_button.mousePressed(enterScore);
	input_button.hide();

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

		input_button.show();
		input.show();
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

	textFont(c_font);
	textSize(20);
	strokeWeight(0.5);
	textAlign(LEFT);
	fill(0);
	text('Best Times!', rows*tile_px + 70, 25);

	text('Easy:', rows*tile_px + 30, 60);
	text("1) " + easy_name_1, rows*tile_px + 35, 90);
	text("2) " + easy_name_2, rows*tile_px + 35, 110);
	text("3) " + easy_name_3, rows*tile_px + 35, 130);

	text('Medium:', rows*tile_px + 30, 170);
	text("1) " + med_name_1, rows*tile_px + 35, 200);
	text("2) " + med_name_2, rows*tile_px + 35, 220);
	text("3) " + med_name_3, rows*tile_px + 35, 240);

	text('Hard:', rows*tile_px + 30, 280);
	text("1) " + hard_name_1, rows*tile_px + 35, 310);
	text("2) " + hard_name_2, rows*tile_px + 35, 330);
	text("3) " + hard_name_3, rows*tile_px + 35, 350);

	textFont(data_font);
	strokeWeight(1);
	textSize(30);

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