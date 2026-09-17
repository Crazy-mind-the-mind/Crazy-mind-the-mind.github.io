import { vec2, rect2, transform2} from "../utils/dataTypes.mjs";
import { correctDrawTransform, createProjectile, drawRect, drawTexture, loadTexture } from "../utils/helper.mjs";
import { Character } from "./character.mjs";
import { keysDown, isPressed } from "../utils/input.mjs";
import { Projectile } from "./projectile.mjs";
import { assetLoader } from "../core/game.assetLoader.mjs";

await assetLoader.load("player","textures/projectile.png")

export class PlayerCharacter extends Character{
        constructor(scope, x, y) {
			super(scope, x, y);
			this.powerup = 0;
			this.powerupTime = 0;
			this.moveSpeed=2
			
			this.weapons={
				defaultShot:{
					shootCooldownWaitTime:10,
					shootCooldownTime:0,
				}
			}

			this.currentWeapon=this.weapons.defaultShot;
			 


		}
		async loadAssets(){
			this.texture=await assetLoader.load("PlayerSprite","textures/ship.png")
			
		}
		update() {
			//this.texture= await assetLoader.get("projectile");
			//console.log(this.texture)

			if (isPressed.left) {
            	this.transform.position.x -= this.moveSpeed;
			}

			if (isPressed.right) {
				this.transform.position.x += this.moveSpeed;
			}

			if (isPressed.up) {
				this.transform.position.y -= this.moveSpeed;
			}

			if (isPressed.down) {
				this.transform.position.y += this.moveSpeed;
			}
			if (isPressed.shoot==true){
				if (this.currentWeapon.shootCooldownTime<=0){
					createProjectile(
						this.scope,
						this.transform.position.x,
						this.transform.position.y
					)
					this.currentWeapon.shootCooldownTime=this.currentWeapon.shootCooldownWaitTime;
				}
				
			}
			this.scope.state.cameraScroll.x+=0.1
			this.currentWeapon.shootCooldownTime--;

			
		}

		render() {

			//this.scope.context.fillStyle = '#40d870';
        	//this.scope.context.fillRect(
            //this.transform.position.x,
            //this.transform.position.y,
            //50, 50
        	//);
			var drawCorrectedTransform= correctDrawTransform(this)

			//console.log(plrrect.origin.x,plrrect.origin.y ,plrrect.size.x ,plrrect.size.y );
			
			let renderer=this.scope.context;
			//drawRect(renderer,plrrect,'#40d870');

			

			drawTexture(
				renderer,
				this.texture,
				drawCorrectedTransform
			)
			
		}
}