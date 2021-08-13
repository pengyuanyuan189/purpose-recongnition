<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545C64" active-text-color="#FFD04B" @select="handleSelect" router>
      <el-submenu index="1">
        <template slot="title">数据生成器</template>
        <el-menu-item index="1-1" route="config">数据生成</el-menu-item>
        <el-menu-item index="1-2" route="data-plot">数据展示</el-menu-item>
      </el-submenu>
      <el-menu-item index="2" route="modeltraining">模型训练</el-menu-item>
      <el-menu-item index="3" route="recongnition">意图识别</el-menu-item>
    </el-menu>
    <div id="content" :transmission="handleTransmission">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: '1',
      fighterNum: '',
      warningNum: '',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // 切换url
      this.activeIndex = key;
    },
    handleTransmission() {
      
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* 加上属性选择器增加权重 */
el-menu-item{
  margin: 8 20px;
}
</style>
