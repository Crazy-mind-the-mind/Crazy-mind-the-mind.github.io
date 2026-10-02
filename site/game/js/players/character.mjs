import { assetLoader } from "../core/game.assetLoader.mjs";
import { rect2, transform2, vec2 } from "../utils/dataTypes.mjs";
import { playAudio } from "../utils/helper.mjs";
import { Entity } from "./entity.mjs";


export class Character extends Entity{
    constructor(scope, x, y) {
			super(scope, x, y);
			this.velocity = new vec2(0, 0);

			this.collision = null;

			this.statHealthMax = 0;
			this.statHealth = 0;
			this.isDead = false;
			this.immunityFramesWaitTime = 30
			this.immunityFramesTime = 0
	}
	loadAssets(){
		//this.texture = await assetLoader.loadImage("WaverEnemyShip","textures/ships/ship.png");
	}
	update(){
        if (!this.active) return;

		if (this.collision){
			this.collision.transform=this.transform
			this.collision.update()
		}
		this.immunityFramesTime--;
		this.transform.position.vecAdd(this.velocity)
	}

	render(){
        if (!this.active) return;

		super.render()
		if (this.collision){
			this.collision.render()
		}
	}

	onCollisionReceived(collider,sourceCollider){
		console.log("Collision")
	}

	Hurt(damageAmount){
		if (this.statHealth<=0){
			this.Dead()
		}
		if (this.immunityFramesTime>0) return;
		playAudio(this.scope.audio,"DamageHitSoundEffect");
		console.log(this)	
		this.statHealth-=damageAmount;
		
		this.immunityFramesTime=this.immunityFramesWaitTime;

	}
	
	Dead(){
		
	}
	
	get visibilityRect(){
		return new rect2(
			this.transform.x - (this.texture.image.width || this.texture.width)/2,
			this.transform.y - (this.texture.image.height || this.texture.height)/2,
			this.texture.image.width || this.texture.width,
			this.texture.image.height || this.texture.height
		);
	}
}