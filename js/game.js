function loop()
{
	window.game.update();
	requestAnimationFrame(loop);
}

var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  Q: 81,
  E: 69,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

class Game
{
	constructor()
	{
		this.canvasElem = document.createElement("canvas");
		this.canvasElem.width = 64;
		this.canvasElem.height = 64;
		
		this.worldSpaceMatrix = new M3x3();
		
		this.gl = this.canvasElem.getContext("webgl2");
		this.gl.clearColor(0.5, 0.5, 0.8, 0.0);
		
		document.body.appendChild(this.canvasElem);
		
		let vs = document.getElementById("vs_01").innerHTML;
		let fs = document.getElementById("fs_01").innerHTML;
		
		this.mountains = new Sprite(this.gl, "img/mountains.png", vs, fs, {width: 384, height: 128});
		this.mount_pos = new Point(-64, 0);
		this.bg_frames = new Point();
		
		this.hills = new Sprite(this.gl, "img/hills.png", vs, fs, {width: 768, height: 128});
		this.hills_pos = new Point(-384, 0);
		
		this.grass = new Sprite(this.gl, "img/grass.png", vs, fs, {width: 768, height: 128});
		this.grass_pos = new Point(-384, 0);
		
		this.paper_index = new SpriteIndex();
		this.paper_index.addSprite(12, 0.02); // move
		this.paper_index.addSprite(9, 0.02); // special
		this.paper_index.addSprite(2, 0.003); // idle
		this.paper_player = new Paper_Player(this.paper_index, this.gl, vs, fs);
		
		this.rock_index = new SpriteIndex();
		this.rock_index.addSprite(4, 0.008); // move
		this.rock_index.addSprite(4, 0.02); // special
		this.rock_index.addSprite(2, 0.003); // idle
		this.rock_player = new Rock_Player(this.rock_index, this.gl, vs, fs);
		
		this.character = 0;
	}
	
	resize(x,y)
	{
		this.canvasElem.width = x;
		this.canvasElem.height = y;
		
		let wRatio = x / (y/240);
		this.worldSpaceMatrix = new M3x3().transition(-1, 1).scale(2/wRatio, -2/240);
	}
	
	move(num)
	{
		if (num == 0)
		{
			console.log(this.mount_pos.x);
			this.mount_pos.x += 0.2;
			this.hills_pos.x += 0.5;
			this.grass_pos.x += 1;
			if (this.grass_pos.x % 128 == 0)
			{
				this.grass_pos.x -= 128;
			}
			if (this.hills_pos.x % 64 == 0)
			{
				this.hills_pos.x -= 128;
			}
			if (this.mount_pos.x % 26 == 0)
			{
				this.mount_pos.x -= 128;
			}
			
		}
		if (num == 1)
		{
			this.mount_pos.x -= 0.25;
			this.hills_pos.x -= 0.5;
			this.grass_pos.x -= 1;
			if (this.grass_pos.x % 64 == 0)
			{
				this.grass_pos.x += 128;
			}
			if (this.hills_pos.x % 64 == 0)
			{
				this.hills_pos.x += 128;
			}
			if (this.mount_pos.x % 64 == 0)
			{
				this.mount_pos.x += 128;
			}

		}
	}
	
	update()
	{
		this.gl.viewport(0,-510, this.canvasElem.width * 1.5, this.canvasElem.height * 1.5); // scales and moves the canvas
		this.gl.clear(this.gl.COLOR_BUFFER_BIT); // bg color
		
		// allows transparency
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA); 
		
		if (Key.isDown(Key.LEFT)) this.move(0);
		if (Key.isDown(Key.RIGHT)) this.move(1);
		
		
		
		this.mountains.render(this.mount_pos, this.bg_frames, 1);
		this.hills.render(this.hills_pos, this.bg_frames, 1);
		
		if (Key.isDown(Key.E))
		{
			this.character++;
			console.log("character num = " + this.character);
			
			if (this.character >= 2)
			{
				this.character = 0;
			}
		}
		if (this.character == 0)
		{
			this.paper_player.update();
		}
		else if (this.character == 1)
		{
			this.rock_player.update();
		}
		else if (this.character == 2)
		{
			// scissor update
		}
		
		this.grass.render(this.grass_pos, this.bg_frames, 1);

		
		

		
		this.gl.flush();
	}
}