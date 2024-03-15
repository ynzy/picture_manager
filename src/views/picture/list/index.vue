<script setup lang="ts">
import ResourceTree from "./resourceTree.vue"
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <ResourceTree />
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>
<style lang="scss" scoped></style>
