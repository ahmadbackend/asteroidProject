class Asteroid 
{
  constructor (x,y,)
	{
		this.x=x;
		this.y=y;
		this.thrust= false; 
    this. moveLeft= false;
        this.moveRight= false;
	}
	draw()
	{
		fill(180)
beginShape();
	vertex(this.x + 10, this.y + 60);
	vertex(this.x + 10, this.y + 20);
	vertex(this.x + 15, this.y);
	vertex(this.x + 20, this.y + 20);
	vertex(this.x + 20, this.y + 60);
	endShape(CLOSE);

	fill(255, 0, 0);
	beginShape();
	vertex(this.x, this.y + 60);
	vertex(this.x + 10, this.y + 40);
	vertex(this.x + 10, this.y + 60);
	endShape(CLOSE);

	beginShape();
	vertex(this.x + 30, this.y + 60);
	vertex(this.x + 20, this.y + 40);
	vertex(this.x + 20, this.y + 60);
	endShape(CLOSE);
/*edit this thrust to increase gradually with
convert it to function  that thrust increase and decrease
gradually  function receive how long m
ouseIspreased and act based on it 
			*/		          
	if (this.thrust)  
	{
		fill(255, 150, 0);
		beginShape();
		vertex(this.x + 10, this.y + 60);
		vertex(this.x + 13, this.y + 80);
		vertex(this.x + 15, this.y + 70);
		vertex(this.x + 18, this.y + 80);
		vertex(this.x + 20, this.y + 60);
		endShape(CLOSE);
   
	}
	}
	move()
	{
		if (this.thrust && this.y > 0)
	{
		this.y -= 2;
	}
	else if (this.y < baseLine)
	{
		this.y += 3;
	}

	if (this.moveLeft && this.x > 0 && this.y != baseLine)
	{
		this.x -= 2;
    
	}

	if (this.moveRight && this.x < width && this.y != baseLine)
	{
		this.x += 2;
	}
	}
/*
  applyForce()  
    {
            // no gravity on space so wind effect 
            and increase speed with longer mouseIspressed
    }
*/
 
}