import { drawRect, drawText } from "../helper.mjs";
import { UINode } from "./uiNode.mjs";
import { rect2, vec2 } from "../dataTypes.mjs";


export class UIButton extends UINode{
    constructor(scope,x,y,parent,text,Bsize){
        super(scope,x,y,parent)
        this.text=text || "";
        this.buttonSize=Bsize || new vec2(this.text.length * 8 + 2,10)
    }
	
	update(){
		super.update()
	}

    render(){
        this.visible=this.parentNode?this.parentNode.visible:this.visible;
        
        if (!this.visible) return;
        this.calculateTransform()
        
        var renderer = this.scope.context;
        
        
        drawRect(
        	renderer,
        	new rect2(
        		this.calculatedTransform.position.x,
        		this.calculatedTransform.position.y,
        		this.buttonSize.x,
        		this.buttonSize.y
        	),
        	"#000088")
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