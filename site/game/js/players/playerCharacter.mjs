import { vec2, rect2, transform2} from "../utils/dataTypes.mjs";
import { drawRect } from "../utils/helper.mjs";
import { Character } from "./character.mjs";
import { keysDown, isPressed } from "../utils/input.mjs";
import { Projectile } from "./projectile.mjs";
export class PlayerCharacter extends Character{
        constructor(scope, x, y) {
			super(scope, x, y);
			this.powerup = 0;
			this.powerupTime = 0;
			this.moveSpeed=2
			



		}

		update() {
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
			if (isPressed.shoot){
				//var proj = new Projectile(scope,x,y);
				//proj.velocity.x=10;
				//this.scope.state.entities
			}
		}

		render() {

			//this.scope.context.fillStyle = '#40d870';
        	//this.scope.context.fillRect(
            //this.transform.position.x,
            //this.transform.position.y,
            //50, 50
        	//);
			let plrrect=new rect2(
				this.transform.position.x,
				this.transform.position.y,
				30,
				30
			);
			//console.log(plrrect.origin.x,plrrect.origin.y ,plrrect.size.x ,plrrect.size.y );
			
			let renderer=this.scope.context;
			drawRect(renderer,plrrect,'#40d870');

		}
}