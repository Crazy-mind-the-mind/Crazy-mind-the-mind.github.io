
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
			
			this.collisionSize=new vec2(16,16)


			
			
	}

	
	async loadAssets(){
		this.texture = await assetLoader.loadImage("projectileSlug","textures/projectiles/projectileSlug.png")
	}
	
	AI(){
		this.velocity.x*=0.99;
		this.velocity.y*=0.99;
		
		


	}
	
	
}
