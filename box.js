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
        return(d<this.w+this.w);
    }
    setHighLight(val)
    {
        this.highlight=val;
    }
    move()
    {
        this.x+=random(-1,1);
        this.y+=random(-1,1);
    }
    render()
    {
        noStroke();
        
        if(this.highlight)
        {
            fill(255);
            //rect(this.x,this.y,25);
            //this.y+=100;

           // this.x-=100;
            //console.log(`${this.x} this is y${this.y}`);
            
        }
        else 
        {
            fill(255,100,0);
        }
       // ellipse(this.x,this.y,this.w*2);
    }
}