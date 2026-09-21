import { vec2 } from "../utils/dataTypes.mjs";
import { createEnemy } from "../utils/helper.mjs";



const enemyWaves = [

];
export class gameWaveSystem{
    
    static get enemyWavePatternPossibilities(){
        return [
            [1,1,1,1,1]
        ];
    }
    
    constructor(scope){
        this.scope=scope
        this.positions=[
            new vec2(this.scope.constants.width,this.scope.constants.height/2),
            new vec2(this.scope.constants.width,this.scope.constants.height),
            new vec2(this.scope.constants.width,this.scope.constants.height),
        ]
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
                var wavePattern=gameWaveSystem.enemyWavePatternPossibilities[Math.max(0, Math.random()*gameWaveSystem.enemyWavePatternPossibilities.length-1)  ]
                this.waveEnemiesLeft=wavePattern.length
                for (let enemyIdx = 0; enemyIdx < wavePattern.length; enemyIdx++) {

                    var randomPos= vec2.copy(
                        this.positions[
                            Math.round(Math.random()*this.positions.length)
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
