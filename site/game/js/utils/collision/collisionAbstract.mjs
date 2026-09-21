import { transform2 } from "../dataTypes.mjs"
import { registerCollider } from "./collisionsystem.mjs";


class ColliderAbstract{
    constructor(owner,position,params) {
        params = params || {}
        this.owner = owner
	    this.transform = new transform2()
	    
	    
        this.active = params.active || true;
        this.showCollision=params.showCollision || false;
        this.collisionColor=params.color|| "#FF00FF88"
		
		this.collidingWith=[]

        this.collisionLayer=params.collisionLayer||[];
        this.collisionMask=params.collisionMask||[];

        this.oncollisionevent=owner.onCollisionReceived;
        registerCollider(this);
    }
    update(){

    }

    collidesWith(collider) {
        if (!collider instanceof CollisionAbstract) return false;

        return false
    }

    render(){
       if (!this.showCollision) return;
       
       
    }




}

export {ColliderAbstract}