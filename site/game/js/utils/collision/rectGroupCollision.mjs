import { Projectile } from "../../players/projectile.mjs";
import { rect2, vec2 } from "../dataTypes.mjs";
import { drawRect } from "../helper.mjs";

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

        console.log(owner)
        this.groupOwner=owner
        this.collisionLayer = params.collisionLayer
        this.collisionMask = params.collisionMask

        /**@type {rect2} */
        this.collisionRect = params.collisionRect || new rect2(0,0,0,0);
		this.colliderOwners=[]

        this.collisionGroupName = params.collisionGroup || ""
        
        
        this.collisionQueuesArray= new Float32Array(params.maxColliders*4 || 4000 )
        this.collisionOwnersArray= new Array(params.maxColliders || 1000)
        
        if (window.game.extrasFncs){
            if(window.game.extrasFncs.renderFncs){
                window.game.extrasFncs.renderFncs.push(this.render.bind(this))

            }
        }
    }

    render(){
        return
        for (let idx = 0; idx < this.collisionOwnersArray.length; idx++) {
            this.setCollisionRect(this.getCollisionCheck(idx))
            drawRect(window.game.context,this.collisionRect,"#88888888")
            
        }
    }
    collidesWith(collider){
        if (!collider instanceof ColliderAbstract){return false}
        if (collider == this) {return false}
        var result = false;

        
        if (collider instanceof RectCollider){
            
                    //console.log(collider)

            if (collider.collisionRect){
                var result = this.checkCollisions(collider.collisionRect);
                

                result.forEach((resultC)=>{
                    
                    resultC.onCollisionReceived(collider)
                })
            }
            
        }
        else if(collider instanceof RectGroupCollider){
            //console.log(collider)

            collider.collisionOwnersArray.forEach((rCollider)=>{
                
                collider.setCollisionRect(collider.getCollisionCheck( collider.getCollisionCheckIdx(rCollider)))

                var result = this.checkCollisions(collider.collisionRect) || [];

                    //console.log(result)

                result.forEach((  resultC)=>{

                    resultC.onCollisionReceived(rCollider)
                    
                })
    	        
            })
        }


        return result
    }

    findFirstEmptySlot(){
        for (let idx=0;idx< this.collisionOwnersArray.length;idx++){
            if (this.collisionOwnersArray[idx]!=null){ continue}
            return idx;
        }
        return 0;
    }
    
    hasOwnerAt(idx){

        return  this.collisionOwnersArray[idx] != null;
    }
    getCollisionCheckIdx(owner){
    	return this.collisionOwnersArray.indexOf(owner)
    }
    
    getCollisionCheck(idx){
    	return [
    			this.collisionQueuesArray[idx*4],
    			this.collisionQueuesArray[idx*4+1],
    			this.collisionQueuesArray[idx*4+2],
    			this.collisionQueuesArray[idx*4+3],
    			]
    }
    
    addCollisionCheck(owner,origin,size){
    	this.collisionOwnersArray[this.findFirstEmptySlot()]=owner
    	var idx=this.collisionOwnersArray.indexOf(owner)
    	this.collisionQueuesArray[idx*4]=origin.x
    	this.collisionQueuesArray[idx*4+1]=origin.y
    	this.collisionQueuesArray[idx*4+2]=size.x
    	this.collisionQueuesArray[idx*4+3]=size.y

        if (window.debugMode && window.debugMode.showCollisionGroupNewIDX){
            console.log(this.findFirstEmptySlot())

        }
    }
    
    removeCollisionCheck(owner){
    	var idx=this.collisionOwnersArray.indexOf(owner)
    	this.collisionQueuesArray[idx]=0.0
    	this.collisionQueuesArray[idx+1]=0.0
    	this.collisionQueuesArray[idx+2]=0.0
    	this.collisionQueuesArray[idx+3]=0.0
    	this.collisionOwnersArray[idx]=null
        
    }
    
    setCollisionRect(data){
        //console.log(data)
    	this.collisionRect.origin.x=data[0];this.collisionRect.origin.y=data[1];
    	this.collisionRect.size.x=data[2]; this.collisionRect.size.y=data[3];
    }
    
    checkCollision(ownerIdx, rect){
    	this.setCollisionRect(this.getCollisionCheck(ownerIdx))

        let result= this.collisionRect.intersects_rect(rect);
    	return result
    }
    
    checkCollisions(rect){
        
        let collisionResult = [];

        for (let idx=0; idx < this.collisionOwnersArray.length; idx++){


            if (!this.hasOwnerAt(idx)){continue}
        
            //console.log("yes it has owner ",idx,"for group",this.collisionGroup)
            let result = this.checkCollision(idx,rect);


            if (result){
                collisionResult.push(this.collisionOwnersArray[idx]);
            }
                
            
        }

        return collisionResult
    }


    updateCheck(owner){
        var idx=this.getCollisionCheckIdx(owner)
    	this.collisionQueuesArray[idx*4]=owner.transform.position.x-owner.collisionSize.x/2
    	this.collisionQueuesArray[idx*4+1]=owner.transform.position.y-owner.collisionSize.y/2
    	this.collisionQueuesArray[idx*4+2]=owner.collisionSize.x
    	this.collisionQueuesArray[idx*4+3]=owner.collisionSize.y
    }
    
    
    
    checkIfRectCanCollide(crect){
    	 return this.collisionRect.centerPoint.distanceTo(crect.centerPoint) <= (this.collisionRect.diagonalSize+crect.diagonalSize)/2 
    }
    
    
}

export {RectGroupCollider}