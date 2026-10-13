
import { transform2, uiTransform } from "../dataTypes.mjs";
import { ProjectileTypes } from "../../players/projectileTypes.mjs";
import { EnemyCharacterTypes } from "../../players/enemyCharacterTypes.mjs";
import { assetLoader } from "../../core/game.assetLoader.mjs";
import { ParallaxLayer } from "../../players/parallaxLayer.mjs";




export function isInRange(v, min, max) {
    return v>min && v<max;
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


export function createProjectile(scope,x,y,type,options){
    options = options || {}
    // console.log(ProjectileTypes)
    // console.log(ProjectileTypes[type])
    var entities = scope.state.entities;
    var newProj= ProjectileTypes[type](scope,x,y);
    var newProjName="Projectile"
    
    if (options.owner){ newProj.owner = options.owner}

    var i=0;
    while (i<1000){

        if (!Object.keys(entities).includes("Projectile"+i) ){
            newProjName=newProjName+i;
            //console.log(newProjName)
            entities[newProjName]=newProj;
            break;
        }
    
        i++;
    }

    var projVariables=Object.keys(newProj)
    projVariables.forEach(variable => {
        
        switch (variable){
            case "direction":
                if (options.direction){
                    newProj.direction = options.direction
                    // console.log(options.direction)
                }
                break;
            case "velocity":
                if (options.initialVelocity){
                    newProj.velocity = options.initialVelocity
                    // console.log(options.initialVelocity)
                }
                break;
            case "friendly":
                if (options.friendly){
                    newProj.friendly = options.friendly
                    // console.log(options.initialVelocity)
                }
                break;
            case "hostile":
                if (options.hostile){
                    newProj.hostile = options.hostile
                    // console.log(options.initialVelocity)
                }
                break;
        }
        
    });

    return newProj;
}
export function createEnemy(scope,x,y,type,options){
    options = options || {}

    //console.log(ProjectileTypes)
    //console.log(ProjectileTypes[type])
    var entities = scope.state.entities;
    var newEnemy= EnemyCharacterTypes[type](scope,x,y);
    var newEnemyName="Enemy"
    
    var i=0;
    while (i<100){

        if (!Object.keys(entities).includes("Enemy"+i) ){
            newEnemyName=newEnemyName+i;
            //console.log(newEnemyName)
            entities[newEnemyName]=newEnemy;
            break;
        }
    
        i++;
    }


    var enemyVariables = Object.keys(newEnemy)
    enemyVariables.forEach(variable => {
        switch (variable){
            case "position":
                break;
        }
        
    });
    return newEnemy;
}


export function deleteEntity(scope,entity){
    var entities = scope.state.entities || window.game;
    if (!entities) return;
    var entityName='';
    for (const thisEntity of Object.keys(entities)) {
        if (entities[thisEntity]==entity){
            entityName=thisEntity;
        }
    }
    entity.active=false;
    delete entities[entityName];
} 


export function deleteEntityByName(entity){
    
} 


export function radToDeg(value){
    return value*180/Math.PI;
}
export function degToRad(value){
    return value*(Math.pi/180);
}




export function parseUiTransform(scope,transform){
    return new transform2(
        transform.position.scale.x*scope.constants.width +  transform.position.offset.x,
        transform.position.scale.y*scope.constants.height +  transform.position.offset.y,
        transform.scale.scale.x ,
        transform.scale.scale.y ,
        transform.rotation
    )

}


export function clampValue(value,min,max){
    return Math.max(min,Math.min(value,max))
}




export async function loadStage(scope,stagePath){
    scope.eventSystem.emitEvent("stageChanged")

    var stageData = await assetLoader.loadStageData(stagePath);
    var stageDataBackgroundLayerNames = Object.keys(stageData.stageBackground);    

    scope.state.currectStage.name=stageData.name;
    scope.state.currentStage.maxWave=stageData.stageMaxWave
    
    for (let idx; idx < stageDataBackgroundLayerNames.length; idx++){


        const newParallaxData=stageData.stageBackground[stageDataBackgroundLayerNames[idx]];


        var newParallax=new ParallaxLayer(scope || window.game , 0 , 0)

        newParallax.layerTextureData={
            "name":newParallaxData.texture.name,
            "path":newParallaxData.texture.path
        }

        newParallax.z_index = newParallaxData.z_index


        newParallax.transform.position.x=newParallaxData.transform.position.x
        newParallax.transform.position.y=newParallaxData.transform.position.y

        newParallax.transform.scale.x=newParallaxData.transform.scale.x
        newParallax.transform.scale.y=newParallaxData.transform.scale.y

        newParallax.transform.rotation.x=newParallaxData.transform.rotation.x


        newParallax.parallaxScale.scale.x = newParallaxData.parallaxScale.scale.x
        newParallax.parallaxScale.scale.y = newParallaxData.parallaxScale.scale.y
        
        newParallax.parallaxScale.offset.x = newParallaxData.parallaxScale.offset.x 
        newParallax.parallaxScale.offset.y = newParallaxData.parallaxScale.offset.y
        
        newParallax.parallaxScale.repeat.x = newParallaxData.parallaxScale.repeat.x
        newParallax.parallaxScale.repeat.y = newParallaxData.parallaxScale.repeat.y


        scope.state.entities[stageBackgroundLayerNames[idx]]=newParallax
    }

    

    var stageEnemies=stageData.stageEnemies.slice();

    scope.waveSystem.constructor.allowedEnemyTypes=stageEnemies;

    var stageEnemyPatterns= stageData.stagePatterns.slice();
    
    scope.waveSystem.constructor.enemyWavePatternPossibilities=stageEnemyPatterns

}