import { assetLoader } from "../../core/game.assetLoader.mjs";


export var loadedAudios={

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

    

    audiobuffer.loop = options.loop;
    audiobuffer.loopEnd = options.loopEnd;

}