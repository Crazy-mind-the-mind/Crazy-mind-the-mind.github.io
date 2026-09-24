
import { assetLoader } from "../core/game.assetLoader.mjs";
import { EnemyCharacter } from "./enemyCharacter.mjs";
import { vec2, rect2} from "../utils/dataTypes.mjs";
import { correctDrawTransform , drawTexture, createProjectile, degToRad, playAudio} from "../utils/helper.mjs";
import { RectCollider } from "../utils/collision/rectCollision.mjs";

export class EnemyCharacterSpiker extends EnemyCharacter{
    constructor(scope, x, y){
        super(scope,x,y)
        this.statHealth=12
		this.statHealthMax=12
        this.shotCooldown= 30+parseInt(Math.random*40)
        this.velocity = new vec2(-0.1,0)
        this.transform.rotation = Math.PI
        this.moveSpeed = new vec2( 4 , 4 )
        
        this.collision = new RectCollider(this,this.transform.position,{
            collisionRect: new rect2(
                this.transform.position.x,
                this.transform.position.y,
                16,16
            ),
            showCollision: scope.constants.showColliders,
            collisionLayers:["enemies"],
            collisionMask:["projectiles"],
        });

        this.patternPoints =[
            new vec2(0,scope.constants.height/2),
            new vec2(scope.constants.width,scope.constants.height/2)
        ]
        this.currentPatternPoint=0
    }



    async loadAssets(){
        this.texture = await assetLoader.loadImage("EnemySpikerSprite","textures/ships/enemyShipSpiker.png")
    }


    AI(){
        super.AI(this)
        
        var player=this.scope.state.entities.player

        var movdir = this.transform.position.directionTo(
            this.patternPoints[this.currentPatternPoint]
        )
            
        if (this.transform.position.distanceTo(this.patternPoints[this.currentPatternPoint])<10) this.currentPatternPoint= (this.currentPatternPoint+1)%2; 
        
        
        

        this.velocity.x=-movdir.x*this.moveSpeed.x;
        this.velocity.y=-movdir.y *this.moveSpeed.y;
        

        if(this.shotCooldown<=0){
            for (let pCount = 0; pCount < 8; pCount++) {
                
                var p =createProjectile(
                this.scope,
                this.transform.position.x,
                this.transform.position.y,
                1,
                {
                    direction:new vec2(-1,0).rotated(Math.PI/4*pCount),
                    initialVelocity: new vec2(-5,0).rotated(Math.PI/4*pCount),
                    friendly:false,
                    hostile:true,
                    owner:this,
                }
                )
            }
            
            this.shotCooldown=180+parseInt(Math.random*40)
            playAudio(this.scope.audio,"LaserShotSound")
            
            //console.log("velocity",this.velocity)
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