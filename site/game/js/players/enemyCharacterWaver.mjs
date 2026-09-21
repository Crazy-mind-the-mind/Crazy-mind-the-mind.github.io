
import { assetLoader } from "../core/game.assetLoader.mjs";
import { EnemyCharacter } from "./enemyCharacter.mjs";
import { vec2, rect2} from "../utils/dataTypes.mjs";
import { correctDrawTransform , drawTexture, createProjectile, degToRad} from "../utils/helper.mjs";
import { RectCollider } from "../utils/collision/rectCollision.mjs";

export class EnemyCharacterWaver extends EnemyCharacter{
    constructor(scope, x, y){
        super(scope,x,y)
        this.statHealth=3
		this.statHealthMax=3
        this.shotCooldown= 180
        this.velocity = new vec2(-0.1,0)
        this.transform.rotation = Math.PI
        this.moveSpeed = new vec2( 10 , 5 )
        this.moveAccel = new vec2( Math.random()*0.2,Math.random()*0.2 )
        this.HDirection=-1


        this.collision = new RectCollider(this,this.transform.position,{
            collisionRect: new rect2(
                this.transform.position.x,
                this.transform.position.y,
                16,16
            ),
            showCollision:scope.constants.showColliders
        });
    }



    async loadAssets(){
        this.texture = await assetLoader.load("EnemyShipDefault","textures/ships/enemyShipWaver.png")
    }


    AI(){
        super.AI(this)
        
        var player=this.scope.state.entities.player

        var movdir = this.transform.position.directionTo(
            vec2.copy(player.transform.position)
            .vecAdd(
                new vec2(
                    // 200*-this.transform.position.directionTo(vec2.copy(player.transform.position)).x
                    0,
                    Math.sin(this.aliveTime/30) )
             )            
            )
        this.HDirection= Math.round(movdir.x) || this.HDirection

            

        
        
        

        this.velocity.x+=-movdir.x*this.moveAccel.x;
        this.velocity.y+=-movdir.y *this.moveAccel.y;
        
        this.velocity.x = Math.max(this.velocity.x, -this.moveSpeed.x)
        this.velocity.y = Math.max(this.velocity.y, -this.moveSpeed.y)

        if(this.shotCooldown<=0){
            var p =createProjectile(
                this.scope,
                this.transform.position.x,
                this.transform.position.y,
                2,
                {
                    direction:new vec2(-1,0),
                    initialVelocity: new vec2(-5,0),
                    friendly:false,
                    hostile:true,
                    owner:this,
                }
            )
            this.shotCooldown=180

            // console.log("velocity",this.velocity)
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
        this.transform.rotation=(this.HDirection+1)*Math.PI/2
        drawCorrectedTransform.scale.x=this.HDirection

        


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