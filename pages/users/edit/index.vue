<template>
  新建用户
  <UsersEditUserForm :user="user"/>
</template>

<script setup>
const user = {
  name: '',
  age: '',
  gender: '',
}
</script>