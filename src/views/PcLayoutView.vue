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
      <div v-for="i in 8" :key="i" class="waitForSend-item">
        <div class="waitForSend-name">啤酒（罐）×1</div>
        <div class="waitForSend-confirm">
          <div class="waitForSend-confirm-btn">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const current = ref('pc')
watch(route,()=>current.value = location.href.split('/').reverse()[0])
const pcLinkTo = (target:string) => {
  router.push(target)
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
        width: 140px;
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
</style>
