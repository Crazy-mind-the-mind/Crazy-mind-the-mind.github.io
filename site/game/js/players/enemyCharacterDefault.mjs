
import { assetLoader } from "../core/game.assetLoader.mjs";
import { EnemyCharacter } from "./enemyCharacter.mjs";
import { vec2, rect2} from "../utils/dataTypes.mjs";
import { correctDrawTransform , drawTexture, createProjectile, degToRad} from "../utils/helper.mjs";
import { RectCollider } from "../utils/collision/rectCollision.mjs";

export class EnemyCharacterDefault extends EnemyCharacter{
    constructor(scope, x, y){
        super(scope,x,y)
        this.shotCooldown= 180
        this.velocity = new vec2(-0.1,0)
        this.transform.rotation = Math.PI
        this.moveSpeed = new vec2( 2 , 2 )
        this.moveAccel = new vec2( Math.random()*1.5 ,Math.random()*1.5 )
        this.collision = new RectCollider(this,this.transform.position,{
            collisionRect: new rect2(
                this.transform.position.x,
                this.transform.position.y,
                16,16
            ),
            showCollision:true
        });
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
                        Math.abs(player.transform.position.x-this.transform.position.x)-300 >8 || 
                        this.transform.position.x-player.transform.position.x < 0
                    ),
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
        
        if (this.collision){
			this.collision.render()
		}
    }
    

    
}