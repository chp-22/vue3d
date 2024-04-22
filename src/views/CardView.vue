<template>
  <div class="three-demo card" id="cardElement">
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onMounted } from 'vue';

// 场景
const scene = new THREE.Scene();
// 透视相机  （视野角度，长宽比，近截面，远截面）
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 材质-----颜色
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 网格=几何体+材质
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 坐标辅助器
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);


onMounted(() => {
  console.log('mounted');
  document.getElementById('cardElement').appendChild(renderer.domElement);
  renderer.render(scene, camera);
})

function render() {
  // cube.position.x += 0.01;
  // if (cube.position.x > 5) {
  //   cube.position.x = 0;
  // }
  // controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();


</script>

<style scoped lang="less">
.card{

}
</style>
