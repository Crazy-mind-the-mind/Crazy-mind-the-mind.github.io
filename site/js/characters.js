

class GameCharacterAbstract{

    constructor(){
        this.position=vec2(0,0);
        this.velocity=vec2(0,0);
        this.statHealthMax=0;
        this.statHealth=0;
        this.texture=null;
    }

    physics_update(){
        this.velocity*=0.99;
        this.position+=this.velocity;
    }

    update(){

        return this;

        
    }

    render(){
        return this;
    }
    handle_events(){
        return this;
    }
}




class Player extends GameCharacterAbstract{
    constructor(){
        this.statHealthMax=3;
        this.powerup=0;
        
    }

    update(){

    }

    render(){
        render_character(self);
    }

}


class NPC extends GameCharacterAbstract{

    constructor(a){
        this
    }
}