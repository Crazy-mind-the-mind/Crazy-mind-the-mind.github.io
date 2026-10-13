import { vec2 } from "../utils/dataTypes.mjs";
import { createEnemy } from "../utils/helper.mjs";

import { EnemyCharacterTypesNames } from "../players/enemyCharacterTypes.mjs";

const enemyWaves = [

];
export class gameWaveSystem{
    
    static get enemyWavePatternPossibilities(){
        return [
            [
                EnemyCharacterTypesNames["EnemyCharacterDefault"],
                EnemyCharacterTypesNames["EnemyCharacterDefault"],
                EnemyCharacterTypesNames["EnemyCharacterDefault"],
                EnemyCharacterTypesNames["EnemyCharacterDefault"],
                EnemyCharacterTypesNames["EnemyCharacterDefault"],
                EnemyCharacterTypesNames["EnemyCharacterDefault"],
                EnemyCharacterTypesNames["EnemyCharacterDefault"],
                EnemyCharacterTypesNames["EnemyCharacterDefault"],
                EnemyCharacterTypesNames["EnemyCharacterDefault"],

            ],
            [2,2,2,2,2,2,2],
            [3,3,3,3,3,2,1],
            [1,1,1,2,3,3,3],
            [1,1,1,2,2,2,2],
            [4,4],
            [4,4,4],
            [4,4,3,1,1,1,1,1],
            [4,3,3,1,1,1,1],
            [4,2,2,2,1,1,1],
            [4,2,2,2,2,1,1,1,1,1],
            [4,3,3,2,2,1,1,1,1,1],
            [4,3,3,3,3,2,2,1,1,1,1,1],

            [
                EnemyCharacterTypesNames["EnemyCharacterTanker"],
                EnemyCharacterTypesNames["EnemyCharacterTanker"],
                EnemyCharacterTypesNames["EnemyCharacterTanker"],
                EnemyCharacterTypesNames["EnemyCharacterSplitter"],
            ],
            [
                EnemyCharacterTypesNames["EnemyCharacterTanker"],
                EnemyCharacterTypesNames["EnemyCharacterSpiker"],
                EnemyCharacterTypesNames["EnemyCharacterWaver"],
                EnemyCharacterTypesNames["EnemyCharacterSplitter"],
                EnemyCharacterTypesNames["EnemyCharacterSplitter"],
                EnemyCharacterTypesNames["EnemyCharacterDefault"],
                EnemyCharacterTypesNames["EnemyCharacterDefault"],
                EnemyCharacterTypesNames["EnemyCharacterDefault"],
                EnemyCharacterTypesNames["EnemyCharacterSwarmer"],
                EnemyCharacterTypesNames["EnemyCharacterSwarmer"],
                EnemyCharacterTypesNames["EnemyCharacterSwarmer"],
            ],
            [
                EnemyCharacterTypesNames["EnemyCharacterSplitter"],
                EnemyCharacterTypesNames["EnemyCharacterSplitter"],
                EnemyCharacterTypesNames["EnemyCharacterSplitter"],
                EnemyCharacterTypesNames["EnemyCharacterSplitter"],

            ],
            [
                EnemyCharacterTypesNames["EnemyCharacterSplitter"],
                EnemyCharacterTypesNames["EnemyCharacterSplitter"],
                EnemyCharacterTypesNames["EnemyCharacterSplitter"],
                EnemyCharacterTypesNames["EnemyCharacterSplitter"],
                EnemyCharacterTypesNames["EnemyCharacterSwarmer"],
                EnemyCharacterTypesNames["EnemyCharacterSwarmer"],
                EnemyCharacterTypesNames["EnemyCharacterSwarmer"],
                EnemyCharacterTypesNames["EnemyCharacterSwarmer"],


            ],
        ];
    }

    static get positions(){
        return [
            new vec2(680,40),
            new vec2(680,180),
            new vec2(680,320)
        ];
    }
    static get debugPositions(){
        return [
            new vec2(500,40),
            new vec2(500,180),
            new vec2(500,320)
        ];
    }
    constructor(scope){
        this.scope=scope
        
        this.waveCount=0
        this.waveEnemiesLeft=0
        this.waveStarted=false
        this.waveStartDelay = 240
        this.scope.eventSystem.connectToEvent("enemyKilled",function(){
            this.waveEnemiesLeft--;
            if(this.waveEnemiesLeft<=0){
                this.scope.state.playerStatus.ScorePoints+=100*(this.waveCount>1);
            }

        },this);

        this.scope.eventSystem.connectToEvent("playerDied",function(){
            this.waveCount=0
            this.waveStarted=false
            this.waveStartDelay = 240
        },this)
    }
    waveSystemUpdate(){

        if (!this.waveStarted){
            if (this.waveStartDelay<=0){
                this.waveStarted= true
                this.waveCount++;
                var wavePattern=gameWaveSystem.enemyWavePatternPossibilities[
                    parseInt(Math.random()*gameWaveSystem.enemyWavePatternPossibilities.length)
                ]
                console.log(wavePattern)
                
                this.waveEnemiesLeft=wavePattern.length
                
                for (let enemyIdx = 0; enemyIdx < wavePattern.length; enemyIdx++) {
                    //console.log(parseInt( Math.random()*gameWaveSystem.positions.length))
                    var randomPos= vec2.copy(
                        this.scope.constants.debug?
                        gameWaveSystem.debugPositions[parseInt( Math.random()*gameWaveSystem.positions.length)]
                        
                        :
                        gameWaveSystem.positions[parseInt( Math.random()*gameWaveSystem.positions.length)]
                    );

                    createEnemy(this.scope,randomPos.x,randomPos.y, wavePattern[enemyIdx])
                }

                console.log("Yolk")
                this.waveStartDelay=241
                
            }

            this.waveStartDelay --;

        }
        else{
            if (this.waveEnemiesLeft==0){
                this.waveStarted=false;
            }
        }       
    }


}
