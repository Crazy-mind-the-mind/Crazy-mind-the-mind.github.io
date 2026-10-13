import { assetLoader } from "../../core/game.assetLoader.mjs"
import { deleteEntity, drawTexture } from "../../utils/helper.mjs"
import { Entity } from "../entity.mjs"

export class ParticleEmmiter extends Entity{

    static spawnParticle(position) {
        let part = new ParticleEmmiter(window.game,position.x , position.y)
        
        var newparticle="Particle"
        
        var i=0;
        while (i<1000){

            if (!Object.keys(window.game.state.entities).includes("Particle"+i) ){
                newparticle=newparticle+i;
                window.game.state.entities[newparticle]=part;
                break;
            }
        
            i++;
        }
        
    }
    constructor(scope,x,y){
        super(scope,x,y)

        this.lifetime=30
    }
    
    async loadAssets(){
        this.texture = await assetLoader.loadImage("ParticleDamage","textures/damage.png")
    }
    update(){
        super.update()
        this.lifetime--
        
        if (this.lifetime){
            deleteEntity(window.game,this)
            
        }
    }

    render(){
        this.transform.rotation+=0.01
        drawTexture(
					this.scope,
					this.texture,
					this.transform,
					{
						useCanvasTransforms:true,
						offsets: vec2.copy(this.transform.position).vecSub(drawCorrectedTransform.position)
					}
        )
    }
}

