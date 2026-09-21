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
		var checkedAlready= []
		eCol.colliionMask.forEach(collisionGroupMask =>{
			if (collisionGroups[collisionGroupMask]){
				collisionGroups[collisionGroupMask].forEach(collider=>{
					if (collider==eCol) continue;
					if (checkedAlready.includes(collider)) continue;
					
					eCol.collidesWith(collider);
					checkedAlready.push(collider)
					
				})
			}
		})
		
		return result;
	}
	else{return false}

	
}


export function registerCollider(collider){
	collisionGroups["all"].push(collider)
}

export function removeCollider()