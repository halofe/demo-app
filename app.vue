<template>
  <client-only>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="/">
        X演示系统
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="/users">用户管理</el-menu-item>
      <el-menu-item index="/users/create">文件上传</el-menu-item>
      <el-menu-item index="/upload">文件分片上传</el-menu-item>
      <el-menu-item index="/xxx">分类管理</el-menu-item>
    </el-menu>
  </client-only>
  <NuxtPage/>
</template>

<script setup>
function handleSelect(key, keyPath) {
  navigateTo(key)
}
</script>
<style scoped>
.flex-grow {
  flex: 1
}
</style>