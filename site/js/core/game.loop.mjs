


export function gameLoop(scope) {
			var loop = this;

			var fps = scope.constants.targetFps,
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

			loop.fps = 0;	

			loop.main = function mainLoop(tframe) {
				loop.stopLoop = window.requestAnimationFrame( loop.main );
				
				var now = tframe,
					elapsed = now - before,
					activeCycle, targetResetInterval;

				if (elapsed > fpsInterval) {
					//console.log("Frame change");
					before = now - (elapsed % fpsInterval);
					scope.update(now);
					scope.render();
					//scope.events.eventSystem();
				}

				before = now - (elapsed % fpsInterval);


				for (var calc in cycles) {
					++cycles[calc].frameCount;
					cycles[calc].sinceStart = now - cycles[calc].startTime;
				}


				activeCycle = cycles[resetState];
				loop.fps = Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100) / 100;


				targetResetInterval = (cycles.new.frameCount === cycles.old.frameCount
					? resetInterval * fps: (resetInterval * 2) * fps);


				if (activeCycle.frameCount > targetResetInterval) {
					cycles[resetState].frameCount = 0;
					cycles[resetState].startTime = now;
					cycles[resetState].sinceStart = 0;

					resetState = (resetState === 'new' ? 'old': 'new');
				}
			};



			loop.main(0);

			return loop;
}