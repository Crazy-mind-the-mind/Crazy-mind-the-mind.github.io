


import { ColliderAbstract } from "./collisionAbstract.mjs"


class CircleCollider extends ColliderAbstract{
    constructor (owner,position,params){
        super(owner,position,params)
        this.circleRadius = params.circleRadius || 1;

    }

    collides_with(collider){
        if (!collider instanceof CollisionAbstract){
            return false
        }

        var result = false;

        if (collider instanceof RectCollider){
            if (collider.collisionRect){
                
                
            }
        }
        else if(collider instanceof CircleCollider){
            if (collider.circleRadius){
                result = this.transform.position.distanceTo(collider.transform.position) < this.circleRadius+collider.circleRadius;
            }
        }


        return result

    }
}
export{CircleCollider}