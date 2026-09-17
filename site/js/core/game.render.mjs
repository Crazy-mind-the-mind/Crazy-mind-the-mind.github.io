
import { generateDrawOrderList } from "../utils/canvas.mjs";

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

				if (scope.state.hasOwnProperty('ui')){

				}

				if (scope.state.hasOwnProperty('entities')) {
					let entities = scope.state.entities;
					let entitiesDrawQueue = generateDrawOrderList(entities);



					for (let entity of entitiesDrawQueue) {
						if (!(entities[entity] instanceof gamePlayers.Entity)) continue;
						
						entities[entity].render();
					}
				}
			}
}