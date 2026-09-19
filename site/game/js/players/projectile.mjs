
import { assetLoader } from "../core/game.assetLoader.mjs";
import { rect2,vec2} from "../utils/dataTypes.mjs";
import { correctDrawTransform, deleteEntity, drawRect, drawTexture } from "../utils/helper.mjs";
import { Entity } from "./entity.mjs";


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
			this.direction = new vec2(0,0)

	}

	
	async loadAssets(){
		this.texture=await assetLoader.load("projectile","textures/projectile.png")
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
	}
}


