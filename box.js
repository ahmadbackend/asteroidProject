class box
{
    constructor(x,y,w)
    {
    this.x=x;
    this.y=y;
    this.w=w;
    this.highlight=false;
    }
    intersects(other)
    {
        let d=dist(this.x,this.y,other.x,other.y);
        return(d<=(this.w+other.w)/2);// if distance less than diam1+diam2
    }
  /*  setHighLight(val) all implemented in sketch directly  
    {
        this.highlight=val;
    }
   /* move()  amanded  not needed any more 
    {
        this.x+=random(-1,1);
        this.y+=random(-1,1);
    }
    /*render()  amanded  not needed any more 
    {
        noStroke();
        
        if(this.highlight)
        {
            fill(0,0,100);
            
            this.x *=width/2;
            this.y*=height/2;
            ellipse(this.x,this.y,this.w);
            
            noFill();
        }
      
    }*/ 
}