
var $container = document.getElementById('container');


const gameUtils = function (){
    this.canvas= function(){
        this.getPixelRatio = function(context) {
            console.log("Determining pixel ratio.");
            
            var backingStores=[
                'webkitBackingStorePixelRatio',
                'mozBackingStorePixelRatio',
                'msBackingStorePixelRatio',
                'oBackingStorePixelRatio',
                'backingStorePixelRatio'
            ];
            var deviceRatio = window.devicePixelRatio;

    
            var backingRatio = backingStores.reduce(function(prev, curr) {
                return (context.hasOwnProperty(curr) ? context[curr] : 1);
            });

            return deviceRatio / backingRatio;
        },
        this.generateCanvas = function(w, h) {
            console.log('Generating canvas.');

            var canvas = document.createElement('canvas'),
                context = canvas.getContext('2d');
            
            var ratio = this.getPixelRatio(context);

            
            canvas.width = Math.round(w * ratio);
            canvas.height = Math.round(h * ratio);
            canvas.style.width = w +'px';
            canvas.style.height = h +'px';
            context.setTransform(ratio, 0, 0, ratio, 0, 0);

            return canvas;
        }
        return this;
    };
    this.datatypes= function(){
    	this.vec2=function(x,y){
    		var vec2=this;
    		vec2.x=x;
    		vec2.y=y;
    		vec2.normalized=function normalized(){
    			
    		}
    		return vec2;
    	};
    	this.rect2=function(x,y,w,h){
    		var rect2=this;
    		rect2.origin=new gameUtils.datatypes.vec2();
    		rect2.size=new gameUtils.datatypes.vec2
    		rect2.intersects_point=function intersects_point(point){
    			return ((point.x <= rect2.origin.x+rect2.size.x &&
    					point.x >= rect2.origin.x) &&
    					(point.y <= rect2.origin.y+rect2.size.y &&
    					point.y >= rect2.origin.y)
    					);
    		};
    		rect2.intersects_rect=function intersects_rect(rect){
    			let result= false;
    			result=gameUtils.helper.isInRange(rect.origin.x,rect2.origin.x,rect2.origin.x+rect2.size.x);
    			result=result || gameUtils.helper.isInRange(rect.origin.x+rect.size.x,rect2.origin.x,rect2.origin.x+rect2.size.x);
    			
    			result=result || gameUtils.helper.isInRange(rect.origin.y,rect2.origin.y,rect2.origin.y+rect2.size.y);
    			result=result || gameUtils.helper.isInRange(rect.origin.y+rect.size.y,rect2.origin.y,rect2.origin.y+rect2.size.y);
    			
    			
    			
    			return result
    		}
    		
    		return rect2;
    	};
    	this.transform2=function (x,y,w,h){
    		var transform2=this;
    		
    		
    		return transform2;
    	};
      this.Sprite=class Sprite{
    		constructor(w,h){

			  }
			
    	};
		  this.Animation= class Animation{
        constructor(w,h){
          this.frames=[];
          
        }

        getNextFrame(){

        }
		  };
      return this;
    };
    this.ui= function(){
		  this.UIRoot=function(){
		  };
		  this.UINode=class {
			  constructor(parent){
				  this.parent=parent;
			  }
			  render(){

			  }
      };
		  this.UIPanel=class{
		  };
    	this.UILabel=class {
		  };
      return this;
    };
    this.helper=function(){
    	this.isInRange=function isInRange(v,min,max){
    		return v>=min && v<=max;
    	};
      return this;		
    };
    this.collision=function(){
    	this.collisionSystem=function(){
    		var collision_groups={
    			
    		};
    		
    		this.check_collisions_for= function check_collisions_for(){
    			
    		};
    		return this
    	};
    	this.CollisionAbstract = class {
    		constructor(position){
    			this.position=position
    		}
    		
    		intersects_with(collision){
    			
    			
    			return false
    		}
    	};
    	this.RectCollision=class extends gameUtils.collision.CollisionAbstract{
    		constructor(position,extents){
    			super(position);
    			this.extents=extents
    			this.rect=new gameUtils.datatypes.rect2(
    				this.position.x,
    				this.position.y,
    				this.extents.x,
    				this.extents.y
    				);
    			
    		}
    		
    		intersects_with(collision){
    			let result=false
    			if (collision instanceof gameUtils.collision.RectCollision){
    				
    			}
    			else if (collision instanceof gameUtils.collision.CircleCollision ){
    				
    			}
    			else{
    				
    			}
    			return result;
    		}
    	};
    	this.CircleCollision=class extends gameUtils.collision.CollisionAbstract{
    		constructor(radius){
    			super(position);
    			this.radius=radius;
    		}
    		intersects_with(collision){
    			let result=false;
    			if (collision instanceof gameUtils.collision.RectCollision){
    				
    			}
    			else if (collision instanceof gameUtils.collision.CircleCollision ){
    				
    			}
    			else{
    				
    			}
    			return result;
    		}
    	};
      return this;
    };
	  this.events=function(){
		this.eventSystem = function eventSystem(){
			var eventSystem=this
			
			return this;
		};
    return this;
	  };
	return this;
}();

const gamePlayers=function(){
	this.Entity=class {
		constructor(scope,x,y){
			this.scope=scope;
			this.position=new gameUtils.datatypes.vec2();
			this.z_index=0;
			this.texture=null;
		}
		update(){
			return;
		}
		render(){
			return;
		}
	};
	this.ParallaxLayer=class extends CustomElementRegistry{
		constructor(scope,x,y){
			super(scope,x,y)
			this.parallaxScale={
					scale:gameUtils.datatypes.vec2(0,0),
					offset:gameUtils.datatypes.vec2(0,0),
					repeat:gameUtils.datatypes.vec2(0,0),
				}	
			
		}
		
		update(){
			
		}
		
		render(){
			
		}
	};
	this.Projectile=class extends gamePlayers.Entity(){
		constructor(scope,x,y){
			super(scope,x,y);
			this.velocity=new gameUtils.datatypes.vec2();
			this.owner=null;
			this.damage=0;
			
		}
	};
	this.Character=class extends gamePlayers.Entity(){
		constructor(scope,x,y){
			super(scope,x,y);
			this.velocity=new gameUtils.datatypes.vec2();
			
			this.collision=null;
			
			this.statHealthMax=0;
			this.statHealth=0;
		}
	};
	this.PlayerCharacter=class extends gamePlayers.Character{
		constructor(scope,x,y){
			super(scope,x,y);
			this.powerup=0;
			this.powerupTime=0;
		}
		
		update(){
			
		}
		
		render(){
			
		}
		
		
	};
	this.EnemyCharacter=class extends gamePlayers.Character{
		constructor(scope,x,y){
			super(scope,x,y);
		}
	};
	this.NormalEnemyCharacter=class extends gamePlayers.EnemyCharacter{
		constructor(scope,x,y){
			super(scope,x,y)
		}
	};
	this.WobblerEnemyCharacter=class extends gamePlayers.EnemyCharacter{
		constructor(scope,x,y){
			super(scope,x,y)
		}
	};
	this.TankEnemyCharacter=class extends gamePlayers.EnemyCharacter{
		constructor(scope,x,y){
			super(scope,x,y)
		}
	};
	return this;
}();



const game={
    update:{
        gameUpdate:function gameUpdate(scope){
            return function update(tFrame){
            let state=scope.state || {};

            if (state.hasOwnProperty('entities')) {
                let entities = state.entities;
                for (let entity in entities) {

                    entities[entity].update();
                }
            }

            return state;
        };}
    },
    render:{
        gameRender:function gameRender(scope){
            let w = scope.constants.width,
                h = scope.constants.height;
            
            return function render(){
            scope.context.clearRect(0, 0, w, h);

            
            scope.context.font = '32px Arial';
            scope.context.fillStyle = '#fff';
            scope.context.fillText('It\'s dangerous to travel this route alone.', 5, 50);

            
            if (scope.constants.showFps) {
                scope.context.fillStyle = '#ff0';
                scope.context.fillText(scope.loop.fps, w - 100, 50);
            }

            
            if (scope.state.hasOwnProperty('entities')) {
                let entities = scope.state.entities;
                let entitiesDrawQueue=entities.duplicate();
                
                
                for (let entity in entitiesDrawQueue) {
                    if (!(entitiesDrawQueue[entity] instanceof gamePlayers.Entity)) continue;
                    entitiesDrawQueue[entity].render();
                }
            }    
            }
        }
    },
	events:{
		gameEvents:function gameEvents(scope){
			
		}
	},
    loop:{
        gameLoop:function gameLoop(scope){
                let loop = this;

                let fps = scope.constants.targetFps, 
                fpsInterval = 1000 / fps, 
                before = window.performance.now(), 

                
                cycles = {
                    new: {
                    frameCount: 0, 
                    startTime: before, 
                    sinceStart: 0 
                },
                    old: {
                    frameCount: 0,
                    startTime: before,
                    sineStart: 0
                }
                },
                resetInterval = 5,
                resetState = 'new';

                loop.fps = 0

                loop.main = function mainLoop( tframe ) {
                    loop.stopLoop = window.requestAnimationFrame( loop.main );
                    var now = tframe,
                        elapsed = now - before,
                        activeCycle, targetResetInterval;
                        
                    if (elapsed > fpsInterval) {
                        before = now - (elapsed % fpsInterval);
                        scope.update( now );
                        scope.render();
						scope.events();
                    }

                    before = now - (elapsed % fpsInterval);

               
                    for (var calc in cycles) {
                        ++cycles[calc].frameCount;
                        cycles[calc].sinceStart = now - cycles[calc].startTime;
                    }

            
                    activeCycle = cycles[resetState];
                    loop.fps = Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100) / 100;

                    
                    targetResetInterval = (cycles.new.frameCount === cycles.old.frameCount
                                        ? resetInterval * fps 
                                        : (resetInterval * 2) * fps); 

                    
                    if (activeCycle.frameCount > targetResetInterval) {
                        cycles[resetState].frameCount = 0;
                        cycles[resetState].startTime = now;
                        cycles[resetState].sinceStart = 0;

                        resetState = (resetState === 'new' ? 'old' : 'new');
                    }
                };

                

                loop.main();

                return loop;
        }
    },
}









function Game(w,h,targetFps,showFps){
    this.constants={
        width: w,
        height: h,
        targetFps: targetFps,
        showFps: showFps
    }

    this.state={};

    this.viewport = gameUtils.canvas.generateCanvas(w, h);
    this.viewport.id = "gameViewport";

    this.context = this.viewport.getContext('2d');

    $container.insertBefore(this.viewport, $container.firstChild);

    
    this.context.font = '32px Arial';
    this.context.fillStyle = '#fff';
    this.context.fillText('man, i need a sandwich', 5, 50);

    this.update=game.update.gameUpdate(this);
    this.render=game.render.gameRender(this);
    this.events=game.events.gameEvents(this);
	this.loop=game.loop.gameLoop(this);
	
    game.loop.gameLoop(this)
    return this;
}


window.game= new Game(800,600,60,true);

