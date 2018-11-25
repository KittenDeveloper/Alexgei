sWidth= window.innerWidth;
sHeight= window.innerHeight;
var scene= new THREE.Scene();
var renderer= new THREE.WebGLRenderer();
var camera= new THREE.OrthographicCamera(-400, 400, -300, 300, 1, 1000);
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);
var square= new THREE.PlaneGeometry(1, 1);
square.translate(-0.5, -0.5, 0);
function createSprite(posX, posY, sizeX, sizeY, image)
{
	function createRect(posX, posY, sizeX, sizeY, inColor)
	{
		var color= new THREE.MeshBasicMaterial({color: inColor, side: THREE.BackSide});
		var mesh= new THREE.Mesh(square, color);
		mesh.scale.set(sizeX, sizeY, 1);
		mesh.translateX(posX);
		mesh.translateY(posY);
		mesh.getLocation= function(){return new THREE.Vector3(sizeX/2, sizeY/2, 0).add(this.position);}
		return mesh;
	}
	if(typeof image==="number") return createRect(posX, posY, sizeX, sizeY, image);
	var texture= new THREE.TextureLoader().load(image);
	var material= new THREE.SpriteMaterial({map: texture, side: THREE.BackSide})
	var sprite= new THREE.Sprite(material);
	sprite.scale.set(sizeX, sizeY, 1);
	sprite.translateX(sizeX/-2);
	sprite.translateY(sizeY/-2);
	sprite.translateX(posX);
	sprite.translateY(posY);
	sprite.getLocation= function(){return new THREE.Vector3(sizeX/2, sizeY/2, 0).add(this.position);}
	return sprite;
}
var sprite= createSprite(400, 300, 400, 300, 0x0000FF);
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