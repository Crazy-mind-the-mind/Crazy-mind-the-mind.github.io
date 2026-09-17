import { vec2 } from "./vec2.mjs";

class rect2 {

			constructor(x, y, w, h){
                this.origin = new vec2(0,0);
			    this.size = new vec2(0,0);
            }

			intersects_point = function intersects_point(point) {
				return ((point.x <= rect2.origin.x+rect2.size.x &&
					point.x >= rect2.origin.x) &&
					(point.y <= rect2.origin.y+rect2.size.y &&
						point.y >= rect2.origin.y)
				);
			};
			intersects_rect = function intersects_rect(rect) {
				let result = false;
				result = gameUtils.helper.isInRange(rect.origin.x, rect2.origin.x, rect2.origin.x+rect2.size.x);
				result = result || gameUtils.helper.isInRange(rect.origin.x+rect.size.x, rect2.origin.x, rect2.origin.x+rect2.size.x);

				result = result || gameUtils.helper.isInRange(rect.origin.y, rect2.origin.y, rect2.origin.y+rect2.size.y);
				result = result || gameUtils.helper.isInRange(rect.origin.y+rect.size.y, rect2.origin.y, rect2.origin.y+rect2.size.y);



				return result
			}
}

export {rect2};