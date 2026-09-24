import { rect2, vec2 } from "../dataTypes.mjs";
import { drawRect } from "../helper.mjs";
import { CircleCollider } from "./circleCollision.mjs";
import { ColliderAbstract } from "./collisionAbstract.mjs";




class RectCollider extends ColliderAbstract{
    
    constructor(owner,position,params){
        super(owner,position,params)
        this.collisionRect = params.collisionRect || new rect2();

    }

    update(){
        
        if (this.collisionRect){
            this.collisionRect.origin = vec2.copy(this.transform.position).vecSub(vec2.copy(this.collisionRect.size).vecDiv(2) ); 
        }

        //if (this.owner){
        //    drawRect(this.owner.scope.context,this.collisionRect,"green")
        //}
    }

    collidesWith(collider){
        if (!collider instanceof ColliderAbstract){return false}
        if (collider == this) {return false}
        var result = false;

        if (collider instanceof RectCollider){
            if (collider.collisionRect){
                result = this.collisionRect.intersects_rect(collider.collisionRect);
                if (result== true)
                    this.oncollisionevent(collider,this);
            }
        }
        else if(collider instanceof CircleCollider){

        }


        return result
    }

    render(){
        if (!this.showCollision) return;
        if (this.owner){
            if (this.owner.scope.configurations.renderer=="canvas"){
                drawRect(this.owner.scope.context,this.collisionRect,this.collisionColor)
            }
            else{

            }
        }
    }
}

export {RectCollider}