import { Projectile} from "../../players/projectile.mjs";
import { transform2, uiTransform } from "../dataTypes.mjs";
import { ProjectileTypes } from "../../players/projectileTypes.mjs";

export function isInRange(v, min, max) {
    return v>=min && v<=max;
};

export function Boundary(entity,limits){
    entity.transform.position.x = Math.max(Math.min(limits.origin.x + limits.size.x, entity.transform.position.x),limits.origin.x)
    entity.transform.position.y = Math.max(Math.min(limits.origin.y + limits.size.y, entity.transform.position.y),limits.origin.y)
}

export function insertion_sort(array,comp){
    
    for (let i = 1; i < array.length; i++) {
        let currentElement = array[i];
        let lastIndex = i - 1;

        while (lastIndex >= 0 && comp(array[lastIndex],currentElement)) {
            array[lastIndex + 1] = array[lastIndex];
            lastIndex--;
        }
        array[lastIndex + 1] = currentElement;
    }

    return array;

}


export function createProjectile(scope,x,y,type){
    console.log(ProjectileTypes)
    console.log(ProjectileTypes[type])
    var entities = scope.state.entities;
    var newProj= ProjectileTypes[type](scope,x,y);
    var newProjName="Projectile"
    
    var i=0;
    while (i<100){

        if (!Object.keys(entities).includes("Projectile"+i) ){
            newProjName=newProjName+i;
            console.log(newProjName)
            entities[newProjName]=newProj;
            break;
        }
    
        i++;
    }
    return newProj;
}
export function createEnemy(){

}


export function deleteEntity(scope,entity){
    var entities = scope.state.entities;
    var entityName='';
    for (const thisEntity of Object.keys(entities)) {
        if (entities[thisEntity]==entity){
            entityName=thisEntity;
        }
    }
    entity.destroySelf();
    delete entities[entityName];
} 


export function deleteEntityByName(entity){
    
} 





export function parseUiTransform(scope,transform){
    return new transform2(
        transform.position.scale.x*scope.constants.width +  transform.position.offset.x,
        transform.position.scale.y*scope.constants.height +  transform.position.offset.y,
        transform.scale.scale.x*scope.constants.width +  transform.scale.offset.x,
        transform.scale.scale.y*scope.constants.height +  transform.scale.offset.y,
    )

}