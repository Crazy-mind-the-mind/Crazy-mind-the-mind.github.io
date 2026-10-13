
import {Projectile} from "./projectile.mjs";


export class ProjectilePellet extends Projectile{
	
	get damage(){
		return 1;
	}
	set damage(v){

	}
    constructor(scope, x, y) {
			super(scope, x, y);
			this.timeLeft=240;
			this.damage = 1;
			
	}

	
	async loadAssets(){
		this.texture=Projectile.imageProjectileAtlas["ProjectilePellet"]
	}
	AI(){
		this.velocity.x*=0.99;
		this.velocity.y*=0.99;

		//this.transform.scale.vecMult(0.99)
	}

	

}

//ProjectileTypes[1] = function (scope,x,y) {return new ProjectilePellet(scope,x,y)};
