



export class gameEvents{
    constructor(scope){
        this.scope=scope;
        this.scope.globalEvents={
            'playerDied':[],

            'waveStarted':[],
            'waveEnded':[],

            'enemyKilled':[],

            'stageChanged':[],
            'stageStart':[],
            'stageClear':[],

            'gameFinishedLoadingCore':[],
            'startGame':[],
            'endGame':[],
            'restartGame':[],

            'paused':[],
            'unpaused':[],
        }

    }

    emitEvent(eventname,params){
        this.scope.globalEvents[eventname].forEach(eventCallback => {
            eventCallback(params || {});
        });
    }

    addEvent(eventname){
        this.scope.globalEvents[eventname]=this.scope.globalEvents[eventname] || []
    }
    connectToEvent(eventname,/**@type{Function} */eventCallback,/**@type{Object} */eventCallbackReceiver){
        /**@type{Array} */
        var event=this.scope.globalEvents[eventname] || (this.globalEvents[eventname]) || (window.game);
        event.push(eventCallback.bind(eventCallbackReceiver))
    }
    
}