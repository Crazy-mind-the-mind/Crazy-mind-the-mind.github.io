


class vec2{
    constructor(x,y){
        this.x=x||0
        this.y=y||0
    }
    
    isNearZero(){
        return Math.round(this.x)===0 && Math.round(this.y)===0 
    }

    static copy(src){
        return new vec2(src.x,src.y);
    }

    normalized(){
        return 0;
    }
}

export {vec2};
