
import { assetLoader } from "../core/game.assetLoader.mjs";
import { rect2,vec2} from "../utils/dataTypes.mjs";
import { correctDrawTransform, deleteEntity, drawRect, drawTexture } from "../utils/helper.mjs";
import { Entity } from "./entity.mjs";
import { Projectile} from "./projectile.mjs";


export class ProjectileRocket extends Projectile{
    
	constructor(scope, x, y) {
			super(scope, x, y);
			this.timeLeft=240;
			this.damage = 3;			
			
	}

	
	async loadAssets(){
		this.texture=Projectile.imageProjectileAtlas["ProjectileRocket"]
		
	}
	AI(){
		this.target = this.hostile?this.scope.state.entities.player:this.scope.state.entities.player
		

		this.direction.x= -this.transform.position.directionTo(this.target.transform.position).x
		this.direction.y= -this.transform.position.directionTo(this.target.transform.position).y
		this.direction = this.direction.normalized()
		
		
		this.velocity.vecAdd(vec2.copy(this.direction).vecMult(0.01))

		
	}

	render(){

		if (!this.texture) return;
		if (!this.scope) return;
		var renderer=this.scope.context
		this.transform.rotation=Math.PI

		drawTexture(
			renderer,
			this.texture,
			correctDrawTransform(this),
			{
				transparency:this.friendly?0.2:1.0,
				offsets: new vec2(this.texture.width,this.texture.height)/2,
				useCanvasTransforms:true
			}
		)


	}
	

}

//ProjectileTypes[1] = function (scope,x,y) {return new ProjectilePellet(scope,x,y)};
