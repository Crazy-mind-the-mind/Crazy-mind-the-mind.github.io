import {vec2, rect2, Texture} from "../utils/dataTypes.mjs";
import { Entity } from "./entity.mjs";
import { drawRect , drawTexture, loadTexture } from "../utils/helper.mjs";


export class ParallaxLayer extends Entity{
    constructor(scope, x, y) {
			super(scope, x, y)
			this.parallaxScale = {
				scale: new vec2(1, 1),
				offset: new vec2(0, 0),
				repeat: new vec2(0, 0),
			}

			this.texture=loadTexture('textures/starsBackground.png');
		}

    update() {

	}

    render() {
		var renderer=this.scope.context;
		if (this.texture===null) return;
		console.log("Rendered.");
		drawTexture(
			renderer,
			this.texture,
			this.transform.position,
			this.transform.scale
		);
		

	}
}