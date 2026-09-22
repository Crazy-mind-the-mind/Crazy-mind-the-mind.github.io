import { insertion_sort } from "./helper.mjs";



export function getPixelRatio(context) {
			console.log("Determining pixel ratio.");

			var backingStores = [
				'webkitBackingStorePixelRatio',
				'mozBackingStorePixelRatio',
				'msBackingStorePixelRatio',
				'oBackingStorePixelRatio',
				'backingStorePixelRatio'
			];
			var deviceRatio = window.devicePixelRatio;


			var backingRatio = backingStores.reduce(function(prev, curr) {
				return (context.hasOwnProperty(curr) ? context[curr]: 1);
			});

			return deviceRatio / backingRatio;
}

export function generateCanvasWebGL(w, h) {
			console.log('Generating canvas.');

			var canvas = document.createElement('canvas'),
			context = canvas.getContext('webgl');

			if (!context)
				throw new Error('WebGL is not supported');
			
			
			
			return canvas;
}

function Vec2ToArray(vector){
	return [vector.x, vector.y, 0]
}

export function genImg(ctx){
	const vertexData=[
		.0,  1, 0,
		 1, -1, 0,
		-1, -1, 0
	];
	
	const buffer = ctx.createBuffer();
	ctx.bindBuffer(gl.ARRAY_BUFFER, buffer);
	ctx.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), ctx.STATIC_DRAW);
	
	const vertexShader=ctx.createShader(ctx.VERTEX_SHADER);
	ctx.shaderSource(vertexShader,`
	 attribute vec3 position;
	 void main(){
	 	gl_Position = vec4(position, 1);
	 }
	`);
	ctx.compileShader(vertexShader);
	
	const fragmentShader=ctx.createShader(ctx.FRAGMENT_SHADER);
	ctx.shaderSource(fragmentShader,`
	 void main(){
	 	gl_FragColor = vec4(1,0,0,1);
	 }
	`);
	ctx.compileShader(fragmentShader);
	
	const program = ctx.createProgram();
	ctx.attachShader(program, vertexShader);
	ctx.attachShader(program, fragmentShader);
	ctx.linkProgram(program);
	
	const positionLocation=ctx.getAttribLocation(program, `position`);
	ctx.enableVertexAttribArray(positionLocation);
	ctx.vertexAttribPointer(positionLocation,3, ctx.FLOAT, false, 0, 0;
	
	ctx.useProgram(program);
	ctx.drawArrays(ctx.TRIANGLES, 0, 3);
}


export function generateDrawOrderList(objects){

	var result = insertion_sort(Object.keys(objects), 
		function(a,b){
			return objects[a].z_index > objects[b].z_index;
		});



	return result;
			
}