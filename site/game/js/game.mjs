import { gameUpdate } from "./core/game.update.mjs";
import { gameRender } from "./core/game.render.mjs";
import { gameLoop } from "./core/game.loop.mjs";
import { gameSetup } from "./core/game.setup.mjs";
import { generateCanvas , generateDrawOrderList} from "./utils/canvas.mjs";



var $container = document.getElementById('container');









function Game(w, h, targetFps, showFps) {
	this.constants = {
		width: w,
		height: h,
		targetFps: targetFps,
		showFps: showFps
	}

	this.state = {
		'entities':[],
	};

	this.viewport = generateCanvas(w, h);
	this.viewport.id = "game-viewport";

	this.context = this.viewport.getContext('2d');

	$container.insertBefore(this.viewport, $container.firstChild);

	


	this.context.font = '32px Arial';
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


window.game = new Game(800, 600, 60, true);