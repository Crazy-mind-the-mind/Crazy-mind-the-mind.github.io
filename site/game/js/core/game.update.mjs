

export function gameUpdate(scope) {
			return function update(tFrame) {
				var state = scope.state || {};

				if (scope.scoreSystem){
					scope.scoreSystem()
				}
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

				return state;
	};
}