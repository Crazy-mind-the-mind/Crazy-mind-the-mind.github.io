import { vec2 } from "../utils/datattypes/vec2.mjs";
import { Entity } from "./entity.mjs";


export class Character extends Entity{
    constructor(scope, x, y) {
			super(scope, x, y);
			this.velocity = new vec2(0, 0);

			this.collision = null;

			this.statHealthMax = 0;
			this.statHealth = 0;
	}
}