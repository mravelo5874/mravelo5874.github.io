function loop()
{
	window.game.update();
	requestAnimationFrame(loop);
}

var Key = {
  _pressed: {},

  LEFT: 65,
  UP: 87,
  RIGHT: 68,
  DOWN: 83,
  O: 79,
  P: 80,
  J: 74,
  K: 75,
  L: 76,
  
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

		//index list of current enemies in the scene:
var enemyList = [];
var valuesCheck = [];
var gRight = 0;

class Game
{
	constructor()
	{	//Audios


		//EndAudio
		
		
		this.backSpeed = 0;
		this.canvasElem = document.createElement("canvas");
		this.canvasElem.width = 0;
		this.canvasElem.height = 0;
		this.right = 0;
		this.worldSpaceMatrix = new M3x3();
		
		this.gl = this.canvasElem.getContext("webgl2");
		this.gl.clearColor(0.5, 0.5, 0.8, 0.0);
		
		document.body.appendChild(this.canvasElem);
		
		this.vs = document.getElementById("vs_01").innerHTML;
		this.fs = document.getElementById("fs_01").innerHTML;
		
		this.sky = new Sprite(this.gl, "img/sky.png", this.vs, this.fs, {width: 512, height: 128});
		this.sky_pos = new Point(0, -60);
		
		this.mountains = new Sprite(this.gl, "img/mountains.png", this.vs, this.fs, {width: 768, height: 128});
		this.mount_pos = new Point(-64, 0);
		this.bg_frames = new Point();
		
		this.trees = new Sprite(this.gl, "img/trees.png", this.vs, this.fs, {width: 768, height: 128});
		this.trees_pos = new Point(-384, 0);

		this.hills = new Sprite(this.gl, "img/hills.png", this.vs, this.fs, {width: 768, height: 128});
		this.hills_pos = new Point(-384, 0);
		
		this.grass_cont = new Sprite(this.gl, "img/grass_controlles.png", this.vs, this.fs, {width: 256, height: 128});
		this.grass_cont_pos = new Point(-250, -23);
		
		this.grass = new Sprite(this.gl, "img/grass.png", this.vs, this.fs, {width: 768, height: 128});
		this.grass_pos = new Point(-384, 0);
		
		this.title = new Sprite(this.gl, "img/title.png", this.vs, this.fs, {width: 128, height: 128});
		this.title_pos = new Point(50, 0);
		this.title2 = new Sprite(this.gl, "img/title_dark.png", this.vs, this.fs, {width: 128, height: 128});
		this.title_pos2 = new Point(50, 0);
		this.title3 = new Sprite(this.gl, "img/title_dark.png", this.vs, this.fs, {width: 128, height: 128});
		this.title_pos3 = new Point(50, 0);
		
		this.pew = new Sprite(this.gl, "img/small_death.png", this.vs, this.fs, {width: 16, height: 16});
		this.pew_pos = new Point();
		this.pew_frames = new Point(4,0);
		
		this.box = new Sprite (this.gl, "img/blankBox.png", this.vs, this.fs, {width: 6, height: 10});
		this.coords = new Point(105, 83);
		this.frame = new Point();
		
		this.player_health_bar = new Sprite(this.gl, "img/playerHealth.png", this.vs, this.fs, {width: 22, height: 3});
		this.bar_pos = new Point(95, 100);
		this.bar_frame = new Point();
		
		this.end_index = new Sprite(this.gl, "img/end.png", this.vs, this.fs, {width: 128, height: 128});
		this.end_game_pos = new Point(50, 0);
		this.end_frame = new Point();
		
		this.ScissorAttackBoxes = new PlayerAttackCircs(107, 81, 3, 109, 81, 3);
		this.PaperAttackBoxes = new PlayerAttackCircs(104, 85, 3, 112, 85, 3);
		this.RockAttackBoxes = new PlayerAttackCircs(108, 88, 8, 108, 88, 8);
		
		this.PaperHitBox = new Hit_Circ(80, 85, 5);
		this.RockHitBox = new Hit_Circ(80, 88, 7);
		this.ScissorHitBox = new Hit_Circ(80, 81, 5);

		this.paper_index = new SpriteIndex();
		this.paper_index.addSprite(12, 0.02); // move
		this.paper_index.addSprite(8, 0.005); // special
		this.paper_index.addSprite(2, 0.003); // idle
		this.paper_index.addSprite(9, 0.02); // attack
		this.paper_index.addSprite(6, 0.02); // switch
		this.paper_player = new Paper_Player(this.paper_index, this.gl, this.vs, this.fs, this.PaperAttackBoxes, this.PaperHitBox);
		
		this.rock_index = new SpriteIndex();
		this.rock_index.addSprite(4, 0.008); // move
		this.rock_index.addSprite(4, 0.002); // special
		this.rock_index.addSprite(2, 0.003); // idle
		this.rock_index.addSprite(5, 0.009); // attack
		this.rock_index.addSprite(6, 0.02); // switch
		this.rock_player = new Rock_Player(this.rock_index, this.gl, this.vs, this.fs, this.RockAttackBoxes, this.RockHitBox);
		
		this.scissor_index = new SpriteIndex();
		this.scissor_index.addSprite(8, 0.01); // move
		this.scissor_index.addSprite(9, 0.02); // special
		this.scissor_index.addSprite(4, 0.01); // idle
		this.scissor_index.addSprite(3, 0.006); // attack
		this.scissor_index.addSprite(6, 0.02); // switch
		this.scissor_player = new Scissor_Player(this.scissor_index, this.gl, this.vs, this.fs, this.ScissorAttackBoxes, this.ScissorHitBox);
		
		this.scissor_minion_index = new SpriteIndex();
		this.scissor_minion_index.addSprite(4, 0.005); // move
		this.scissor_minion_index.addSprite(1, 0.001); // idle
		this.scissor_minion_index.addSprite(4, 0.01); // death
		
		this.pebble_index = new SpriteIndex();
		this.pebble_index.addSprite(4, 0.005); // move
		this.pebble_index.addSprite(4, 0.003); // idle
		this.pebble_index.addSprite(4, 0.01); // death
		/*
		this.boulder_index = new SpriteIndex();
		this.boulder_index.addSprite(5, 0.006); // attack
		this.boulder_index.addSprite(1, 0.001); // idle
		this.boulder_index.addSprite(7, 0.01); // startup
		this.boulder_index.addSprite(4, 0.01); // death
		*/
		this.plane_index = new SpriteIndex();
		this.plane_index.addSprite(2, 0.002);
		this.plane_index.addSprite(1, 0.001);
		this.plane_index.addSprite(4, 0.01); // death
		

		this.character = 0;
		this.mirrored = false;
		this.buffer = false;
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
		this.valuesCheck = [];
		
		if(this.right % 64 == 0 && this.right !=0) 
		{
			if(valuesCheck.indexOf(this.right) == -1) 
			{
				for(var i = 0; i < 1; i++) {
					
					var x = Math.floor(Math.random() * 3 + 0);
					if (x == 0)
					{
						var minion = new Scissor_Minion(this.scissor_minion_index, this.gl, this.vs, this.fs, this.right + Math.floor((Math.random()*200)+160));
					}
					else if (x==1)
					{
						var minion = new Pebble(this.pebble_index, this.gl, this.vs, this.fs, this.right + Math.floor((Math.random()*200)+160));
					}
					else if (x==2)
					{
						var minion = new Paper_Minion(this.plane_index, this.gl, this.vs, this.fs, this.right + Math.floor((Math.random()*200)+160));
					}
					enemyList.push(minion);
				}
			}
			valuesCheck.push(this.right);
		}
		if (this.character == 0){
		this.backSpeed = 1.5;
		}
		if (this.character == 1){
		this.backSpeed = 1.5;
		}
		if (this.character == 2){
		this.backSpeed = 1.5;
		}
		/*
		if(this.rock_player.currNum == 1 && this.character == 1){
			this.backSpeed = 0.1
		}
		*/
		
		if(this.paper_player.currNum != 1){
		if (num == 0)
		{
			this.mirrored = true;
			
			this.mount_pos.x += 0.25*this.backSpeed;
			this.trees_pos.x += 0.375*this.backSpeed;
			this.hills_pos.x += 0.5*this.backSpeed;
			this.grass_pos.x += 1*this.backSpeed;
			this.grass_cont_pos.x += 1*this.backSpeed;
			this.title_pos.x += 1*this.backSpeed;
			this.title_pos3.x += 0.96*this.backSpeed;
			this.title_pos2.x += 0.98*this.backSpeed;
			
			if (this.grass_pos.x > 0)
			{
				this.grass_pos.x -= 128;
			}
			if (this.hills_pos.x > 0)
			{
				this.hills_pos.x -= 128;
			}
			if (this.trees_pos.x > 0)
			{
				this.trees_pos.x -= 128;
			}
			if (this.mount_pos.x > 0)
			{
				this.mount_pos.x -= 128;
			}
			this.right --;
			gRight = this.right;
		}
		if (num == 1)//Left
		{
			this.mirrored = false;
			
			this.mount_pos.x -= 0.25*this.backSpeed;
			this.trees_pos.x -= 0.375*this.backSpeed;
			this.hills_pos.x -= 0.5*this.backSpeed;
			this.grass_pos.x -= 1*this.backSpeed;
			this.grass_cont_pos.x -= 1*this.backSpeed;
			this.title_pos.x -= 1*this.backSpeed;
			this.title_pos3.x -= 0.96*this.backSpeed;
			this.title_pos2.x -= 0.98*this.backSpeed;
			
			if (this.grass_pos.x < -128)
			{
				this.grass_pos.x += 128;
			}
			if (this.hills_pos.x < -256)
			{
				this.hills_pos.x += 128;
			}
			if (this.trees_pos.x < -256)
			{
				this.trees_pos.x += 128;
			}
			if (this.mount_pos.x < -128)
			{
				this.mount_pos.x += 128;
			}
			this.right++;
			gRight = this.right;
			enemyList.forEach(function(element) {
				if(element.pos.x > 127) {
					element.pos.x -= 1;
				}
			});
		}
	
	}
}
	
	update()
	{
		console.log(this.bar_frame.y);
	if (this.bar_frame.y >= -20)
	{
		var right = this.right;
		enemyList.forEach(function(element) {
			if(element.isAlive == false)
			{
				enemyList.splice(enemyList.indexOf(element), 1);
			}
		});

		if (this.character == 0){
		this.backSpeed = 1.5;
		}
		if (this.character == 1){
		this.backSpeed = 1.5;
		}
		if (this.character == 2){
		this.backSpeed = 1.5;
		}

		this.gl.viewport(0, -545, this.canvasElem.width * 1.7, this.canvasElem.height * 1.7); // scales and moves the canvas
		this.gl.clear(this.gl.COLOR_BUFFER_BIT); // bg color
		
		// allows transparency
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA); 

		
		if (Key.isDown(Key.LEFT)) this.move(0);
		if (Key.isDown(Key.RIGHT)) this.move(1);
		
		this.sky.render(this.sky_pos, this.bg_frames, 1);
		this.mountains.render(this.mount_pos, this.bg_frames, 1);
		this.trees.render(this.trees_pos, this.bg_frames, 1);
		this.hills.render(this.hills_pos, this.bg_frames, 1);
		this.grass_cont.render(this.grass_cont_pos, this.bg_frames, 1);

		
		
		if (Key.isDown(Key.J))
		{
			this.character = 0;
		}
		
		if (Key.isDown(Key.K))
		{
			this.character = 1;
		}
		
		if (Key.isDown(Key.L))
		{
			this.character = 2;
		}

		// collisions
		for(var i = 0; i < enemyList.length; i++)
		{
			if (enemyList[i].isAlive == true)
			{
				this.Circ1 = new Circ(110, 80, 1);
				
				this.Circ2 = enemyList[i].hitbox.hitbox;
				
				this.dx = this.Circ1.x - this.Circ2.x;
				this.dy = this.Circ1.y - this.Circ2.y;
				this.dist = Math.sqrt(this.dx * this.dx + this.dy + this.dy);
				
				if (this.dist < this.Circ1.r + this.Circ2.r)
				{
					// deal damage to enemy...
					//console.log("collision detected! ... \n");
					if (this.character == 0) // paper
					{
						
						if (enemyList[i].isPaper)
						{
							this.bar_frame.y--;
						}
						else if (enemyList[i].isRock)
						{
							enemyList[i].deal_damage(10);
						}
						else if (enemyList[i].isScissor)
						{
							this.bar_frame.y -= 4;
						}
					}
					else if (this.character == 1) // rock
					{
						if (enemyList[i].isPaper)
						{
							this.bar_frame.y -= 4;
						}
						else if (enemyList[i].isRock)
						{
							this.bar_frame.y--;
						}
						else if (enemyList[i].isScissor)
						{
							enemyList[i].deal_damage(10);
						}
					}
					else if (this.character == 2) // scissor
					{
						if (enemyList[i].isPaper)
						{
							enemyList[i].deal_damage(10);
						}
						else if (enemyList[i].isRock)
						{
							this.bar_frame.y -= 4;
						}
						else if (enemyList[i].isScissor)
						{
							this.bar_frame.y--;
						}
					}
					
				}
			}
		}	
		
		
		if (this.character == 0)
		{
			this.paper_player.update();
			this.rock_player.pos.y = this.paper_player.pos.y;
			this.scissor_player.pos.y = this.paper_player.pos.y;
			this.rock_player.hp = this.paper_player.hp;
			this.scissor_player.hp = this.paper_player.hp;

		}
		else if (this.character == 1)
		{
			this.rock_player.update();
			this.scissor_player.pos.y = this.rock_player.pos.y;
			this.paper_player.pos.y = this.rock_player.pos.y;
			this.scissor_player.hp = this.rock_player.hp;
			this.paper_player.hp = this.rock_player.hp;
		}
		else if (this.character == 2)
		{
			this.scissor_player.update();
			this.rock_player.pos.y = this.scissor_player.pos.y;
			this.paper_player.pos.y = this.scissor_player.pos.y;
			this.rock_player.hp = this.scissor_player.hp;
			this.paper_player.hp = this.scissor_player.hp;
		}
		
		enemyList.forEach(function(element) {
			element.update()
		});
		
		this.title3.render(this.title_pos3, this.bg_frames, 1);
		this.title2.render(this.title_pos2, this.bg_frames, 1);
		this.title.render(this.title_pos, this.bg_frames, 1);
		this.grass.render(this.grass_pos, this.bg_frames, 1);

		this.player_health_bar.render(this.bar_pos, this.bar_frame, 1);
		this.gl.flush();
	}
	else 
	{
		this.gl.viewport(0, -545, this.canvasElem.width * 1.7, this.canvasElem.height * 1.7); // scales and moves the canvas
		this.gl.clear(this.gl.COLOR_BUFFER_BIT); // bg color
		
		// allows transparency
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA); 
		this.sky.render(this.sky_pos, this.bg_frames, 1);
		this.mountains.render(this.mount_pos, this.bg_frames, 1);
		this.trees.render(this.trees_pos, this.bg_frames, 1);
		this.hills.render(this.hills_pos, this.bg_frames, 1);
		this.end_index.render(this.end_game_pos, this.end_frame, 1);
		this.grass.render(this.grass_pos, this.bg_frames, 1);
		
	}
	
	}
}
