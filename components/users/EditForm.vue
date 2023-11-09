<template>
  <el-form :model="user" label-width="120px">
    <el-form-item label="姓名">
      <el-input v-model="user.name" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="user.gender" >
        <el-radio :label="1" size="large">男</el-radio>
        <el-radio :label="2" size="large">女</el-radio>
        <el-radio :label="0" size="large">保密</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="头像">
      <el-avatar :size="60" :src="user.avatar">
        <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        />
      </el-avatar>
      <input type="file" @change="onAvatarChange" accept="image/*"/>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model.number="user.age" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">
        {{user.id ? '保存' : '创建'}}
      </el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>

const {user} = defineProps({
  user: {
    type: Object,
    required: true,
  }
})

function back() {
  history.back()
}

async function onAvatarChange(e) {
  const file = e.target.files[0]
  if(!file) {
    return
  }
  const form = new FormData()
  form.append('file', file)
  try {
    const src = await $fetch('/api/upload', {
      method: 'POST',
      body: form
    })
    user.avatar = src
    ElMessage.success('上传成功！')
  } catch(ex) {
    console.error(ex)
  }
}

async function onSubmit() {
  try {
    const data = await $fetch('/api/user/upsert', {
      method: 'POST',
      body: JSON.stringify(user)
    })
    ElMessage.success(user.id ? '保存成功！' : '创建成功！')
    history.back()
  } catch(ex) {
    console.error(ex)
  }
}
</script>