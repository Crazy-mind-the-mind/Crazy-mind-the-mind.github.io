
import { assetLoader } from "../core/game.assetLoader.mjs";
import { ColliderAbstract } from "../utils/collision/collisionAbstract.mjs";
import { registerCollider } from "../utils/collision/collisionsystem.mjs";
import { RectCollider } from "../utils/collision/rectCollision.mjs";
import { RectGroupCollider } from "../utils/collision/rectGroupCollision.mjs";
import { rect2,vec2} from "../utils/dataTypes.mjs";
import { correctDrawTransform, deleteEntity, drawRect, drawTexture } from "../utils/helper.mjs";
import { Character } from "./character.mjs";
import { EnemyCharacter } from "./enemyCharacter.mjs";
import { Entity } from "./entity.mjs";
import { PlayerCharacter } from "./playerCharacter.mjs";


export class Projectile extends Entity{

	static createCollisionGroup(scope){
		Projectile.collisionGroup=new RectGroupCollider(null,new vec2(),{
			"collisionRect":new rect2(0,0,8,8),
			"collisionLayer":["projectiles"],
			"collisionMask":["player","enemies"],
			"collisionGroupName":"projectiles"
		})
		registerCollider(Projectile.getCollisionGroup());
		
	}
	static getCollisionGroup(){
		return Projectile.collisionGroup
	}
	static addToCollisionGroup(entity,scope){
		/**@type{RectGroupCollider} */
		var collisionGroup = Projectile.getCollisionGroup();
		if (!collisionGroup){
			Projectile.createCollisionGroup(scope )
			collisionGroup = Projectile.getCollisionGroup();
		}
		collisionGroup.addColliderOwnerQueue(entity,entity.transform.position);
	}
	static removeFromCollisionGroup(){
		/**@type{RectGroupCollider} */
		var collisionGroup = Projectile.getCollisionGroup();
		if (!collisionGroup) return;
		collisionGroup.removeColliderOwnerQueue(entity);
	}
	//static newCollisionGroupCollider(){
	//	return new RectColliderGroup(null,new vec2(),{
	//		"collisionRect":new rect2(0,0,8,8),
	//		"collisionLayer":["projectiles"],
	//		"collisionMask":["player","enemies"],

	//	})

	//}
	
    constructor(scope, x, y) {
			super(scope, x, y);
			this.velocity = new vec2();
			this.owner = null;
			this.damage = 0;
			this.timeLeft=30;
			this.z_index=-10;
			this.friendly=false;
			this.hostile=false;
			this.pierces=1;
			this.direction = new vec2(0,0)
			Projectile.addToCollisionGroup(this)
			//this.collision=new RectCollider(
			//	this,
			//	this.transform.position,
			//	{
			//		collisionRect: new rect2(
			//			this.transform.position.x,
			//			this.transform.position.y,
			//			8,8
			//		),
			//		showCollision:scope.constants.showColliders,
			//		color:"#ff000088",
			//		collisionLayer:["projectiles"],
			//		collisionMask:["player","enemies"],
			//	}
			//)

	}

	
	async loadAssets(){
		this.texture=await assetLoader.loadImage("projectile","textures/projectiles/projectile.png")
	}
	update(){
		this.AI()
		this.timeLeft-=1;
		this.transform.position.x+=this.velocity.x;
		this.transform.position.y+=this.velocity.y;
		this.characterExcludes=[];
		if (this.timeLeft<=0 || this.pierces == 0){
			deleteEntity(this.scope,this)
		}

		if (this.collision){
			this.collision.transform=this.transform
			this.collision.update()
		}
	}
	AI(){
		
	}
	
	render(){
		if (!this.texture) return;
		if (!this.scope) return;
		var renderer=this.scope.context
		drawTexture(
			renderer,
			this.texture,
			correctDrawTransform(this)
		)

		if (this.collision){
			this.collision.render()
		}
	}

	onCollisionReceived(collider){
		console.log("col")
		if (collider instanceof ColliderAbstract ){
				if (collider.owner && collider.owner instanceof Character ){
					var collidingCharacter=collider.owner
					

					if (collidingCharacter instanceof PlayerCharacter && this.hostile){
						this.pierces--;
					}
					if (collidingCharacter instanceof EnemyCharacter && this.friendly){
						this.pierces--;
						console.log("AAA")
					}

					//this.characterExcludes.push(collider.owner);
							
				}
			}
	}

	get visibilityRect(){
		return new rect2(
			this.transform.x - (this.texture.image.width || this.texture.width)/2,
			this.transform.y - (this.texture.image.height || this.texture.height)/2,
			this.texture.image.width || this.texture.width,
			this.texture.image.height || this.texture.height
		);
	}
}


