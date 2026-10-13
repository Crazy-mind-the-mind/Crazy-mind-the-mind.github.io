import { assetLoader } from "../../core/game.assetLoader.mjs";
import { transform2 ,vec2} from "../dataTypes.mjs";
import { correctDrawTransform, drawTexture } from "../helper.mjs";
import { UINode } from "./uiNode.mjs";



export class UIImage extends UINode{
    constructor(scope,x,y,parent,imageName,imagePath){
        super(scope,x,y,parent)
        this.imageName=imageName||"" 
        this.imagePath=imagePath||""
        this.texture;
        this.debugColor="#0000ff"
        this.loadImage = this.loadImage.bind(this)
        this.loadImage()
    }

    async loadImage(){
        this.texture=await assetLoader.loadImage(this.imageName,this.imagePath)
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
                useCanvasTransforms:true
            }
        )
        super.render()
    }
}