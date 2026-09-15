




var plr_data = {
    highest_score:0,
    highest_wave:0
};



class Game{
    
    constructor(){
    	this.constants={
    		updateRate:20
    	}
		this.settings={
			
		};
		
		
        this.deltaTime =0;
        
        
        
        
        this.characters=[];
        this.projectiles=[];
    }

    run(){

        let running=true;

        setTimeout(update,1000/this.constants.updateRate);
        setTimeout(render,1000/30);
    }

    update(){
    }
    
    render(){
    }
    
    handleEvents(){
    	this.characters.forEach();
    }


}

var game = new Game();

game.run();

