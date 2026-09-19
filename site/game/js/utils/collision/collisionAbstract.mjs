import { transform2 } from "../dataTypes.mjs"


export class CollisionAbstract{
    constructor(owner,position) {
        this.owner = owner
	    this.transform = new transform2()
    }

    intersects_with(collision) {
	    	return false
    }
}