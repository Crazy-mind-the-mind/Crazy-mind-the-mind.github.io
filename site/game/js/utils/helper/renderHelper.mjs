import { Texture, transform2 } from "../dataTypes.mjs";


export function drawText(ctx,rect,text,settings){
	ctx.fillStyle= settings.color || "#000000";

	ctx.fillText(
		text,
		rect.position.x,
		rect.position.y,
		rect.size.x || 1024
	)
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
	
	ctx.drawImage(
		texture,
		transform.position.x,
		transform.position.y,
		texture.height*transform.scale.x,
		texture.height*transform.scale.y
	)
}

export function loadTexture(path){
	const image = new Image();
	image.src=path;
	image.onload = ()=>{
		return image;
	}
	
	
}


export function correctDrawTransform(entity){
	return new transform2(
		entity.transform.position.x - (entity.texture.width || 1)/2,
		entity.transform.position.y - (entity.texture.height || 1)/2,
		entity.transform.scale.x,
		entity.transform.scale.y,
		entity.transform.rotation,
	)
}




