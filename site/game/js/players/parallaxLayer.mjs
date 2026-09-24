import {vec2, rect2, Texture, transform2} from "../utils/dataTypes.mjs";
import { Entity } from "./entity.mjs";
import { correctDrawTransform, drawRect , drawTexture, loadTexture } from "../utils/helper.mjs";
import { assetLoader } from "../core/game.assetLoader.mjs";
import { TextureWebGL } from "../utils/dataTypes/texture.mjs";
export class ParallaxLayer extends Entity {
    constructor(scope, x, y) {
        super(scope, x, y);

        this.parallaxScale = {
            scale: new vec2(1, 0),
            offset: new vec2(0, 0),
            repeat: new vec2(4, 4),
        };

        this.texture = null;
        this.z_index = -500;
        this.transform.scale.x = 4;
        this.transform.scale.y = 4;
        this.virtualTransform = new transform2();
    }

    async loadAssets() {
        this.texture = this.scope.configurations.renderer=="canvas"?await assetLoader.loadImage(
            "StarBackgroundTexture",
            "textures/starsBackground.png"
        ): new TextureWebGL("StarBackgroundTexture","textures/starsBackground.png") ;
    }

    update() {
        this.virtualTransform.position.x =
            this.scope.state.cameraScroll.x * this.parallaxScale.scale.x +
            this.parallaxScale.offset.x +
            this.transform.position.x;

        this.virtualTransform.position.y =
            this.scope.state.cameraScroll.y * this.parallaxScale.scale.y +
            this.parallaxScale.offset.y +
            this.transform.position.y;
    }

    
    get _stepX() { return this.texture.width;  }
    get _stepY() { return this.texture.height; }

    render() {
        if (!this.texture) return;
        const rx = this.parallaxScale.repeat.x;
        const ry = this.parallaxScale.repeat.y;

        if (rx > 0 && ry > 0)      this.#renderXY();
        else if (rx > 0)           this.#renderX();
        else if (ry > 0)           this.#renderY();
        else                       this.#renderSingle();
    }

    #offsets() {
        const px = this._stepX;
        const py = this._stepY;
        const x = this.virtualTransform.position.x;
        const y = this.virtualTransform.position.y;
        return {
            ox: ((x % px) + px) % px,
            oy: ((y % py) + py) % py,
        };
    }

    #draw(x, y) {
        if (this.scope.configurations.renderer == "canvas"){
            const t = correctDrawTransform(this, "virtualTransform");
            t.position.x = x*this.transform.scale.x;
            t.position.y = y*this.transform.scale.x;
            t.scale.x = this.transform.scale.x
            t.scale.y = this.transform.scale.y
            drawTexture(this.scope.context, this.texture, t);
        } 
        else{

        }
        
    }

    #renderSingle() {
        this.#draw(
            this.virtualTransform.position.x,
            this.virtualTransform.position.y
        );
    }

    #renderX() {
        const { ox } = this.#offsets();
        const step = this._stepX;
        const y = this.virtualTransform.position.y;

        const copies = this.parallaxScale.repeat.x ||
            Math.ceil(this.scope.viewport.width / step) + 1;

        for (let i = 0; i < copies; i++) {
            this.#draw(-ox + i * step, y);
        }
    }

    #renderY() {
        const { oy } = this.#offsets();
        const step = this._stepY;
        const x = this.virtualTransform.position.x;

        const copies = this.parallaxScale.repeat.y ||
            Math.ceil(this.scope.viewport.height / step) + 1;

        for (let i = 0; i < copies; i++) {
            this.#draw(x, -oy + i * step);
        }
    }

    #renderXY() {
        const { ox, oy } = this.#offsets();
        const stpx = this._stepX;
        const stpy = this._stepY;

        const cx = this.parallaxScale.repeat.x ||
            Math.ceil(this.scope.viewport.width  / stpx) + 1;
        const cy = this.parallaxScale.repeat.y ||
            Math.ceil(this.scope.viewport.height / stpy) + 1;

        for (let j = 0; j < cy; j++) {
            for (let i = 0; i < cx; i++) {
                this.#draw(-ox + i * stpx, -oy + j * stpy);
            }
        }
    }
}

