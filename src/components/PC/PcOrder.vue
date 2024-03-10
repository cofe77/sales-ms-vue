<template>
  <div class="pc-order">
    <div class="goods-type-container">
      <div class="goods-type-header">分类</div>
      <div 
        v-for="goodsType in goodsTypeArr" 
        :key="goodsType.id" 
        :class="['goods-type-item',{'goods-type-item-on':goodsType.id === currentGoodsTypeId}]"
        @click="handleClickGoodsType(goodsType.id!)"
      >{{goodsType.name}}</div>
    </div>
    <div class="goods-container">
      <div 
        v-for="goods in currentGoodsType?.goods" 
        :key="goods.id" 
        class="goods"
        @click="orderStore.addItem(goods)"
      >
        <div class="goods-img">
          <img :src="goods.img" alt="">
        </div>
        <div class="goods-name">{{goods.name}}</div>
        <div class="goods-desc">{{goods.desc}}</div>
        <div class="goods-price">{{goods.price}}元</div>
      </div>
    </div>
    <div class="order-operation">
      <div class="order-operation-header">
        <el-button-group>
          <el-button class="btn" :type="orderDesk.name && 'danger'" @click="handleSelectDesk">选桌{{orderDesk.name && `(${orderDesk.name})`}}</el-button>
          <el-button class="btn" :type="!orderDesk.name && 'danger'" @click="handleSelectTakeAway">外带{{!orderDesk.name?'√':''}}</el-button>
        </el-button-group>
      </div>
      <div class="order-operation-body">
        <div class="order-item">
          <div class="order-item-name">商品</div>
          <div class="order-item-count">数量</div>
          <div class="order-item-price">价格</div>
        </div>
        <div v-for="item in orderItem" :key="item.goods.id" class="order-item">
          <div class="order-item-name">{{item.goods.name}}</div>
          <div class="order-item-count">×{{item.count}}</div>
          <div class="order-item-price">{{item.goods.price.toFixed(2)}}</div>
        </div>
      </div>
      <div class="order-operation-total">
        <div class="order-item">
          <div class="order-item-name">合计</div>
          <div class="order-item-count"></div>
          <div class="order-item-price">{{orderStore.getAmount.toFixed(2)}}</div>
        </div>
      </div>
      <div class="order-operation-confirm" @click="orderStore.createOrder">确认</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from '@/api'
import { useOrderStore } from '@/stores/order'
import type { GoodsTypeType } from '@/types/goods'
import { computed, toRefs, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const goodsTypeArr: Ref<GoodsTypeType[]> = ref([])
const currentGoodsTypeId = ref('')
const currentGoodsType = computed(() => goodsTypeArr.value.find(type => type.id === currentGoodsTypeId.value))

const orderStore = useOrderStore()
const router = useRouter()

const { item:orderItem,desk:orderDesk } = toRefs(orderStore)

const initData = () => {
  api.getGoodsTypeWithGoods().then(res => {
    goodsTypeArr.value = res.data.data
    currentGoodsTypeId.value = goodsTypeArr.value[0].id!
  })
}

initData()

const handleClickGoodsType = (typeId: string) => {
  currentGoodsTypeId.value = typeId
}

const handleSelectDesk = () => {
  router.push('/pc')
}

const handleSelectTakeAway = () => {
  orderStore.setTakeAway()
}

</script>

<style lang="less">
.pc-order{
  display: grid;
  gap: 3px;
  grid-template-columns: 1fr 5fr 2fr;
  padding: 1px;
  .goods-type-container{
    border: 1px solid #d8d8d8;
    text-align: center;
    .goods-type-header{
      line-height: 30px;
      background-color: #d8d8d8;
    }
    .goods-type-item{
      line-height: 40px;
      border-bottom: 1px solid #d8d8d8;
      cursor: pointer;
      &:hover{
        background-color: rgb(208, 150, 246);
      }
    }
    .goods-type-item-on{
      background-color: rgb(245, 167, 248);
    }
  }
  .goods-container{
    height: 655px;
    border: 1px solid #d8d8d8;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 3px;
    padding: 3px;
    overflow-y: auto;
    .goods{
      height: 160px;
      border: 1px solid #d8d8d8;
      text-align: center;
      background-color: rgb(216, 163, 251);
      padding: 2px;
      cursor: pointer;
      .goods-img{
        width: 145px;
        height: 86px;
        img{
          width: 100%;
          height: 100%;
          border: 1px solid #d8d8d8;
        }
      }
      .goods-name{
        font-size: 18px;
        line-height: 30px;
      }
      .goods-desc{
        line-height: 20px;
      }
      .goods-price{
        color: red;
      }
    }
  }
  .order-operation{
    border: 1px solid #d8d8d8;
    .order-operation-header{
      background-color: #d8d8d8;
      text-align: center;
      line-height: 30px;
    }
    .order-operation-body{
      height: 500px;
      .div-bordered-bottom()
    }
    .order-operation-total{
      height: 50px;
      .div-bordered-bottom()
    }
    .order-item{
      display: flex;
      font-size: 12px;
      line-height: 20px;
      .order-item-name{
        margin-left: 5px;
        width: 120px;
      }
      .order-item-count{
        margin-left: 5px;
        width: 30px;
      }
      .order-item-price{
        margin-left: 5px;
      }
    }
    .order-operation-confirm{
      text-align: center;
      line-height: 78px;
      font-size: 30px;
      background-color: @--sales-ms-btn-default-bg;
      color: #fff;
    }
  }
}
</style>