import { Entity } from "../../players/entity.mjs";
import { ColliderAbstract } from "./collisionAbstract.mjs";


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
		collisionGroups["all"].forEach( collider =>{
			checkCollisionsForEntity(collider)
		} )
	};
}

export function checkCollisionsForEntity(victimCollider) {
	if (victimCollider instanceof ColliderAbstract){
		
		victimCollider	
		var result = [];
		var checkedAlready= []
		
		for (const group of victimCollider.collisionMask) {
			
			if (collisionGroups[group]){

				for (const collider of collisionGroups[group]) {
					if (collider==victimCollider) continue;
					if (checkedAlready.includes(collider)) continue;
					
					var collisionHappened=victimCollider.collidesWith(collider);
					checkedAlready.push(collider)
					
					if (collisionHappened){
						
					}
					
				}
			}

		}
		
		return result;
	}
	else{return false}

	
}


export function registerCollider(collider){
	if (collider instanceof ColliderAbstract){
		collisionGroups["all"].push(collider)
		if (collider.collisionLayer && collider.collisionLayer.length>0){
			collider.collisionLayer.forEach(collisionGroup =>{
				if ( Object.keys(collisionGroups).includes(collisionGroup)){
					collisionGroups[collisionGroup].push(collider);
				}
			})
		}

	}
	
}

export function removeCollider(){

}