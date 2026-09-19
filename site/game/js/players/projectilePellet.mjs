
import { assetLoader } from "../core/game.assetLoader.mjs";
import { rect2,vec2} from "../utils/dataTypes.mjs";
import { correctDrawTransform, deleteEntity, drawRect, drawTexture } from "../utils/helper.mjs";
import { Entity } from "./entity.mjs";
import { Projectile} from "./projectile.mjs";


export class ProjectilePellet extends Projectile{
    constructor(scope, x, y) {
			super(scope, x, y);
			this.timeLeft=240;
			
	}

	
	async loadAssets(){
		this.texture=await assetLoader.load("projectile","textures/projectile.png")
		this.lightTexture=await assetLoader.load("texture","textures/light.png")
	}
	update(){
		this.AI()
		this.timeLeft-=1;
		this.transform.position.x+=this.velocity.x;
		this.transform.position.y+=this.velocity.y;

		if (this.timeLeft<=0){
			deleteEntity(this.scope,this)
		}
	}
	AI(){
		this.velocity.x*=0.99;
		this.velocity.y*=0.99;

		//this.transform.scale.vecMult(0.99)
	}

	

}

//ProjectileTypes[1] = function (scope,x,y) {return new ProjectilePellet(scope,x,y)};
