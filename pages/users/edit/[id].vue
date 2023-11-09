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
const userId = route.params.id
const { data: user, error} = await useFetch('/api/user/get?id=' + userId)
</script>