<template>
  <div class="app">
    <nav>
      <router-link to="/demo1" class="nav-item">THREE基础学习</router-link>
      <router-link to="/demo2" class="nav-item">THREE自定义缓冲几何体</router-link>
      <router-link to="/demo3" class="nav-item">THREE场景与物体</router-link>
      <router-link to="/demo4" class="nav-item">THREE纹理</router-link>
      <router-link to="/demo5" class="nav-item">THREE绘制透明物体</router-link>
      <router-link to="/agv" class="nav-item">agv智能小车移动</router-link>
      <router-link to="/agv2" class="nav-item">agv智能小车移动2</router-link>
      <router-link to="/card" class="nav-item">圣诞节贺卡</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script lang="ts" setup>




</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
a{
  list-style: none;
  text-decoration: none;
  color: #000;
}
.app{
  width: 100vw;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}
.nav-item{
  font-size: 16px;
  font-weight: bold;
  margin-right: 20px;
}
.three-demo{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
}

</style>
