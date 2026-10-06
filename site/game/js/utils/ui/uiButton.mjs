import { drawRect, drawText } from "../helper.mjs";
import { UINode } from "./uiNode.mjs";



export class UIPutton extends UINode{
    constructor(scope,x,y,parent,text,Bsize){
        super(scope,x,y,parent)
        this.text=text;
        this.buttonSize=Bsize
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
        		this.calculatedTransform.position.y
        		this.Bsize.x,
        		this.Bsize.y
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