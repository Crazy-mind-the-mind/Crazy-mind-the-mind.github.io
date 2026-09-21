import { EnemyCharacterDefault } from "../players/enemyCharacterDefault.mjs";
import { ParallaxLayer } from "../players/parallaxLayer.mjs";
import { PlayerCharacter } from "../players/playercharacter.mjs";
import { Projectile } from "../players/projectile.mjs";
import { createEnemy, loadFont } from "../utils/helper.mjs";
import { keysDown } from "../utils/input.mjs";
import { UIImage } from "../utils/ui/uiImage.mjs";
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
            

            // Debug Start Enemies

            //var enemies=[
            //      createEnemy(scope,scope.constants.width,scope.constants.height/2,1),
            //      createEnemy(scope,scope.constants.width,scope.constants.height/2,2),
            //      createEnemy(scope,scope.constants.width,scope.constants.height/2,3),
            //      createEnemy(scope,scope.constants.width,scope.constants.height/2,1),
            //      createEnemy(scope,scope.constants.width,scope.constants.height/2,2),
            //      createEnemy(scope,scope.constants.width,scope.constants.height/2,3),
            //]

            //enemies.forEach(enemy=> {
            //      console.log(enemy);
            //});










            // UI elements

            scope.state.ui = {}
            
            var gameHUD={
                  "rootUINode":new UINode(
                        scope,
                        0,
                        0,
                        null),
                  "rootScoreNode": new UINode(
                        scope,
                        10*"SCORE : ".length,
                        0,
                        null),
                  "rootHighScoreNode": new UINode(
                        scope,
                        10*"HI-SCORE : ".length,
                        0,
                        null),
                  "ScoreLabel":new UILabel(
                        scope,
                        -10*"SCORE : ".length,
                        0,
                        null,
                        "SCORE : "),
                  "HighScoreLabel":new UILabel(
                        scope,
                        -10*"HI-SCORE : ".length,
                        0,
                        null,
                        "HI-SCORE : "),
                  "ScorePoints":new UILabel(
                        scope,
                        0,
                        0,
                        null,
                        "0"),
                  "HighScorePoints":new UILabel(
                        scope,
                        0,
                        0,
                        null,
                        "0"),
                  "SpellCardBundle": new UINode(
                        scope,
                        0,
                        100,
                        null,
                  ),
                  "Spellcard1": new UIImage(scope,
                        0,
                        0,
                        null,
                        "SpellCardBackground",
                        "textures/spellCard.png"
                  ),
                  "Spellcard2": new UIImage(scope,
                        32,
                        0,
                        null,
                        "SpellCardBackground",
                        "textures/spellCard.png"
                        
                  ),
                  "Spellcard3": new UIImage(scope,
                        64,
                        16,
                        null,
                        "SpellCardBackground",
                        "textures/spellCard.png"
                  ),
                  "Spellcard1Type": new UIImage(scope,
                        0,
                        0,
                        null,
                        "SpellCardNullType",
                        "textures/spellcardTypes/spellcardTypeNull.png"
                  ),
                  "Spellcard2Type": new UIImage(scope,
                        0,
                        0,
                        null,
                        "SpellCardNullType",
                        "textures/spellcardTypes/spellcardTypeNull.png"
                  ),
                  "Spellcard3Type": new UIImage(scope,
                        0,
                        0,
                        null,
                        "SpellCardNullType",
                        "textures/spellcardTypes/spellcardTypeNull.png"
                  ),
                  "Spellcard1Effect": new UIImage(scope,
                        0,
                        0,
                        null,
                        "SpellCardBackground",
                        "textures/spellCard.png"
                  ),
                  
            }
            
            gameHUD["rootScoreNode"].transform.position.offset.y+=10
            gameHUD["rootScoreNode"].transform.position.offset.x+=10
            gameHUD["rootHighScoreNode"].transform.position.offset.y+=20
            gameHUD["rootHighScoreNode"].transform.position.offset.x+=10

            gameHUD["rootScoreNode"].addChild(gameHUD["ScoreLabel"],"ScoreLabel")
            gameHUD["rootScoreNode"].addChild(gameHUD["ScorePoints"],"ScorePoints")

            gameHUD["rootHighScoreNode"].addChild(gameHUD["HighScoreLabel"],"HighScoreLabel")
            gameHUD["rootHighScoreNode"].addChild(gameHUD["HighScorePoints"],"HighScorePoints")


            gameHUD["rootUINode"].addChild(gameHUD["rootScoreNode"],"ScorePointsNode")
            gameHUD["rootUINode"].addChild(gameHUD["rootHighScoreNode"],"HighScorePointsNode")
            
            gameHUD["SpellCardBundle"].addChild(gameHUD["Spellcard3"],"Spellcard3")
            gameHUD["SpellCardBundle"].addChild(gameHUD["Spellcard2"],"Spellcard2")
            gameHUD["SpellCardBundle"].addChild(gameHUD["Spellcard1"],"Spellcard1")

            gameHUD["Spellcard1"].addChild(gameHUD["Spellcard1Type"],"SpellcardType")
            gameHUD["Spellcard1"].addChild(gameHUD["Spellcard1Effect"],"SpellcardEffect")
            gameHUD["Spellcard2"].addChild(gameHUD["Spellcard2Type"],"SpellcardType")
            gameHUD["Spellcard3"].addChild(gameHUD["Spellcard3Type"],"SpellcardType")

            gameHUD["Spellcard1"].transform.scale.scale.vecMult(1.3)
            gameHUD["Spellcard2"].transform.scale.scale.vecMult(1.2)
            gameHUD["Spellcard3"].transform.scale.scale.vecMult(1.1)

            gameHUD["Spellcard2"].transform.rotation = Math.PI*0.1
            gameHUD["Spellcard3"].transform.rotation = Math.PI*0.2

            gameHUD["SpellCardBundle"].transform.position.scale.y=0.5
            gameHUD["rootUINode"].addChild(gameHUD["SpellCardBundle"],"SpellCardBundle")

            scope.state.ui["GameHUD"] = gameHUD["rootUINode"]


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










            scope.state.playerStatus = {
                  "ScorePoints":0,
                  "HighScorePoints":0
            }



	};
}