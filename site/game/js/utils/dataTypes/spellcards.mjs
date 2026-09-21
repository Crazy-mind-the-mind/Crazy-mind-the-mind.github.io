import { PlayerCharacter } from "../../players/playerCharacter.mjs"

class SpellcardDefinition{
    constructor(){

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