class box
{
    constructor(x,y)
    {
        this.x=x;
    this.y=y;
    this.w=5;
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
            
        }
        else 
        {
            fill(255,100,0);
        }
        ellipse(this.x,this.y,this.w*2);
    }
}