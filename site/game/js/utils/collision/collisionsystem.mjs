import { Entity } from "../../players/entity.mjs";


export var collision_groups = {
	"all":[],
	"player":[],
	"enemies":[],
	"projectiles":[],
	

};

export function collisionSystemUpdate(scope){
	return function collisionUpdate(){

	};
}

function checkCollisionsForEntity(entity) {
	if (entity instanceof Entity){
		
		var eCol=entity.collision	
		var result = false;
		
		for (eCol.collision_mask){
			eCol.collides_with()
		}
		
		return result;
	}
	else{return false}

	
}