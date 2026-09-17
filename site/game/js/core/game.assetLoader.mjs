
class AssetLoader {
    constructor() {
        this.images = {};      
        this.loading = {};   
    }

    async load(name, path) {
        
        if (this.images[name]) return this.images[name];

      
        if (this.loading[name]) return this.loading[name];

        const promessa = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.images[name] = img;
                delete this.loading[name];
                resolve(img);
            };
            img.onerror = () => {
                delete this.loading[name];
                reject(new Error(`Falha: ${path}`));
            };
            img.src = path;
        });

        this.loading[name] = promessa;
        return promessa;
    }

    get(nome) {
        return this.images[nome];
    }
}
export const assetLoader = new AssetLoader()

