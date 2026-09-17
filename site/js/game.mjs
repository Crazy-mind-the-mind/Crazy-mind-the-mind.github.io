import { gameUpdate } from "./core/game.update.mjs";
import { gameRender } from "./core/game.render.mjs";
import { gameLoop } from "./core/game.loop.mjs";

import { generateCanvas , generateDrawOrderList} from "./utils/utils.canvas.mjs";



var $container = document.getElementById('container');



const gameUtils = function () {
	var gameUtils = this;

	gameUtils.ui = function() {
		var ui = this;
		ui.UIRoot = class {
			constructor(scope) {
				this.scope = scope;
				this.childrenNodes = [];
			};
		};
		ui.UINode = class {

			constructor(scope,parent) {
				this.scope = scope;
				this.parent = parent;
				this.transform={
					translation:{
						x:{offset:0,scale:0},
						y:{offset:0,scale:0},
					},
					scale:{
						x:{offset:0,scale:0},
						y:{offset:0,scale:0},
					},
				};
			}
			render() {

			}
		};
		
		ui.UIProgressBar=class extends ui.UINode{
			constructor(parent) {
				super(parent)
				
			}
			render() {
				this.scope.context;
			}
		}

		return ui;
	}();
	gameUtils.helper = function() {
		var helper = this;
		helper.isInRange = function isInRange(v, min, max) {
			return v>=min && v<=max;
		};
		helper.render=function(){
			var render=this;
			render.drawRect= function(ctx,rect,color){
				ctx.fillStyle='blue';
				ctx.fillRect(
					rect.origin.x,
					rect.origin.y,
					rect.size.x,
					rect.size.y
				);
				

			}
			return render;
		}();

		return helper;
	}();
	gameUtils.collision = function() {
		var collision = this;
		collision.collisionSystem = function() {
			var collision_groups = {};

			this.check_collisions_for = function check_collisions_for() {};
			return this
		};
		collision.CollisionAbstract = class {
			constructor(position) {
				this.position = position
			}

			intersects_with(collision) {


				return false
			}
		};
		collision.RectCollision = class extends collision.CollisionAbstract {
			constructor(position, extents) {
				super(position);
				this.extents = extents
				this.rect = new gameUtils.datatypes.rect2(
					this.position.x,
					this.position.y,
					this.extents.x,
					this.extents.y
				);

			}

			intersects_with(collision) {
				let result = false
				if (collision instanceof gameUtils.collision.RectCollision) {} else if (collision instanceof gameUtils.collision.CircleCollision) {} else {}
				return result;
			}
		};
		collision.CircleCollision = class extends collision.CollisionAbstract {
			constructor(radius) {
				super(position);
				this.radius = radius;
			}
			intersects_with(collision) {
				let result = false;
				if (collision instanceof gameUtils.collision.RectCollision) {} else if (collision instanceof gameUtils.collision.CircleCollision) {} else {}
				return result;
			}
		};
		return collision;
	}();
	gameUtils.events = function() {
		this.eventSystem = function eventSystem() {
			var eventSystem = this

			return this;
		};
		return this;
	}();
	gameUtils.dataSaver = function() {
		var dataSaver = this;
		return dataSaver;
	}();
	return gameUtils;
}();

const gamePlayers = function() {
	var gamePlayers = this;
	

	gamePlayers.PlayerCharacter = class PlayerCharacter extends gamePlayers.Character {
		


	};
	gamePlayers.EnemyCharacter = class EnemyCharacter extends gamePlayers.Character {
		constructor(scope, x, y) {
			super(scope, x, y);
		}
	};
	gamePlayers.NormalEnemyCharacter = class NormalEnemyCharacter extends gamePlayers.EnemyCharacter {
		constructor(scope, x, y) {
			super(scope, x, y)
		}
	};
	gamePlayers.WobblerEnemyCharacter = class NormalEnemyCharacter extends gamePlayers.EnemyCharacter {
		constructor(scope, x, y) {
			super(scope, x, y)
		}
	};
	gamePlayers.TankEnemyCharacter = class NormalEnemyCharacter extends gamePlayers.EnemyCharacter {
		constructor(scope, x, y) {
			super(scope, x, y)
		}
	};
	return gamePlayers;
}();





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
	
	
	this.update = gameUpdate(this);
	this.render = gameRender(this);
	this.loop = gameLoop(this);
	this.state.entities=[];

	

	
	console.log('Engine set up');

	return this;
}


window.game = new Game(800, 600, 60, true);