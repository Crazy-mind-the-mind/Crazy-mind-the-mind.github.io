import { vec2 } from "./vec2.mjs"

class transform2{
    constructor(px,py,sx,sy){
       this.position=new vec2(px||0,py||0);
       this.scale=new vec2(sx || 1, sy || 1);
       this.rotation=0;

    }
    
    static copy(src){
        var result = new transform2();
        result.position=vec2.copy(src.position);
        result.scale=vec2.copy(src.scale);
        result.rotation = src.rotation
        return result;
        
    }

    
}

export {transform2}