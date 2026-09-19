import { drawRect, drawText } from "../helper.mjs";
import { UINode } from "./uiNode.mjs";



export class UILabel extends UINode{
    constructor(scope,x,y,parent,text){
        super(scope,x,y,parent)
        this.text=text;
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