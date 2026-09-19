import { transform2 } from "./transform2.mjs";



class Texture{

    constructor(image){
        console.log(image)
        this.image=image;
        this.imageTransform = new transform2;
        this.imageModulate = "rgba(255, 255, 255, 1)"
    }
    
}

export {Texture}