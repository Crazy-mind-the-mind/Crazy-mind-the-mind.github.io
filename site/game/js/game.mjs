import { gameUpdate } from "./core/game.update.mjs";
import { gameRender } from "./core/game.render.mjs";
import { gameLoop } from "./core/game.loop.mjs";
import { gameSetup } from "./core/game.setup.mjs";
import { generateCanvas , generateDrawOrderList} from "./utils/canvas.mjs";
import { transform2, vec2 } from "./utils/dataTypes.mjs";
import { gameScore } from "./core/game.score.mjs";
import { gameWaveSystem } from "./core/game.waveSystem.mjs";
import { collisionSystemUpdate } from "./utils/collision/collisionsystem.mjs";

import { gameRenderWebGL } from "./core/game.renderWebGL.mjs";
import { generateCanvasWebGL } from "./utils/canvasWebGL.mjs";
import { gameEvents } from "./core/game.events.mjs";



var $container = document.getElementById('container');









function Game(w, h, targetFps, showFps,gameOptions) {
	gameOptions = gameOptions || {}
	this.constants = {
		width: w,
		height: h,
		targetFps: targetFps,
		showFps: showFps,
		trueWidth:640,
		trueHeight:360,
		showColliders: gameOptions.showColliders || false,
		showUIanchors: gameOptions.showColliders || false,
		forceCanvasAPI:true,
	}

	this.configurations={
		renderer : "",
	}

	this.state = {
		'gameStarted':true,
		'paused':false,
		'cameraScroll':new vec2(0,0),
		'cameraTransform': new transform2(0,0,1,1),
		'entities':[],
	};

	this.extrasFncs = {
		renderFncs:[]
	}


	if (!this.constants.forceCanvasAPI){
		this.viewport = generateCanvasWebGL(w, h) || generateCanvas(w, h);
		this.viewport.id = "game-viewport";

		this.context = this.viewport.getContext('webgl') || this.viewport.getContext('2d');
	}
	else{
		this.viewport = generateCanvas(w, h);
		this.viewport.id = "game-viewport";

		this.context = this.viewport.getContext('2d');
	}
	this.audio = new AudioContext();


	if (this.context instanceof WebGL2RenderingContext || this.context instanceof WebGLRenderingContext){
		this.configurations.renderer = "webgl";
	}
	else{
		this.configurations.renderer = "canvas";
	}
	console.log(this.context)

	$container.insertBefore(this.viewport, $container.firstChild);

	
		
	
	console.log('Starting Game');

	


	if (this.configurations.renderer == "canvas"){
		this.context.font = '8px Arial';this.context.fillStyle = '#fff';this.context.fillText('Something went wonky', 5, 50);
	}

	console.log('Starting Engine');
	console.log('Selected Renderer = ',this.configurations.renderer)
	
	this.setup = gameSetup(this);
	this.setup()
	this.eventSystem = new gameEvents(this);
	this.collisionSystem = collisionSystemUpdate(this);
	
	this.scoreSystem = gameScore(this);
	this.waveSystem = new gameWaveSystem(this);
	this.update = gameUpdate(this);
	this.render = this.configurations.renderer == "webgl" ? gameRenderWebGL(this) : gameRender(this);
	this.loop = new gameLoop(this);

	

	
	console.log('Engine set up');

	return this;
}


window.game = new Game(640 , 360 , 60, true);