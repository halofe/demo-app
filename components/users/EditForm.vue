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
import {create, update} from '@/server/services/user.js'

const {user} = defineProps({
  user: {
    type: Object,
    required: true,
  }
})

function back() {
  history.back()
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
~/server/services/user.js