var bitSim = function (bot) {
var cnv, leftCanvas, rightCanvas;
var byte = [];
var decimal;

bot.setup = function() {
	cnv = bot.createCanvas(600, 100);
	cnv.mousePressed(mousePressStuff);
	//mainCanvas.parent('byteBox');

	leftCanvas = createGraphics(400, 100);
	//leftCanvas.parent('byteBox');

	rightCanvas = createGraphics(200, 100);
	//rightCanvas.parent('byteBox');

	for (var i = 0; i < 8; i ++) {
		byte[i] = new Bit(i*45 + 40, 50);
	}
};

bot.draw = function() {
	bot.drawRightCanvas();
	bot.image(rightCanvas, 400, 0);

	bot.drawLeftCanvas();
	bot.image(leftCanvas, 0 , 0);

	for (var i = 0; i < byte.length; i++) {
		byte[i].draw();
	}


	bot.binaryToDecimal();
	//console.log(decimal);
	bot.textSize(50);
	bot.fill(0);
	bot.textAlign(CENTER, CENTER);
	bot.text(decimal, 500, 50);


};

bot.drawRightCanvas = function() {
	rightCanvas.background(255);
};

bot.drawLeftCanvas = function() {
	leftCanvas.background(75);
};

bot.binaryToDecimal = function() {
	decimal = 0;
	var power = byte.length - 1;
	for (var i = 0; i < byte.length; i++) {
		if (byte[i].state == 1) {
			decimal += Math.pow(2, power);
		}
		power--;
	}
};

 var mousePressStuff = function() {
	for(var i = 0; i < byte.length; i++) {
	byte[i].toggle(bot.mouseX, bot.mouseY);
	}
}


// pseudo-class for Bit class

var Bit = function(x, y) {
	this.x = x;
	this.y = y;
	this.r = 35;
	this.state = 0;
};

Bit.prototype.draw = function() {
	bot.noStroke();
	if (this.state == 0) {
		bot.fill(255);
		bot.ellipse(this.x, this.y, this.r);
		bot.fill(0);
	}	
	else {
		bot.fill(25);
		bot.ellipse(this.x, this.y, this.r);
		bot.fill(255);
	}
	bot.textSize(20);
	bot.textAlign(CENTER, CENTER);
	bot.text(this.state, this.x, this.y);		
};

Bit.prototype.toggle = function(x, y) {
	var d = dist(x, y, this.x, this.y)
	if (d < this.r / 2) {
		if (this.state == 0) {
			this.state = 1;
			return;
		}
		else if (this.state == 1) {
			this.state = 0;
			return;
		}
	}
};


}
var myp5 = new p5(bitSim, 'byteBox')
