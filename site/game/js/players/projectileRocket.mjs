
import { assetLoader } from "../core/game.assetLoader.mjs";
import { rect2,vec2} from "../utils/dataTypes.mjs";
import { correctDrawTransform, deleteEntity, drawRect, drawTexture } from "../utils/helper.mjs";
import { Entity } from "./entity.mjs";
import { Projectile} from "./projectile.mjs";


export class ProjectileRocket extends Projectile{
    get damage(){
		return this.hostile? 3:7;
	}
	constructor(scope, x, y) {
			super(scope, x, y);
			this.timeLeft=240;
			
			
	}

	
	async loadAssets(){
		this.texture=Projectile.imageProjectileAtlas["ProjectileRocket"]
		this.lightTexture=await assetLoader.loadImage("texture","textures/light.png")
	}
	AI(){
		this.target = this.hostile?this.scope.state.player:null
		
		if (!this.target){return}
		this.velocity = this.velocity.directionTo(this.target.transform.position).vecMult(1.5)

		//this.transform.scale.vecMult(0.99)
	}

	

}

//ProjectileTypes[1] = function (scope,x,y) {return new ProjectilePellet(scope,x,y)};
