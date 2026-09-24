import { vec2, rect2} from "../utils/dataTypes.mjs";
import { Boundary, correctDrawTransform, createProjectile, drawRect, drawText, drawTexture, loadTexture, playAudio } from "../utils/helper.mjs";
import { Character } from "./character.mjs";
import { keysDown, isPressed, isJustPressed } from "../utils/input.mjs";
import { Projectile } from "./projectile.mjs";
import { assetLoader } from "../core/game.assetLoader.mjs";
import { RectCollider } from "../utils/collision/rectCollision.mjs";
import { ColliderAbstract } from "../utils/collision/collisionAbstract.mjs";
import { TextureWebGL } from "../utils/dataTypes/texture.mjs";





class PlayerCharacter extends Character{

		static weapons
		
        constructor(scope, x, y) {
			super(scope, x, y);
			this.statHealth=3
			this.statHealthMax=3
			this.powerup = 0;
			this.powerupTime = 0;
			this.moveSpeed=2
			
			let player = this
			
			PlayerCharacter.weapons={
				DefaultShot:{
					shootBehavior:function(){
						createProjectile(
							player.scope,
							player.transform.position.x,
							player.transform.position.y,
							1,
							{
								initialVelocity:new vec2(5,0),
								friendly:true,
								hostile:false,
								owner:this,
							}
					)
					},
					shootCooldownWaitTime:10,
					shootCooldownTime:0,
				},
				TripleShot:{
					shootBehavior:function(){
						var p1=createProjectile(
							player.scope,
							player.transform.position.x,
							player.transform.position.y,
							1,{
								initialVelocity:new vec2(5,-5).normalized().vecMult(5),
								friendly:true,
								hostile:false,
								owner:this,
							}
						),
						p2=createProjectile(
							player.scope,
							player.transform.position.x,
							player.transform.position.y,
							1,{
								initialVelocity:new vec2(5,0),
								friendly:true,
								hostile:false,
								owner:this,
							}
						),
						p3=createProjectile(
							player.scope,
							player.transform.position.x,
							player.transform.position.y,
							1,{
								initialVelocity:new vec2(5,-5).normalized().vecMult(5),
								friendly:true,
								hostile:false,
								owner:this,
							}
						);
						

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
				WaverShot:{
					shootBehavior:function(){
						var p =createProjectile(
							player.scope,
							player.transform.position.x,
							player.transform.position.y,
							2,
							{
								direction:new vec2(1,0),
								initialVelocity: new vec2(2,0),
								friendly:true,
								hostile:false,
								owner:this,
							}
							
						)
						//p.velocity.x=2
					},
					shootCooldownWaitTime:10,
					shootCooldownTime:0,
				},
				SlugShot:{
					shootBehavior:function(){
						createProjectile(
							player.scope,
							player.transform.position.x,
							player.transform.position.y,
							3,
							{
								direction:new vec2(1,0),
								initialVelocity: new vec2(2,0),
								friendly:true,
								hostile:false,
								owner:this,
							}
					).velocity.x=5;
					},
					shootCooldownWaitTime:30,
					shootCooldownTime:0,
				},
			}

			this.currentSpellCards= [];
			this.currentSpellCard= 0;
			this.currentSpellCardChanged=false;
			this.currentSpellCardUsed=false;

			this.currentWeapon=PlayerCharacter.weapons.DefaultShot;
			this.currentWeapon2=PlayerCharacter.weapons.SlugShot;
			

			this.scoringTimer = 60
			
			this.collision = new RectCollider(this,this.transform.position,{
				collisionRect: new rect2(
					this.transform.position.x,
					this.transform.position.x,
					8,8),
				showCollision:scope.constants.showColliders,
				collisionLayer:["player"],
				collisionMask:["projectiles"],
			})



		}
		async loadAssets(){
			this.texture= this.scope.configurations.renderer=="canvas"?
			await assetLoader.loadImage("PlayerSprite","textures/ships/ship.png"):
			new TextureWebGL("PlayerSprite","textures/ships/ship.png", {
				"scope":this.scope
			});
			if (this.texture && this.texture instanceof TextureWebGL) this.texture.loadTexture();
			
		}
		update() {
			super.update(this)

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
					playAudio(this.scope.audio,"LaserShotSound")
					
				}
				
			}
			if (isPressed.shoot2==true){
				if (this.currentWeapon2){
					if (this.currentWeapon2.shootCooldownTime<=0){
						this.currentWeapon2.shootBehavior()
						this.currentWeapon2.shootCooldownTime=this.currentWeapon2.shootCooldownWaitTime;
						playAudio(this.scope.audio,"LaserShotSound")

					}
				}
				
			}

			if (isPressed.useSpellcard==true && !this.currentSpellCardUsed){
				/*
				if (this.currentSpellcards[this.currentSpellcard]){
					this.currentSpellcards[this.currentSpellcard].action(this)
				}
				*/
				this.currentSpellCardUsed=true
			}
			else if (isPressed.changeSpellcard==true && this.currentSpellCardUsed){
				this.currentSpellCardUsed=true
			}
			else{
				this.currentSpellCardUsed=false
			}

			if (isPressed.changeSpellcard==true && !this.currentSpellCardChanged){
				this.currentSpellCard = (this.currentSpellCard+1) % this.currentSpellCards.length;
				this.currentSpellCardChanged=true
			}
			else if (isPressed.changeSpellcard==true && this.currentSpellCardChanged){
				this.currentSpellCardChanged=true
			}
			else{
				this.currentSpellCardChanged=false
			}

			this.scope.state.cameraScroll.x+=1

			if (this.currentWeapon)
				this.currentWeapon.shootCooldownTime--;
			if (this.currentWeapon2)
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


			if (this.statHealth <=0){
				console.log("Dead")
			}
			
			// if (this.collision && this.collision instanceof ColliderAbstract){
			// 	this.collision.update()
			// }
			
		}

		render() {
			if (this.isDead) return;
			if (!this.texture) return;
			if (this.scope.configurations.renderer=="canvas"){
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
			}
			else {

			}


			super.render()

			
		}

		onCollisionReceived(collider,sourceCollider){
			//console.log("Player collided")
			if (collider instanceof ColliderAbstract ){
				if (collider.owner && collider.owner instanceof Projectile){
					var collidingProjectile=collider.owner
					//console.log("Player collided w/ Projectile")
					if (this.isDead){return}

					if (collidingProjectile.hostile){
							this.Hurt(collidingProjectile.damage)

							//console.log("Player damaged")
					}
					
							
				}
			}
		}

		Dead(){
			
		}
}




export {PlayerCharacter}