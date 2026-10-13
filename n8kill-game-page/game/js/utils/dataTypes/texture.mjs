import { assetLoader } from "../../core/game.assetLoader.mjs";

import { transform2 } from "./transform2.mjs";



class Texture{

    constructor(image){
        
        this.image=image;
        this.imageTransform = new transform2;
        this.imageModulate = "rgba(255, 255, 255, 1)"
    }
    
}

class TextureWebGL{
    constructor(imageName,imagePath, options){
        options = options || {}
        this.scope = options.scope;
        this.texture;
        this.textureTransform = new transform2();
        this.textureColor;
        this.imageName=imageName;
        this.imagePath=imagePath;
        
    }
    
    async loadTexture(gl){
       
    }

    
}

export {Texture,TextureWebGL}