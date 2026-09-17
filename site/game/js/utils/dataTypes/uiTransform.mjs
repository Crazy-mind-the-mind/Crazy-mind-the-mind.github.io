import { vec2 } from "./vec2.mjs"


class uiTransform{
    constructor(){
        this.position={
            offset: new vec2(0,0),
            scale: new vec2(0,0)
        }
        this.scale={
            offset: new vec2(10,10),
            scale: new vec2(1,1)
        }
    }
}


export {uiTransform}