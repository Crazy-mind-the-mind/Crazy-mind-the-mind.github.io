import { rect2 } from "../utils/datattypes/utils.datatypes.rect2.mjs";
import { Entity } from "./players.entity.mjs";

export class PlayerCharacter extends Entity{
        constructor(scope, x, y) {
			super(scope, x, y);
			this.powerup = 0;
			this.powerupTime = 0;

			console.log(this.__proto__.name);


		}

		update() {}

		render() {
			var plrrect=new rect2(
				this.position.x,
				this.position.y,
				30,
				30
			);
			var renderer=this.scope.context;
			gameUtils.helper.render.drawRect(renderer,plrrect,'#40d870');

		}
}