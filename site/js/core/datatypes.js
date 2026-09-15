

class vec2{
    constructor(x,y){
    	this.x=x;
    	this.y=y;
    }
    
    normalized(){
    	return new vec2(0,0);
    }
    
    rotated(amount){
    	return new vec2(0,0);
    }
    
    distanceTo(vector){
    	return 0;
    }
    
    angleTo()
    	return 0;
    }
}

class rect2{
	constructor(x,y,w,h){
		this.origin=new vec2(x,y);
		this.size=new vec2(w,h);
	}
	intersects(otherRect2){
		(this.origin.x-otherRect2.origin.x);
		
	}
	
}


