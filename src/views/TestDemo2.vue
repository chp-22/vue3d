<template>
    <div class="three-demo test-demo" id="demoElement2">
    </div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted } from "vue";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

// 场景
const scene = new THREE.Scene();
// 透视相机  （视野角度，长宽比，近截面，远截面）
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 60);

// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true, });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// 设置渲染器的初始颜色(背景颜色)
renderer.setClearColor(new THREE.Color(0xeeeeee));


const cubeGeometry = new THREE.SphereGeometry(10, 32, 16);
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff5656, wireframe: false });
const sphere  = new THREE.Mesh(cubeGeometry, cubeMaterial);
sphere.castShadow = true
scene.add(sphere);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

 // 创建地面几何体
 const planeGeometry = new THREE.PlaneGeometry(100,100)    
// 创建地面材质
const planeMaterial = new THREE.MeshLambertMaterial({color:0xcccccc})
// 创建地面
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
// 将物体移动位置
plane.rotation.x = -0.5*Math.PI
plane.position.x = -50
plane.position.y = -50
plane.position.z = 0
// 对象是否渲染到阴影贴图中
plane.castShadow = true
// 地面材质是否接收阴影
plane.receiveShadow = true
// 将地面添加到场景中
scene.add(plane)


const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 20, 20, 20 );
scene.add( spotLight );
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper);


// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);


const gui = new GUI();
gui.add(spotLight, 'angle', 0,  Math.PI / 2);

onMounted(() => {
    document.getElementById("demoElement2").appendChild(renderer.domElement);
    renderer.render(scene, camera);
});



const segmentsAround = 16;
const segmentsDown = 8;
const temp = new THREE.Vector3();


// function makeSpherePositions(segmentsAround, segmentsDown) {
//     const numVertices = segmentsAround * segmentsDown * 6;
//     const numComponents = 3;
//     const positions = new Float32Array(numVertices * numComponents);
//     const indices = [];

//     const longHelper = new THREE.Object3D();
//     const latHelper = new THREE.Object3D();
//     const pointHelper = new THREE.Object3D();
//     longHelper.add(latHelper);
//     latHelper.add(pointHelper);
//     pointHelper.position.z = 1;


//     function getPoint(lat, long) {
//         latHelper.rotation.x = lat;
//         longHelper.rotation.y = long;
//         longHelper.updateMatrixWorld(true);
//         return pointHelper.getWorldPosition(temp).toArray();
//     }
    
//     let posNdx = 0;
//     let ndx = 0;

//     for (let down = 0; down < segmentsDown; ++down) {
//         const v0 = down / segmentsDown;
//         const v1 = (down + 1) / segmentsDown;
//         const lat0 = (v0 - 0.5) * Math.PI;
//         const lat1 = (v1 - 0.5) * Math.PI;
    
//         for (let across = 0; across < segmentsAround; ++across) {
//         const u0 = across / segmentsAround;
//         const u1 = (across + 1) / segmentsAround;
//         const long0 = u0 * Math.PI * 2;
//         const long1 = u1 * Math.PI * 2;
    
//         positions.set(getPoint(lat0, long0), posNdx);  posNdx += numComponents;
//         positions.set(getPoint(lat1, long0), posNdx);  posNdx += numComponents;
//         positions.set(getPoint(lat0, long1), posNdx);  posNdx += numComponents;
//         positions.set(getPoint(lat1, long1), posNdx);  posNdx += numComponents;
    
//         indices.push(
//             ndx, ndx + 1, ndx + 2,
//             ndx + 2, ndx + 1, ndx + 3,
//         );
//         ndx += 4;
//         }
//     }
//     return {positions, indices};
// }

// const {positions, indices} = makeSpherePositions(segmentsAround, segmentsDown);
// console.log(positions);
// const normals = positions.slice();
// const geometry = new THREE.BufferGeometry();
// const positionNumComponents = 3;
// const normalNumComponents = 3;

// const positionAttribute = new THREE.BufferAttribute(positions, positionNumComponents);
// positionAttribute.setUsage(THREE.DynamicDrawUsage);
// geometry.setAttribute('position', positionAttribute);
// geometry.setAttribute('normal', new THREE.BufferAttribute(normals, normalNumComponents));
// geometry.setIndex(indices);
// const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
// const mesh = new THREE.Mesh( geometry, material );
// scene.add(mesh);

const clock = new THREE.Clock();
function render() {
    // let time = clock.getElapsedTime();
    // for (let i = 0; i < positions.length; i += 3) {
    //     const quad = (i / 12 | 0);
    //     const ringId = quad / segmentsAround | 0;
    //     const ringQuadId = quad % segmentsAround;
    //     const ringU = ringQuadId / segmentsAround;
    //     const angle = ringU * Math.PI * 2;
    //     temp.fromArray(normals, i);
    //     temp.multiplyScalar(THREE.MathUtils.lerp(0.01, 1.4, Math.sin(time + ringId + angle) * .5 + .5));
    //     temp.toArray(positions, i);
    // }
    // positionAttribute.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();


</script>

<style scoped lang="less">

</style>
