import * as THREE from '../js/three.module.js';

import {OrbitControls} from '../js/OrbitControls.js';
import {GLTFLoader} from '../js/GLTFLoader.js';
//import {RGBELoader} from '../js/RGBELoader.js';
//import { RoomEnvironment } from '../js/RoomEnvironment.js';

// Настройки сцены
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xcccccc );
scene.fog = new THREE.FogExp2( 0xcccccc, 0.14 );
//Камера
const camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.y = 0;
camera.position.x = 2.7;
camera.position.z = 3;
// Рендер
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
// Контроллер
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI/2;
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.ROTATE,
	RIGHT: THREE.MOUSE.ROTATE
};
// Геометрия
const loader = new GLTFLoader();
loader.load( 'scene.gltf', function ( gltf ) {
	scene.add( gltf.scene );
});
document.querySelector(".add-sel").onclick = function() {
	loader.load( 'scene.gltf', function ( gltf ) {
		scene.add( gltf.scene );
	});
};

document.querySelector(".rem-sel").onclick = function() {
		let theResult = scene.getObjectByName("Sketchfab_Scene", true);
    console.log(theResult);
		scene.remove(theResult)
	};

//Окружение
let textureEquirec;
const textureLoader = new THREE.TextureLoader();
textureEquirec = textureLoader.load('textures/env-min.png');
textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
textureEquirec.encoding = THREE.sRGBEncoding;

//scene.background = textureEquirec;
scene.environment = textureEquirec;

//Хелпер
const gridHelper = new THREE.GridHelper( 40, 100, 0x6F6F6F, 0x6F6F6F );
gridHelper.position.y = -0.36;
gridHelper.position.x = 0;
gridHelper.position.z = 0;
scene.add( gridHelper );

// Освещение
// const dirLight = new THREE.DirectionalLight("white",1);
// scene.add(dirLight);
// dirLight.position.set(5,5,5);

//Логи
//console.log(loader.load);

//Вызовы
window.addEventListener( 'resize', onWindowResize );
animate();

// Функции
function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
  // console.log(camera);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};
