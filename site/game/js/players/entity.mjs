
import { vec2,rect2,transform2, Texture } from "../utils/dataTypes.mjs";
import { loadTexture } from "../utils/helper.mjs";


export class Entity{
    constructor(scope, x, y) {
			this.scope = scope;
			this.transform=new transform2(x,y)
			this.z_index = 0;
			this.texture = new Texture();
			this.renderable;
		}
	update() {
		return this;
	}
	render() {
		return this;
	}
}