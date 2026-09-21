import { assetLoader } from "../../core/game.assetLoader.mjs";
import { transform2 ,vec2} from "../dataTypes.mjs";
import { correctDrawTransform, drawTexture } from "../helper.mjs";
import { UINode } from "./uiNode.mjs";



export class UIImage extends UINode{
    constructor(scope,x,y,parent,image){
        super(scope,x,y,parent)
        this.imageLoad = {
            imageName:image.imageName,
            imagePath:image.imagePath
        }
        this.texture;
        this.debugColor="#0000ff"
        this.loadImage()
    }

    async loadImage(){
        this.texture=await assetLoader.load("SpellCardBackground","textures/spellCard.png")
    }

    render(){
        this.visible=this.parentNode?this.parentNode.visible:this.visible;
        if (!this.visible) return;
        if (!this.texture) return;

        this.calculateTransform()
        var renderer = this.scope.context;
        var trueTransform=transform2.copy(this.calculatedTransform);

        
        //trueTransform.position.vecAdd(vec2.copy(trueTransform.position).vecSub(correctDrawTransform(this,"calculatedTransform").position).vecMult(-1));
        drawTexture(
            renderer,
            this.texture,
            this.calculatedTransform,
            {
                useCanvasTransforms:false
            }
        )
        super.render()
    }
}