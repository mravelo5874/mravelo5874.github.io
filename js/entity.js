class SpriteIndex
{
	constructor()
	{
		this.s_f_s = new Array();
	}
	
	addSprite(frame, speed)
	{
		this.s_f_s.push([frame, speed]);
	}
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



class Paper_Player
{
	constructor(index, gl, vs, fs)
	{
		this.index = index;
		this.pos = new Point(100, 80);
		this.vel = new Point();
		this.acc = new Point();
		this.acc.y = 0.01;
		this.frame = new Point();
		this.dt = 1/60;
		this.mirrored = 1;
		this.isGrounded = true;

		
		this.walk = new Sprite(gl, "img/paper_move.png", vs, fs, {width:16, height:16});
		this.attack = new Sprite(gl, "img/paper_special.png", vs, fs, {width:16, height:16});
		this.idle = new Sprite(gl, "img/paper_idle.png", vs, fs, {width:16, height:16});

		
		this.curr = this.idle;
		this.currNum = 2;
	}
	
	update()
	{
		this.curr = this.idle;
		this.currNum = 2;
		
		if (Key.isDown(Key.UP)) this.movement(0);
		if (Key.isDown(Key.DOWN)) this.movement(1);
		if (Key.isDown(Key.LEFT)) this.movement(2);
		if (Key.isDown(Key.RIGHT)) this.movement(3);
		if (Key.isDown(Key.Q)) this.movement(4);
		
		this.render();
	}
	
	movement(num)
	{
		if (num == 0) //move up
		{
			//this.pos.y -= 1;
		}
		if (num == 1) // move down	
		{
			
		}
		if (num == 2) // move left
		{
			this.curr = this.walk;
			this.currNum = 0;
			this.mirrored = -1;
		}
		if (num == 3) // move right
		{
			this.curr = this.walk;
			this.currNum = 0;
			this.mirrored = 1;
		}
		if (num == 4) // attack
		{
			this.curr = this.attack;
			this.currNum = 1;
		}
	}
	
	render()
	{
		this.vel.y += this.acc.y * this.dt;
		this.pos.y += this.vel.y * this.dt;
		
		if (this.pos.y >= 80)
		{
			this.pos.y = 80;
		}
		
		if (this.mirrored == -1)
		{
			this.pos.x = 116;
		}
		else this.pos.x = 100;
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
	}
}


class Rock_Player
{
	constructor(index, gl, vs, fs)
	{
		this.index = index;
		this.pos = new Point(100, 80);
		this.vel = new Point();
		this.acc = new Point();
		this.acc.y = 0.01;
		this.frame = new Point();
		this.dt = 1/60;
		this.mirrored = 1;
		this.isGrounded = true;

		
		this.walk = new Sprite(gl, "img/rock_move.png", vs, fs, {width:16, height:16});
		this.attack = new Sprite(gl, "img/rock_special.png", vs, fs, {width:16, height:16});
		this.idle = new Sprite(gl, "img/rock_idle.png", vs, fs, {width:16, height:16});

		
		this.curr = this.idle;
		this.currNum = 2;
	}
	
	update()
	{
		this.curr = this.idle;
		this.currNum = 2;
		
		if (Key.isDown(Key.UP)) this.movement(0);
		if (Key.isDown(Key.DOWN)) this.movement(1);
		if (Key.isDown(Key.LEFT)) this.movement(2);
		if (Key.isDown(Key.RIGHT)) this.movement(3);
		if (Key.isDown(Key.Q)) this.movement(4);

		
		if (this.pos.x >= 80)
		{
			this.isGrounded == true;
		}
		this.render();
	}
	
	movement(num)
	{
		if (num == 0) //move up
		{
			this.vel.y += 0.2 * this.dt;
			this.pos.y -= this.vel.y * this.dt;
		}
		if (num == 1) // move down	
		{
			
		}
		if (num == 2) // move left
		{
			this.curr = this.walk;
			this.currNum = 0;
			this.mirrored = -1;
		}
		if (num == 3) // move right
		{
			this.curr = this.walk;
			this.currNum = 0;
			this.mirrored = 1;
		}
		if (num == 4) // attack
		{
			this.curr = this.attack;
			this.currNum = 1;
		}
	}
	
	render()
	{
		this.vel.y += this.acc.y * this.dt;
		this.pos.y += this.vel.y * this.dt;
		
		if (this.pos.y >= 80)
		{
			this.pos.y = 80;
		}
		
		if (this.mirrored == -1)
		{
			this.pos.x = 116;
		}
		else this.pos.x = 100;
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
	}
}