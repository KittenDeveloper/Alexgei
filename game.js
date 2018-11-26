sWidth= window.innerWidth;
sHeight= window.innerHeight;
var scene= new THREE.Scene();
var renderer= new THREE.WebGLRenderer();
var camera= new THREE.OrthographicCamera(-400, 400, -300, 300, 1, 1000);
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);
var square= new THREE.PlaneGeometry(1, 1);
square.translate(-0.5, -0.5, 0);
function createText(font, color, msg)
{
	var canvas= document.createElement("canvas");
	var ctx= canvas.getContext("2d");
	ctx.font= font;
	height= ctx.measureText('M').width;
	width= ctx.measureText(msg).width;
	var canvas= document.createElement("canvas");
	canvas.width= width;
	canvas.height= height;
	var ctx= canvas.getContext("2d");
	ctx.font= font;
	ctx.fillStyle= color;
	ctx.fillText(msg, 0, height-20);
	data= canvas.toDataURL();
	console.log(width.toString()+", "+height.toString());
	console.log(data);
	return data;
}
material = undefined;
function createSprite(posX, posY, sizeX, sizeY, image)
{
	if(typeof image==="number")
	{
		var material= new THREE.MeshBasicMaterial({color: image, side: THREE.BackSide});
	}
	else
	{
		var texture=new THREE.TextureLoader().load(image);
		texture.flipY= false;
		var material= new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide});
		console.log("done");
	}
	var mesh= new THREE.Mesh(square, material);
	mesh.scale.set(sizeX, sizeY, 1);
	mesh.translateX(posX);
	mesh.translateY(posY);
	return mesh;
}
var sprite= createSprite(200, 150, 400, 300, createText("300px Comic Sans MS", "#0000FF", "Startu"));
scene.add(sprite);
camera.position.z = 1
console.log(sprite.position.x.toString());
var clock= THREE.Clock();
function render()
{
	//Main loop
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();