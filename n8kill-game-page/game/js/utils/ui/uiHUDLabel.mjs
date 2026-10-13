import { UILabel } from "./uiLabel.mjs";
import { UINode } from "./uiNode.mjs";



export class UIHUDLabel extends UINode{
    constructor(scope,x,y,parent,hudLabelCallback,hudLabelName,hudLabelText,hudValueText){
        super(scope,x,y,parent)

        this.hudLabelText=hudLabelText
        this.hudValueText=hudValueText
        this.hudLabelName=hudLabelName
        var hudLabel=new UILabel(scope,x-hudLabelText.length*10,y,null,hudLabelText);
        var hudValue=new UILabel(scope,x,y,null,hudValueText);
        this.addChild(hudLabel,hudLabelName+"Name")
        this.addChild(hudValue,hudLabelName+"Value")
        this.hudLabelUpdate=hudLabelCallback || function(){};
        
    }

    update(){
        super.update()

        var label=this.findChildByName(this.hudLabelName+"Name")
        var value=this.findChildByName(this.hudLabelName+"Value")
        
        value.text=this.hudValueText
    
    }

    render(){
        this.visible=this.parentNode?this.parentNode.visible:this.visible;
        
        if (!this.visible) return;
        this.calculateTransform()
		
		
        super.render()

    }
}