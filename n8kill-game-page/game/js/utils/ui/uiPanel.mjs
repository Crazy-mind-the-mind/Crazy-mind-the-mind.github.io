

import { assetLoader } from "../../core/game.assetLoader.mjs";
import { rect2, transform2 ,vec2} from "../dataTypes.mjs";
import { correctDrawTransform, drawRect, drawTexture } from "../helper.mjs";
import { UINode } from "./uiNode.mjs";



export class UIPanel extends UINode{
    constructor(scope,x,y,parent,panelColor,panelRect){
        super(scope,x,y,parent)
        
        this.panelColor=panelColor || "#888888"
        this.panelRect=panelRect || new rect2(0,0,1,1)
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

        
        drawRect(renderer,this.panelRect,this.panelColor)/
        super.render()
    }
}