<script setup lang="ts">
import ResourceTree from "./resourceTree.vue"
import ResourceList from "./resourceList.vue"
</script>
<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-aside width="240px"> -->
      <!-- <ResourceTree /> -->
      <!-- </el-aside> -->
      <el-main>
        <ResourceList />
      </el-main>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.el-container {
  height: 100vh;

  .el-aside {
    height: 100%;
  }
}
</style>
