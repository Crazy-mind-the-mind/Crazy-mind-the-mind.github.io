
import { RectCollider } from "../utils/collision/rectCollision.mjs";
import { rect2 } from "../utils/dataTypes.mjs";
import { Boundary } from "../utils/helper.mjs";
import { Character } from "./character.mjs";


class EnemyCharacter extends Character{
    constructor(scope, x, y) {
        super(scope, x, y);
        this.boundary = new rect2(0,0,scope.constants.width*2,scope.constants.height)
        this.aliveTime=0
        this.collision = new RectCollider(this,this.transform.position,{
            collisionRect: new rect2(
                this.transform.position.x,
                this.transform.position.y,
                16,16
            ),
            showCollision:true
        });
	}

    update(){
        super.update()
        this.AI()

        Boundary(this,this.boundary)
        this.aliveTime++;
    }
    AI(){
        
    }

    render(){
		super.render()
    }
}

export {EnemyCharacter}