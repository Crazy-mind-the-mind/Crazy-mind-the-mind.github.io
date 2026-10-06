
import { generateDrawOrderList } from "../utils/canvas.mjs";
import { Entity } from "../players/entity.mjs";


export function gameRender(scope) {
			var w = scope.constants.width,
			h = scope.constants.height;

			return function render() {
				
				scope.context.imageSmoothingEnabled = false;
				scope.context.clearRect(0, 0, w, h);
				scope.context.fillStyle="#00002f";
				scope.context.fillRect(0, 0, w, h);

				scope.context.font = '8px Arial';
				scope.context.font
				scope.context.fillStyle = '#fff';
				//scope.context.fillText('It\'s dangerous to travel this route alone.', 5, 50);
				

				if (scope.constants.showFps) {
					scope.context.fillStyle = '#ff0';
					scope.context.fillText(scope.loop.fps, w - 100, 50);
				}
				scope.context.save()
				//scope.context.scale(2,2)
				//scope.context.translate(scope.constants.width/4,scope.constants.height/4);
				if (scope.state.hasOwnProperty('entities')) {
					var entities = scope.state.entities;
					var entitiesDrawOrder = generateDrawOrderList(entities);
						//console.log(entitiesDrawOrder)



					for (let entity of entitiesDrawOrder) {
						try{
						entities[entity].render();
						}
						catch (error){
							console.error("Error rendering entity :",entity,error);
							continue
						}
					}
				}

				if (scope.state.hasOwnProperty('ui')) {
					var entities = scope.state.ui;
					
						//console.log(entitiesDrawOrder)



					for (let entity in entities) {
						try{
						entities[entity].render();
						}
						catch (error){
							console.error("Error rendering entity :",entity,error);
							continue
						}
					}
				}


				if (scope.hasOwnProperty('extrasFncs')){
					if (scope.extrasFncs.hasOwnProperty('renderFncs')){
						var FNCS = scope.extrasFncs.renderFncs

						for (let FNC in FNCS) {
						try{
						FNCS[FNC]();
						}
						catch (error){
							console.error("Error rendering FNC :",FNC,error);
							continue
						}
						}
					}
				}

				

				scope.context.restore()
				

			}
}