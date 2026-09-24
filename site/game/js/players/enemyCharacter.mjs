
import { RectCollider } from "../utils/collision/rectCollision.mjs";
import { rect2 } from "../utils/dataTypes.mjs";
import { Boundary, deleteEntity } from "../utils/helper.mjs";
import { Character } from "./character.mjs";
import { ColliderAbstract } from "../utils/collision/collisionAbstract.mjs";
import { Projectile } from "./projectile.mjs";
class EnemyCharacter extends Character{
    constructor(scope, x, y) {
        super(scope, x, y);
        this.boundary = new rect2(0,0,scope.constants.width*2,scope.constants.height)
        this.aliveTime=0
        this.collision = new RectCollider(this,this.transform.position,{
            collisionRect: new rect2(
                this.transform.position.x,
                this.transform.position.y,
                16,16
            ),
            showCollision:scope.constants.showColliders,
            collisionLayers:["enemies"],
            collisionMask:["projectiles"],
        });
	}

    update(){
        super.update()
        this.AI()

        Boundary(this,this.boundary)
        this.aliveTime++;

        if (this.statHealth <=0){
            deleteEntity(this);
        }
    }
    AI(){
        
    }

    render(){
		super.render()
    }

    onCollisionReceived(collider){
        if (collider instanceof ColliderAbstract ){
				
				if (collider.owner && collider.owner instanceof Projectile){
					var collidingProjectile=collider.owner
					if (this.isDead){return}
                    if (collidingProjectile.friendly){
							this.Hurt(collidingProjectile.damage)
                    }
					
							
				}
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