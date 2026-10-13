import { drawRect, drawText } from "../helper.mjs";
import { UINode } from "./uiNode.mjs";
import { rect2, vec2 } from "../dataTypes.mjs";
import { mousePressed, mousePosition} from "../input.mjs"

export class UIButton extends UINode{

    justPressed=false;
    pressed=false;



    pressedAction=null;

    get pressedAction(){
        return this.pressedAction
    }
    set pressedAction(v){
        if (!(v instanceof Function)) return;
        this.pressedAction=v.bind(this)
    }



    justPressedAction=null;

    get justPressedAction(){
        return this.justPressedAction
    }
    set justPressedAction(v){
        if (!(v instanceof Function)) return;
        this.justPressedAction=v.bind(this)
    }


    constructor(scope,x,y,parent,text,Bsize){
        super(scope,x,y,parent)
        this.text=text || "";
        this.buttonSize=Bsize || new vec2(this.text.length * 8 + 4,12)
        this.buttonRect= new rect2(
            x,
            y,
            this.buttonSize.x,
            this.buttonSize.y
        )
        
    }
	
	update(){
		super.update()
        this.justPressed = mousePressed && !this.pressed && this.visible
        this.pressed = this.buttonRect.intersects_point(mousePosition) || mousePressed	&& this.visible
        
        if (this.justPressed && this.justPressedAction){
            this.justPressedAction()
        }
        if (this.pressed && this.pressedAction){
            this.pressedAction()
        }
    
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