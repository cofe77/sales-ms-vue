<template>
  <el-row class="tac">
    <el-col :span="3">
      <div class="logo">阿城酒吧</div>
      <el-menu
        class="el-menu-vertical"
        default-active="2"
        router
      >
        <template v-for="route in AdminRoute" :key="route.path">
          <el-menu-item v-if="!route.children" :index="route.path">
            <el-icon>
              <component :is="route.icon" />
            </el-icon>
            <span>{{route.name}}</span>
          </el-menu-item>
          <el-sub-menu v-else :index="route.path">
            <template #title>
              <el-icon>
                <component :is="route.icon" />
              </el-icon>
              <span>{{route.name}}</span>
            </template>
            <el-menu-item v-for="subRoute in route.children" :key="subRoute.path" :index="subRoute.path">{{subRoute.name}}</el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <div class="content-header">header</div>
      <div class="content-container">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view />
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { AdminRoute } from '@/router/admin-route'

</script>

<style lang="less" scoped>
.logo{
  height: 60px;
  background-color: #252424;
  color: white;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
}
.el-menu-vertical{
  height: calc(100vh - 65px);
}
.content-header{
  height: 60px;
  background-color: #9442FF;
  color: #fff;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
}
.content-container{
  margin: 20px;
  .breadcrumb{
    font-size: 12px;
    margin-bottom: 10px;
  }
}
</style>
