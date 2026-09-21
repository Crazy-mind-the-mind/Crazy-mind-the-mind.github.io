
import { assetLoader } from "../core/game.assetLoader.mjs";
import { RectCollider } from "../utils/collision/rectCollision.mjs";
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
			this.collision=new RectCollider(
				this,
				this.transform.position,
				{
					collisionRect: new rect2(
						this.transform.position.x,
						this.transform.position.y,
						8,8
					),
					showCollision:true,
					color:"#ff000088"
				}
			)

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
}


