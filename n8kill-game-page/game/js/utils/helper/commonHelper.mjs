
import { transform2, uiTransform, vec2 } from "../dataTypes.mjs";
import { ProjectileTypes } from "../../players/projectileTypes.mjs";
import { EnemyCharacterTypes, EnemyCharacterTypesNames} from "../../players/enemyCharacterTypes.mjs";
import { assetLoader } from "../../core/game.assetLoader.mjs";
import { ParallaxLayer } from "../../players/parallaxLayer.mjs";
import { waveData, waveEnemyData } from "../dataTypes/waveData.mjs";




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

    assetLoader.loadStageData(stagePath).then(
        (stageData)=>{
            console.log(stageData)
            
            var stageDataBackgroundLayerNames
            stageDataBackgroundLayerNames  = Object.keys(stageData.stageBackground);    
            

            console.log(stageDataBackgroundLayerNames)

            stageDataBackgroundLayerNames.forEach(stgBG=>{
                var newPBG= new ParallaxLayer(scope,0,0);
                newPBG.layerTextureData={
                    "name":stageData.stageBackground[stgBG].texture.name,
                    "path":stageData.stageBackground[stgBG].texture.path
                }
                
                newPBG.z_index=stageData.stageBackground[stgBG].z_index;

                newPBG.transform.position=vec2.copy(stageData.stageBackground[stgBG].transform.position)
                newPBG.transform.scale=vec2.copy(stageData.stageBackground[stgBG].transform.scale)
                newPBG.transform.rotation=stageData.stageBackground[stgBG].transform.rotation

                newPBG.parallaxScale.scale=vec2.copy(stageData.stageBackground[stgBG].parallaxScale.scale)
                newPBG.parallaxScale.offset=vec2.copy(stageData.stageBackground[stgBG].parallaxScale.offset)
                newPBG.parallaxScale.repeat=vec2.copy(stageData.stageBackground[stgBG].parallaxScale.repeat)
                
                scope.state.entities[stgBG]=newPBG
            })


            scope.state.currentStage.name=stageData.stageName || "SPACE"

            
            
            scope.state.currentStage.maxWave=stageData.stageMaxWave || 100
            

            

            

            var stageEnemies=[]

            stageData.stageEnemies.forEach((stgEnemy)=>{
                stageEnemies.push(EnemyCharacterTypesNames[stgEnemy])
            }
            )
            

            scope.waveSystem.constructor.allowedEnemyTypes=stageEnemies;
            console.log(scope.waveSystem.constructor.allowedEnemyTypes)
            scope.waveSystem.constructor.enemyWavePatternPossibilities=[]
            var stageEnemyPatterns = [];
            stageData.stagePatterns.forEach((pattern)=>{
                var enemyTypeNamesPresent=[]
                var translatedPattern=[]
                var test =""
                
                pattern.forEach(piece=>{
                    console.log(piece instanceof String)
                    if ( piece instanceof String){
                        if (!(piece in enemyTypeNamesPresent)){
                        enemyTypeNamesPresent[piece] = 1
                        }
                        else{
                            enemyTypeNamesPresent[piece]++
                        }
                    }
                    else{
                        console.log(piece)
                        console.log(piece["type"])
                        if (!(EnemyCharacterTypesNames[piece.type] in enemyTypeNamesPresent)){
                            enemyTypeNamesPresent[EnemyCharacterTypesNames[piece.type]] = piece.count
                        }
                        else{
                            enemyTypeNamesPresent[EnemyCharacterTypesNames[piece.type]] += piece.count
                        }
                    }
                    
                })
                console.log("\n\n\n\n\n")
                console.log("enemy types present in pattern")
                console.log(enemyTypeNamesPresent)
                var newWaveData= new waveData()

                
                Object.keys(enemyTypeNamesPresent).forEach(enmyType=>{
                    console.log(EnemyCharacterTypesNames[enmyType])
                    var newWaveEnemyData = new waveEnemyData()
                    newWaveEnemyData.enemy= enmyType
                    newWaveEnemyData.enemyPositions = new vec2(800,120);
                    newWaveEnemyData.repeatEnemy = enemyTypeNamesPresent[enmyType] || 0

                    newWaveData.enemies.push(newWaveEnemyData)
                })
                scope.waveSystem.constructor.enemyWavePatternPossibilities.push(newWaveData) 
                
            })
            console.log("Enemy Wave Pattern possibilities")
            console.log(scope.waveSystem.constructor.enemyWavePatternPossibilities)
            

            
        }
    )

    var temp_test=await assetLoader.loadStageData(stagePath)
    console.log(temp_test)

}