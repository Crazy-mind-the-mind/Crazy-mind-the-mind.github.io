import { uiTransform, vec2 } from "../dataTypes.mjs"
import { parseUiTransform } from "../helper.mjs";



class UINode{
    constructor(scope, x,y , parentUInode){
        this.scope=scope
        this.parentNode=parentUInode;
        this.childrenNodes={};
        this.transform = new uiTransform(new vec2(x,y));
        this.visible=true;
    }
    
    calculateTransform(){
        this.calculatedTransform=parseUiTransform(this.scope,this.transform);
    }
    update(){
        
    }
    render(){
        this.visible=this.parentNode?this.parentNode.visible:this.visible;


        this.calculateTransform()

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