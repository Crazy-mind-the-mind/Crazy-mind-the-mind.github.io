const canvas = document.getElementById("game-viewport");
const ctx = canvas.getContext("2d");




class RenderEngine{
    constructor(){

    }
}





function render_canvas(){


    render_queue.forEach(render_obj => {
        
        switch (render_obj.render_mode) {
            case 0:
                ctx.fillStyle=render_obj.color;
                ctx.fillRect(
                    render_obj.rect[0],
                    render_obj.rect[1],
                    render_obj.rect[2],
                    render_obj.rect[3]
                );
                break;
        
            default:
                break;
        }
    });
}


function render_character(character){
    ctx.drawImage(
        character.texture,
        character.position.x,
        character.position.y,
        character.texture.width,
        character.texture.height,
    );
}


function render_projectile(projetile){
    ctx.drawImage(
        projetile.texture,
        projetile.position.x,
        projetile.position.y,
        projetile.texture.width,
        projetile.texture.height,
    );
}


module.exports=new RenderEngine()