import { vec2 } from "./vec2.mjs"

class transform2{
	
	get position(){
		return new vec2(this.data[0],this.data[1])
	
	set position(v){
		this.data[0]=v.x
		h
	}
	get scale(){
		return new vec2(this.data[2],this.data[3])
	}
	
	get rotation(){
		return this.data[4]
	}
    constructor(px,py,sx,sy,rot){
    	this.data=Float32Array.of(px,py,sx,sy,rot)
    	
  
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