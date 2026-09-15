
class vec2{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    
    normalized(){
        let result=new vec2(0,0);
        return result;
    }
    rotated(rotation){
        let result=new vec2(0,0);
        return result;
    }
}


class rect2{
    constructor(x,y,width,height){
        this.origin = new vec2(x,y);
        this.size = new vec2(width,height);

    }
}

class color{
    constructor(r,g,b){
        this.r=r;
        this.r=g;
        this.r=b;

    }
    toHEX() {
        result = "#";
        return result;
    }
}
