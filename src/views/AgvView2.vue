<template>
    <div class="three-demo test-demo" id="AgvView2">
        <button class="btn btn1" @click="dingCamera()">固定视角</button>
        <button class="btn btn2" @click="fllowCamera()">跟随视角</button>
    </div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { onMounted, ref } from "vue";
import { WsClient } from '../assets/websocket-client';


let isFollow = ref(false); // 是否跟随相机
// 场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x666666);
// 透视相机  （视野角度，长宽比，近截面，远截面）
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-20, 30, -100);
camera.lookAt(20, 2, -80); // 设置了controls会导致lookAt失效


const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 50, 0);
scene.add(light);
// 加入一个环境光源
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// 渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, innerHeight);
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.target = new THREE.Vector3(20, 2, -80)

const loader1 = new GLTFLoader();
loader1.load('model/JMCK_01.gltf', (gltf1) => {
    gltf1.scene.position.set(-20, 0, -60);
    scene.add(gltf1.scene);
});

let agv = null; // agv小车对象
const loader2 = new GLTFLoader();
loader2.load('model/zhengti.gltf', (gltf2) => {
    agv = gltf2.scene;
    agv.position.set(20, 2, -80);
    agv.rotation.y = -90*Math.PI/180;
    scene.add(agv);
});



onMounted(() => {
    document.getElementById('AgvView2').appendChild(renderer.domElement)
    renderer.render(scene, camera);
    render();
    getPoint();
    window.addEventListener("keydown", toggleFullscreen, true);
})

function toggleFullscreen(event) {
    const movementSpeed = 1;
    switch (event.code) {
    case "KeyW":
        agv.translateZ(-movementSpeed); // 向前移动
        break;

    case "KeyA":
        agv.translateX(-movementSpeed); // 向左移动
        break;

    case "KeyS":
        agv.translateZ(movementSpeed); // 向后移动
        break;

    case "KeyD":
        agv.translateX(movementSpeed); // 向右移动
        break;

    default:
        break;
    }
}

function dingCamera() {
    isFollow.value = false;
    
}

function fllowCamera() {
    isFollow.value = true;
}



function render() {
    // controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function getPoint() {
    const clock = new THREE.Clock();
    const client = new WsClient();
    // 订阅
    client.subscribe("vehicle", (event) => {
        console.log(event.data.precisePosition, event.data.orientationAngle, 'orientationAngle')
        agv.position.set(event.data.precisePosition.x / 1000 + clock.getElapsedTime(), 2, event.data.precisePosition.y / 1000);
        agv.rotation.y = event.data.orientationAngle*Math.PI/180;

        if(isFollow.value) {
            // camera.lookAt(agv.position.x, 2, agv.position.z)
            camera.position.set(agv.position.x - 4, 6, agv.position.z);
        } else {
            camera.position.set(-20, 30, -100);
        }
        scene.add(camera);
    })
    // 连接
    client.connect("ws://42.192.3.79:9057/ws/event")
}

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
