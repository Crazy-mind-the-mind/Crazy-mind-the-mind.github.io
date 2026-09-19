import { ParallaxLayer } from "../players/parallaxLayer.mjs";
import { PlayerCharacter } from "../players/playerCharacter.mjs";
import { Projectile } from "../players/projectile.mjs";
import { loadFont } from "../utils/helper.mjs";
import { keysDown } from "../utils/input.mjs";
import { UILabel } from "../utils/ui/uiLabel.mjs";
import { UINode } from "../utils/ui/uiNode.mjs";

export function gameSetup(scope) {

            loadFont()
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

            pbl[1].transform.scale.x*=0.7
            pbl[2].transform.scale.x*=0.5
            pbl[1].transform.scale.y*=0.7
            pbl[2].transform.scale.y*=0.5
       
            scope.state.entities.background1=pbl[0]
            scope.state.entities.background2=pbl[1]
            scope.state.entities.background3=pbl[2]
            
            scope.state.entities.player=new PlayerCharacter(scope,100,100);
            












            // UI elements

            scope.state.ui = {}
            
            var gameHUD=[
                  new UINode(scope,0,0,null),
                  new UILabel(scope,-10*"SCORE : 0".length/2,10,null),
                  new UILabel(scope,-10*"HI-SCORE : 0".length/2,20,null),
            ]
            gameHUD[1].text="SCORE : 0"
            gameHUD[2].text="HI-SCORE : 0"
            gameHUD[1].transform.position.scale.y=0.02
            gameHUD[1].transform.position.scale.x=0.1
            gameHUD[2].transform.position.scale.y=0.04
            gameHUD[2].transform.position.scale.x=0.1
            gameHUD[0].addChild(gameHUD[1],"ScoreLabel")
            gameHUD[0].addChild(gameHUD[2],"HighScoreLabel")



            scope.state.ui["GameHUD"] = gameHUD[0]


            var DeadScreen=[
                  new UINode(scope,0,0,null),
                  new UILabel(scope,-40,0,null),
                  new UILabel(scope,-10*"SCORE : 00000000".length/2,16,null),
                  
            ]
            DeadScreen[1].text="DEAD"
            DeadScreen[1].transform.position.scale.x=0.5
            DeadScreen[1].transform.position.scale.y=0.5
            
            DeadScreen[2].text="SCORE : 00000000"
            DeadScreen[2].transform.position.scale.x=0.5
            DeadScreen[2].transform.position.scale.y=0.5
            
            DeadScreen[0].addChild(DeadScreen[1],"DeadText")
            DeadScreen[0].addChild(DeadScreen[2],"ScoreAmount")
            DeadScreen[0].visible=false



            scope.state.ui["DeadScreen"] = DeadScreen[0]



	};
}