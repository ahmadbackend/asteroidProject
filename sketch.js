var spaceship;
var asteroids;      // will be used for quadtree locations 
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var riskSound;
var shootSound;
var failure;
var particles=[];
var ppoints=[];
var qt;
//'use strict',
//////////////////////////////////////////////////
function preload()
{
soundFormats('mp3','wav');
riskSound=loadSound('sounds/risk.wav')
riskSound.setVolume(0.02);
shootSound=loadSound('sounds/shooting.wav');
shootSound.setVolume(0.02);
failure=loadSound('sounds/failure.wav')
failure.setVolume(0.02);

}
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
  rectMode(CENTER);
  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();
  spaceship.run();
  asteroids.run();
  drawEarth();
  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
// some asteroids go out of screen and cause gameover
//350&700 based on caculations and rectmode center
let boundry=new rectangle(width/2,350,width,700);
 qt= new quadtree(boundry,5);
 
 stroke(255,0,0);
 fill(255);

 noStroke();
for(let i=0;i<asteroids.locations.length;i++)
{
    particles[i]=new box(asteroids.locations[i].x,asteroids.locations[i].y,
      asteroids.diams[i]);
}
for(let p of particles)
    {
        let point= new Point(p.x, p.y,p);  
        qt.insert(point);
        p.setHighLight(false);
    }
    for(let p=0;p<particles.length;p++)
     {  

    let rectan=new rectangle(particles[p].x,particles[p].y,100,100);
    
    ppoints=qt.query(rectan);
    //console.log(typeof(ppoints));
    if(typeof ppoints!==`undefined`) //to avoid the bug of empty object
    {
    for(let point of ppoints)
    {
        let other=point.userData;  //
        if(particles[p]!==other&&particles[p].intersects(other))
        {
         
          // collision effect not fully established 
          var horiz=random(-2,2)+0.01 ;   
          var vert=random(-2,2)+0.01  ; 
          
          asteroids.velocities[p].x+=horiz;
          asteroids.velocities[p].y+=vert;

          //asteroids.diams[p]=500; test of my logic
         // qt.show();
          noStroke();
          
           //particles[p].setHighLight(true);

           
            
        }
      }
    }
    
   }
if(asteroids.locations.length>0)  // to avoid throwing errors (empty array)
{


  for(let i=0;i<asteroids.locations.length;i++)
  {
    if(asteroids.locations[i].x>=width||
      asteroids.locations[i].x<=0)
    {
      asteroids.destroy(i);  
      particles.splice(i,1);
      
    }
  }
}
    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    /*it is O(n) so no need to use quadtree(nlogn)
     may be useful when having more than spaceship*/
   for(let i=0;i<asteroids.locations.length;i++)
   {
    if(isInside(spaceship.location,spaceship.size,
     asteroids.locations[i],asteroids.diams[i]*0.8)
    )
    {
     
      spaceship.location.x+=asteroids.diams[i]*4;
      spaceship.lives--;
      if (spaceship.lives<=0)
      {
        
        gameOver() ;
        spaceship.lives=0;
      }

    }
    
   }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(let i=0;i<asteroids.locations.length;i++)
   {
    if(isInside( earthLoc,earthSize.y,
     asteroids.locations[i],asteroids.diams[i]))
     {
      asteroids.destroy(i);
      particles.splice(i,1);
      //gameOver();  intensionally deactivated so you can enjoy the collisions 
      //just comment it out to validate my code 
     }
    
    }
    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location,spaceship.size,
      earthLoc,earthSize.y)
    )
    {
      gameOver() ;
    }

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location,spaceship.size,
      atmosphereLoc,atmosphereSize.y)
    )
    {
    spaceship.setNearEarth();
       riskSound.play();
    }
    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    for(let i=0;i<spaceship.bulletSys.bullets.length;i++)
    {   for(let j=0;j<asteroids.locations.length;j++) //
      {
      if(isInside(spaceship.bulletSys.bullets[i],
        spaceship.bulletSys.diam,asteroids.locations[j],
        asteroids.diams[j]*2))
        {
         spaceship.hits++;
          asteroids.destroy(j);
          particles.splice(j,1);
          if(spaceship.hits>=8)
          {
            spaceship.lives++;
            spaceship.hits=0;
          }
        }
    }
  }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    if((Math.abs(locA.x-locB.x)<=(sizeA+sizeB)/2)&&
    (Math.abs(locA.y-locB.y)<=(sizeA+sizeB)/2))
    {
      console.log("true");
      return true;
    }
    else 
    {
      return false ;
      
    }
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
   shootSound.play();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
   failure.play();
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
