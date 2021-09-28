import * as THREE from './three.js-master/build/three.module.js'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'
// console.log(THREE)

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
// const texture = new THREE.TextureLoader().load( "assets/disney.jpg" );
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(  );
scene.background =new THREE.Color(0x000000);


const loader = new GLTFLoader()
loader.load('assets/pote3D-1.gltf', function (gltf) {
    console.log(gltf)
    const root = gltf.scene;
    root.scale.set(1, 1, 1)
    scene.add(root)
}, function (xhr) {
    console.log((xhr.loaded/xhr.total * 100) + '% loaded')
}, function (error) {
    console.log('Error loading')
})

const light = new THREE.HemisphereLight(0xffffff, 1, 1)
light.position.set(10, 1, 100, 100);
// light.intensity.set(1)
// light.color.set('0xffffff')
scene.add(light)


const targetObject = new THREE.Object3D();
scene.add(targetObject);

light.target = targetObject;


//Boiler plate code
const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
// camera.position.set(.2, 5, 10)
camera.position.z = 5;
camera.position.x = 0;
camera.position.y = 1;
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
 controls.enableZoom = true;
 controls.enableDamping = false;


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap = true
// renderer.gammaOutput = true

window.addEventListener('resize', function(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.update()
})

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update()
}

animate()


// const tick = () => {
//     // renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
//     controls.update()
// }

// tick()