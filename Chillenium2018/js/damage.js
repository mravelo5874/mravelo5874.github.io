
class Rect
{
	constructor(x, y, w, h)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

class Circ
{
	constructor(x, y, r)
	{
		this.x = x;
		this.y = y;
		this.r = r;
	}
	
}


class PlayerAttackCircs
{
	constructor (x, y, r, x2, y2, r2)
	{
		this.LeftCirc = new Circ(x,y,r);
		this.RightCirc = new Circ(x2,y2,r2);
	}
	
	translateUp(y)
	{
		this.LeftCirc.y = y;
		this.RightCirc.y = y;
	}
	
	check_collisions(enemyList, mirrored)
	{
		for(var i = 0; i < enemyList.length; i++)
		{
			if (enemyList[i].isAlive == true)
			{
				if (mirrored == false)
				{
					this.Circ1 = this.RightCirc;

				}
				else 
				{
					this.Circ1 = this.LeftCirc;
					this.Circ1 = this.RightCirc;

				}
				this.Circ2 = enemyList[i].hitbox.hitbox;
				
				this.dx = this.Circ1.x - this.Circ2.x;
				this.dy = this.Circ1.y - this.Circ2.y;
				this.dist = Math.sqrt(this.dx * this.dx + this.dy + this.dy);
				
				if (this.dist < this.Circ1.r + this.Circ2.r)
				{
					// deal damage to enemy...
					//console.log("collision detected! ... \n");
					enemyList[i].deal_damage(2);
					return true;
				}
			}
		}
		return false;
	}
}

class Hit_Circ
{
	constructor (x,y,r)
	{
		this.hitbox = new Circ(x, y, r);
	}
	
	translate(x,y)
	{
		this.hitbox.x = x;
		this.hitbox.y = y;
	}
}


class Hit_Box
{
	constructor (x,y,w,h)
	{
		this.hitbox = new Rect(x,y,w,h);
	}
	
	translate(x,y)
	{
		this.hitbox.x = x;
		this.hitbox.y = y;
	}
}
