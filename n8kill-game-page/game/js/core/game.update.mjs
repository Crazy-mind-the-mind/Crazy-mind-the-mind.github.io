
import { changeAudioVolume } from "../utils/helper.mjs";
import { isJustPressed,isJustReleased, isPressed } from "../utils/input.mjs"


export function gameUpdate(scope) {
			var pausePressed = false
			var retryPressed = false
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


				if (isPressed.pause==true && !pausePressed){
					
					window.game.state.paused= !window.game.state.paused
					pausePressed=true
					
				}
				else if (isPressed.pause==true && pausePressed){
						pausePressed=true
				}
				else if (isPressed.pause==false && pausePressed){
						pausePressed=false
				}


				if (isPressed.retry==true && !retryPressed){
					
					if (scope.state.gameEnded == true){
						scope.eventSystem.emitEvent('restartGame')
						console.log('Restarting Game')
					}
					retryPressed=true
					
				}
				else if (isPressed.retry==true && retryPressed){
						retryPressed=true
				}
				else if (isPressed.retry==false && retryPressed){
						retryPressed=false
				}

				return state;
	};
}