class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
    this.lives=3;
    this.thrust=false;
    this.hits=0;
    
   
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    textSize(20);
    text(`youe have :${this.lives} lives`,width/2,20);
   
    text(`hit enemies: ${this.hits}`,10,30);
    fill(180)
beginShape();
	vertex(this.location.x + 10, this.location.y + 60);
	vertex(this.location.x + 10, this.location.y + 20);
	vertex(this.location.x + 15, this.location.y);
	vertex(this.location.x + 20, this.location.y + 20);
	vertex(this.location.x + 20, this.location.y + 60);
	endShape(CLOSE);

	fill(255, 0, 0);
	beginShape();
	vertex(this.location.x, this.location.y + 60);
	vertex(this.location.x + 10, this.location.y + 40);
	vertex(this.location.x + 10, this.location.y + 60);
	endShape(CLOSE);

	beginShape();
	vertex(this.location.x + 30, this.location.y + 60);
	vertex(this.location.x + 20, this.location.y + 40);
	vertex(this.location.x + 20, this.location.y + 60);
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
		vertex(this.location.x + 10, this.location.y + 60);
		vertex(this.location.x + 13, this.location.y + 80);
		vertex(this.location.x + 15, this.location.y + 70);
		vertex(this.location.x + 18, this.location.y + 80);
		vertex(this.location.x + 20, this.location.y + 60);
		endShape(CLOSE);
   
	}
    /*fill(125);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
        this.location.x + this.size/2, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);*/
  }

  move(){
      // YOUR CODE HERE (4 lines)
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.limit(5);
    if(!this.boundries)
    {
      this.velocity.limit(0.01);
      this.velocity.sub(this.acceleration);
    }
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
    if(this.boundries())
    {
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.01, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0.01, 0));
      }
    }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, -0.01));
      this.thrust=true;
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, 0.01));
      this.thrust=false;
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    var downwardspointing = new createVector(0,0.0001);
        downwardspointing.normalize();
        downwardspointing.mult(0)
    var friction= this.velocity.copy();
   // friction.mult(0.03)
    this.acceleration.add(this.downwardspointing);
    this.acceleration.add(friction);
    console.log(friction);

  }
  boundries() // to be a little bit realistic 
  {
    if (this.location.x>=width||this.location.x<=0)
    {
      console.log("checked");
      return false
    }
    return true;
  }
}
