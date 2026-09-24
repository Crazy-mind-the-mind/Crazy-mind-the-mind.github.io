import { generateDrawOrderList } from "../utils/canvas.mjs";
import { Entity } from "../players/entity.mjs";
import { testDrawQuad, testDrawTriangle } from "../utils/helper/renderHelperWebGl.mjs";
import { TextureWebGL } from "../utils/dataTypes/texture.mjs";

import { assetLoader } from "./game.assetLoader.mjs";





export function gameRenderWebGL(scope) {
			/** @type {WebGLRenderingContext} */
			var gl = scope.context;

			var w = scope.constants.width,
			h = scope.constants.height;
			
			
			gl.clearColor(0.75,0.73,0.75,1.0);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			
			//testDrawTriangle(gl)
			testDrawQuad(gl)
			return function render() {
				

				if (scope.state.hasOwnProperty('entities')) {
					var entities = scope.state.entities;
					var entitiesDrawOrder = generateDrawOrderList(entities);
						//console.log(entitiesDrawOrder)



					for (let entity of entitiesDrawOrder) {
						try{
						entities[entity].render();
						}
						catch (error){
							//console.error("Error rendering entity :",entity,error);
							continue
						}
					}
				}

				//if (scope.state.hasOwnProperty('ui')) {
				//	var entities = scope.state.ui;
					
				//		//console.log(entitiesDrawOrder)



				//	for (let entity in entities) {
				//		try{
				//		entities[entity].render();
				//		}
				//		catch (error){
				//			console.error("Error rendering entity :",entity,error);
				//			continue
				//		}
				//	}
				//}
				

				

			}
}