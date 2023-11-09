<template>
  {{ userId ? '编辑用户' : '新建用户' }}
  <UsersEditUserForm :user="user"/>
</template>

<script setup>
definePageMeta({
  validate: (route) => {
    return !!Number(route.params.id)
  }
})
const route = useRoute()
import {get as getUser} from '@/server/services/users.js'
const userId = route.params.id
const { data: user, error} = await useAsyncData('user' + userId, () => {
  return getUser(Number(userId))
})
</script>