import { transform2, vec2 } from "../utils/dataTypes.mjs";
import { Entity } from "./entity.mjs";


export class Character extends Entity{
    constructor(scope, x, y) {
			super(scope, x, y);
			this.velocity = new vec2(0, 0);

			this.collision = null;

			this.statHealthMax = 0;
			this.statHealth = 0;
	}

	update(){
		if (this.collision){
			this.collision.transform=this.transform
			this.collision.update()
		}
		this.transform.position.vecAdd(this.velocity)
	}
}