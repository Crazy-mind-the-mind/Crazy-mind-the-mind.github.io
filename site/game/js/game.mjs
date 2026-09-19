import { gameUpdate } from "./core/game.update.mjs";
import { gameRender } from "./core/game.render.mjs";
import { gameLoop } from "./core/game.loop.mjs";
import { gameSetup } from "./core/game.setup.mjs";
import { generateCanvas , generateDrawOrderList} from "./utils/canvas.mjs";
import { transform2, vec2 } from "./utils/dataTypes.mjs";



var $container = document.getElementById('container');









function Game(w, h, targetFps, showFps) {
	this.constants = {
		width: w,
		height: h,
		targetFps: targetFps,
		showFps: showFps,
		trueWidth:640,
		trueHeight:360,
	}

	this.state = {
		'cameraScroll':new vec2(0,0),
		'cameraTransform': new transform2(0,0,1,1),
		'entities':[],
	};

	this.viewport = generateCanvas(w, h);
	this.viewport.id = "game-viewport";

	this.context = this.viewport.getContext('2d');

	$container.insertBefore(this.viewport, $container.firstChild);

	


	this.context.font = '8px Arial';
	this.context.fillStyle = '#fff';
	console.log('Starting Game');

	


	this.context.fillText('man, i need a sandwich', 5, 50);

	console.log('Starting Engine');
	
	

	this.setup = gameSetup(this);

	this.setup()

	this.update = gameUpdate(this);
	this.render = gameRender(this);
	this.loop = new gameLoop(this);

	

	
	console.log('Engine set up');

	return this;
}


window.game = new Game(640 , 360 , 60, true);