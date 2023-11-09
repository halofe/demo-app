<template>
  {{ userId ? '编辑用户' : '新建用户' }}
  <UsersEditForm :user="user"/>
</template>

<script setup>
definePageMeta({
  validate: (route) => {
    return !!Number(route.params.id)
  }
})
const route = useRoute()
import {get as getUser} from '@/server/services/user.js'
const userId = route.params.id
const { data: user, error} = await useAsyncData('user' + userId, () => {
  return getUser(Number(userId))
})
</script>~/server/services/user.js