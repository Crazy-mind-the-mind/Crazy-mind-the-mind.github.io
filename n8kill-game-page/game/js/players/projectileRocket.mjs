
import { assetLoader } from "../core/game.assetLoader.mjs";
import { rect2,vec2} from "../utils/dataTypes.mjs";
import { correctDrawTransform, deleteEntity, drawRect, drawTexture } from "../utils/helper.mjs";
import { Entity } from "./entity.mjs";
import { Projectile} from "./projectile.mjs";


export class ProjectileRocket extends Projectile{
    get damage(){
		return this.hostile? 3:7;
	}
	set damage(v){

	}
	constructor(scope, x, y) {
			super(scope, x, y);
			this.timeLeft=240;
			this.damage = 1;			
			
	}

	
	async loadAssets(){
		this.texture=Projectile.imageProjectileAtlas["ProjectileRocket"]
		
	}
	AI(){
		this.target = this.hostile?this.scope.state.player:null
		
		if (!this.target){return}
		this.direction =this.velocity.directionTo(this.target.transform.position)
		this.velocity = vec2.copy(this.direction).vecMult(10)
		this.transform.scale.x=-1
		
	}

	render(){

		if (!this.texture) return;
		if (!this.scope) return;
		var renderer=this.scope.context
		drawTexture(
			renderer,
			this.texture,
			correctDrawTransform(this),
			{
				transparency:this.friendly?0.2:1.0,
				useCanvasTransforms:true
			}
		)


	}
	

}

//ProjectileTypes[1] = function (scope,x,y) {return new ProjectilePellet(scope,x,y)};
