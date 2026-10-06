import { rect2, vec2 } from "../dataTypes.mjs";
import { drawRect } from "../helper.mjs";
import { ColliderAbstract } from "./collisionAbstract.mjs";
import { RectGroupCollider } from "./rectGroupCollision.mjs";



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
                result = this.CheckIfRectCanCollide(collider.collisionRect) && this.collisionRect.intersects_rect(collider.collisionRect);
                if (result== true)
                    this.oncollisionevent(collider,this);
            }
        }
        else if (collider instanceof RectGroupCollider){
        	if (collider.collisionRect){

                let resultArray = collider.checkCollisions(this.collisionRect)
                

                if (resultArray.length!=0){
                    resultArray.forEach((rCollider)=>{

                        this.oncollisionevent(rCollider);
                    })
                } 
            }
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
    /*
    There is no point in checking rects (complex algorithm) 
    when the distance of the center of rects is greater than
    the sum of half of their diagonals, because that is the max distance there might have collision
    */
    CheckIfRectCanCollide(crect){
    	 return this.collisionRect.centerPoint.distanceTo(crect.centerPoint) <= (this.collisionRect.diagonalSize+crect.diagonalSize)/2 
    }
}

export {RectCollider}