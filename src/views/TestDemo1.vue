<template>
    <div class="three-demo test-demo" id="demoElement"></div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted } from "vue";

// 场景
const scene = new THREE.Scene();
// 透视相机  （视野角度，长宽比，近截面，远截面）
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 5);
// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// // 材质-----颜色  MeshPhongMaterial这个材质在加了灯光后有阴影效果
// const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
// // 网格=几何体+材质
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cube);

// 创建多个立方体
function makeInstance(color, x) {
    // 材质-----颜色
    const cubeMaterial = new THREE.MeshPhongMaterial({ color });
    // 网格=几何体+材质
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);
    cube.position.x = x;
    return cube;
}

const cubes = [
    makeInstance(0x675fff, -2),
    makeInstance(0xff545d, 0),
    makeInstance(0xffff00, 2)
];

// 灯光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 5);
scene.add(light);

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 坐标辅助器
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

onMounted(() => {
    console.log("mounted");
    document.getElementById("demoElement").appendChild(renderer.domElement);
    renderer.render(scene, camera);
});

function render(time) {
    // controls.update();
    time *= 0.001;  // 将时间单位变为秒
 
    // cube.rotation.x = time;
    // cube.rotation.y = time;
    cubes.map((cube, idx) => {
        const speed = 1 + idx * 0.1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    })
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// render();
requestAnimationFrame(render);

window.addEventListener("resize", () => {
    (camera.aspect = window), innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // 更新相机投影矩阵

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
});
</script>

<style scoped lang="less">
</style>
