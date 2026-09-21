
import { assetLoader } from "../core/game.assetLoader.mjs";
import { ColliderAbstract } from "../utils/collision/collisionAbstract.mjs";
import { RectCollider } from "../utils/collision/rectCollision.mjs";
import { rect2,vec2} from "../utils/dataTypes.mjs";
import { correctDrawTransform, deleteEntity, drawRect, drawTexture } from "../utils/helper.mjs";
import { Character } from "./character.mjs";
import { EnemyCharacter } from "./enemyCharacter.mjs";
import { Entity } from "./entity.mjs";
import { PlayerCharacter } from "./playercharacter.mjs";


export class Projectile extends Entity{

	
	
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
			this.collision=new RectCollider(
				this,
				this.transform.position,
				{
					collisionRect: new rect2(
						this.transform.position.x,
						this.transform.position.y,
						8,8
					),
					showCollision:scope.constants.showColliders,
					color:"#ff000088",
					collisionLayer:["projectiles"],
					collisionMask:["player","enemies"],
				}
			)

	}

	
	async loadAssets(){
		this.texture=await assetLoader.load("projectile","textures/projectiles/projectile.png")
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
		if (collider instanceof ColliderAbstract ){
				if (collider.owner && collider.owner instanceof Character ){
					var collidingCharacter=collider.owner
					

					if (collidingCharacter instanceof PlayerCharacter && this.hostile){
						this.pierces--;
					}
					if (collidingCharacter instanceof EnemyCharacter && this.friendly){
						this.pierces--;
					}

					//this.characterExcludes.push(collider.owner);
							
				}
			}
	}
}


