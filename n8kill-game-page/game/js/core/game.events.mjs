



export class gameEvents{
    constructor(scope){
        this.scope=scope;
        this.scope.globalEvents={
            playerDied:[],
            waveStarted:[],
            waveEnded:[],
            enemyKilled:[],
        }

    }

    emitEvent(eventname){
        this.scope.globalEvents[eventname].forEach(eventCallback => {
            eventCallback();
        });
    }

    addEvent(eventname){
        this.scope.globalEvents[eventname]=[]
    }
    connectToEvent(eventname,/**@type{Function} */eventCallback,/**@type{Object} */eventCallbackReceiver){
        /**@type{Array} */
        var event=this.scope.globalEvents[eventname];
        event.push(eventCallback.bind(eventCallbackReceiver))
    }
    
}