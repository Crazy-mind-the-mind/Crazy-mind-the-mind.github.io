import { assetLoader } from "../../core/game.assetLoader.mjs";
import { PlayerCharacter } from "../../players/playercharacter.mjs"

class SpellcardDefinition{
    static get SPELLCARD_TYPES(){
        return {
            NULL:0,
            WEAPON:1,
            HEALTH:2
        }
    }

    static SPELLCARD_TYPES_IMAGES={}
    constructor(){
        this.loadAssets()
    }
    async loadAssets(){

        SpellcardDefinition.SPELLCARD_TYPES_IMAGES[SPELLCARD_TYPES["NULL"]] = await assetLoader.loadImage("SpellCardNullType","textures/spellcardTypes/spellcardTypeNull.png")
        SpellcardDefinition.SPELLCARD_TYPES_IMAGES[SPELLCARD_TYPES["WEAPON"]] = await assetLoader.loadImage("SpellCardWeaponType","textures/spellcardTypes/spellcardTypeWeapon.png")
        SpellcardDefinition.SPELLCARD_TYPES_IMAGES[SPELLCARD_TYPES["HEALTH"]] = await assetLoader.loadImage("SpellCardHealthType","textures/spellcardTypes/spellcardTypeHealth.png")
    
    }
    spellcardAction(player){
        if (!player instanceof PlayerCharacter) return;

    }
}


class SpellcardDefinitionSlugShotPower extends SpellcardDefinition{
    constructor(){

    }

    spellcardAction(player){
        if (!player instanceof PlayerCharacter) return;

    }
}


class SpellcardDefinitionTriShot extends SpellcardDefinition{
    constructor(){

    }

    spellcardAction(player){
        if (!player instanceof PlayerCharacter) return;
        
        player.currentWeapon = PlayerCharacter
    }
}


class SpellcardDefinitionWaverShot extends SpellcardDefinition{
    constructor(){

    }

    spellcardAction(player){
        if (!player instanceof PlayerCharacter) return;
        
        player.currentWeapon
    }
}


export {SpellcardDefinition}