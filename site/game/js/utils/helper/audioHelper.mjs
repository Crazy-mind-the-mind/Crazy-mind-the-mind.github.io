import { assetLoader } from "../../core/game.assetLoader.mjs";
import { EnemyCharacterWaver } from "../../players/enemyCharacterWaver.mjs";


export var loadedAudios={

}

var audioVolume = 1.0;

var globalAudioGain;

export function changeAudioVolume(v){
    audioVolume = Math.min(audioVolume+v,10)
    audioVolume = Math.max(audioVolume,-10)
}

export function playAudio(/**@type{AudioContext} */ctx,audioName,options){
    options = options || {};
    
    var source=ctx.createBufferSource();
    source.buffer=assetLoader.getAudio(audioName) || assetLoader.loadAudio(audioName,"audio/"+options.audioPath|| "hit.wav") ;
    
    applyAudioEffects(ctx,source.buffer,options);
    source.connect(ctx.destination);
    source.start()
    
    
}

export function playMultiAudio(/**@type{AudioContext} */ctx,audioname){
    var source=ctx.createBufferSource()
    source.
    source.buffer=assetLoader.getAudio(audioName)
    applyAudioEffects(ctx,source.buffer)
    source.connect(ctx.destination);
    source.start()
}
export function playAudioLoop(ctx,audioName,options){
    options = options || {};
    
    var source=ctx.createBufferSource();
    source.buffer=assetLoader.getAudio(audioName) || assetLoader.loadAudio(audioName,"audio/"+options.audioPath|| "hit.wav") ;
    
    applyAudioEffects(ctx,source.buffer,options);
    source.connect(ctx.destination);
    source.start()
    
}

export function applyAudioEffects(/**@type{AudioContext} */ctx, /**@type{AudioBufferSourceNode} */ audiobuffer,options){
    options = options || {};
    

    var gainNode = ctx.createGain()
    gainNode.gain.value= audioVolume+(options.gain || 0.1)
    gainNode.connect(ctx.destination)
    audiobuffer.loop = options.loop || false
    audiobuffer.loopEnd = options.loopEnd*audiobuffer.length || audiobuffer.length;

}

export function initAudio(/**@type{AudioContext} */ctx){
    
}




