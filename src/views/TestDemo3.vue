<template>
    <div class="three-demo test-demo" id="demo3">
    </div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { Clock } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { onMounted, ref } from "vue";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { AxisGridHelper } from '../assets/guiHelper';

const objects = [];

// 场景
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x666666);
// 透视相机  （视野角度，长宽比，近截面，远截面）
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 50, 0);
// camera.up.set(0, 0, 1);
// camera.lookAt(0, 0, 0);
scene.add(camera);
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);


const light = new THREE.PointLight(0xffffff, 3);
scene.add(light);

// 渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

// 创建空场景图
const fullSystem = new THREE.Object3D();
scene.add(fullSystem);
objects.push(fullSystem);

const radius = 1;
const widthSegments = 6;
const heightSegments = 6;

const sphere = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

// 太阳
const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xfff000 });
const sunMesh = new THREE.Mesh(sphere, sunMaterial);
sunMesh.scale.set(5, 5, 5);
fullSystem.add(sunMesh);
objects.push(sunMesh);

// 地球
const earthMaterial = new THREE.MeshPhongMaterial({emissive: 0xf5489f});
const earthMesh = new THREE.Mesh(sphere, earthMaterial);
// earthMesh.position.x = 10;
// fullSystem.add(earthMesh);
// objects.push(earthMesh);
const earthOribit = new THREE.Object3D();
earthOribit.position.x = 10;
earthOribit.add(earthMesh);
fullSystem.add(earthOribit);
objects.push(earthOribit);
objects.push(earthMesh);

// sunMesh.add(earthMesh);
// 直接这样添加会导致子对象继承父对象的属性，可以新建空场景图fullSystem，将sunMesh,earthMesh添加到空场景去

// 月球
const moonMaterial = new THREE.MeshPhongMaterial({ emissive: 0x7f66 });
const moonMesh = new THREE.Mesh(sphere, moonMaterial);
moonMesh.position.x = 2;
moonMesh.scale.set(0.5, 0.5, 0.5);
earthOribit.add(moonMesh);
objects.push(moonMesh);





onMounted(() => {
    document.getElementById('demo3').appendChild(renderer.domElement)
    renderer.render(scene, camera);
    render();
})

const clock = new Clock();


function render() {
    // controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    objects.forEach((node) => {
        // node.rotation.y = clock.getElapsedTime();
        const axes = new THREE.AxesHelper(2);
        axes.material.depthTest = false;
        axes.renderOrder = 1;
        node.add(axes);
    });
}

const gui = new GUI();
function makeAxisGrid(node, label, units?) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
}

makeAxisGrid(fullSystem, 'fullSystem', 25);
makeAxisGrid(sunMesh, 'sunMesh');
makeAxisGrid(earthOribit, 'earthOrbit');
makeAxisGrid(earthMesh, 'earthMesh');
makeAxisGrid(moonMesh, 'moonMesh');




</script>

<style scoped lang="less">
.btn{
    position: fixed;
    left: 20px;
    top: 20px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #06c5ff;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: 1px solid #06c5ff;
    border-radius: 8px;
}
.btn2{
    top: 80px;
    left: 20px;
}
</style>
