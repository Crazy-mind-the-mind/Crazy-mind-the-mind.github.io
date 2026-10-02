import { rect2, vec2 } from "../dataTypes.mjs";
import { drawRect } from "../helper.mjs";
import { CircleCollider } from "./circleCollision.mjs";
import { ColliderAbstract } from "./collisionAbstract.mjs";
import { RectCollider } from "./rectCollision.mjs";

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

        this.collisionLayer = params.collisionLayer
        this.collisionMask = params.collisionMask

        this.collisionRect = params.collisionRect || new rect2();
		this.colliderOwners=[]

        this.collisionGroupName = params.collisionGroup || ""
        
        
        this.collisionQueuesArray= new Float32Array(4000)
        this.collisionOwnersArray= new Array(1000)
        
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
                this.RectCheckColliderAll(collider.collisionRect)
            }
        }
        else if(collider instanceof RectGroupCollider){
            console.log(collider)

            collider.colliderOwners.forEach((rCollider)=>{
    	        var cColliderRect= collider.collisionRect
                cColliderRect.origin=rCollider.position;
                this.RectCheckColliderAll(cColliderRect)
                
            })
        }


        return result
    }

    render(){
        
    }
    
    getCollisionCheckIdx(owner){
    	return collisionOwnersArray.indexOf(owner)
    }
    
    getCollisionCheck(idx){
    	return [
    			collisionQueuesArray[idx],
    			collisionQueuesArray[idx+1],
    			collisionQueuesArray[idx+2],
    			collisionQueuesArray[idx+3],
    			]
    }
    
    addCollisionCheck(owner,origin,size){
    	var idx=collisionOwnersArray.indexOf(owner)
    	collisionQueuesArray[idx]=origin.x
    	collisionQueuesArray[idx+1]=origin.y
    	collisionQueuesArray[idx+2]=size.x
    	collisionQueuesArray[idx+3]=size.y
    	colliderOwners[idx]=null
    }
    
    removeCollisionCheck(owner){
    	var idx=collisionOwnersArray.indexOf(owner)
    	collisionPositionsArray[idx]=0.0
    	collisionPositionsArray[idx+1]=0.0
    	collisionPositionsArray[idx+2]=0.0
    	collisionPositionsArray[idx+3]=0.0
    	colliderOwners[idx]=null
    }
    
    
    addColliderOwnerQueue(owner,position){
    	this.colliderOwners[owner]=
    	{
    		"position": position,
    		"oncollisionevent": owner.onCollisionReceived.bind(owner)
    	}
    }
    removeColliderOwnerQueue(owner){
        delete this.colliderOwners[owner];
    }
    updateColliderOwnerPosition(owner,position){
    	this.colliderOwners
    }
    
    getRects(){
        
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
    RectCheckColliderAll(crect){
    	Object.keys(this.colliderOwners).forEach((owner)=>{
    		var result = this.CheckIfRectCanCollide(this.colliderOwners[owner].position,crect) && RectCheckColliderForOwner(owner,crect);
    		if (result) colliderOwners[onwer].oncollisionevent();
    	})
    }
    RectCheckColliderAllNoEvent(crect){
        var resultArray = []
    	Object.keys(this.colliderOwners).forEach((owner)=>{
            var result = this.CheckIfRectCanCollide(this.colliderOwners[owner].position,crect) && RectCheckColliderForOwner(owner,crect);
            resultArray.push(owner);
    	})

        return resultArray;
    }
}

export {RectGroupCollider}