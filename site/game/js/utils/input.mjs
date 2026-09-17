
export var isPressed = {}

export var isJustPressed = {}
export var isJustReleased = {}


export function keysDown() {
    var left, right, up, down, shoot;


    // Set up `onkeydown` event handler.
    document.onkeydown = function (ev) {
        if (ev.key === "ArrowRight") { right = true; }
        if (ev.key === "ArrowLeft") { left = true; }
        if (ev.key === "ArrowUp") { up = true; }
        if (ev.key === "ArrowDown") { down = true; }
        if (ev.key === " ") {shoot = true; }
    };

    // Set up `onkeyup` event handler.
    document.onkeyup = function (ev) {
        if (ev.key === "ArrowRight") { right = false; }
        if (ev.key === "ArrowLeft") { left = false; }
        if (ev.key === "ArrowUp") { up = false; }
        if (ev.key === "ArrowDown") { down = false; }
        if (ev.key === " ") {shoot = false; }

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


    return this;
}