import { rect2, uiTransform, vec2 } from "../dataTypes.mjs"
import { drawRect, parseUiTransform } from "../helper.mjs";
import { transform2 } from "../dataTypes.mjs";


class UINode{
    constructor(scope, x,y , parentUInode){
        this.scope=scope
        this.parentNode=parentUInode;
        this.childrenNodes={};
        this.transform = new uiTransform(new vec2(x,y));
        this.visible=true;
        this.debugColor="#FFAA00"

        this.loadAssets();
    }
    async loadAssets(){

    }
    calculateTransform(){
        this.calculatedTransform=parseUiTransform(this.scope,this.transform);
        if (this.parentNode!==null){
            this.calculatedTransform.addTransform(
            this.parentNode.calculatedTransform
        )
        }
    }
    update(){
        if (Object.keys(this.childrenNodes).length>0){
            for (const child in this.childrenNodes) {
                this.childrenNodes[child].update()
            }
        }
    }
    render(){

        this.visible=this.parentNode?this.parentNode.visible:this.visible;
        this.calculateTransform()

        
        drawRect(this.scope.context,
            new rect2(
                this.calculatedTransform.position.x,
                this.calculatedTransform.position.y,
                4,
                4,
            ),
            this.debugColor
        )


        if (Object.keys(this.childrenNodes).length>0){
            for (const child in this.childrenNodes) {
                this.childrenNodes[child].render()
            }
        }
    }


    addChild(uiNodeChild,nodeName){
        if (uiNodeChild==this) return;
        if (uiNodeChild.hasChild(this)) return;

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