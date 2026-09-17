import { vec2 } from "../utils/datattypes/utils.datatypes.vec2.mjs";
import { rect2 } from "../utils/dataTypes.mjs";
import { drawRect } from "../utils/helper.mjs";
import { Entity } from "./entity.mjs";


export class Projectile extends Entity{
    constructor(scope, x, y) {
			super(scope, x, y);
			this.velocity = new vec2();
			this.owner = null;
			this.damage = 0;
			this.timeLeft=300;

	}

	update(){
		AI()
		this.timeLeft-=1;
		this.transform.position.x+=this.velocity.x;
		this.transform.position.y+=this.velocity.y;
	}

	AI(){
		
	}
	render(){
		
		var drawrect= new rect2()

		drawRect(this.scope.context,drawrect,"#0000ff")
	}
}