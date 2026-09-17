import { ParallaxLayer } from "../players/parallaxLayer.mjs";
import { PlayerCharacter } from "../players/playerCharacter.mjs";
import { Projectile } from "../players/projectile.mjs";
import { keysDown } from "../utils/input.mjs";

export function gameSetup(scope) {
		return function setup() {
            scope.state.entities={};
            
            
            keysDown()

            
            
            //let pl2=new ParallaxLayer(scope,0,0)
            //pl2.z_index=100
            //scope.state.entities.layer2=pl2;
            var pbl =[
                  new ParallaxLayer(scope,scope.viewport.width/scope.viewport.height/2),
                  new ParallaxLayer(scope,scope.viewport.width/scope.viewport.height/2),
                  new ParallaxLayer(scope,scope.viewport.width/scope.viewport.height/2),
                  
            ]

            pbl[1].z_index+=2
            pbl[2].z_index+=4
            
            pbl[1].parallaxScale.scale.x=0.7
            pbl[2].parallaxScale.scale.x=0.5

            scope.state.entities.background1=pbl[0]
            scope.state.entities.background2=pbl[1]
            scope.state.entities.background3=pbl[2]
            
            scope.state.entities.player=new PlayerCharacter(scope,100,100);
            

	};
}