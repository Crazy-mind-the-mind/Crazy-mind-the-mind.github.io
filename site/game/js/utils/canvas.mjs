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

export function generateCanvas(w, h) {
			console.log('Generating canvas.');

			var canvas = document.createElement('canvas'),
			context = canvas.getContext('2d');

			var ratio = getPixelRatio(context);


			canvas.width = Math.round(w * ratio);
			canvas.height = Math.round(h * ratio);
			canvas.style.width = w +'px';
			canvas.style.height = h +'px';
			context.setTransform(ratio, 0, 0, ratio, 0, 0);

			return canvas;
}

export function generateDrawOrderList(objects){

	var result = insertion_sort(Object.keys(objects), 
		function(a,b){
			//console.log(a,objects[a].z_index)
			//console.log(b,objects[b].z_index)
			return objects[a].z_index > objects[b].z_index;

		});



	return result;
			
}