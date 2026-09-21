import { Entity } from "../../players/entity.mjs";


export var collisionGroups = {
	"all":[],
	"player":[],
	"enemies":[],
	"projectiles":[],
	

};

export var existingColliders=[

]

export function collisionSystemUpdate(scope){
	return function collisionUpdate(){

	};
}

export function checkCollisionsForEntity(entity) {
	if (entity instanceof Entity){
		
		var eCol=entity.collision	
		var result = false;
		
		eCol.colliionMask.forEach(collisionGroupMask =>{
			if (collisionGroups[collisionGroupMask]){
				collisionGroups[collisionGroupMask].forEach(collider=>{
					if (collider==eCol) continue;
					eCol.collidesWith(collider);
				})
			}
		})
		
		return result;
	}
	else{return false}

	
}