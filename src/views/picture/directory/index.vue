<script setup lang="ts">
import { getFilePage, removeFile, downFile, fileArchives } from "@/api/pictrue"
import { useUserStore } from "@/store/modules/user"
import { onMounted, ref, watch } from "vue"
import CreateDirDialog from "./createDirDialog.vue"
import UploadButton from "./UploadButton.vue"
import { Refresh } from "@element-plus/icons-vue"

import dayjs from "dayjs"

import { ElMessage } from "element-plus"
const tableData = ref()

const useUser = useUserStore()

const dirIdPath = ref([])

const date = ref({
  startTime: "",
  endTime: ""
})

const params = ref({
  userid: "",
  parentId: 0,
  apertureValue: "",
  shutterSpeedValue: "",
  startTime: "",
  endTime: ""
})

watch(
  () => date.value.startTime,
  (v) => {
    params.value.startTime = dayjs(v).valueOf()
  }
)
watch(
  () => date.value.endTime,
  (v) => {
    params.value.endTime = dayjs(v).valueOf()
  }
)

const handleBackPath = () => {
  console.log("dirIdPath.value", dirIdPath.value)

  if (!dirIdPath.value.length) return
  // const id = dirIdPath.value[dirIdPath.value.length - 1]
  const id = dirIdPath.value.pop()

  params.value.parentId = id
  getList()
}

const getList = async () => {
  const res: any = await getFilePage(params.value)
  // console.log(res)
  tableData.value = res.data.list
}

const dateformat = (row: any) => {
  const time = row.originalTime || row.createTime
  return dayjs(Number(time)).format("YYYY-MM-DD HH:mm")
}

const handleRowDblclick = (row: any) => {
  console.log(row)
  if (row.folder === 1) {
    params.value.parentId = row.id
    dirIdPath.value.push(row.parentId)
    getList()
  }
}

const dirDialogVisible = ref(false)
const parentId = ref("")
const addDir = () => {
  dirDialogVisible.value = true
  parentId.value = dirIdPath.value[dirIdPath.value.length - 1]
}

const uploadDialogVisible = ref(false)
const addUpload = () => {
  uploadDialogVisible.value = true
}

const handleDelete = async (row: any) => {
  const res = await removeFile({ id: row.id })
  if (res.statusCode == 200) {
    getList()
  }
}

const handleFileArchives = async (row) => {
  const { fileName, bucketName } = row
  const res = await fileArchives({ fileName, bucketName })
  if (res.statusCode == 200) {
    ElMessage({
      message: "归档成功",
      type: "success"
    })
  }
}

const handleDown = async (row) => {
  const { fileName, bucketName } = row
  const res = await downFile({ fileName, bucketName })
  // console.log(res)
  // 创建 Blob 对象
  const blob = new Blob([res], { type: "image/jpeg" })

  // 创建指向 Blob 的 URL
  const url = window.URL.createObjectURL(blob)

  // 创建一个 a标签用于下载
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", fileName) // 设置下载的文件名
  document.body.appendChild(link)

  // 模拟点击a标签下载文件
  link.click()

  // 下载完成后移除a标签和释放Blob URL
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
const regex = /\.(jpg|jpeg|png|gif)$/i

const isPreview = (row) => {
  return regex.test(row.fileName)
}

const previewUrl = ref("")

const handlePreview = async (row) => {
  const { fileName, bucketName } = row
  const res = await fileSee({ fileName, bucketName })
  if (res.statusCode == 200) {
    previewUrl.value = res.data
  }
}

const handleSearch = () => {
  getList()
}

const resetSearch = () => {
  const defaultValue = {
    apertureValue: "",
    shutterSpeedValue: "",
    startTime: "",
    endTime: ""
  }
  date.value = {
    startTime: "",
    endTime: ""
  }
  params.value = { ...params.value, ...defaultValue }
  getList()
}

const previewUrlNew = ref("")
const previewVisible = ref(false)
const handlePreviewUrl = (url) => {
  previewUrlNew.value = url
  previewVisible.value = true
}

onMounted(() => {
  // console.log(useUser.userInfo)
  // dirIdPath.value.push(params.value.parentId)
  params.value.userid = useUser.userInfo.id
  getList()
})
</script>
<template>
  <div>
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="params">
        <el-form-item prop="apertureValue" label="光圈值">
          <el-input v-model="params.apertureValue" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="shutterSpeedValue" label="快门速度">
          <el-input v-model="params.shutterSpeedValue" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="startTime" label="开始时间">
          <el-date-picker v-model="date.startTime" type="date" placeholder="开始时间" />
          <!-- <el-input v-model="params.startTime" placeholder="请输入" /> -->
        </el-form-item>
        <el-form-item prop="endTime" label="结束时间">
          <el-date-picker v-model="date.endTime" type="date" placeholder="结束时间" />
          <!-- <el-input v-model="params.endTime" placeholder="请输入" /> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="dirpath_container">
      <el-button @click="handleBackPath" v-if="dirIdPath.length">返回上一级</el-button>
      <el-button @click="addUpload">上传文件</el-button>
      <el-button @click="addDir">新建文件夹</el-button>

      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in dirIdPath" :key="index">
          <el-link :href="item" target="_blank">{{ item }}</el-link>
        </el-breadcrumb-item>
      </el-breadcrumb> -->
    </div>
    <el-table :data="tableData" style="width: 100%" @row-dblclick="handleRowDblclick">
      <!-- <el-table-column type="selection" width="55px" /> -->
      <el-table-column prop="fileName" label="文件名" />
      <el-table-column prop="createTime" label="创建时间">
        <template v-slot="scope">
          {{ dateformat(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column prop="folder" label="类型">
        <template v-slot="scope">
          <el-tag v-if="scope.row.folder === 1">文件夹</el-tag>
          <el-tag v-else>文件</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小">
        <template v-slot="scope"> {{ scope.row.size || "-" }} </template>
      </el-table-column>
      <el-table-column label="图片">
        <template v-slot="{ row }">
          <el-image v-if="isPreview(row)" :src="row.fileUrl" @click="handlePreviewUrl(row.fileUrl)" />
          <div class="text_url" v-else-if="row.folder !== 1">{{ row.fileUrl }}</div>
          <div v-else>暂无</div>
        </template>
      </el-table-column>
      <el-table-column prop="apertureValue" label="光圈值" />
      <el-table-column prop="originalTime" label="原始日期" />
      <el-table-column prop="fileSource" label="厂商" />
      <el-table-column prop="shutterSpeedValue" label="快门速度" />
      <el-table-column label="操作" width="300">
        <template v-slot="{ row }">
          <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          <!-- <el-button v-if="isPreview(row)" type="primary" size="small" @click="handlePreview(row)">预览</el-button> -->
          <el-button v-if="row.folder !== 1" type="primary" size="small" @click="handleDown(row)">下载</el-button>
          <el-button v-if="row.folder !== 1" @click="handleFileArchives(row)">归档</el-button>
        </template>
      </el-table-column>
    </el-table>
    <CreateDirDialog v-model:visible="dirDialogVisible" :params="params" @updateList="getList" />
    <UploadButton v-model:visible="uploadDialogVisible" :params="params" @updateList="getList" />
    <el-dialog v-model="previewVisible" width="500">
      <div>
        <img style="width: 100%; height: 100%" :src="previewUrlNew" alt="" />
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.dirpath_container {
  padding: 10px 20px 10px 0;
  // border: 1px solid #ebe;
}

.text_url {
  height: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
