<template>
  <el-tree :data="treeData" :props="defaultProps" node-key="id">
    <template #default="{ node, data }">
      <div class="custom-tree-node">
        <span class="node-left">{{ node.label }}</span>
        <el-dropdown trigger="click" placement="bottom-start">
          <span class="el-dropdown-link"> 下拉菜单<i class="el-icon-arrow-down el-icon--right" /> </span>
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>选项1</el-dropdown-item>
              <el-dropdown-item>选项2</el-dropdown-item>
              <el-dropdown-item>选项3</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
  </el-tree>
</template>

<script>
import { ElTree, ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus"

export default {
  components: {
    ElTree,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem
  },
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        }
        // ... 其他节点数据
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    }
  }
}
</script>

<style scoped>
.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}

.node-left {
  flex: 1;
}
</style>
