import { vec2 } from "./vec2.mjs";
import { isInRange } from "../helper.mjs";
class rect2 {

	constructor(x, y, w, h){
		this.origin = new vec2(x||0,y||0);
		this.size = new vec2(w||0,h||0);
	}
	
	get centerPoint(){
		return vec2.copy(this.origin).vecAdd(vec2.copy(this.size).vecDiv(2));
	}

	intersects_point(point) {
		return ((point.x <= rect2.origin.x+rect2.size.x &&
			point.x >= rect2.origin.x) &&
			(point.y <= rect2.origin.y+rect2.size.y &&
				point.y >= rect2.origin.y)
		);
	};
	intersects_rect(rect) {
		let result = false;
		
		


		result = isInRange(
			rect.origin.x, 
			this.origin.x, 
			this.origin.x+this.size.x) 
		&& isInRange(
			rect.origin.y, 
			this.origin.y, 
			this.origin.y+this.size.y);
		
		result = result || 
			isInRange(
			rect.origin.x+rect.size.x,
			this.origin.x,
			this.origin.x+this.size.x) 
		&& isInRange(
			rect.origin.y,
			this.origin.y,
			this.origin.y+this.size.y
			);



		
		result = result || 
			isInRange(
				rect.origin.x+rect.size.x,
				this.origin.x,
				this.origin.x+this.size.x) 
		&& isInRange(
			rect.origin.y+rect.size.y,
			 this.origin.y,
			  this.origin.y+this.size.y
			);

		result = result || 
			isInRange(
				rect.origin.x,
				this.origin.x,
				this.origin.x+this.size.x) 
		&& isInRange(
			rect.origin.y+rect.size.y,
			 this.origin.y,
			  this.origin.y+this.size.y
			);




		return result
	}

	


}

export {rect2};