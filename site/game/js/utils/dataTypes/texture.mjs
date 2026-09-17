


class Texture{

    constructor(image){
        this.image=image || new ImageData(1,1);
        //this.imageRect=image;
    }

    getTexture(){
        return this.image;
    }
}

export {Texture}