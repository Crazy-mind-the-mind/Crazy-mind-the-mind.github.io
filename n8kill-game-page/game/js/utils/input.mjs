
import {vec2} from './dataTypes.mjs'

export var InputActionKeys={
    "left":{
        code:"ArrowLeft"
    },
    "right":{
        code:"ArrowRight"
    },
    "up":{
        code:"ArrowUp"
    },
    "down":{
        code:"ArrowDown"
    },
    "shoot":{
        code:"KeyZ"
    },
    "shoot2":{
        code:"KeyX"
    },
    "useSpellcard":{
        code:"KeyC"
    },
    "changeSpellcard":{
        code:"KeyV"
    },
    "volumeUp":{
        code:"Equal"
    },
    "volumeDown":{
        code:"Minus"

    },
    "pause":{
        code:"KeyP"
    },
    "retry":{
        code:"Enter"
    }
}

export var InputActionMouse={}

export var isPressedLastFrame = {}
export var isPressed = {}

export var isJustPressed = {}

export var isJustReleased = {}



export var mousePressed = false
export var mousePosition = new vec2(0,0)



export function keysDown() {

   

    

    var actions = {}
    Object.keys(InputActionKeys).forEach(action => {
        actions[action]=false
    });

    document.onclick = function (ev){

    }
    
    document.onkeydown = function (ev) {
        Object.keys(InputActionKeys).forEach( action =>{

            if (InputActionKeys[action].code){
                if (ev.code == InputActionKeys[action].code){
                    actions[action]=true;
                }
            }
            
        })
    };
    document.onkeyup = function (ev) {
        Object.keys(InputActionKeys).forEach( action =>{

            if (InputActionKeys[action].code){
                if (ev.code == InputActionKeys[action].code){
                    actions[action]=false;
                }
            }

        })
    };
    
    Object.keys(InputActionKeys).forEach(action => {
        Object.defineProperty(isPressed, action, {
            get: function() { return actions[action]; },
            configurable: true,
            enumerable: true
        });

        // Object.defineProperty(isJustPressed, action, {
        //     get: function() { 
        //         return actions[action] && !isPressedLastFrame[action]

        //     },
        //     configurable: true,
        //     enumerable: true
        // });

        //  Object.defineProperty(isJustReleased, action, {
        //     get: function() {
        //         return (!actions[action] && isPressedLastFrame[action])
        //         },
        //     configurable: true,
        //     enumerable: true
        // });
    });

    Object.keys(isPressed).forEach( action =>{
        isPressedLastFrame[action]=isPressed[action]
    })


    return this;
}



export function mouseDown(scope){
	

	scope.viewport.onmousedown=function(ev){
		mousePressed=true
	}
	
	scope.viewport.onmouseup=function(ev){
		mousePressed=false
	}

    scope.viewport.onmousemove=function(ev){
        mousePosition.x = ev.offsetX
        mousePosition.y = ev.offsetY
    }

	
	
	
	return this;
}