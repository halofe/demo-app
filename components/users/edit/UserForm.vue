<template>
  <el-form :model="user" label-width="120px">
    <el-form-item label="姓名">
      <el-input v-model="user.name" />
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model="user.gender" />
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model.number="user.age" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">
        创建
      </el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import {create, update} from '@/server/services/users.js'

const {user} = defineProps({
  user: {
    type: Object,
    required: true,
  }
})

function back() {
  history.back()
}

async function submitForm() {
  console.log(111, JSON.stringify(user))
  const { data, error} = await useAsyncData(() => {
    return user.id ? update(user) : create(user)
  })
  console.log(data, error)
}
</script>
