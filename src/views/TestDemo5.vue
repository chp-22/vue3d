<template>
    <div class="three-demo test-demo">
        <canvas id="demo4"></canvas>
    </div>
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

</script>

<style scoped lang="less">
</style>
