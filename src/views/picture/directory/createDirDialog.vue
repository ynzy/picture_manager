<template>
  <el-dialog v-model="visible" title="请输入目录名称" width="500">
    <div>当前目录：{{ params.parentId }}</div>
    <el-input v-model="fileName" placeholder="请输入目录名称" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { addFolder } from "@/api/pictrue"
const visible = defineModel<boolean>("visible", { default: false })
const props = defineProps({
  params: {
    type: Object
  }
})

const emit = defineEmits(["updateList"])

const fileName = ref("")

const handleConfirm = async () => {
  const params = { ...props.params, fileName: fileName.value }
  const res = await addFolder(params)
  // console.log(res)
  if (res.statusCode == 200) {
    handleClose()
    emit("updateList")
  }
}

const handleClose = () => {
  visible.value = false
  reset()
}
const reset = () => {
  fileName.value = ""
}
</script>
