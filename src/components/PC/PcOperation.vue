<template>
  <div class="pc-operation">
    <div v-for="desk in deskList" :key="desk.id" :class="['pc-desk', {'pc-desk-on':!!desk.order}]">
      <div class="desk-name">{{desk.name}}</div>
      <div class="desk-type">{{desk.type?.name || '大厅'}}</div>
      <div v-show="desk.order?.finishTime" class="desk-startTime">开始时间：{{ moment(desk.order?.createTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from '@/api'
import type DeskType from '@/types/desk'
import moment from 'moment'
import { ref, type Ref } from 'vue'

const deskList: Ref<DeskType[]> = ref([])
api.getDeskListWithOrder().then(res=>{
  deskList.value = res.data.data
})
</script>

<style lang="less">
  .pc-operation{
    height: 660px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    overflow-y: auto;
    .pc-desk{
      height: 160px;
      border: 1px solid #d8d8d8;
      margin: 2px;
      text-align: center;
      background-color: rgb(150, 241, 135);
      .desk-name{
        font-size: 24px;
        margin-top: 20px;
      }
      .desk-type{
        font-size: 18px;
        margin-top: 20px;
      }
      .desk-startTime{
        font-size: 16px;
        margin-top: 20px;
      }
    }
    .pc-desk-on{
      background-color: #e9abab;
    }
  }
</style>