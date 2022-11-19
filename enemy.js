class Enemy
{
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
   // this.bounce();
  }
  draw() 
  {
   fill(255,100,0);
    ellipse(this.location.x, this.location.y, this.size, this.size);

  }
  move()
  {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.limit(5);
  }
   //increased speed of production and motion
  //based on counter+=framecount%1000=0
  //random horizontal move  wind effect 
 applyForce(force)
  {
    this.acceleration.add(force);
  }
  newBallGen(){
    if (this.location.x > width||this.location.x<=0) {
    //  console.log("nono");
    return true;
    } 
    
    if (this.location.y > height) {
     // console.log("yes");
     return true;
    }
    return false;
  }
 
}