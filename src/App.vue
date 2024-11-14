<script setup>
import Fast from './components/Fast.vue'
import Full from './components/Full.vue'
import Batch from './components/Batch.vue'
import KB from './components/KB.vue'
import { ref } from 'vue'

const showSidebar = ref(true)
const menuActiveIdx = ref(1)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const menuSelect = (idx) => {
  menuActiveIdx.value = idx
}
</script>

<template>
  <el-container class="content">
    <el-header>
      <el-row justify="space-between" style="margin: 0 1rem;">
        <span>
          <span style="margin-left: 0.5rem; margin-right: 1.5rem;">
            <el-button link @click="toggleSidebar" style="font-size: 1.5rem; color: #ffffff; margin-bottom: 0.25rem;">
              <el-icon v-if="showSidebar"><Fold /></el-icon>
              <el-icon v-if="!showSidebar"><Expand /></el-icon>
            </el-button>
          </span>

          <a href="/" style="color: unset; text-decoration: unset;">生成式大模型可信度分析及辨识系统</a>
        </span>
      </el-row>
    </el-header>

    <el-container>
      <el-aside class="sidebar" :class="{ 'sidebar-hidden': !showSidebar }">
        <div class="menu-item" :class="{ 'menu-item-active': menuActiveIdx == 1, 'tight': !showSidebar }" @click="menuSelect(1)">
          <el-row>
            <el-col :span="1"><div class="menu-decoration-bar"></div></el-col>
            <el-col :span="7"><el-icon><TrendCharts /></el-icon></el-col>
            <el-col :span="16" v-if="showSidebar"><p>快速辨识</p></el-col>
          </el-row>
        </div>

        <div class="menu-item" :class="{ 'menu-item-active': menuActiveIdx == 2, 'tight': !showSidebar }" @click="menuSelect(2)">
          <el-row>
            <el-col :span="1"><div class="menu-decoration-bar"></div></el-col>
            <el-col :span="7"><el-icon><Aim /></el-icon></el-col>
            <el-col :span="16" v-if="showSidebar"><p>精细辨识</p></el-col>
          </el-row>
        </div>

        <div class="menu-item" :class="{ 'menu-item-active': menuActiveIdx == 3, 'tight': !showSidebar }" @click="menuSelect(3)">
          <el-row>
            <el-col :span="1"><div class="menu-decoration-bar"></div></el-col>
            <el-col :span="7"><el-icon><List /></el-icon></el-col>
            <el-col :span="16" v-if="showSidebar"><p>批量辨识</p></el-col>
          </el-row>
        </div>

        <div class="menu-item" :class="{ 'menu-item-active': menuActiveIdx == 4, 'tight': !showSidebar }" @click="menuSelect(4)">
          <el-row>
            <el-col :span="1"><div class="menu-decoration-bar"></div></el-col>
            <el-col :span="7"><el-icon><Collection /></el-icon></el-col>
            <el-col :span="16" v-if="showSidebar"><p>知识管理</p></el-col>
          </el-row>
        </div>
      </el-aside>

      <el-main :class="{ 'sidebar-hidden': !showSidebar }">
        <Fast v-if="menuActiveIdx == 1" />
        <Full v-if="menuActiveIdx == 2" />
        <Batch v-if="menuActiveIdx == 3" />
        <KB v-if="menuActiveIdx == 4" />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
@font-face {
    font-family: 'NotoSansHans-Medium';
    src: url('./assets/NotoSansHans-Medium.otf');
}

.el-header {
  background-color: #303F9F;
  color: #FFFFFF;
  font-size: 1.5rem;
  height: 4rem;
  line-height: 4rem;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  z-index: 5;
}

.el-aside {
  background-color: #ffffff;
}

.el-main {
  background-color: rgba(0, 0, 0, 0.05);
  margin-left: 15rem;
  transition: margin-left 0.2s;
}

.el-main.sidebar-hidden {
  background-color: rgba(0, 0, 0, 0.05);
  margin-left: 4.5rem;
}

.content {
  height: 100%;
  padding-top: 4rem;
  font-family: NotoSansHans-Medium;
}

.sidebar {
  width: 15rem;
  transition: width 0.2s;
  padding-top: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-image: url('./assets/sidebar-bg.png');
  background-repeat: no-repeat;
  background-position: 0 95%;
  background-size: 224px 200px;
  position: fixed;
  top: 4rem;
  left: 0;
  bottom: 0;
}

.sidebar-hidden {
  width: 4.5rem;
  background: none;
}

.menu-item {
  font-size: 1rem;
  width: 100%;
  height: 4rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item.menu-item-active {
  background-color: #f1f8ff;
}

.menu-decoration-bar {
  width: 0.2rem;
  height: 0rem;
  transition: background-color 0.2s, height 0.2s;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}

.menu-item-active .menu-decoration-bar {
  height: 4rem;
  background-color: #0073e6;
}

.menu-item .el-row {
  height: 100%;
  width: 100%;
  margin: 0;
  color: #bbc0c3;
  transition: color 0.2s;
}

.menu-item-active .el-row {
  color: #0073e6;
}

.menu-item .el-icon {
  font-size: 2rem;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0 auto 2rem;
  transition: margin 0.2s;
}

.menu-item.tight .el-icon {
  margin: auto 0 auto 1rem;
}

.menu-item p {
  font-size: 1.1rem;
  line-height: 4rem;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0 auto 1rem;
}
</style>
