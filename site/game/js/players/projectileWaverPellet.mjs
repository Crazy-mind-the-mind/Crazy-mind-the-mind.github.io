
import { assetLoader } from "../core/game.assetLoader.mjs";
import { rect2,vec2} from "../utils/dataTypes.mjs";
import { correctDrawTransform, deleteEntity, drawRect, drawTexture } from "../utils/helper.mjs";
import { Entity } from "./entity.mjs";
import { Projectile } from "./projectile.mjs";


export class ProjectileWaverPellet extends Projectile{
    constructor(scope, x, y) {
			super(scope, x, y);
			this.timeLeft=360;
			this.direction=new vec2(1,0)
			this.waveTime=0;
			this.randomWavePoint=Math.random()*20
	}

	
	async loadAssets(){
		this.texture=await assetLoader.load("projectile","textures/projectiles/projectile.png")
		//this.lightTexture=await assetLoader.load("projectile","textures/projectile.png")
	}
	
	AI(){
		
		this.waveTime++;
		this.velocity.x+=0.05* this.direction.x || 1
		this.velocity.y=Math.sin((this.waveTime+this.randomWavePoint+ (Math.PI/2) )/10 )*2
	}
	
	render(){
		super.render()

		if (!this.lightTexture) return;
		drawTexture(
			this.scope.context,
			this.lightTexture,
			correctDrawTransform(this,"transform","lightTexture")
		)
	}
	
}

//ProjectileTypes["2"] = function (scope,x,y) {return new ProjectileWaverPellet(scope,x,y)};
