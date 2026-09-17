import { uiTransform } from "../dataTypes.mjs"
import { parseUiTransform } from "../helper.mjs";



class UINode{
    constructor(scope, x,y){
        this.scope=scope
        this.parentNode=null;
        this.childrenNode=null;
        this.transform = new uiTransform();
    }
    update(){

    }
    render(){

        this.calculatedTransform=parseUiTransform(this.scope,this.transform);

    }
}


export {UINode}