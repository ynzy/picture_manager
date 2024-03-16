import { request } from "@/utils/service"

export function getFilePage(data: any) {
  return request({
    url: "/file/page",
    method: "post",
    data
  })
}
export function addFolder(data: any) {
  return request({
    url: "/file/folder",
    method: "post",
    data
  })
}
export function removeFile(data: any) {
  return request({
    url: "/file/remove",
    method: "post",
    data
  })
}
export function downFile(data: any) {
  return request({
    url: "/file/download",
    method: "post",
    data,
    responseType: "blob"
  })
}
export function fileArchives(data: any) {
  return request({
    url: "/file/archives",
    method: "post",
    data
  })
}
export function fileSee(data: any) {
  return request({
    url: "/file/see",
    method: "post",
    data
  })
}
