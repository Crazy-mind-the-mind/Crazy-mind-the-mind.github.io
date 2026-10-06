import { rect2, uiTransform, vec2 } from "../dataTypes.mjs"
import { drawRect, parseUiTransform } from "../helper.mjs";
import { transform2 } from "../dataTypes.mjs";


class UINode{
    constructor(scope, x,y , /**@type{UINode}*/parentUInode){
        this.scope=scope
        this.parentNode=null
        if (parentUInode!=null) parentUInode.addChild(this);
        this.childrenNodes={};
        this.transform = new uiTransform(new vec2(x,y));
        this.visible=true;
        this.debugColor="#FFAA00"

        this.updateAction = null;

        this.loadAssets();
    }
    async loadAssets(){

    }
    calculateTransform(){
        this.calculatedTransform=parseUiTransform(this.scope,this.transform);
        if (this.parentNode!==null){
        	
        	var positionCorrect= vec2.copy(this.parentNode.calculatedTransform.position)
        	positionCorrect.vecAdd(this.calculatedTransform.position.rotated(this.parentNode.calculatedTransform.rotation))
            this.calculatedTransform.position=positionCorrect
            
            this.calculatedTransform.rotation += this.parentNode.calculatedTransform.rotation

        
        }
    }
    update(){
        if (Object.keys(this.childrenNodes).length>0){
            for (const child in this.childrenNodes) {
                this.childrenNodes[child].update()
            }
        }

        if (this.updateAction instanceof Function){this.updateAction()}
    }
    render(){

        this.visible=this.parentNode?this.parentNode.visible:this.visible;
        this.calculateTransform()

        if (this.scope.constants.showUIanchors){
            drawRect(this.scope.context,
            new rect2(
                this.calculatedTransform.position.x,
                this.calculatedTransform.position.y,
                4,
                4,
            ),
            this.debugColor
            )
        }        
        


        if (Object.keys(this.childrenNodes).length>0){
            for (const child in this.childrenNodes) {
                this.childrenNodes[child].render()
            }
        }
    }


    addChild(uiNodeChild,nodeName){
        if (uiNodeChild==this) return;
        if (uiNodeChild.hasChild(this)) return;
        nodeName = nodeName || "UINode"+this.childrenNodes.length;
        this.childrenNodes[nodeName]=uiNodeChild;
        uiNodeChild.parentNode=this
    }

    removeChildByName(uiNodeChildName){

    }

    
    removeChildByInstance(uiNodeChildName){

    }

    findChildByName(childName){
        return this.childrenNodes[childName]
    }

    findChildByInstance(childRef){
        for (const child in this.childrenNodes) {
            if (this.childrenNodes[child] == childRef){
                return Object.keys(this.childrenNodes).indexOf(child);
            }
        }
        return -1;
    }

    hasChild(childRef){
        for (const child in this.childrenNodes) {
            if (this.childrenNodes[child] == childRef){
                return true;
            }
        }
        return false;
    }
}


export {UINode}