<template>
  <el-row class="tac">
    <el-col :span="4">
      <div class="logo">Logo</div>
      <el-menu
        class="el-menu-vertical"
        default-active="2"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item-group title="用户">
          <el-menu-item index="1-1" @click="router.push('/')">首页</el-menu-item>
          <el-menu-item index="1-2" @click="router.push('/user')">用户列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <div class="content-header">header</div>
      <div class="content-container">
        <router-view />
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="less">
.logo{
  height: 60px;
  background-color: rgb(37, 36, 36);
  color: white;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
}
.el-menu-vertical{
  height: calc(100vh - 60px);
}
.content-header{
  height: 60px;
  background-color: rgb(148, 66, 66);
  color: black;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
}
.content-container{
  .div-bordered();
  margin: 20px;
}
</style>
