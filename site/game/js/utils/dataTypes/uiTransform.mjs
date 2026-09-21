import { vec2 } from "./vec2.mjs"


class uiTransform{
    constructor( pof,psc,scof,scsc){
        this.position={
            offset: pof || new vec2(0,0),
            scale: psc || new vec2(0,0)
        }
        this.scale={
            offset: scof||new vec2(10,10),
            scale: scsc||new vec2(1,1)
        }
        this.rotation=0;
    }
}


export {uiTransform}