
class AssetLoader {
    constructor() {
        this.images = {};      
        this.loadingImages = {};   

        this.audios = {};
        this.loadingAudios={};
    }

    async loadImage(name, path) {
        
        if (this.images[name]) return this.images[name];

      
        if (this.loadingImages[name]) return this.loadingImages[name];

        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.images[name] = img;
                delete this.loadingImages[name];
                resolve(img);
            };
            img.onerror = () => {
                delete this.loadingImages[name];
                reject(new Error(`Failed: ${path}`));
            };
            img.src = path;
        });

        this.loadingImages[name] = promise;
        return promise;
    }

    async loadAudio(audioName,audioPath){
        if (this.audios[audioName]) return this.audios;
        if (this.loadingAudios[audioName]) return this.loadingAudios;

        const promise = new Promise(async (resolve,reject) =>{
            fetch(audioPath)
            .then((response)=>{
                return response.arrayBuffer();
            })
            .then(async (arrayBuffer)=>{
                /** @type{AudioContext} */
                var audCtx=window.game.audio;
                return await audCtx.decodeAudioData(arrayBuffer);
                
            }).then((audioBuffer)=>{
                this.audios[audioName]= audioBuffer
                delete this.loadingAudios[audioName];
                resolve(this.audios[audioName]);
            })
            .catch(
                (e)=>{
                    delete this.loadingAudios[audioName];
                    return new Error(`Failed: ${audioPath}`);
                }
            );
            
        })
        
        this.loadingAudios[audioName] = promise;
        return promise;
    }
    
    async loadStageData(stageName,stagePath){
    	
    	const promise = new Promise(async (resolve,reject) =>{
            fetch(stagePath)
            .then((response)=>{
                return response.json();
            })
            .then(async (stageData)=>{
                await Promise.all(
                	stageData.textures.map(imageData=>this.loadImage(imageData.name,imageData.path)),
                	stageData.audios.map(audioData=>this.loadImage(audioData.name,audioData.path))
                	)
                stage.waveSettings
                stage.spelcards
            })
            .catch(
                (e)=>{
                    delete this.loadingAudios[audioName];
                    return new Error(`Failed: ${audioPath}`);
                }
            );
            
        })
    	
    }

    async loadAll(preloadPreset){
        console.log(preloadPreset)
        await Promise.all(
            preloadPreset.preloadTextures.map((imageData)=>{console.log(imageData.name);this.loadImage(imageData.name,imageData.path)}),
            preloadPreset.preloadAudio.map((audioData)=>{console.log(audioData.name);this.loadAudio(audioData.name,audioData.path)}),
            
        )
    }
    getImage(name) {
        return this.images[name];
    }
    getAudio(name) {
        return this.audios[name];
    }
    
}
export const assetLoader = new AssetLoader()

