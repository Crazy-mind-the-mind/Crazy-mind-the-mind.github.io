


class vec2{
    x; y;
    constructor(x,y){
        this.x=x||0
        this.y=y||0
    }

    get x(){return this.x}
    set x(v){this.x=v}
    get y(){return this.y}
    set y(v){this.y=v}

    get magnitude(){return Math.hypot(this.x, this.y);}
    isNearZero(){
        return Math.round(this.x)===0 && Math.round(this.y)===0 
    }

    static copy(src){
        return new vec2(src.x,src.y);
    }
    vecLength(){
        return (this.x**2 + this.y**2)**(1/2)
    }
    normalized(){
        return new vec2(this.vecLength()!==0?this.x/this.vecLength():0 ,this.vecLength()!==0?this.y/this.vecLength():0);
    }

    vecMult(factor){
        this.x*=factor
        this.y*=factor
    }

    vecAdd(vector){
        this.x+=vector.x
        this.y+=vector.y
    }

    [Symbol.toPrimitive](hint){

    }
}


export {vec2};
