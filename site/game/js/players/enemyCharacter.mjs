
import { rect2 } from "../utils/dataTypes.mjs";
import { Boundary } from "../utils/helper.mjs";
import { Character } from "./character.mjs";


class EnemyCharacter extends Character{
    constructor(scope, x, y) {
        super(scope, x, y);
        this.boundary = new rect2(0,0,scope.constants.width*2,scope.constants.height)
	}

    update(){
        this.AI()

        super.update(this)

        Boundary(this,this.boundary)
        
    }
    AI(){
        
    }
}

export {EnemyCharacter}