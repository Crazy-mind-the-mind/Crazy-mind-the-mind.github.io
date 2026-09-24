
import { assetLoader } from "../core/game.assetLoader.mjs";
import { rect2,Texture,vec2} from "../utils/dataTypes.mjs";
import { correctDrawTransform, deleteEntity, drawRect, drawTexture } from "../utils/helper.mjs";
import { Entity } from "./entity.mjs";
import { Projectile } from "./projectile.mjs";
import { RectCollider } from "../utils/collision/rectCollision.mjs";

export class ProjectileSlugShot extends Projectile{
    constructor(scope, x, y) {
			super(scope, x, y);
			this.timeLeft=20;
			this.damage=10
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
		assetLoader.loadImage("projectileSlug","textures/projectiles/projectileSlug.png").then(
			(imageTex)=>{
				this.texture = new Texture(imageTex)
			}
		)
		
	}
	
	AI(){
		this.velocity.x*=0.99;
		this.velocity.y*=0.99;
		
		if (this.texture && this.texture instanceof Texture){
			if (this.friendly){
				this.texture.imageModulate = "#008FFF88";
			}
			else if (this.hostile){
				this.texture.imageModulate = "#FF000088";

			}
			else{
				this.texture.imageModulate = "#00880088";
			}
		}


	}
	
	
}

//ProjectileTypes[3] = function (scope,x,y) {return new ProjectileSlugShot(scope,x,y)};
