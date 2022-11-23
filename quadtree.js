class Point {
    constructor(x,y,userData){
        this.x=x;
        this.y=y;
        this.userData=userData;
    }
}
class Circle{
    constructor(x,y,r)
    {
        this.x=x;
        this.y=y;
        this.r=r;
        this.rSquared=this.r*this.r;
    }
}
class rectangle{
    constructor (x,y,w,h)
    {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }
    contains(Point)
    {
        return (Point.x>=this.x-this.w&&
            Point.x<=this.x+this.w&&
            Point.y>=this.y-this.h&&
            Point.y<=this.y+this.h
            )

    }
    intersects(range)
    {
        return!(range.x-range.w>this.x+this.w||
            range.x+range.w<this.x-this.w||
            range.y-range.h>this.y+this.h||
            range.y+range.h<this.y-this.h
            );
    }
}
class quadtree{
    constructor(boundry,n)
    {
        this.boundry=boundry;
        this.capacity=n;
        this.points=[];
        this.divided=false;
    }
    insert(Point)
    {
        if(!this.boundry.contains(Point))
        {
            return false;
        }
       if(this.points.length<this.capacity)
       {
        this.points.push(Point);
        return true;
       }
       else 
       {
        if(!this.divided)
        {
        this.subdivide();
        
        }
        if( this.northEast.insert(Point))
        {
            return true;
        }
        else if(this.northWest.insert(Point))
        {
            return true;
        }
        else if(this.southEast.insert(Point))
        {
         return true;
        }
        else if (this.southWest.insert(Point))
        {
            return true;
        }
       }
    }  
    query(range,found)
 {
    if(!found)
    {
        found=[];
    }
    
    if(!this.boundry.intersects(range))
    {
        return  ;
    }
    else 
    {
        for(let p of this.points)
        {
            
            if(range.contains(p))
            {
                found.push(p);
            }
        }
        
    
    if(this.divided)
    {
        this.northEast.query(range,found);
        this.northWest.query(range,found);
        this.southEast.query(range,found);
        this.southWest.query(range,found);
    }
}

    return found;
    
 }
    show()
    {
        stroke(255);
        strokeWeight(1);
        noFill();
        rect(this.boundry.x,this.boundry.y,this.boundry.w*2,this.boundry.h*2);
        if(this.divided)
        {
            this.northEast.show();
            this.northWest.show();
            this.southEast.show();
            this.southWest.show();
        }
       for(let i of this.points)
        {
            strokeWeight(3);
            point(i.x,i.y);
        }
    }

    subdivide()
    {
        let x= this.boundry.x;
        let y=this.boundry.y;
        let h=this.boundry.h;
        let w=this.boundry.w;
        let ne= new rectangle(x+w/2,y-h/2,w/2,h/2)
        let nw= new rectangle(x-w/2,y-h/2,w/2,h/2)
        let se= new rectangle(x+w/2,y+h/2,w/2,h/2)
        let sw= new rectangle(x-w/2,y+h/2,w/2,h/2)

        this.northWest=new quadtree(nw,this.capacity);
        this.northEast=new quadtree(ne,this.capacity);
        this.southWest=new quadtree(sw,this.capacity);
        this.southEast=new quadtree(se,this.capacity);
        this.divided=true;
    }
 
}