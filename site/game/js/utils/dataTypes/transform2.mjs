import { vec2 } from "./vec2.mjs"

class transform2{
	
	get position(){return }
	get scale(){}
	get rotation(){}
    constructor(px,py,sx,sy,rot){
    	this.data=Float32Array.of(px,py,sx,sy,rot)
    	
        this.position=new vec2(px||0,py||0);
        this.scale=new vec2(sx || 1, sy || 1);
        this.rotation=rot || 0;

    }
    
    static copy(src){
        var result = new transform2();
        result.data=Float32Array.from(this.data)
        return result;
        
    }

    addTransform(transform){
        this.position.vecAdd(transform.position)
        this.scale.vecAdd(transform.scale)
        this.rotation += transform.rotation    
        return this
    }
    
    subTransform(transform){
        this.position.vecSub(transform.position)
        this.scale.vecSub(transform.scale)
        this.rotation -= transform.rotation    
        return this
    }

    
}

export {transform2}