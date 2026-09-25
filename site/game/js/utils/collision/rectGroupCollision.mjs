import { rect2, vec2 } from "../dataTypes.mjs";
import { drawRect } from "../helper.mjs";
import { CircleCollider } from "./circleCollision.mjs";
import { ColliderAbstract } from "./collisionAbstract.mjs";


/*
	RectGroupCollider is a small optimization solution to a problem: 
		How do i process multiple collisions with similar shapes
		without overloading my memory?
	And the solution?
		Make it one collider, that batches all of those collisions into one call
*/

class RectGroupCollider extends ColliderAbstract{
    
    constructor(owner,position,params){
    	// Due to the fact it is a batch collider, it makes no sense to have an owner.
        super(null,position,params)
        
        this.collisionRect = params.collisionRect || new rect2();
		this.colliderOwners=[]
    }

    update(){
        
        if (this.collisionRect){
            this.collisionRect.origin = vec2.copy(this.transform.position).vecSub(vec2.copy(this.collisionRect.size).vecDiv(2) ); 
        }
    }

    collidesWith(collider){
        if (!collider instanceof ColliderAbstract){return false}
        if (collider == this) {return false}
        var result = false;

        if (collider instanceof RectCollider){
            if (collider.collisionRect){
                RectCheckColliderAll(collisionRect.)
            }
        }
        else if(collider instanceof RectGroupCollider){
        	
        }


        return result
    }

    render(){
        
    }
    
    addColliderOwnerQueue(owner,position){
    	this.colliderOwners[owner]=
    	{
    		"position": position,
    		"oncollisionevent": owner.onCollisionReceived.bind(owner)
    	}
    }
    updateColliderOwnerPosition(owner,position){
    	this.colliderOwners
    }
    
    /*
    There is no point in checking rects (complex algorithm) 
    when the distance of the center of rects is greater than
    the sum of half of their diagonals, because that is the max distance there might have collision
    */
    CheckIfRectCanCollide(position,crect){
    	 this.collisionRect.origin=position;
    	 return this.collisionRect.centerPoint.distanceTo(crect.centerPoint) <= (this.collisionRect.diagonalSize+crect.diagonalSize)/2 
    }
    RectCheckColliderForOwner(owner,crect){
    	const oPosition=this.colliderOwners[owner].position;
    	this.collisionRect.origin=oPosition;
    	return this.collisionRect.instersects_rect(crect)
    }
    RectCheckColliderAll(owner,crect){
    	Object.keys(this.colliderOwners).forEach((owner)=>{
    		var result = CheckIfRectCanCollide(this.colliderOwners[owner].position) && RectCheckColliderForOwner(owner,crect);
    		if (result) colliderOwners[onwer].oncollisionevent();
    	})
    }
}

export {RectGroupCollider}