import { ParallaxLayer } from "../players/parallaxLayer.mjs";
import { PlayerCharacter } from "../players/playercharacter.mjs";
import { Projectile } from "../players/projectile.mjs";
import { keysDown } from "../utils/input.mjs";

export function gameSetup(scope) {
		return function setup() {
            scope.state.entities={};
            
            
            keysDown()

            scope.state.entities.layer1=new ParallaxLayer(scope,0,0);
            
            //let pl2=new ParallaxLayer(scope,0,0)
            //pl2.z_index=100
            //scope.state.entities.layer2=pl2;
            

            scope.state.entities.player=new PlayerCharacter(scope,100,100);
            

	};
}