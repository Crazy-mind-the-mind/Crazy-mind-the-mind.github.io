
export var InputAction={
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
}

export var isPressedLastFrame = {}
export var isPressed = {}

export var isJustPressed = {}

export var isJustReleased = {}


export var mousePressed
export var mousePosition



export function keysDown() {

   

    

    var actions = {}
    Object.keys(InputAction).forEach(action => {
        actions[action]=false
    });

    document.onclick = function (ev){

    }
    
    document.onkeydown = function (ev) {
        Object.keys(InputAction).forEach( action =>{

            if (InputAction[action].code){
                if (ev.code == InputAction[action].code){
                    actions[action]=true;
                }
            }
            
        })
    };
    document.onkeyup = function (ev) {
        Object.keys(InputAction).forEach( action =>{

            if (InputAction[action].code){
                if (ev.code == InputAction[action].code){
                    actions[action]=false;
                }
            }

        })
    };
    
    Object.keys(InputAction).forEach(action => {
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



export function mouseDown(){
	
	document.onmousedown=function(ev){
		mousePressed=true
	}
	
	document.onmouseup=function(ev){
		mousePressed=false
	}
	
	
	
	return this;
}