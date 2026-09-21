import { vec2 } from "../utils/dataTypes.mjs";
import { createEnemy } from "../utils/helper.mjs";



const enemyWaves = [

];
export class gameWaveSystem{
    
    static get enemyWavePatternPossibilities(){
        return [
            [1,1,1,1,1],
            [2,2,2,2,2],
            [3,3,3,3,3],
            [1,1,1,2,3],
            [1,1,1,2,2]
        ];
    }

    static get positions(){
        return [
            new vec2(1000,40),
            new vec2(1000,180),
            new vec2(1000,360-40),
        ];
    }
    
    constructor(scope){
        this.scope=scope
        
        this.waveCount=0
        this.waveEnemiesLeft=0
        this.waveStarted=false
        this.waveStartDelay = 240
    }
    waveSystemUpdate(){

        if (!this.waveStarted){
            if (this.waveStartDelay<=0){
                this.waveStarted= true
                this.waveCount++;
                var wavePattern=gameWaveSystem.enemyWavePatternPossibilities[
                    Math.round(Math.random()*gameWaveSystem.enemyWavePatternPossibilities.length-1)   ]
                
                this.waveEnemiesLeft=wavePattern.length
                
                for (let enemyIdx = 0; enemyIdx < wavePattern.length; enemyIdx++) {

                    var randomPos= vec2.copy(
                        gameWaveSystem.positions[
                            Math.round( Math.random()*gameWaveSystem.positions.length-1)
                        ]
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
                this.waveStarted=false
            }
        }       
    }


}
