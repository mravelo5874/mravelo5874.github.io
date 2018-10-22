function Cell(i, j, w)
{
	this.i = i;
	this.j = j;
	this.x = i*w + 100;
	this.y = j*w + 50;
	this.w = w;
	this.bee = false;
	this.open = false;
	this.beesNext = 0;
	this.flag = false;
}

Cell.prototype.show = function()
{
	stroke(0);
	strokeWeight(2);
	noFill();
	rect(this.x, this.y, this.w, this.w);

	if(this.open)
	{
		if(this.bee)
		{
			fill(255, 100, 100);
			rect(this.x, this.y, this.w, this.w);
			fill(0);
			ellipse(this.x + this.w*0.5, this.y + this.w*0.5, this.w * 0.4)
		}
		else
		{
			fill(169);
			rect(this.x, this.y, this.w, this.w);
			if (this.beesNext > 0){
				textAlign(CENTER);
				fill(0);
				text(this.beesNext, this.x + this.w*0.5, this.y + this.w*0.5 - 3);
			}
		}
	}
	else
	{
		if (this.flag)
		{
			fill(0, 255, 100);
			rect(this.x + this.w*0.25, this.y +this.w*0.25, this.w*0.5, this.w*0.5);
		}
	}
}

Cell.prototype.countBees = function()
{
	if (this.bee)
	{	
		this.beesNext = -1;
		return ;
	}

	var total = 0;
	for (var xoff = -1; xoff <= 1; xoff++){
		for (var yoff = -1; yoff <= 1; yoff++){
			var i = this.i + xoff;
			var j = this.j + yoff;

			if (i > -1 && i < cols && j > -1 && j < rows)
			{
				var neighbor = grid[i][j];
				if (neighbor.bee)
				{
					total++;
				}
			}
		}
	}
	this.beesNext = total;
}

Cell.prototype.contains = function(x, y)
{
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}

Cell.prototype.reveal = function(x, y)
{
	this.open = true;
	if (this.beesNext == 0){
		this.floodit();
	}
}

Cell.prototype.floodit = function()
{
	for (var xoff = -1; xoff <= 1; xoff++){
		for (var yoff = -1; yoff <= 1; yoff++){
			var i = this.i + xoff;
			var j = this.j + yoff;

			if (i > -1 && i < cols && j > -1 && j < rows)
			{
				var neighbor = grid[i][j];
				if (!neighbor.bee && !neighbor.open)
				{
					neighbor.reveal();
				}
			}
		}
	}
}