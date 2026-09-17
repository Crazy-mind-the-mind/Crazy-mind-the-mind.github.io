import { Texture } from "../dataTypes.mjs";



export function drawRect(ctx,rect,color){
	ctx.fillStyle=color;
	ctx.fillRect(
		rect.origin.x || 1,
		rect.origin.y || 1,
		rect.size.x || 1,
		rect.size.y || 1
	);
}


export function drawTexture(ctx,texture,position,scale){
	
	ctx.drawImage(
		texture.getTexture(),
		position.x,
		position.y,
		texture.height*scale.x,
		texture.height*scale.y
	)
}

export function loadTexture(path){
	let image;
	fetch(path)
	.then(response => response.blob())
	.then(blob =>{
		let imgSrc = URL.createObjectURL(blob);
		image = new ImageData(Uint8ClampedArray.from(imgSrc) );
	})
	.catch(error => {
		console.error("Texture fetch err", error)
	});
	return new Texture(image);
}





