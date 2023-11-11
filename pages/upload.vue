<template>
  <div>已实现断点续传，及上传过的文件秒传</div>
  <el-avatar :size="60" :src="avatar">
    <img
      src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
    />
  </el-avatar>
  <input type="file" @change="onAvatarChange" accept="image/*"/>
</template>
<script setup>
import {ref} from 'vue'
import SparkMD5 from 'spark-md5'
const avatar = ref('')

async function onAvatarChange(e) {
  const file = e.target.files[0]
  if(!file) {
    return
  }
  try {
    const url = await uploadFile(file)
    avatar.value = url
  } catch(ex) {
    const data = ex.data
    console.error(data || ex)
    ElMessage.error(data ? data.message : '上传出错')
  }
}

// 大文件避免卡顿 WebWorker https://blog.csdn.net/weixin_43989307/article/details/124863516
// https://github.com/satazor/js-spark-md5#hash-a-file-incrementally
async function hashBlob(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      const hash = SparkMD5.ArrayBuffer.hash(reader.result)
      resolve(hash);
    };
    reader.readAsArrayBuffer(blob);
  })
}
async function uploadPrepare(file, chunks) {
  await Promise.all(chunks.map(async x => {
    const hash = await hashBlob(file.slice(x.start, x.end))
    x.hash = hash
    return x
  }))
  // 检查每个片段是已存在
  const chunkStatus = await $fetch('/api/uploadPrepare', {
    method: 'POST',
    body: JSON.stringify({chunks})
  })
  return chunkStatus
}

async function uploadFile(file) {
  const chunkSize = 1 * 1024 * 1024
  const fileSize = file.size
  const chunks = []
  for(let i = 0, chunksCount = Math.ceil(fileSize/chunkSize); i < chunksCount; i++) {
    const start = i * chunkSize
    const end = i === chunksCount - 1 ? fileSize : start + chunkSize
    chunks.push({start, end})
  }
  const chunkStatus = await uploadPrepare(file, chunks)
  const slices = await Promise.all(chunks.map(x => {
    if(chunkStatus[x.hash]) { // prepare 返回已存在
      return x.hash
    }
    const form = new FormData()
    form.append('file', file.slice(x.start, x.end))
    form.append('sliced', 1)
    return $fetch('/api/upload', {
      method: 'POST',
      body: form,
    })
  }))
  const url = await $fetch('/api/uploadMerge', {
    method: 'POST',
    body: JSON.stringify({slices, type: file.type})
  })
  return url
}
</script>