import { vec2 } from "../utils/datattypes/utils.datatypes.vec2.mjs";
import { Entity } from "./players.entity.mjs";


export class Projectile extends Entity{
    constructor(scope, x, y) {
			super(scope, x, y);
			this.velocity = new vec2();
			this.owner = null;
			this.damage = 0;

	}
}