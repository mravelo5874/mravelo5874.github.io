
class Scissor_Minion
{
	constructor(index, gl, vs, fs, xVal)
	{
		this.index = index;
		this.pos = new Point(xVal, 83);
		this.frame = new Point();
		this.isAlive = true;
		this.isGone = false;
		this.count = 0;
		
		this.isPaper = false;
		this.isRock = false;
		this.isScissor = true;
		
		this.walk = new Sprite(gl, "img/scissor_minion_move.png", vs, fs, {width:8, height:8});
		this.idle = new Sprite(gl, "img/scissor_minion_idle.png", vs, fs, {width:8, height:8});
		this.pew = new Sprite(gl, "img/small_death.png", vs, fs, {width: 16, height: 16});
		this.hitbox = new Hit_Circ(this.pos.x + 4, this.pos.y + 6, 2);
		
		this.curr = this.idle;
		this.currNum = 1;
		this.mirrored = -1;
		
		this.healthbar = new Sprite (gl, "img/healthbar.png", vs, fs, {width: 14, height: 6});
		this.health_frame = new Point();
		this.health_pos = new Point();
		this.show_health_bar = true;
	}
	
	update()
	{	
	if (this.isAlive == true)
	{
		this.curr = this.idle;
		this.currNum = 1;
		
		if(Math.abs(100-this.pos.x) < 128) { // instead of 35 you subtract 27 bc need from mid of character
			if(((73) < this.pos.x && this.mirrored == -1) || 127<=this.pos.x) {
				this.movement(-1);
			}
			if(((127) > this.pos.x && this.mirrored == 1) || 73>=this.pos.x) 
			{	
				this.movement(1);
			}
		} else {
			this.movement(0);
		}
				
		this.render();
	}
	else 
	{
		this.curr = this.pew;
		this.currNum = 2;
		if (this.isGone == false)
		{
			this.render();
			this.count++;
			
			if (this.count >= 24)
			{
				this.isGone = true;
			}
		}
	}
	}
	
	deal_damage(points)
	{
		this.health_frame.y += points;
		if (this.health_frame.y >= 10)
		{
			this.isAlive = false;
			this.show_health_bar = false;
		}
	}

	
	movement(num)
	{	
		if (num == 0)
		{
		}
		if (num == -1) //move left
		{
			this.curr = this.walk;
			this.currNum = 0;
			if (this.mirrored == 1)
			{
				this.pos.x += 10;
			}
			this.mirrored = -1;
			this.pos.x-=.5;
		}
		if (num == 1) // move right	
		{
			this.curr = this.walk;
			this.currNum = 0;
			if (this.mirrored == -1)
			{
				this.pos.x -= 10;
			}
			this.mirrored = 1;
			this.pos.x+=.5;
		}
		
		this.hitbox.translate(this.pos.x + 4, this.pos.y + 6);
		
		if (this.mirrored == -1)
			this.health_pos.x = this.pos.x - 10;
		else
			this.health_pos.x = this.pos.x - 3;
		this.health_pos.y = this.pos.y -10;
	}
	
	render()
	{	
	
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
		
		if (this.show_health_bar == true)
			this.healthbar.render(this.health_pos, this.health_frame, 1);
	}
}

class Paper_Minion
{
	constructor(index, gl, vs, fs, xVal)
	{
		this.index = index;
		this.pos = new Point(xVal, 78);
		this.frame = new Point();
		this.isAlive = true;
		this.isGone = false;
		this.count = 0;
		
		this.isPaper = true;
		this.isRock = false;
		this.isScissor = false;
		
		this.walk = new Sprite(gl, "img/paper_airplane.png", vs, fs, {width:16, height:16});
		this.idle = new Sprite(gl, "img/paper_airplane.png", vs, fs, {width:16, height:16});
		this.pew = new Sprite(gl, "img/small_death.png", vs, fs, {width: 16, height: 16});
		this.hitbox = new Hit_Circ(this.pos.x + 4, this.pos.y + 6, 2);
		
		this.curr = this.idle;
		this.currNum = 1;
		this.mirrored = -1;
		
		this.healthbar = new Sprite (gl, "img/healthbar.png", vs, fs, {width: 14, height: 6});
		this.health_frame = new Point();
		this.health_pos = new Point();
		this.show_health_bar = true;
	}
	
	update()
	{	
		if (this.isAlive == true)
		{
		this.curr = this.idle;
		this.currNum = 1;
		
		if(Math.abs(100-this.pos.x) < 128) { // instead of 35 you subtract 27 bc need from mid of character
			if(((73) < this.pos.x && this.mirrored == 1) || 127<=this.pos.x) {
				this.movement(-1);
			}
			if(((127) > this.pos.x && this.mirrored == -1) || 73>=this.pos.x) 
			{	
				this.movement(1);
			}
		} else {
			this.movement(0);
		}
				
		this.render();
		}
		else 
		{
		this.curr = this.pew;
		this.currNum = 2;
		if (this.isGone == false)
		{
			this.render();
			this.count++;
			
			if (this.count >= 24)
			{
				this.isGone = true;
			}
		}
		}
	}
	
	deal_damage(points)
	{
		this.health_frame.y += points;
		if (this.health_frame.y >= 10)
		{
			this.isAlive = false;
			this.show_health_bar = false;
		}
	}

	
	movement(num)
	{	
		if (num == 0)
		{
		}
		if (num == -1) //move left
		{
			this.curr = this.walk;
			this.currNum = 0;
			if (this.mirrored == -1)
			{
				this.pos.x -= 10;
			}
			this.mirrored = 1;
			this.pos.x-=.5;
		}
		if (num == 1) // move right	
		{
			this.curr = this.walk;
			this.currNum = 0;
			if (this.mirrored == 1)
			{
				this.pos.x += 10;
			}
			this.mirrored = -1;
			this.pos.x+=.5;
		}
		
		this.hitbox.translate(this.pos.x + 4, this.pos.y + 6);
		
		if (this.mirrored == -1)
			this.health_pos.x = this.pos.x - 10;
		else
			this.health_pos.x = this.pos.x - 3;
		this.health_pos.y = this.pos.y -10;
	}
	
	render()
	{	
	
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
		
		if (this.show_health_bar == true)
			this.healthbar.render(this.health_pos, this.health_frame, 1);
	}
}


class Plane
{
	constructor(index, gl, vs, fs, xVal)
	{
		this.index = index;
		this.pos = new Point(xVal, 83);
		this.frame = new Point();
		this.isAlive = true;
		this.isGone = false;
		this.count = 0;
		
		this.isPaper = true;
		this.isRock = false;
		this.isScissor = false;
		
		this.walk = new Sprite(gl, "img/plane_move.png", vs, fs, {width:8, height:8});
		this.idle = new Sprite(gl, "img/plane_idle.png", vs, fs, {width:8, height:8});
		this.pew = new Sprite(gl, "img/small_death.png", vs, fs, {width: 16, height: 16});
		this.hitbox = new Hit_Circ(this.pos.x + 4, this.pos.y + 6, 2);
		
		this.curr = this.idle;
		this.currNum = 1;
		this.mirrored = -1;
		
		this.healthbar = new Sprite (gl, "img/healthbar.png", vs, fs, {width: 14, height: 6});
		this.health_frame = new Point();
		this.health_pos = new Point();
		this.show_health_bar = true;
	}
	
	update()
	{	
	if (this.isAlive == true)
	{
		this.curr = this.idle;
		this.currNum = 1;
		
		if(Math.abs(100-this.pos.x) < 128) { // instead of 35 you subtract 27 bc need from mid of character
			if(((73) < this.pos.x && this.mirrored == -1) || 127<=this.pos.x) {
				this.movement(-1);
			}
			if(((127) > this.pos.x && this.mirrored == 1) || 73>=this.pos.x) 
			{	
				this.movement(1);
			}
		} else {
			this.movement(0);
		}
				
		this.render();
	}
	else 
	{
		this.curr = this.pew;
		this.currNum = 2;
		if (this.isGone == false)
		{
			this.render();
			this.count++;
			
			if (this.count >= 24)
			{
				this.isGone = true;
			}
		}
	}
	}
	
	deal_damage(points)
	{
		this.health_frame.y += points;
		if (this.health_frame.y >= 10)
		{
			this.isAlive = false;
			this.show_health_bar = false;
		}
	}

	
	movement(num)
	{	
		if (num == 0)
		{
		}
		if (num == -1) //move left
		{
			this.curr = this.walk;
			this.currNum = 0;
			if (this.mirrored == 1)
			{
				this.pos.x += 10;
			}
			this.mirrored = -1;
			this.pos.x-=.5;
		}
		if (num == 1) // move right	
		{
			this.curr = this.walk;
			this.currNum = 0;
			if (this.mirrored == -1)
			{
				this.pos.x -= 10;
			}
			this.mirrored = 1;
			this.pos.x+=.5;
		}
		
		this.hitbox.translate(this.pos.x + 4, this.pos.y + 6);
		
		if (this.mirrored == -1)
			this.health_pos.x = this.pos.x - 10;
		else
			this.health_pos.x = this.pos.x - 3;
		this.health_pos.y = this.pos.y -10;
	}
	
	render()
	{	
	
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
		
		if (this.show_health_bar == true)
			this.healthbar.render(this.health_pos, this.health_frame, 1);
	}
}

class Pebble
{
	constructor(index, gl, vs, fs, xVal)
	{
		this.index = index;
		this.pos = new Point(xVal, 78);
		this.frame = new Point();
		this.isAlive = true;
		this.isGone = false;
		this.count = 0;
		
		this.isPaper = false;
		this.isRock = true;
		this.isScissor = false;
		
		this.walk = new Sprite(gl, "img/pebble_move.png", vs, fs, {width:16, height:16});
		this.idle = new Sprite(gl, "img/pebble_move.png", vs, fs, {width:16, height:16});
		this.pew = new Sprite(gl, "img/small_death.png", vs, fs, {width: 16, height: 16});
		this.hitbox = new Hit_Circ(this.pos.x + 8, this.pos.y + 8, 4);
		
		this.curr = this.idle;
		this.currNum = 1;
		this.mirrored = -1;
		
		this.healthbar = new Sprite (gl, "img/healthbar.png", vs, fs, {width: 14, height: 6});
		this.health_frame = new Point();
		this.health_pos = new Point();
		this.show_health_bar = true;
	}
	
	update()
	{	
	if (this.health_frame.y >= 10)
		this.isAlive = false;
	if (this.isAlive == true)
	{
		this.curr = this.idle;
		this.currNum = 1;
		
		if(Math.abs(100-this.pos.x) < 128) { // instead of 35 you subtract 27 bc need from mid of character
			if(((73) < this.pos.x && this.mirrored == -1) || 127<=this.pos.x)
			{
				this.movement(-1);
			}
			if(((127) > this.pos.x && this.mirrored == 1) || 73>=this.pos.x) 
			{	
				this.movement(1);
			}
		} else {
			this.movement(0);
		}
		
		this.render();
	}
	else 
	{	
		this.curr = this.pew;
		this.currNum = 2;
		if (this.isGone == false)
		{
			this.render();
			this.count++;
			
			if (this.count >= 12)
			{
				this.isGone = true;
			}
		}
	}
	}
	
	deal_damage(points)
	{
		this.health_frame.y += points;
		if (this.health_frame.y >= 10)
		{
			this.isAlive = false;
			this.show_health_bar = false;
		}
	}
	
	movement(num)
	{	
		if (num == 0)
		{
		}
		if (num == -1) //move left
		{
			this.curr = this.walk;
			this.currNum = 0;
			if (this.mirrored == 1)
			{
				this.pos.x += 15;
			}
			this.mirrored = -1;
			this.mirrored = -1;
			this.pos.x-=.5;
		}
		if (num == 1) // move right	
		{
			this.curr = this.walk;
			this.currNum = 0;
			if (this.mirrored == -1)
			{
				this.pos.x -= 15;
			}
			this.mirrored = -1;
			this.mirrored = 1;
			this.pos.x+=.5;
		}
		this.hitbox.translate(this.pos.x + 8, this.pos.y + 8);
		
		if (this.mirrored == -1)
			this.health_pos.x = this.pos.x - 15;
		else
			this.health_pos.x = this.pos.x + 1;
		this.health_pos.y = this.pos.y - 5;
	}
	
	render()
	{	
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
		
		if (this.show_health_bar == true)
			this.healthbar.render(this.health_pos, this.health_frame, 1);
	}
}

class Boulder
{
	constructor(index, gl, vs, fs, xVal)
	{
		this.index = index;
		this.pos = new Point(485, 80);
		this.frame = new Point();
		this.isAlive = true;
		this.isGone = false;
		this.count = 0;

		
		this.attack = new Sprite(gl, "img/boulder_attack.png", vs, fs, {width:16, height:16});
		this.idle = new Sprite(gl, "img/boulder_idle.png", vs, fs, {width:16, height:16});
		this.pew = new Sprite(gl, "img/small_death.png", vs, fs, {width: 16, height: 16});
		this.hitbox = new Hit_Circ(this.pos.x + 8, this.pos.y + 8, 6);

		this.curr = this.idle;
		this.currNum = 1;
		this.mirrored = -1;
		
		this.healthbar = new Sprite (gl, "img/healthbar.png", vs, fs, {width: 14, height: 6});
		this.health_frame = new Point();
		this.health_pos = new Point();
		this.show_health_bar = true;
	}
	
	update()
	{	
	if (this.health_frame.y >= 10)
		this.isAlive = false;
	if (this.isAlive == true)
	{
		this.curr = this.idle;
		this.currNum = 1;
		
		if(Math.abs(100-this.pos.x) < 384) { // instead of 35 you subtract 27 bc need from mid of character
			if(((50) < this.pos.x && this.mirrored == -1) || 150<=this.pos.x)
			{
				// this.movement(0);
				this.movement(-1);
			}
			if(((160) > this.pos.x && this.mirrored == 1) || 50>=this.pos.x)
			{	
				// this.movement(0);
				this.movement(1);
			}
		} else {
			this.movement(0);
		}

		this.render();
		
	}
	else 
	{	
		this.curr = this.pew;
		this.currNum = 2;
		if (this.isGone == false)
		{
			this.render();
			this.count++;
			
			if (this.count >= 12)
			{
				this.isGone = true;
			}
		}
	}
	}
	
	deal_damage(points)
	{
		this.health_frame.y += points;
		if (this.health_frame.y >= 10)
		{
			this.isAlive = false;
			this.show_health_bar = false;
		}
	}
	
	movement(num)
	{	
		if (num == 0)
		{
		}
		if (num == -1) //move left
		{
			this.curr = this.attack;
			this.currNum = 0;
			this.mirrored = -1;
			this.pos.x--;
		}
		if (num == 1) // move right	
		{
			this.curr = this.attack;
			this.currNum = 0;
			this.mirrored = 1;
			this.pos.x++;
		}
		this.hitbox.translate(this.pos.x + 8, this.pos.y + 8);
		if (this.mirrored == -1)
			this.health_pos.x = this.pos.x - 10;
		else
			this.health_pos.x = this.pos.x - 3;
		this.health_pos.y = this.pos.y -10;
	}
	
	render()
	{	
		this.frame.x = ( new Date() * this.index.s_f_s[this.currNum][1]) % this.index.s_f_s[this.currNum][0];
		this.curr.render(this.pos, this.frame, this.mirrored);
		
		if (this,show_health_bar == true)
			this.healthbar.render(this.health_pos, this.health_frame, 1);
	}
}