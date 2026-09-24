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
            [1,1,1,2,2],
            [4,4],
            [4,4,1,1,1,1,1],
            [4,3,3,1,1,1,1],
            [4,2,2,2,1,1,1],
        ];
    }

    static get positions(){
        return [
            new vec2(800,40),
            new vec2(800,180),
            new vec2(800,320)
        ];
    }
    
    constructor(scope){
        this.scope=scope
        
        this.waveCount=0
        this.waveEnemiesLeft=0
        this.waveStarted=false
        this.waveStartDelay = 20
        this.scope.eventSystem.connectToEvent("enemyKilled",function(){
            this.waveEnemiesLeft--;
            if(this.waveEnemiesLeft<=0){
                this.scope.state.playerStatus.ScorePoints+=100*(this.waveCount>1);
            }

        },this);
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
