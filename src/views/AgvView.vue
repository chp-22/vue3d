<template>
    <div class="three-demo" id="agvElement"></div>
</template>
  
<script lang="ts" setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { onMounted, onUnmounted } from "vue";
import { WsClient } from "../assets/websocket-client";

let client = null;
let scene = null;
let camera = null;
let renderer = null;
let controls = null;
let agvModel = null;
let speed = 0.1;
let clock = new THREE.Clock();

onMounted(() => {
    agvDemo();
    getPositionData();
});

// 获取位置信息
function getPositionData() {
    client = new WsClient();
    // 订阅
    client.subscribe("vehicle:process", (event) => {
        console.log(event.header, event.data);
        agvModel.position.set(
            event.data.precisePosition.x / 1000,
            0,
            -event.data.precisePosition.y / 1000
        );
        agvModel.rotation.y = THREE.MathUtils.degToRad(
            event.data.orientationAngle + 90
        );
        // camera.position.x = agvModel.position.x - 12;
        // camera.position.z = agvModel.position.z;
        // camera.lookAt(agvModel.position)
    });
    // 连接
    client.connect("ws://42.192.3.79:9057/ws/event");
}

function agvDemo() {
    initScene();
    initRender();
    initControl();

    loadModel();
    loadLight();

    render();
}

// 初始化相机
function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x888888);
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set(-15, 30, 7);
    camera.lookAt(15, 2, 7);
    scene.add(camera);
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);
}

// 初始化渲染器
function initRender() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('agvElement').appendChild(renderer.domElement);
}

// 初始化控制器
function initControl() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 阻尼效果
}

// 加载模型
function loadModel() {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/model/JMCK_01.gltf", function (obj) {
        obj.scene.position.set(-50, -2, 30);
        scene.add(obj.scene);
    });

    gltfLoader.load("/model/zhengti.gltf", (gltf) => {
        agvModel = gltf.scene;
        agvModel.position.set(18, 0, -24);
        agvModel.rotateY(Math.PI * 0.5);
        scene.add(agvModel);
    });
}

// 加载灯光
function loadLight() {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 50, 0);
    scene.add(light);
    // 加入一个环境光源
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
}

// 渲染
function render() {
    // // 模拟移动
    // if (agvModel) {
    //   agvModel.position.x += speed;
    //   camera.position.x = agvModel.position.x - 12;
    // }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

onUnmounted(() => {
    client.disconnect();
});
</script>
  
<style lang="less">

</style>
  