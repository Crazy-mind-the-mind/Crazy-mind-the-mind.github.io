


class vec2{
	data;
    get x(){return this.data[0]}
    get y(){return this.data[1]}
    set x(v){this.data[0]=v}
    set y(v){this.data[1]=v}
    
    constructor(x,y){
    	this.data=new Float32Array(2)
        this.x=x
        this.y=y
    }

    

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

    directionTo(vector){
        return vec2.copy(this).vecSub(vec2.copy(vector)).normalized()
    }

    distanceTo(vector){
        return vec2.copy(this).vecSub(vec2.copy(vector)).magnitude
    }
    vecMult(factor){
        this.x*=factor
        this.y*=factor
        return this

    }
    vecMultVec(factor){
        this.x*=factor.x
        this.y*=factor.y
        return this
    }
    vecDiv(factor){
        this.x/=factor
        this.y/=factor
        return this

    }

    vecAdd(vector){
        this.x+=vector.x;
        this.y+=vector.y;
        return this;
    }

    vecSub(vector){
        this.x-=vector.x;
        this.y-=vector.y;
        return this;
    }

    vecToArray(){
        return [this.x,this.y];
    }
    rotated(rotation){
        return vec2.copy(this).vecMultVec(new vec2(Math.sin(rotation),Math.cos(rotation)) );
    }
    [Symbol.toPrimitive](hint){

    }
}


export {vec2};
