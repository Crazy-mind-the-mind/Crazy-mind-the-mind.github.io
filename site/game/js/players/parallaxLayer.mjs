import {vec2, rect2, Texture, transform2} from "../utils/dataTypes.mjs";
import { Entity } from "./entity.mjs";
import { correctDrawTransform, drawRect , drawTexture, loadTexture } from "../utils/helper.mjs";
import { assetLoader } from "../core/game.assetLoader.mjs";



export class ParallaxLayer extends Entity{
    constructor(scope, x, y) {
			super(scope, x, y)
			this.parallaxScale = {
				scale: new vec2(1, 0),
				offset: new vec2(0, 0),
				repeat: new vec2(1, 1),
			}

			this.spriteObjects;
			this.z_index=-500
			
			//this.texture=loadTexture('textures/starsBackground.png');
			loadAssets()
		}

	async loadAssets(){
		this.texture = await assetLoader.load("StarBackgroundTexture","textures/starBackground.png")
	}
    update() {
		this.transform.position.x = this.scope.state.cameraScroll.x* this.parallaxScale.scale.x + this.parallaxScale.offset
		this.transform.position.y = this.scope.state.cameraScroll.y* this.parallaxScale.scale.y + this.parallaxScale.offset
		
		this.transform.scale.x*=10
		this.transform.scale.y*=10
		//console.log("yo")

		//this.transform.position.x= this.scope.viewport.width % this.transform.position.x 
		//this.transform.position.y = this.scope.viewport.height % this.transform.position.y
		
	}

    render() {
		var renderer=this.scope.context;
		var drawTransform=correctDrawTransform(this);
		
		drawTransform.position.x = -(this.scope.viewport.width % this.transform.position.x)
		drawTransform.position.y = -(this.scope.viewport.height % this.transform.position.y)
		
		drawTexture(
			renderer,
			this.texture,
			drawTransform

		)

		if (!this.parallaxScale.repeat.isNearZero()){
			var repeatTransform = transform2.copy(drawTransform)
			repeatTransform.position.x+=this.scope.viewport.width
			repeatTransform.position.y+=this.scope.viewport.height

			drawTexture(
				renderer,
				this.texture,
				repeatTransform

			)

		}
		

	}
}