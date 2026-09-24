import { UILabel } from "./uiLabel.mjs";
import { UINode } from "./uiNode.mjs";



class UIHUDLabel extends UINode{
    constructor(scope,x,y,parent,hudLabelCallback,hudLabelText,hudValueText){
        super(scope,x,y,parent)
        this.text=text;

        var hudLabel=new UILabel(scope,x-hudLabelText.length*10,y,this,hudLabelText);
        var hudValue=new UILabel(scope,x,y,this,hudValueText);
        this.findChildByInstance()
        this.hudLabelUpdate=hudLabelCallback || function(){};
        this.addChild(ui)
    }


    render(){
        this.visible=this.parentNode?this.parentNode.visible:this.visible;
        
        if (!this.visible) return;
        this.calculateTransform()
        //calculateTransform()
        var renderer = this.scope.context;
        drawText(
            renderer,
            this.calculatedTransform.position,
            this.text,
            {
                spacing:10
            }
        )
        super.render()

    }
}