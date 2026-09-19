import { assetLoader } from "../../core/game.assetLoader.mjs";
import { Texture, transform2 } from "../dataTypes.mjs";

let customFontBitmaps = null;
let fontLoadingState = null;

/**
 * Loads fonts for rendering
 */
export async function loadFont() {
    if (customFontBitmaps) return customFontBitmaps;
    if (fontLoadingState) return fontLoadingState;

    fontLoadingState = (async () => {
        const image = await assetLoader.load("GameFont", "textures/font.png");

        
        const textureMap = {
            A:[0,0], B:[1,0], C:[2,0], D:[3,0], E:[4,0], F:[5,0],
            G:[6,0], H:[7,0], I:[8,0], J:[9,0], K:[10,0], L:[11,0],
            M:[12,0], N:[13,0], O:[14,0], P:[15,0],
            Q:[0,1], R:[1,1], S:[2,1], T:[3,1], U:[4,1], V:[5,1],
            W:[6,1], X:[7,1], Y:[8,1], Z:[9,1],
            "0":[0,2], "1":[1,2], "2":[2,2], "3":[3,2], "4":[4,2],
            "5":[5,2], "6":[6,2], "7":[7,2], "8":[8,2], "9":[9,2],
            ":":[0,3], "-":[2,3], ".":[1,3], "+":[0,4],
        };

        const dict = {};
        await Promise.all(Object.entries(textureMap).map(async ([ch, [col, row]]) => {
            dict[ch] = await createImageBitmap(image, col*8, row*8, 8, 8);
        }));

        customFontBitmaps = dict;
        return dict;
    })();

    return fontLoadingState;
}

/**
 * Draws texts. loadFont() needs to be called first
 */
export function drawText(ctx, position, text, settings = {}) {
    if (!customFontBitmaps) {
        console.warn("drawText: font not loaded. Call loadFont() before.");
        return;
    }

    const textSize = settings.size || 8;
    const spacing = settings.spacing ?? textSize;
    
	text = String(text).toUpperCase();

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === ' ') continue;

        const bitmap = customFontBitmaps[ch];
        if (!bitmap) continue;

        ctx.drawImage(
            bitmap,
            position.x + i * spacing,
            position.y,
            textSize,
            textSize
        );
    }
}

export function drawRect(ctx,rect,color){
	ctx.fillStyle=color;
	ctx.fillRect(
		rect.origin.x || 1,
		rect.origin.y || 1,
		rect.size.x || 1,
		rect.size.y || 1
	);
}


export function drawTexture(ctx,texture,transform){
	if (texture instanceof Texture){
		
		ctx.drawImage(
			texture.image,
			transform.position.x,
			transform.position.y,
			texture.image.width*transform.scale.x,
			texture.image.height*transform.scale.y
		)

		ctx.globalCompositeOperation="source-atop";
		ctx.fillStyle=texture.imageModulate;
		ctx.fillRect(
			transform.position.x,
			transform.position.y,
			texture.width*transform.scale.x,
			texture.height*transform.scale.y
		)

		ctx.globalCompositeOperation="source-over";

	}
	else{
		ctx.drawImage(
			texture,
			transform.position.x,
			transform.position.y,
			texture.width*transform.scale.x,
			texture.height*transform.scale.y
		)
	}

}



export function drawLightTexture(ctx,texture,transform){
	if (texture instanceof Texture){
		ctx.drawImage(
			texture.image,
			transform.position.x,
			transform.position.y,
			texture.image.width*transform.scale.x,
			texture.image.height*transform.scale.y
		)

		ctx.globalCompositeOperation="source-atop";
		ctx.fillStyle=texture.imageModulate;
		ctx.fillRect(
			transform.position.x,
			transform.position.y,
			texture.width*transform.scale.x,
			texture.height*transform.scale.y
		)

		ctx.globalCompositeOperation="source-over";

	}
	else{
		ctx.globalCompositeOperation = "lighter"

		ctx.drawImage(
			texture,
			transform.position.x,
			transform.position.y,
			texture.width*transform.scale.x,
			texture.height*transform.scale.y
		)
		ctx.globalCompositeOperation="source-over";

	}

}

export function loadTexture(path){
	const image = new Image();
	image.src=path;
	image.onload = ()=>{
		return image;
	}
	
	
}


export function correctDrawTransform(entity,transformName,textureName){
	transformName = transformName || "transform"
	textureName = textureName || "texture"
	if (entity[textureName] != null){
		if (entity.texture instanceof Texture){
				return new transform2(
				entity[transformName].position.x - (entity[textureName].image.width || 1)/2,
				entity[transformName].position.y - (entity[textureName].image.height || 1)/2,
				entity[transformName].scale.x,
				entity[transformName].scale.y,
				entity[transformName].rotation,
			)
		}
		else{
			return new transform2(
				entity[transformName].position.x - (entity[textureName].width || 1)/2,
				entity[transformName].position.y - (entity[textureName].height || 1)/2,
				entity[transformName].scale.x,
				entity[transformName].scale.y,
				entity[transformName].rotation,
			)
		}
	}
	else return entity[transformName]
}




