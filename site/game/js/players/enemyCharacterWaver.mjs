
import { assetLoader } from "../core/game.assetLoader.mjs";
import { EnemyCharacter } from "./enemyCharacter.mjs";
import { vec2, rect2} from "../utils/dataTypes.mjs";
import { correctDrawTransform , drawTexture, createProjectile, degToRad} from "../utils/helper.mjs";

export class EnemyCharacteWaver extends EnemyCharacter{
    constructor(scope, x, y){
        super(scope,x,y)
        this.shotCooldown= 180
        this.velocity = new vec2(-0.1,0)
        this.transform.rotation = Math.PI
        this.moveSpeed = new vec2( 1 , 2 )
        this.moveAccel = new vec2( Math.random() ,Math.random()*1.5 )
        // this.movementPattern= [
        //     new vec2(-25,0),
        //     new vec2( 0,-50),
        //     new vec2( 25,0),
        //     new vec2(0,50),
        // ]

        // this.currentMovementInPattern=0
        // this.timerpattern=240
    }



    async loadAssets(){
        this.texture = await assetLoader.load("EnemyShipDefault","textures/enemyShip.png")
    }


    AI(){
        super.AI(this)
        
        var player=this.scope.state.entities.player

        var movdir = this.transform.position.directionTo(
            vec2.copy(player.transform.position)
            .vecAdd(
                new vec2(300,Math.random()*50-25 )
             )
            
            
            )
            .vecMultVec(
                new vec2(
                    parseInt(
                        Math.abs(player.transform.position.x-this.transform.position.x-300) >8 ),
                    1
                )
            );

        
        
        

        this.velocity.x+=-movdir.x*this.moveAccel.x;
        this.velocity.y+=-movdir.y *this.moveAccel.y;
        
        this.velocity.x = Math.max(this.velocity.x, -this.moveSpeed.x)
        this.velocity.y = Math.max(this.velocity.y, -this.moveSpeed.y)

        if(this.shotCooldown<=0){
            var p =createProjectile(
                this.scope,
                this.transform.position.x,
                this.transform.position.y,
                1,
                {
                    direction:new vec2(-1,0),
                    initialVelocity: new vec2(-5,0)
                }
            )
            this.shotCooldown=180

            console.log("velocity",this.velocity)
        }

        
        this.shotCooldown--
        
        
    }

    render(){
        
        super.render(this)

        if (!this.texture) return;
			
        var drawCorrectedTransform= correctDrawTransform(this)

        drawCorrectedTransform.rotation
        //console.log(plrrect.origin.x,plrrect.origin.y ,plrrect.size.x ,plrrect.size.y );
        
        let renderer=this.scope.context;
        //drawRect(renderer,plrrect,'#40d870');
        drawCorrectedTransform.scale.x=1.0

        


        drawTexture(
            renderer,
            this.texture,
            this.transform,
            {
                useCanvasTransforms:true,
                offsets: vec2.copy(this.transform.position).vecSub(drawCorrectedTransform.position)
            }
        )
        
    }
    

    
}