

export function gameUpdate(scope) {
			return function update(tFrame) {
				var state = scope.state || {};

				if (state.hasOwnProperty('entities')) {
					var entities = state.entities;
					for (var entity in entities) {

						entities[entity].update();
					}
				}

				return state;
	};
}