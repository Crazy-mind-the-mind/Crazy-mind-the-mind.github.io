


import { assetLoader } from "../../core/game.assetLoader.mjs";
import { transform2 ,vec2} from "../dataTypes.mjs";
import { correctDrawTransform, drawTexture } from "../helper.mjs";
import { UINode } from "./uiNode.mjs";



export class UIProgressBar extends UINode{
    constructor(scope,x,y,parent,fillImageName,fillImagePath,backImageName,backImagePath){
        super(scope,x,y,parent)
        this.fillImageName=fillImageName||"" 
        this.fillImagePath=fillImagePath||""
        this.backImageName=backImageName||"" 
        this.backImagePath=backImagePath||""
        this.texture;
        this.debugColor="#0000ff"
        this.loadImage = this.loadImage.bind(this)
        
        this.maxValue=5;
        this.value=5;
        this.loadImage()

    }

    async loadImage(){
        this.texture=await assetLoader.loadImage(this.fillImageName,this.fillImagePath)
        this.texture2=await assetLoader.loadImage(this.backImageName,this.backImagePath)
    }

    render(){
        this.visible=this.parentNode?this.parentNode.visible:this.visible;
        if (!this.visible) return;
        if (!this.texture) return;

        this.calculateTransform()
        var renderer = this.scope.context;
        var trueTransform=transform2.copy(this.calculatedTransform);

        var ctcopy=transform2.copy(this.calculatedTransform)

        
        for (let i=0; i<=this.maxValue; i++){
            drawTexture(
                renderer,
                i<=this.value ?this.texture : this.texture2,
                ctcopy,
                {
                    useCanvasTransforms:true
                }
            )

            ctcopy.position.x=this.calculatedTransform.position.x+i*this.texture.width;
        }
        
        super.render()
    }
}