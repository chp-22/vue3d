<template>
  <div id="app">
    <h3>three.js</h3>
    <div ref="threeBox" id="d-box"></div>
    <!-- <chp-button text="ppppppp测试"></chp-button> -->
  </div>
</template>

<script setup>
import * as THREE from 'three';
import { onMounted, ref } from 'vue';

  onMounted(() => {
    // init3D(); // 箭头函数中不需要this
  })

  function init3D() {
    
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( 200, 200 );
        document.body.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        function animate() {
          requestAnimationFrame( animate );

          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;

          renderer.render( scene, camera );
        }

        animate();
  }

</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.d-box{
  width: 200px;
  height: 200px;
}

</style>
