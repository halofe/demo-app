<template>
  新建用户
  <UsersEditForm :user="user"/>
</template>

<script setup>
import {reactive} from 'vue'
const user = reactive({
  name: '',
  age: '',
  avatar: '',
  gender: '',
})
</script>