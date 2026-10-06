
import { changeAudioVolume } from "../utils/helper.mjs";
import { isJustPressed,isJustReleased, isPressed } from "../utils/input.mjs"


export function gameUpdate(scope) {
			return function update(tFrame) {
				var state = scope.state || {};

				if (scope.collisionSystem) scope.collisionSystem();
				
				if (scope.scoreSystem) scope.scoreSystem();
				if (scope.waveSystem) scope.waveSystem.waveSystemUpdate();

				if (state.hasOwnProperty('entities')) {
					var entities = state.entities;
					for (var entity in entities) {

						entities[entity].update();
					}
				}

				if (state.hasOwnProperty('ui')) {
					var entities = state.ui;
					for (var entity in entities) {

						entities[entity].update();
					}
				}

				
				
				if (isPressed.volumeUp){
					changeAudioVolume(0.1)
					console.log("V_UP")
				}
				if (isPressed.volumeDown){
					changeAudioVolume(-0.1)
					console.log("V_DOWN")

				}
				return state;
	};
}