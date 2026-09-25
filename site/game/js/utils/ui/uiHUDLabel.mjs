import { UILabel } from "./uiLabel.mjs";
import { UINode } from "./uiNode.mjs";



class UIHUDLabel extends UINode{
    constructor(scope,x,y,parent,hudLabelCallback,hudLabelName,hudLabelText,hudValueText){
        super(scope,x,y,parent)
        this.text=text;

        var hudLabel=new UILabel(scope,x-hudLabelText.length*10,y,null,hudLabelText);
        var hudValue=new UILabel(scope,x,y,null,hudValueText);
        this.addChild(hudLabel,hudLabelName+"Name")
        this.addChild(hudValue,hudLabelName+"Value")
        this.hudLabelUpdate=hudLabelCallback || function(){};
        this.addChild(ui)
    }


    render(){
        this.visible=this.parentNode?this.parentNode.visible:this.visible;
        
        if (!this.visible) return;
        this.calculateTransform()
		
		
        super.render()

    }
}