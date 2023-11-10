<template>
  <div class="tb-toolbar">
    <el-button @click="onAddUser" type="primary" >添加用户</el-button>
  </div>
  <el-table :data="data" style="width: 100%">
    <el-table-column label="头像" width="180" >
      <template #default="{row}">
        <el-avatar :size="60" :src="row.avatar">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="gender" label="性别" width="180" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column label="操作">
      <template #default="{row, $index}">
        <el-button @click="onEditUser(row.id)" size="small">编辑</el-button>
        <el-button @click="onDeleteUser(row.id, $index)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
const { data, error} = await useFetch('/api/user/list')

function onAddUser() {
  navigateTo('/users/create')
}
function onEditUser(id) {
  navigateTo(`/users/edit/${id}`)
}

async function onDeleteUser(id, $index) {
  await ElMessageBox.confirm('确定要删除用户吗?', '提示',  { type: 'warning', } )
  try {
    const res = await $fetch('/api/user/delete?id=' + id, {
      method: 'POST'
    })
    data.value.splice($index, 1)
    ElMessage.success('删除成功！')
  } catch(ex) {
    ElMessage.error(ex.data.message)
    console.error(ex.data)
  }
}
</script>
<style scoped>
.tb-toolbar {
  padding: .3em 0;
  text-align: right;
}
</style>
