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
        return(d<=this.w+other.w);
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
            fill(255,0,0);
            
            
        }
        else 
        {
            //fill(255,100,0);
        }
      
    }
}