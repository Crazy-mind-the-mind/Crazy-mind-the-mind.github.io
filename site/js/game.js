




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
		
        this.gameUpdateTick=setInterval(update,1000/this.constants.updateRate);
        this.gameRenderTick=setInterval(render,1000/30);
        
    }

    update(){
    }
    
    render(){
    }
    
    handleEvents(){
    	this.characters.forEach();
    }
    
    quit(){
    	clearInterval(this.gameUpdateTick);
    	clearInterval(this.gameRenderTick);
    }


}

var game = new Game();

game.run();

