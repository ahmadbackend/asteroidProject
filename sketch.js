//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license

var balls=[];
var asteroid;
var baseLine;
var enemyCount=5;  //will increase over frameCount or hits 
///////////////////////////////////////////////
function setup() {
  createCanvas(800,500);
  //ball = new Enemy(random(width),0);
  asteroid=new Asteroid(width/2,height-200);
  baseLine=height-100;
  for(let i=0;i<enemyCount;i++)
  {
    balls.push(new Enemy(random(width),0));
  }

}
///////////////////////////////////////////////
/*function mouseDragged()
{
  balls.push(new Enemy(random(width),0));
}*/
function draw() {
  background(0);
  asteroid.draw();
  asteroid.move();
  var gravity= createVector(random(-1,1),0.01);
  for(let i=0;i<balls.length;i++)
  {
    
  balls[i].applyForce(gravity);
  var friction=balls[i].velocity.copy();
  friction.mult(-1);
  friction.normalize();
  friction.mult(0.01);
  balls[i].applyForce(friction);
  balls[i].run();
  //adding new balls when ball go out of screen 
  if( balls[i].newBallGen()) 
  {
   
   balls[i]=new Enemy(random(width),0);
  
  }
  //increase enemy spead with time 
  if(frameCount%50==0)
{
  gravity.y+=0.01;
  
}

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
   // asteroid.thrust=true;
	}

	if (key == "D")// bug asteroid leave the scene from right side 
	{
		asteroid.moveRight = true;
   // asteroid.thrust=true;
	}
}
function keyReleased()
{
  
    if(key == "W")
    {
	   asteroid.thrust = false;
     //console.log("test");
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
/*function touchGround(elex,eley)
{
  if(elex>width||elex<0||eley>height)
  {
   
    return true;
}
}*/

///////////////////////////////////////////////
//increase enemy number with time 
// collision detection (enemy+enemy move away from eachother)
//enemy+asteroid lose life
//create background stars 
//create gifts class with colsion detection also 
//create asteroid lifes  and counter 