
import { vec2 } from "../utils/datattypes/vec2.mjs";



export class Entity{
    constructor(scope, x, y) {
			this.scope = scope;
			this.position = new vec2(0,0);
			this.z_index = 0;
			this.texture = null;
		}
	update() {
		return this;
	}
	render() {
		return this;
	}
}