import { assetLoader } from "../../core/game.assetLoader.mjs";


export var loadedAudios={

}

var audioVolume = 0;
export function changeAudioVolume(v){
    audioVolume = Math.min(audioVolume+v,10)
    audioVolume = Math.max(audioVolume,-10)
}

export function playAudio(/**@type{AudioContext} */ctx,audioName,options){
    options = options || {};
    
    var source=ctx.createBufferSource();
    source.buffer=assetLoader.getAudio(audioName)
    apllyAudioEffects(ctx,source.buffer,options);
    source.connect(ctx.destination);
    source.start()
    
}

export function playMultiAudio(/**@type{AudioContext} */ctx,audioname){
    var source=ctx.createBufferSource()
    source.
    source.buffer=assetLoader.getAudio(audioName)
    apllyAudioEffects(ctx,source.buffer)
    source.connect(ctx.destination);
    source.start()
}
export function playAudioLoop(ctx,audioname){

}

export function apllyAudioEffects(/**@type{AudioContext} */ctx, /**@type{AudioBufferSourceNode} */ audiobuffer,options){
    options = options || {};

    var gainNode=ctx.createGain()
    gainNode.connect(ctx.destination)
    gainNode.gain.setValueAtTime(-10+audioVolume, ctx.currentTime);

    audiobuffer.loop = options.loop;
    audiobuffer.loopEnd = options.loopEnd;

}



