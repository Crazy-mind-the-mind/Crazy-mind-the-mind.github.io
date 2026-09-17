


export function drawRect(ctx,rect,color){
	ctx.fillStyle=color;
	ctx.fillRect(
		rect.origin.x,
		rect.origin.y,
		rect.size.x,
		rect.size.y
	);
}