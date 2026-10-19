import { assetLoader } from "../core/game.assetLoader.mjs";
import { rect2, transform2, vec2 } from "../utils/dataTypes.mjs";
import { playAudio } from "../utils/helper.mjs";
import { Entity } from "./entity.mjs";


export class Character extends Entity{
	static imageAtlas={}

    constructor(scope, x, y) {
			super(scope, x, y);
			this.velocity = new vec2(0, 0);

			this.collision = null;

			this.statHealthMax = 0;
			this.statHealth = 0;
			this.isDead = false;
			this.immunityFramesWaitTime = 30
			this.immunityFramesTime = 0

			this.hurtAudioEffect="DamageHitSoundEffect"
	}
	loadAssets(){
		//this.texture = await assetLoader.loadImage("WaverEnemyShip","textures/ships/ship.png");
	}
	update(){
		this.active = !(  (window.game && window.game.state.paused) || this.scope.state.paused) 
        if (!this.active) return false;

		if (this.collision){
			this.collision.transform=this.transform
			this.collision.update()
		}
		this.immunityFramesTime--;
		this.transform.position.vecAdd(this.velocity)
		return true

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
		
		if (this.immunityFramesTime>0) return false;
		playAudio(this.scope.audio,this.hurtAudioEffect);
		
		//console.log(this)	
		//console.log(damageAmount)	
		this.statHealth-=damageAmount;
		
		this.immunityFramesTime=this.immunityFramesWaitTime;
		if (this.statHealth<=0){
			this.Dead()
		}
		return true
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


Character.imageAtlas={
	"PlayerSprite":await createImageBitmap(
		await assetLoader.loadImage(
			"ShipTextureAtlas","textures/ships/shipTextureAtlas.png"
		),
		0,0,16,16
	),
	"EnemyDefaultSprite":await createImageBitmap(
		await assetLoader.loadImage(
			"ShipTextureAtlas","textures/ships/shipTextureAtlas.png"
		),
		16,0,16,16
	),
	"EnemySwarmerSprite":await createImageBitmap(
		await assetLoader.loadImage(
			"ShipTextureAtlas","textures/ships/shipTextureAtlas.png"
		),
		32,0,16,16
	),
	"EnemyWaverSprite":await createImageBitmap(
		await assetLoader.loadImage(
			"ShipTextureAtlas","textures/ships/shipTextureAtlas.png"
		),
		48,0,16,16
	),
	"EnemySpikerSprite":await createImageBitmap(
		await assetLoader.loadImage(
			"ShipTextureAtlas","textures/ships/shipTextureAtlas.png"
		),
		64,0,32,32
	),
	"EnemyTankerSprite":await createImageBitmap(
		await assetLoader.loadImage(
			"ShipTextureAtlas","textures/ships/shipTextureAtlas.png"
		),
		96,0,32,32
	),
	"EnemySplitterSprite":await createImageBitmap(
		await assetLoader.loadImage(
			"ShipTextureAtlas","textures/ships/shipTextureAtlas.png"
		),
		128,0,16,16
	),
	
}