import { assetLoader } from "../../core/game.assetLoader.mjs";
import { PlayerCharacter } from "../../players/playerCharacter.mjs"

export class SpellcardDefinition{
    static get SPELLCARD_TYPES(){
        return {
            NULL:0,
            WEAPON:1,
            HEALTH:2
        }
    }

    static SPELLCARD_TYPES_IMAGES={}
    
    static get SpellcardActions(){
        return {
    	SpellcardSlugShotPower:function(player){
            player.currentWeapon2=PlayerCharacter.weapons.SlugShot;
        },
    	SpellcardTrishotPower:function(player){
            player.currentWeapon2=PlayerCharacter.weapons.TripleShot;

        },
    	SpellcardWaverShotPower:function(player){
            player.currentWeapon2=PlayerCharacter.weapons.WaverShot;
        },
    	
    	SpellcardHealPower:function(player){
            player.statHealth=player.statHealthMax
        },
    	SpellcardOverhealPower:function(player){
            player.statHealthMax++
            player.statHealth=player.statHealthMax

        },
        
    };
}
    constructor(){
        this.spellcardAct=SpellcardDefinition.SpellcardActions[
            Object.keys(SpellcardDefinition.SpellcardActions)[
                Math.round( Math.random()*Object.keys(SpellcardDefinition.SpellcardActions).length)
            ]
        ]

        console.log("This spellcard has ",Math.round( Math.random()*Object.keys(SpellcardDefinition.SpellcardActions).length))

        this.loadAssets()
    }
    async loadAssets(){

        SpellcardDefinition.SPELLCARD_TYPES_IMAGES[SPELLCARD_TYPES["NULL"]] = await assetLoader.loadImage("SpellCardNullType","textures/spellcardTypes/spellcardTypeNull.png")
        SpellcardDefinition.SPELLCARD_TYPES_IMAGES[SPELLCARD_TYPES["WEAPON"]] = await assetLoader.loadImage("SpellCardWeaponType","textures/spellcardTypes/spellcardTypeWeapon.png")
        SpellcardDefinition.SPELLCARD_TYPES_IMAGES[SPELLCARD_TYPES["HEALTH"]] = await assetLoader.loadImage("SpellCardHealthType","textures/spellcardTypes/spellcardTypeHealth.png")
    
    }
    spellcardAction(player){
        if (!player instanceof PlayerCharacter) return;

        if (this.spellcardAct){
            console.log("Yasss")
            this.spellcardAct(player)
        }
    }
}
