import { assetLoader } from "../../core/game.assetLoader.mjs";
import { Texture, transform2, vec2 } from "../dataTypes.mjs";

const defaultVertexShader=
`
precision mediump float;
attribute vec2 worldPosition;
attribute vec2 vertexPosition;

uniform vec2 canvasResolution;
varying vec2 texturePosition;

void main() {
    vec2 zeroToOne = worldPosition / canvasResolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    texturePosition = vertexPosition;
}
`;

const defaultFragmentShader=
`
precision mediump float;
uniform sampler2D image;
varying vec2 texturePosition;

void main() {
    gl_FragColor = texture2D(image, texturePosition);
}
`;


const QuadVerticesData=new Float32Array([
	//x			y		u		v
      -0.500, -0.500, +0.000, +0.000,
      +0.500, -0.500, +1.000, +0.000,
      +0.500, +0.500, +1.000, +1.000,
      -0.500, +0.500, +0.000, +1.000,
])
const QuadIndicesData=new Uint16Array([
	0, 1, 2,
	0, 2, 3
])

const QuadVerticesArrayVec2=[
      new vec2(-0.500, -0.500),
      new vec2(+0.500, +0.000),
      new vec2(+0.500, +0.500),
      new vec2(-0.000, -0.000),
      new vec2(+0.500, +0.500),
      new vec2(+0.000, +0.500),
]

export function testDrawTriangle(/**@type {WebGLRenderingContext} */gl){
    var program = createProgram(gl,
      `precision mediump float;

      attribute vec2 vertPosition;
      attribute vec3 vertColor;

      varying vec3 fragColor;

      uniform vec2 canvasSize;
      uniform vec2 shapeLocation;
      uniform float shapeSize;

      void main(){
          fragColor=vertColor;

          vec2 finalVertexPosition = vertPosition * shapeSize + shapeLocation;
          vec2 clipPosition = (vertPosition / canvasSize) * 2.0 - 1.0;

          gl_Position = vec4(vertPosition, 0.0, 1.0);
      }
      `,
      `precision mediump float;

      varying vec3 fragColor;

      void main(){
          gl_FragColor=vec4(fragColor, 1);
      }
      `
    )


      var triang_verts=
      [// x	y			r	g	b
        0.0,0.5,		1.0, 1.0, 1.0,
        -0.5,-0.5,		1.0, 1.0, 1.0,
        0.5,-0.5,		1.0, 1.0, 1.0,
      ];
      var triangVertexBufferObject=gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triang_verts),gl.STATIC_DRAW);

      var positionAttribLocation = gl.getAttribLocation(program,'vertPosition')
      var colorAttribLocation = gl.getAttribLocation(program,'vertColor')
      gl.vertexAttribPointer(
        positionAttribLocation,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
      )
      gl.vertexAttribPointer(
        colorAttribLocation,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
      )

      gl.enableVertexAttribArray(positionAttribLocation);
      gl.enableVertexAttribArray(colorAttribLocation);


      gl.useProgram(program);
      gl.drawArrays(gl.TRIANGLES, 0, 3)

}


export function testDrawQuad(/**@type {WebGLRenderingContext} */gl){
    
    const quadvertices = 
    [
      -0.50,-0.50 , 
      0.50,-0.50 , 
      0.50,0.50 ,

      -0.50,-0.50 , 
      0.50,0.50 , 
      -0.50,0.50 , 
      
    ];

    const quadcolor=[
        +1.000 , +0.000 , +0.000,
        +0.000 , +1.000 , +0.000,
        +0.000 , +0.000 , +1.000,

        +1.000 , +0.000 , +0.000,
        +0.000 , +1.000 , +0.000,
        +0.000 , +0.000 , +1.000,
    ]
    var program = createProgram(gl,
      `precision mediump float;

      attribute vec2 vertPosition;
      attribute vec3 vertColor;

      varying vec3 fragColor;

      uniform vec2 canvasSize;
      uniform vec2 shapeLocation;
      uniform float shapeSize;

      void main(){
          fragColor=vertColor;

          vec2 finalVertexPosition = vertPosition * shapeSize + shapeLocation;
          vec2 clipPosition = (vertPosition / canvasSize) * 2.0 - 1.0;

          gl_Position = vec4(vertPosition, 0.0, 1.0);
      }
      `,
      `precision mediump float;

      varying vec3 fragColor;

      void main(){
          gl_FragColor=vec4(fragColor, 1);
      }
      `
    );


      
      var quadVertexBufferObject=gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadvertices),gl.STATIC_DRAW);

      var quadColorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quadColorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadcolor),gl.STATIC_DRAW)

      //createBuffer(
      //  gl,
      //  new Float32Array(quadvertices),
      //  gl.DYNAMIC_DRAW
      //)


      attributeSet(
        gl,
        program,
        'vertPosition',
        {
          size:2,
          type:gl.FLOAT,
          normalized:false,
          stride:2 * Float32Array.BYTES_PER_ELEMENT,
          offset:0
        }
      )


       attributeSet(
        gl,
        program,
        'vertColor',
        {
          size:3,
          type:gl.FLOAT,
          normalized:false,
          stride:3 * Float32Array.BYTES_PER_ELEMENT,
          offset:0
        }
      )
      
      


      gl.useProgram(program);
      gl.drawArrays(gl.TRIANGLES, 0, 6)

}


export function drawQuad(gl){
	var shaderProgram=createProgram(gl,defaultVertexShader,defaultFragmentShader)
	
	var verticesBuffer=createBuffer(gl,gl.ARRAY_BUFFER,QuadVerticesData,gl.STATIC_DRAW)
	var indicesBuffer=createBuffer(gl,gl.ELEMENT_ARRAY_BUFFER,QuadIndicesData,gl.STATIC_DRAW)
	
	attributeSet(
		gl,
		shaderProgram,
		'vertexPosition',{
			size:2,
			type:gl.FLOAT,
			normalized:false,
			stride:3*Float32Array.BYTES_PER_ELEMENT,
			offset:90
		}
	)
	
	attributeSet(
		gl,
		shaderProgram,
		'',{
			size:3,
			type:gl.FLOAT,
			normalized:false,
			stride:3*Float32Array.BYTES_PER_ELEMENT,
			offset:0
		}
	)
	gl.useProgram(shaderProgram)
	gl.drawArrays(gl.TRIANGLES)
}

export function drawMultipleQuads(gl){
	
}


function attributeSet(/**@type {WebGLRenderingContext} */gl,program,attributeName,parameters){
    var attributeLocation=gl.getAttribLocation(program,attributeName)
    gl.vertexAttribPointer(
        attributeLocation,
        parameters.size,
        parameters.type,
        parameters.normalized,
        parameters.stride,
        parameters.offset
    );
    gl.enableVertexAttribArray(attributeLocation);

}

export function createShader(/**@type {WebGLRenderingContext} */ gl, shaderSource, shaderType){
      var shader = gl.createShader(shaderType);
      gl.shaderSource(shader,shaderSource);
    
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
        console.error("Error shader:",gl.getShaderInfoLog(shader));
      
      return shader;
}
export function createProgram(/**@type {WebGLRenderingContext} */ gl ,vertexShaderSrc,fragmentShaderSrc){
      var vertexShader= createShader(gl,vertexShaderSrc,gl.VERTEX_SHADER);
      var fragmentShader= createShader(gl,fragmentShaderSrc,gl.FRAGMENT_SHADER);

      var program = gl.createProgram()
      gl.attachShader(program,vertexShader);
      gl.attachShader(program,fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program,gl.LINK_STATUS)){
        console.error("Error linking",gl.getProgramInfoLog(program));
      }
      gl.validateProgram(program);
      
      return program

}
export function createBuffer(/**@type {WebGLRenderingContext} */ gl, buffertype, data, usage ){
      var buffer = gl.createBuffer();
      gl.bindBuffer(buffertype, buffer);
      gl.bufferData(buffertype, data ,usage)
      return buffer
}
export function createTexture(/**@type {WebGLRenderingContext} */ gl, image ){
	
	var texture = gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		gl.RGBA,
		image.width,
		image.height,
		0,
		gl.UNSIGNED_BYTE,
	)
	
	
	texParameteri(gl.TEXTURE_2D,gl.WRAP_W,gl.CLAMP_TO_EDGE);
	texParameteri(gl.TEXTURE_2D,gl.WRAP_T,gl.CLAMP_TO_EDGE);
	texParameteri(gl.TEXTURE_2D,gl.MAG_FILTER,gl.NEAREST);
	texParameteri(gl.TEXTURE_2D,MIN_FILTER,gl.NEAREST);
	return texture;
}





let customFontBitmaps = null;
let fontLoadingState = null;

/**
 * Loads fonts for rendering
 */
export async function loadFont() {
    if (customFontBitmaps) return customFontBitmaps;
    if (fontLoadingState) return fontLoadingState;

    fontLoadingState = (async () => {
        const image = await assetLoader.loadImage("GameFont", "textures/font.png");

        
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


export function drawTexture(ctx,texture,transform,options){
	options = options || {}


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
		ctx.save()

		if (!options.useCanvasTransforms){
			ctx.drawImage(
				texture,
				transform.position.x,
				transform.position.y,
				texture.width*transform.scale.x,
				texture.height*transform.scale.y
			)
		}
		else {
			ctx.translate(transform.position.x,transform.position.y)
			ctx.rotate(transform.rotation)
			ctx.scale(transform.scale.x,transform.scale.y)
			ctx.drawImage(
				texture,
				options.offsets?-options.offsets.x: 0,
				options.offsets?-options.offsets.y: 0,
				texture.width*transform.scale.x,
				texture.height*transform.scale.y
			)
		}
		
		ctx.restore()
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





