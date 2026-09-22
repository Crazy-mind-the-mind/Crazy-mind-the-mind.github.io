



class gameLoop{
	constructor(scope){
		this.scope=scope
		this.fps = scope.constants.targetFps;
		this.fpsInterval = 1000 / this.fps;
		this.before = window.performance.now();


		this.cycles = {
			new: {
				frameCount: 0,
				startTime: this.before,
				sinceStart: 0
			},
			old: {
				frameCount: 0,
				startTime: this.before,
				sineStart: 0
			}
		};
		this.resetInterval = 5;
		this.resetState = 'new';

		this.fps = 0;

		this.stopLoop;
		this.mainLoop=this.mainLoop.bind(this)
		this.mainLoop(0);

	}
	
	mainLoop(tframe) {
		this.stopLoop = window.requestAnimationFrame( this.mainLoop );
		
		var now = tframe,
			elapsed = now - this.before,
			activeCycle, targetResetInterval;

		if (elapsed > this.fpsInterval) {
			//console.log("Frame change");
			this.before = now - (elapsed % this.fpsInterval);
			this.scope.update(now);
			this.scope.render();
			
			//scope.events.eventSystem();
		}

		this.before = now - (elapsed % this.fpsInterval);


		for (var calc in this.cycles) {
			++this.cycles[calc].frameCount;
			this.cycles[calc].sinceStart = now - this.cycles[calc].startTime;
		}


		activeCycle = this.cycles[this.resetState];
		this.fps = Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100) / 100;


		targetResetInterval = (this.cycles.new.frameCount === this.cycles.old.frameCount
			? this.resetInterval * this.fps: (this.resetInterval * 2) * this.fps);


		if (activeCycle.frameCount > targetResetInterval) {
			this.cycles[this.resetState].frameCount = 0;
			this.cycles[this.resetState].startTime = now;
			this.cycles[this.resetState].sinceStart = 0;

			this.resetState = (this.resetState === 'new' ? 'old': 'new');
		}
	}
}



export {gameLoop};
