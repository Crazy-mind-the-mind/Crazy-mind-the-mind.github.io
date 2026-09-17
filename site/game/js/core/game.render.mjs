
import { generateDrawOrderList } from "../utils/canvas.mjs";
import { Entity } from "../players/entity.mjs";


export function gameRender(scope) {
			var w = scope.constants.width,
			h = scope.constants.height;

			return function render() {
				scope.context.clearRect(0, 0, w, h);


				scope.context.font = '32px Arial';
				scope.context.fillStyle = '#fff';
				scope.context.fillText('It\'s dangerous to travel this route alone.', 5, 50);
				

				if (scope.constants.showFps) {
					scope.context.fillStyle = '#ff0';
					scope.context.fillText(scope.loop.fps, w - 100, 50);
				}


				if (scope.state.hasOwnProperty('entities')) {
					var entities = scope.state.entities;
					var entitiesDrawOrder = generateDrawOrderList(entities);
						//console.log(entitiesDrawOrder)



					for (let entity of entitiesDrawOrder) {
						try{
						entities[entity].render();
						}
						catch (error){
							//console.error(error);
							continue
						}
					}
				}

				//if (scope.state.hasOwnProperty('projectiles')) {
				//	let entities = scope.state.projectiles;
				//	//let entitiesDrawQueue = generateDrawOrderList(entities);



				//	for (let entity in entities) {
				//		//console.log(entity)
				//		entities[entity].render();
				//	}
				//}

				
				if (scope.state.hasOwnProperty('ui')){

				}
			}
}