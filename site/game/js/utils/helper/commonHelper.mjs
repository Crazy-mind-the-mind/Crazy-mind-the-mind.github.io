import { Projectile } from "../../players/projectile.mjs";



export function isInRange(v, min, max) {
    return v>=min && v<=max;
};

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
    while (i<1){
        if (!entities.hasOwnProperty('Projectile'+i)){
            newProjName=newProjName+1;
            
        }
        i++;
    }
}
export function createEnemy(){

}


export function deleteEntity(){
    
} 