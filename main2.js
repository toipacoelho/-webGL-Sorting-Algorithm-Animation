var gl2;
var canvas2;

function start2(){
	
	canvas2 = document.getElementById("glcanvas2");
	init2();
	if(gl2){
		gl2.clearColor(0.0,0.0,0.0,1.0);
		gl2.clearDepth(1.0);
		gl2.enable(gl2.DEPTH_TEST);
		gl2.depthFunc(gl2.LEQUAL);
		initShaders2();
		initBuffers2();
	}
	console.log('canvas2');
}

function init2(){
	gl2 = null;
	try{
		gl2 = canvas2.getContext("experimental-webgl");
	}catch(e){}
	if(!gl2){
		alert("Unable to initializa WebGL2. Your browser may not support it.")
	}
}

var shaderProgram2;
var vertexPositionAttribute2;
var vertexColorAttribute2;
function initShaders2()
{
	var fragmentShader2 = getShader2(gl2, "shader-fs");
	var vertexShader2 = getShader2(gl2, "shader-vs");
	shaderProgram2 = gl2.createProgram();
	gl2.attachShader(shaderProgram2, vertexShader2);
	gl2.attachShader(shaderProgram2, fragmentShader2);
	gl2.linkProgram(shaderProgram2);
	if (!gl2.getProgramParameter(shaderProgram2, gl2.LINK_STATUS)) {
		alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
	}
	gl2.useProgram(shaderProgram2);
	vertexPositionAttribute2 = gl2.getAttribLocation(shaderProgram2, "aVertexPosition");
	gl2.enableVertexAttribArray(vertexPositionAttribute2);
	vertexColorAttribute2 = gl2.getAttribLocation(shaderProgram2, "aVertexColor");
	gl2.enableVertexAttribArray(vertexColorAttribute2);
}

function getShader2(gl2, id) {
	var shaderScript = document.getElementById(id);
	// Didn't find an element with the specified ID; abort.
	if (!shaderScript) {
		return null;
	}

	// Walk through the source element's children, building the shader source string.
	var theSource = "";
	var currentChild = shaderScript.firstChild;
	while (currentChild) {
		if (currentChild.nodeType == 3) {
			theSource += currentChild.textContent;
		}
		currentChild = currentChild.nextSibling;
	}

	// Now figure out what type of shader script we have, based on its MIME type.
	var shader2;
	if (shaderScript.type == "x-shader/x-fragment") {
		shader2 = gl2.createShader(gl2.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader2 = gl2.createShader(gl2.VERTEX_SHADER);
	} else {
		return null; // Unknown shader type
	}

	// Send the source to the shader object
	gl2.shaderSource(shader2, theSource);

	// Compile the shader program
	gl2.compileShader(shader2);

	// See if it compiled successfully
	if (!gl2.getShaderParameter(shader2, gl2.COMPILE_STATUS)) {
		alert("An error occurred compiling the shaders: " + gl2.getShaderInfoLog(shader2));
		return null;
	}

	return shader2;
}


var array2 = [];
var cubeRotation2 = 0.0;
function initializeArray2() {
	array=[];
	array2=[];

	var size = document.getElementById("length").value;
	var x;
	for (var i = 0; i < size; i++) {
		x = Math.random() * 10;
		array[i]=x;
		array2[i]=x;
	}
}

var perspectiveMatrix2;
function drawScene2() {
	gl2.clear(gl2.COLOR_BUFFER_BIT | gl2.DEPTH_BUFFER_BIT);
	perspectiveMatrix2 = makePerspective(45, 800.0 / 450.0, 0.1, 100);
	
	for (i = 0; i < array2.length; i++) {
		drawCube2(i * 25 / array2.length, 0, -50, array2[i], 10/array2.length);
	}
}

function drawCube2(x, y, z, heigh, width) {
	loadIdentity2();
	mvTranslate2([-11.35, -0, 0]);
	mvTranslate2([x, y, z]);
	var m2 = $M([[width, 0, 0, 0]
				, [0, heigh, 0, 0]
				, [0, 0, 1, 0]
				, [0, 0, 0, 1]]);
	multMatrix2(m2);
	mvPushMatrix2();
	mvRotate2(cubeRotation2, [1, 0, 1]);
	mvTranslate2([cubeXOffset, cubeYOffset, cubeZOffset]);
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVerticesBuffer2);
	gl2.vertexAttribPointer(vertexPositionAttribute2, 3, gl2.FLOAT, false, 0, 0);
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVerticesColorBuffer2);
	gl2.vertexAttribPointer(vertexColorAttribute, 4, gl2.FLOAT, false, 0, 0);
	gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer2);
	setMatrixUniforms2();
	gl2.drawElements(gl2.TRIANGLES, 36, gl2.UNSIGNED_SHORT, 0);
	mvPopMatrix2();
}

var mvMatrix2;
function loadIdentity2() {
	mvMatrix2 = Matrix.I(4);
}

var mvMatrixStack2 = [];
function mvPushMatrix2(m2) {
	if (m2) {
		mvMatrixStack2.push(m2.dup());
		mvMatrix2 = m2.dup();
	} else {
		mvMatrixStack2.push(mvMatrix2.dup());
	}
}

function mvRotate2(angle, v) {
	var inRadians = angle * Math.PI / 180.0;
	var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
	multMatrix2(m);
}

function multMatrix2(m) {
	mvMatrix2 = mvMatrix2.x(m);
}

function mvTranslate2(v) {
	multMatrix2(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function mvPopMatrix2() {
	if (!mvMatrixStack2.length) {
		throw ("Can't pop from an empty matrix stack.");
	}
	mvMatrix2 = mvMatrixStack2.pop();
	return mvMatrix2;
}

function setMatrixUniforms2() {
	var pUniform2 = gl2.getUniformLocation(shaderProgram2, "uPMatrix");
	gl2.uniformMatrix4fv(pUniform2, false, new Float32Array(perspectiveMatrix2.flatten()));
	var mvUniform2 = gl2.getUniformLocation(shaderProgram2, "uMVMatrix");
	gl2.uniformMatrix4fv(mvUniform2, false, new Float32Array(mvMatrix2.flatten()));
}

var cubeVerticesBuffer2;
var cubeVerticesColorBuffer2;
var cubeVerticesIndexBuffer2;
function initBuffers2() {
	cubeVerticesBuffer2 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVerticesBuffer2);
	var vertices = [
	// Front face
	-1.0, -1.0, 1.0
	 , 1.0, -1.0, 1.0
	 , 1.0, 1.0, 1.0
	, -1.0, 1.0, 1.0,

	// Back face
	-1.0, -1.0, -1.0
	, -1.0, 1.0, -1.0
	 , 1.0, 1.0, -1.0
	 , 1.0, -1.0, -1.0,

	// Top face
	-1.0, 1.0, -1.0
	, -1.0, 1.0, 1.0
	 , 1.0, 1.0, 1.0
	 , 1.0, 1.0, -1.0,

	// Bottom face
	-1.0, -1.0, -1.0
	 , 1.0, -1.0, -1.0
	 , 1.0, -1.0, 1.0
	, -1.0, -1.0, 1.0,

	// Right face
	 1.0, -1.0, -1.0
	 , 1.0, 1.0, -1.0
	 , 1.0, 1.0, 1.0
	 , 1.0, -1.0, 1.0,

	// Left face
	-1.0, -1.0, -1.0
	, -1.0, -1.0, 1.0
	, -1.0, 1.0, 1.0
	, -1.0, 1.0, -1.0
  ];
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(vertices), gl2.STATIC_DRAW);
	var colors = [
	[1.0, 1.0, 1.0, 1.0], // Front face: white
	[1.0, 0.0, 0.0, 1.0], // Back face: red
	[0.0, 1.0, 0.0, 1.0], // Top face: green
	[0.0, 0.0, 1.0, 1.0], // Bottom face: blue
	[1.0, 1.0, 0.0, 1.0], // Right face: yellow
	[1.0, 0.0, 1.0, 1.0] // Left face: purple
  ];
	// Convert the array of colors into a table for all the vertices.
	var generatedColors = [];
	for (j = 0; j < 6; j++) {
		var c = colors[j];
		// Repeat each color four times for the four vertices of the face
		for (var i = 0; i < 4; i++) {
			generatedColors = generatedColors.concat(c);
		}
	}
	cubeVerticesColorBuffer2 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ARRAY_BUFFER, cubeVerticesColorBuffer2);
	gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(generatedColors), gl2.STATIC_DRAW);
	cubeVerticesIndexBuffer2 = gl2.createBuffer();
	gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer2);
	var cubeVertexIndices = [
	0, 1, 2, 0, 2, 3, // front
	4, 5, 6, 4, 6, 7, // back
	8, 9, 10, 8, 10, 11, // top
	12, 13, 14, 12, 14, 15, // bottom
	16, 17, 18, 16, 18, 19, // right
	20, 21, 22, 20, 22, 23 // left
  ]
	gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl2.STATIC_DRAW);
}

var algorithm2;
var step2;

function startSorting2(arr2, algrt2) {
	console.log(algrt2);
	algorithm2 = algrt2;
	array2 = array2;
	step2 = 0;
	sortArray2();
}

function sortArray2() {
	array2 = algorithm2(array2,step2);
	step2++;

	drawScene2();
	
	if(!isSorted2(array2)) {
		setTimeout(sortArray2, speed);
	}
}

function isSorted2(array2) {
	for(var i = 0; i < array2.length - 1; i++) {
		if(array2[i] > array2[i + 1]) {
			return false;
		}
	}
	return true;
}

