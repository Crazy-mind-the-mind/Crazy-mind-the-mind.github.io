




var plr_data = {
    highest_score:0,
    highest_wave:0
};



class Game{
    
    constructor(){

        this.deltaTime =0.0;

        this.player=null;
        this.enemies=[];
        this.projectiles=[];
    }

    run(){

        let running=true;

        while (running) {
            this.deltaTime= Date.getUTCMilliseconds();
            if (deltaTime> 1000/30){
                console.log(this.deltaTime);
            }
        }
    }

    update(){
        this.player.update()
        this.enemies.forEach(enemy => {
            enemy.update()
        });
    }
    
    render(){
        this.player.render()
        this.enemies.forEach(enemy => {
            enemy.render()
        });
    }



}

var game = new Game();

game.run();



