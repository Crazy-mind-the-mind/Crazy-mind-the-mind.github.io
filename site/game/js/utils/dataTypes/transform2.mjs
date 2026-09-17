import { vec2 } from "./vec2.mjs"

class transform2{
    constructor(px,py,sx,sy){
       this.position=new vec2(px,py);
       this.scale=new vec2(sx || 1, sy || 1);
       this.rotation=0;

    }
}

export {transform2}