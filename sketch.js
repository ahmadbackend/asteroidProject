//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license

var balls=[];
var asteroid;
var baseLine;
///////////////////////////////////////////////
function setup() {
  createCanvas(800,500);
  //ball = new Ball();
  asteroid=new Asteroid(width/2,height-200);
  baseLine=height-100;

}
///////////////////////////////////////////////
function mouseDragged()
{
  balls.push(new Ball(mouseX,mouseY));
}
function draw() {
  background(0);
  asteroid.draw();
  asteroid.move();
  var gravity= createVector(0,0.1);
  for(let i=0;i<balls.length;i++)
  {
  
  balls[i].applyForce(gravity);
  var friction=balls[i].velocity.copy();
  friction.mult(-1);
  friction.normalize();
  friction.mult(0.01);
  balls[i].applyForce(friction);
  balls[i].run();
  }
}
function keyPressed()
{
	if (key == "W")
	{
		asteroid.thrust = true;
	}

	if (key == "A")
	{
		asteroid.moveLeft = true;
    asteroid.thrust=true;
	}

	if (key == "D")// bug asteroid leave the scene from right side 
	{
		asteroid.moveRight = true;
    asteroid.thrust=true;
	}
}
function keyReleased()
{
  console.log("tezst");
    if(key == "W")
    {
	   asteroid.thrust = false;
     console.log("test");
    }
    
    if(key == "A")
    {
	   asteroid.moveLeft = false;
     asteroid.thrust = false;

     
    }
    
    if(key == "D")
    {
	   asteroid.moveRight = false;
     asteroid.thrust = false;

    }

}

///////////////////////////////////////////////



/*
class Ball {

  constructor(x,y){
    this.velocity = new createVector(-3, 3);
    this.location = new createVector(x, y);
    this.acceleration = new createVector(0, 0);
    this.size = random(10,30);
    this.colorX=x;
    this.colorY=y;
  }

  run(){
    this.draw();
    this.move();
    this.bounce();
  }

  draw(){
    if(this.colorX>=width/2)
    fill(255,30,random(30,200));
    else{
      fill(0,30,random(0,250));
    }
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  move(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.limit(5);
  }

  bounce(){
    if (this.location.x > width-this.size/2) {
          this.location.x = width-this.size/2;
          this.velocity.x *= -1;
    } else if (this.location.x < this.size/2) {
          this.velocity.x *= -1;
          this.location.x = this.size/2;
    }
    if (this.location.y > height-this.size/2) {
          this.velocity.y *= -1;
          this.location.y = height-this.size/2;
    }
  }
  applyForce(force)
  {
    this.acceleration.add(force);
  }

}
*/