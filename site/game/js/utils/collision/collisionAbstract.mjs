

export class CollisionAbstract{
    constructor(position) {
	        this.position = position
    }

    intersects_with(collision) {
	    	return false
    }
}