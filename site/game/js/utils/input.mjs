
export var isPressed = {}

export var isJustPressed = {}
export var isJustReleased = {}


export function keysDown() {
    var left, right, up, down, shoot, shoot2;


    // Set up `onkeydown` event handler.
    document.onkeydown = function (ev) {
        if (ev.code === "ArrowRight") { right = true; }
        if (ev.code === "ArrowLeft") { left = true; }
        if (ev.code === "ArrowUp") { up = true; }
        if (ev.code === "ArrowDown") { down = true; }
        if (ev.code === "Space") {shoot = true; }
        if (ev.code === "ControlLeft") {shoot2 = true; }
    };

    // Set up `onkeyup` event handler.
    document.onkeyup = function (ev) {
        if (ev.code === "ArrowRight") { right = false; }
        if (ev.code === "ArrowLeft") { left = false; }
        if (ev.code === "ArrowUp") { up = false; }
        if (ev.code === "ArrowDown") { down = false; }
        if (ev.code === "Space") {shoot = false; }
        if (ev.code === "ControlLeft") {shoot2 = false; }

    };

    Object.defineProperty(isPressed, 'left', {
        get: function() { return left; },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(isPressed, 'right', {
        get: function() { return right; },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(isPressed, 'up', {
        get: function() { return up; },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(isPressed, 'down', {
        get: function() { return down; },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(isPressed, 'shoot', {
        get: function() { return shoot; },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(isPressed, 'shoot2', {
        get: function() { return shoot2; },
        configurable: true,
        enumerable: true
    });


    return this;
}