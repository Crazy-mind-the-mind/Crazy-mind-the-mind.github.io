import { vec2, rect2, transform2} from "../utils/dataTypes.mjs";
import { Boundary, correctDrawTransform, createProjectile, drawRect, drawText, drawTexture, loadTexture } from "../utils/helper.mjs";
import { Character } from "./character.mjs";
import { keysDown, isPressed, isJustPressed } from "../utils/input.mjs";
import { Projectile } from "./projectile.mjs";
import { assetLoader } from "../core/game.assetLoader.mjs";

await assetLoader.load("player","textures/projectile.png")

export class PlayerCharacter extends Character{
        constructor(scope, x, y) {
			super(scope, x, y);
			this.powerup = 0;
			this.powerupTime = 0;
			this.moveSpeed=2
			
			let player = this
			this.weapons={
				defaultShot:{
					shootBehavior:function(){
						createProjectile(
							player.scope,
							player.transform.position.x,
							player.transform.position.y,
							1
					).velocity.x=5;
					},
					shootCooldownWaitTime:10,
					shootCooldownTime:0,
				},
				defaultShot2:{
					shootBehavior:function(){
						var p1=createProjectile(
							player.scope,
							player.transform.position.x,
							player.transform.position.y,
							1
						),
						p2=createProjectile(
							player.scope,
							player.transform.position.x,
							player.transform.position.y,
							1
						),
						p3=createProjectile(
							player.scope,
							player.transform.position.x,
							player.transform.position.y,
							1
						);
						p1.velocity=new vec2(5,-5).normalized();
						p2.velocity.x=5;
						p3.velocity=new vec2(5,5).normalized();
						p1.velocity.vecMult(5)
						p3.velocity.vecMult(5)

						try {
							console.log( (new vec2(1,5)+ new vec(5,1)).x  )
						}
						catch(e){
							console.log("oops",e)
						}
					},
					shootCooldownWaitTime:30,
					shootCooldownTime:0,
				},
				defaultShot3:{
					shootBehavior:function(){
						var p =createProjectile(
							player.scope,
							player.transform.position.x,
							player.transform.position.y,
							2,
							{
								direction:new vec2(1,0),
								initialVelocity: new vec2(2,0)
							}
						)
						//p.velocity.x=2
					},
					shootCooldownWaitTime:10,
					shootCooldownTime:0,
				},
				defaultShot4:{
					shootBehavior:function(){
						createProjectile(
							player.scope,
							player.transform.position.x,
							player.transform.position.y,
							3
					).velocity.x=5;
					},
					shootCooldownWaitTime:30,
					shootCooldownTime:0,
				},
			}

			this.currentWeapon=this.weapons.defaultShot;
			this.currentWeapon2=this.weapons.defaultShot2;
			

			this.scoringTimer = 60
			
			//this.transform.rotation = Math.PI/2

		}
		async loadAssets(){
			this.texture=await assetLoader.load("PlayerSprite","textures/ship.png")
			
		}
		update() {
			super.update(this)
			//this.texture= await assetLoader.get("projectile");
			//console.log(this.texture)

			if (isPressed.left && !isPressed.right) {
            	this.velocity.x = -this.moveSpeed;
			}

			else if (isPressed.right && !isPressed.left) {
				this.velocity.x = this.moveSpeed;
			}
			else{
				this.velocity.x=0;
			}

			if (isPressed.up && !isPressed.down) {
				this.velocity.y = -this.moveSpeed;
			}
			else if (isPressed.down && !isPressed.up) {
				this.velocity.y = this.moveSpeed;
			}
			else{
				this.velocity.y=0;
			}
			if (isPressed.shoot==true){
				if (this.currentWeapon.shootCooldownTime<=0){
					this.currentWeapon.shootBehavior()
					this.currentWeapon.shootCooldownTime=this.currentWeapon.shootCooldownWaitTime;
				}
				
			}
			if (isPressed.shoot2==true){
				if (this.currentWeapon2.shootCooldownTime<=0){
					this.currentWeapon2.shootBehavior()
					this.currentWeapon2.shootCooldownTime=this.currentWeapon2.shootCooldownWaitTime;
				}
				
			}
			this.scope.state.cameraScroll.x+=1
			//this.scope.state.cameraScroll.y=this.transform.position.y
			this.currentWeapon.shootCooldownTime--;
			this.currentWeapon2.shootCooldownTime--;

			this.scoringTimer--;
			if (this.scoringTimer==0){
				this.scope.state.playerStatus.ScorePoints++
				this.scoringTimer=60;
			}








			Boundary(this, new rect2(
				0,
				0,
				this.scope.constants.trueWidth,
				this.scope.constants.trueHeight,
			))



			
		}

		render() {

			
			if (!this.texture) return;
			
			var drawCorrectedTransform= correctDrawTransform(this)

			drawCorrectedTransform.rotation
			//console.log(plrrect.origin.x,plrrect.origin.y ,plrrect.size.x ,plrrect.size.y );
			
			let renderer=this.scope.context;
			//drawRect(renderer,plrrect,'#40d870');
			drawCorrectedTransform.scale.x=1.0

			


			drawTexture(
				renderer,
				this.texture,
				this.transform,
				{
					useCanvasTransforms:true,
					offsets: vec2.copy(this.transform.position).vecSub(drawCorrectedTransform.position)
				}
			)
			

			//drawText(
			//	renderer,
			//	new vec2(4,4),
			//	"Player",
			//	{
			//		espacamento:10
			//	}
			//)
			
		}
}