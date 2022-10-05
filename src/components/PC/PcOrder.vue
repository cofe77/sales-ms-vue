<template>
  <div class="pc-order">
    <div class="goods-type-container">
      <div class="goods-type-header">分类</div>
      <div v-for="i in 10" :key="i" class="goods-type-item" :class="{'goods-type-item-on': i === 1}">酒水</div>
    </div>
    <div class="goods-container">
      <div v-for="i in 20" :key="i" class="goods">
        <div class="goods-img">
          <img src="../../../static/image/beer.png" alt="">
        </div>
        <div class="goods-name">啤酒（罐）</div>
        <div class="goods-desc">雪花</div>
        <div class="goods-price">8.00元</div>
      </div>
    </div>
    <div class="order-operation">
      <div class="order-operation-header">外带</div>
      <div class="order-operation-body">
        <div class="order-item">
          <div class="order-item-name">商品</div>
          <div class="order-item-count">数量</div>
          <div class="order-item-price">价格</div>
        </div>
        <div v-for="i in 10" :key="i" class="order-item">
          <div class="order-item-name">啤酒（罐）</div>
          <div class="order-item-count">×100</div>
          <div class="order-item-price">80000.00</div>
        </div>
      </div>
      <div class="order-operation-total">
        <div class="order-item">
          <div class="order-item-name">合计</div>
          <div class="order-item-count"></div>
          <div class="order-item-price">80000.00</div>
        </div>
      </div>
      <div class="order-operation-confirm">确认</div>
    </div>
  </div>
</template>

<script lang="ts" setup>

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
      .goods-img{
        width: 127px;
        height: 86px;
        img{
          width: 100%;
          height: 100%;
          border: 1px solid #d8d8d8;
        }
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