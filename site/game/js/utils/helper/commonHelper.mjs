import { Projectile } from "../../players/projectile.mjs";
import { transform2, uiTransform } from "../dataTypes.mjs";



export function isInRange(v, min, max) {
    return v>=min && v<=max;
};

export function Boundary(origin,limits){
    
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


export function createProjectile(scope,x,y){
    var entities = scope.state.entities;
    var newProj= new Projectile(scope,x,y);
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
        uiTransform.position.scale.x*scope.viewport.width +  uiTransform.position.offset.x,
        uiTransform.position.scale.y*scope.viewport.height +  uiTransform.position.offset.y,
        uiTransform.scale.scale.x*scope.viewport.width +  uiTransform.scale.offset.x,
        uiTransform.scale.scale.y*scope.viewport.height +  uiTransform.scale.offset.y,
    )

}