import { vec2 } from "../utils/datattypes/vec2.mjs";
import { Entity } from "./players.entity.mjs";

export class ParallaxLayer extends Entity{
    constructor(scope, x, y) {
			super(scope, x, y)
			this.parallaxScale = {
				scale: new vec2(0, 0),
				offset: new vec2(0, 0),
				repeat: new vec2(0, 0),
			}

		}

    update() {}

    render() {}
}