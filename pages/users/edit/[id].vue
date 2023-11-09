<template>
  {{ userId ? '编辑用户' : '新建用户' }}
  <el-form :model="user" label-width="120px">
    <el-form-item label="姓名">
      <el-input v-model="user.name" />
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model="user.gender" />
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="user.age" />
    </el-form-item>
  </el-form>
</template>

<script setup>
definePageMeta({
  validate: (route) => {
    const id =  route.params.id
    return id === 0 || !isNaN(Number(id))
  }
})
const route = useRoute()
import {get1 as getUser} from '@/server/services/users.js'
const userId = route.params.id
const { data: user, error} = await useAsyncData('user' + userId, () => {
  return getUser(Number(userId))
})
</script>