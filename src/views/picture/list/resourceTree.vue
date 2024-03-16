<template>
  <div class="tree_container">
    <div class="search_container">
      <el-input v-model="keyWord" style="width: 240px" placeholder="Please Input" :suffix-icon="Search" />
      <el-icon :size="30">
        <CirclePlus @click="addDir('/')" />
      </el-icon>
    </div>
    <el-tree :data="treeData" :props="defaultProps" node-key="id" @node-click="handleNodeClick">
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <div class="node-left">{{ node.label }}</div>
          <div @click.stop>
            <el-dropdown trigger="click" placement="bottom-start">
              <span class="el-dropdown-link">
                <el-icon>
                  <MoreFilled />
                </el-icon>
              </span>
              <template v-slot:dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>选项1</el-dropdown-item>
                  <el-dropdown-item>选项2</el-dropdown-item>
                  <el-dropdown-item>选项3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </template>
    </el-tree>
    <CreateDirDialog v-model:visible="dirDialogVisible" :currentPath="currentPath" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { Search, CirclePlus, MoreFilled } from "@element-plus/icons-vue"
import CreateDirDialog from "./createDirDialog.vue"
interface Tree {
  label: string
  children?: Tree[]
}

const keyWord = ref("")
const dirDialogVisible = ref(false)
const currentPath = ref("")
watch(
  () => dirDialogVisible.value,
  (v) => {
    console.log("v", v)
  }
)

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const addDir = (path: string) => {
  dirDialogVisible.value = true
  currentPath.value = path
}

const treeData: Tree[] = [
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1"
          }
        ]
      }
    ]
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1"
          }
        ]
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1"
          }
        ]
      }
    ]
  },
  {
    label: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1"
          }
        ]
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1"
          }
        ]
      }
    ]
  }
]

const defaultProps = {
  children: "children",
  label: "label"
}
</script>

<style scoped lang="scss">
.tree_container {
  height: 100%;
}

.el-tree {
  height: 80%;
}

::v-deep(.el-tree-node__content) {
  height: 40px;
  border: 1px solid #057eca;
  border-radius: 5px;
}

.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  flex: 1;
}

.node-left {
  flex: 1;
}

.search_container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
