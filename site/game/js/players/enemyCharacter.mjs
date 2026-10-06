
import { RectCollider } from "../utils/collision/rectCollision.mjs";
import { rect2, vec2 } from "../utils/dataTypes.mjs";
import { Boundary, deleteEntity } from "../utils/helper.mjs";
import { Character } from "./character.mjs";
import { ColliderAbstract } from "../utils/collision/collisionAbstract.mjs";
import { Projectile } from "./projectile.mjs";
import { RectGroupCollider } from "../utils/collision/rectGroupCollision.mjs";
import { registerCollider } from "../utils/collision/collisionsystem.mjs";
class EnemyCharacter extends Character{

    static collisionGroup;
	
	
	
	static createCollisionGroup(scope){
		EnemyCharacter.collisionGroup=new RectGroupCollider(EnemyCharacter,new vec2(),{
			"collisionRect":new rect2(0,0,8,8),
			"collisionLayer":["enemies"],
			"collisionMask":["projectiles"],
			"collisionGroupName":"enemies",
            "maxColliders":100
		})
		registerCollider(EnemyCharacter.getCollisionGroup());
		
	}


	static getCollisionGroup(){
		return EnemyCharacter.collisionGroup
	}


	static addToCollisionGroup(entity,scope){
		/**@type{RectGroupCollider} */
		var collisionGroup = EnemyCharacter.getCollisionGroup();
		if (!collisionGroup){
			EnemyCharacter.createCollisionGroup(scope )
			collisionGroup = EnemyCharacter.getCollisionGroup();
		}
		collisionGroup.addCollisionCheck(entity,entity.transform.position,entity.collisionSize);
	}


	static removeFromCollisionGroup(){
		/**@type{RectGroupCollider} */
		var collisionGroup = EnemyCharacter.getCollisionGroup();
		if (!collisionGroup) return;
		collisionGroup.removeColliderOwnerQueue(entity);
	}

    constructor(scope, x, y) {
        super(scope, x, y);
        this.boundary = new rect2(0,0,scope.constants.width*2,scope.constants.height)
        this.aliveTime=0
        
        this.collisionSize = new vec2(16,16)

        window.game.eventSystem.connectToEvent("playerDied",function(){
            deleteEntity(this.scope,this)
        },this)

        EnemyCharacter.addToCollisionGroup(this,scope)
	}

    update(){
        super.update()
        this.AI()

        Boundary(this,this.boundary)
        this.aliveTime++;

        if (this.statHealth <=0){
            deleteEntity(this);
        }
        EnemyCharacter.getCollisionGroup().updateCheck(this)
    }
    AI(){
        
    }

    render(){
		super.render()
    }

    onCollisionReceived(collider){
        //console.log(collider)

        if (collider instanceof Projectile){

            
                var collidingProjectile=collider
                if (this.isDead){return}
                if (collidingProjectile.friendly){this.Hurt(collidingProjectile.damage)}       
            
        }

        if (collider instanceof ColliderAbstract ) {return}

        
        else{

        }
				
			
	}

    Dead(){
        if (this.active){
            this.scope.state.playerStatus.ScorePoints+=10
            this.scope.eventSystem.emitEvent("enemyKilled")
            deleteEntity(this.scope,this);

        }
    }
}

export {EnemyCharacter}