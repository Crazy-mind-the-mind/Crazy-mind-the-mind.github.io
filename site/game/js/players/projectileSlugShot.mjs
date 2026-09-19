
import { assetLoader } from "../core/game.assetLoader.mjs";
import { rect2,Texture,vec2} from "../utils/dataTypes.mjs";
import { correctDrawTransform, deleteEntity, drawRect, drawTexture } from "../utils/helper.mjs";
import { Entity } from "./entity.mjs";
import { Projectile } from "./projectile.mjs";


export class ProjectileSlugShot extends Projectile{
    constructor(scope, x, y) {
			super(scope, x, y);
			this.timeLeft=20;
			this.damage=10
			
	}

	
	async loadAssets(){
		assetLoader.load("projectileSlug","textures/projectileSlug.png").then(
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
				this.texture.imageModulation = "rgba(00, 0, 255, 1)"
			}
			else if (this.hostile){

			}
			else{

			}
		}


	}
	
	
}

//ProjectileTypes[3] = function (scope,x,y) {return new ProjectileSlugShot(scope,x,y)};
