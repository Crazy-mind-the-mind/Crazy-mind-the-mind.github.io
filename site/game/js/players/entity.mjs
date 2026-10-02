
import { vec2,rect2,transform2, Texture } from "../utils/dataTypes.mjs";
import { loadTexture } from "../utils/helper.mjs";


export class Entity{


	static collisionGroup;

	static createCollisionGroup(scope, /**@type{RectCollider} */classCollider){
		
	}

	static getCollisionGroup(){
		
	}
	static addToCollisionGroup(entity){
		
	}
	static removeFromCollisionGroup(entity){
		
	}
	static getCollider(){

	}

    constructor(scope, x, y) {
			this.scope = scope;
			this.transform=new transform2(x,y,1,1)
			this.z_index = 0;
			this.texture;
			this.renderable;
			this.loadAssets()
			this.active=true;
		}

	async loadAssets(){
		
	}
	
	destroySelf(){
		delete this;
	}
	update() {
		return this;
	}
	render() {
		return this;
	}

	get visibilityRect(){
		return new rect2();
	}
}