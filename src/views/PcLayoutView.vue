<template>
  <div class="pc-header">阿城酒吧</div>
  <div class="pc-btn-group">
    <div class="pc-btn" :class="{'pc-btn-on': current === 'pc'}" @click="pcLinkTo('/pc')">首页</div>
    <div class="pc-btn" :class="{'pc-btn-on': current === 'order'}" @click="pcLinkTo('/pc/order')">点餐</div>
    <div class="pc-btn" :class="{'pc-btn-on': current === 'vip'}" @click="pcLinkTo('/pc/vip')">VIP</div>
    <div class="pc-btn" :class="{'pc-btn-on': current === 'inventory'}" @click="pcLinkTo('/pc/inventory')">库存</div>
    <div class="pc-btn" :class="{'pc-btn-on': current === 'search'}" @click="pcLinkTo('/pc/search')">查询</div>
  </div>
  <div class="pc-body">
    <div class="pc-dynamic">
      <router-view></router-view>
    </div>
    <div class="pc-waitForSend">
      <div class="waitForSend-header">待配送</div>
      <div class="waitForSend-body">
        <div v-for="item in dispatchList" :key="item.id" class="waitForSend-item">
          <div class="waitForSend-name">{{item.goods?.name || ''}}</div>
          <div class="waitForSend-count">×{{item.count}}</div>
          <div class="waitForSend-confirm">
            <div class="waitForSend-confirm-btn" @click="handleDispatch(item.id)">确认</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, type Ref } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { io } from 'socket.io-client'
import type { OrderGoodsType } from '@/types/goods'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const current = ref('pc')
const dispatchList: Ref<OrderGoodsType[]> = ref([])

watch(route,()=>current.value = location.href.split('/').reverse()[0])
const pcLinkTo = (target:string) => {
  router.push(target)
}

const socket = io('http://192.168.1.2:3001',{
  transports: ['websocket']
})

socket.emit('findAllDispatch',null,(data: any) => {
  dispatchList.value = data
})

onMounted(() => {
  socket.on('newOrder',()=>{
    socket.emit('findAllDispatch',null,(data: any) => {
      dispatchList.value = data.result
    })
  })
})


const handleDispatch = (id: string) => {
  socket.emit('finishDispatchById',id,(data:any)=>{
    if(data.affected === 1){
      dispatchList.value = dispatchList.value.filter((dis:OrderGoodsType)=>dis.id!==id)
      ElMessage.success('配送成功')
    }else{
      ElMessage.error('配送失败')
    }
  })
}
</script>

<style lang="less" scoped>
.pc-header{
  line-height: 6vh;
  border-bottom: 1px solid #d8d8d8;
  text-align: center;
  font-size: 20px;
}
.pc-btn-group{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 16px 0;
  .pc-btn{
    flex: 1;
    line-height: 8vh;
    background-color: rgb(252, 225, 225);
    margin-right: 16px;
    text-align: center;
    font-size: 30px;
    cursor: pointer;
    .div-bordered();
    &:first-child{
      margin-left: 16px;
    }
    &:hover{
      background-color: rgb(231, 146, 146);
    }
  }
  .pc-btn-on{
    background-color: #f47878;
  }
}
.pc-body{
  display: grid;
  gap: 16px;
  grid-template-columns: 4fr 1fr;
  margin-bottom: 16px;
  .pc-dynamic{
    height: 660px;
    border: 1px solid #d8d8d8;
    margin-left: 16px;
    padding: 1px;
    overflow: hidden;
  }
  .pc-waitForSend{
    margin-right: 16px;
    border: 1px solid #d8d8d8;
    .waitForSend-header{
      line-height: 30px;
      text-align: center;
      background-color: rgb(216, 216, 216);
    }
    .waitForSend-body{
      height: 632px;
      overflow-y: scroll;
      .waitForSend-item{
        display: flex;
        cursor: pointer;
        border-top: 1px solid #d8d8d8;
        padding-left: 10px;
        align-items: center;
        &:last-child{
          border-bottom: 1px solid #d8d8d8;
        }
        .waitForSend-name{
          width: 130px;
          line-height: 40px;
        }
        .waitForSend-count{
          line-height: 40px;
        }
        .waitForSend-confirm{
          display: none;
          margin-left: 10px;
          .waitForSend-confirm-btn{
            background-color: rgb(99, 63, 207);
            padding: 5px 10px;
            border-radius: 3px;
            color: #d8d8d8;
          }
        }
        &:hover{
          .waitForSend-confirm{
            display: block;
          }
        }
      }
    }
  }
}
</style>
