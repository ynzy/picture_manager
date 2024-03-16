<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="fileName" label="文件名" />
    <el-table-column prop="size" label="大小" />
    <el-table-column prop="folder" label="文件夹数量" />
    <el-table-column prop="apertureValue" label="光圈值" />
    <el-table-column prop="originalTime" label="原始日期" />
    <el-table-column prop="fileSource" label="厂商" />
    <el-table-column prop="shutterSpeedValue" label="快门速度" />
  </el-table>
</template>

<script lang="ts" setup>
import { getFilePage } from "@/api/pictrue"
import { useUserStore } from "@/store/modules/user"
import { onMounted, ref } from "vue"

const tableData = ref()

const useUser = useUserStore()

const params = ref({
  userid: 0,
  parentId: 0,
  pageIndex: 0,
  pageSize: 0,
  apertureValue: "string",
  originalTime: "string",
  fileSource: "string",
  shutterSpeedValue: "string",
  startTime: "string",
  endTime: "string"
})

const getList = async () => {
  const res: any = await getFilePage(params.value)
  // console.log(res)
  tableData.value = res.data.list
}

onMounted(() => {
  // console.log(useUser.userInfo)
  getList()
})
</script>
