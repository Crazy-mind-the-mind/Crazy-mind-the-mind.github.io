import { assetLoader } from "../core/game.assetLoader.mjs";
import { transform2, vec2 } from "../utils/dataTypes.mjs";
import { Entity } from "./entity.mjs";


export class Character extends Entity{
    constructor(scope, x, y) {
			super(scope, x, y);
			this.velocity = new vec2(0, 0);

			this.collision = null;

			this.statHealthMax = 0;
			this.statHealth = 0;

			this.immunityFramesWaitTime = 30
			this.immunityFramesTime = 0
	}
	loadAssets(){
		//this.texture = await assetLoader.load("WaverEnemyShip","textures/ships/ship.png");
	}
	update(){
		if (this.collision){
			this.collision.transform=this.transform
			this.collision.update()
		}
		this.transform.position.vecAdd(this.velocity)
	}

	render(){
		super.render()
		if (this.collision){
			this.collision.render()
		}
	}

	onCollisionReceived(collider){
		console.log("Collision")
	}

	Hurt(damageAmount){
		if (this.immunityFramesTime>0) return;

		this.statHealth-=damageAmount;
		this.immunityFramesTime=this.immunityFramesWaitTime;

	}
}