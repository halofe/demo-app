<template>
  <el-button type="primary" >添加用户</el-button>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="gender" label="性别" width="180" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column label="操作">
      <template #default="{row}">
        <NuxtLink :href="`/users/edit/${row.id}`">编辑</NuxtLink>
        <el-button @click="deleteUser(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import {list as getUsers} from '@/server/services/users.js'
const { data, error} = await useAsyncData('userlist', () => {
  return getUsers()
})
console.log(JSON.stringify(data))
</script>