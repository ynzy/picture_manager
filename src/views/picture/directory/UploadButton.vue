<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue"
import { onMounted, ref } from "vue"
const visible = defineModel<boolean>("visible", { default: false })

const uploadUrl = import.meta.env.VITE_BASE_API + "/file/upload"

const props = defineProps({
  params: {
    type: Object
  }
})
const emit = defineEmits(["updateList"])

const upload = ref()

const handleConfirm = async () => {
  // const params = { ...props.params, fileName: fileName.value }
  // const res = await addFolder(params)
  // console.log(res)
  // if (res.statusCode == 200) {
  handleClose()
  emit("updateList")
  // }
}

const handleClose = () => {
  visible.value = false
  reset()
}
const reset = () => {
  upload.value.clearFiles()
}
onMounted(() => {
  console.log()
})
</script>
<template>
  <el-dialog v-model="visible" title="请上传文件" width="500" :before-close="handleClose">
    <el-upload ref="upload" class="upload-demo" drag :action="uploadUrl" :data="params" :on-success="handleConfirm">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽文件到此区域<em>点击上传</em></div>
      <!-- <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </template> -->
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <!-- <el-button @click="handleClose">取消</el-button> -->
        <!-- <el-button type="primary" @click="handleConfirm"> 确认 </el-button> -->
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped></style>
