<template>
  <el-avatar :size="60" :src="avatar">
    <img
      src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
    />
  </el-avatar>
  <input type="file" @change="onAvatarChange" accept="image/*"/>
</template>
<script setup>
import {ref} from 'vue'
const avatar = ref('')

async function onAvatarChange(e) {
  const file = e.target.files[0]
  if(!file) {
    return
  }
  const url = await uploadFile(file)
  avatar.value = url
}
async function uploadFile(file) {
  console.log(file)
  const perFileSize = 1 * 1024 * 1024
  const arr = []
  for(let i = 0, end = 0; end < file.size; i++) {
    const start = i * perFileSize
    end = (i + 1) * perFileSize
    arr.push([start, end])
  }
  console.log('slices', arr)
  const slices = await Promise.all(arr.map(x => {
    const form = new FormData()
    form.append('file', file.slice(x[0], x[1]))
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