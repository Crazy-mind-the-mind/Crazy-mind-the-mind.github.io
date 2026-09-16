

function gameLoop () {
    var loop = this;

    
    // Initialize timer variables so we can calculate FPS
    var fps = game.constants.targetFps, // Our target fps
        fpsInterval = 1000 / fps, // the interval between animation ticks, in ms (1000 / 60 = ~16.666667)
        before = window.performance.now(), // The starting times timestamp

        // Set up an object to contain our alternating FPS calculations
        cycles = {
            new: {
                frameCount: 0, // Frames since the start of the cycle
                startTime: before, // The starting timestamp
                sinceStart: 0 // time elapsed since the startTime
            },
            old: {
                frameCount: 0,
                startTime: before,
                sineStart: 0
            }
        },
        // Alternating Frame Rate vars
        resetInterval = 5, // Frame rate cycle reset interval (in seconds)
        resetState = 'new'; // The initial frame rate cycle

    loop.fps = 0; // A prop that will expose the current calculated FPS to other modules


    // Main game rendering loop
    loop.main = function mainLoop( tframe ) {
        // Request a new Animation Frame
        // setting to `stopLoop` so animation can be stopped via
        // `window.cancelAnimationFrame( loop.stopLoop )`
        loop.stopLoop = window.requestAnimationFrame( loop.main );

        // Update the game state
        game.state = game.update( now );
        // Render the next frame
        game.render();
    };

    // Start off main loop
    loop.main();

    return loop;
}

gameLoop()