<template>
  <div class="pc-vip">
    <div class="pc-vip-search">
      <input type="text" class="vip-search-input">
      <div class="vip-btn">搜索</div>
      <div class="vip-btn">充值</div>
      <div class="vip-btn">存酒</div>
      <div class="vip-btn">注销</div>
    </div>
    <div class="pc-vip-info">
      <div class="info-item">
        <div class="info-title">姓&emsp;&emsp;名：</div>
        <div class="info-content">李四</div>
      </div>
      <div class="info-item">
        <div class="info-title">手机号码：</div>
        <div class="info-content">18833332222</div>
      </div>
      <div class="info-item">
        <div class="info-title">余&emsp;&emsp;额：</div>
        <div class="info-content">1000.00</div>
      </div>
      <div class="info-item">
        <div class="info-title">存&emsp;&emsp;酒：</div>
        <div class="info-content info-savedBeer">
          <div v-for="i in 20" :key="i" class="savedBeer-item">
            <div class="savedBeer-img">
              <img src="../../../static/image/beer.png" alt="">
            </div>
            <div class="savedBeer-name">啤酒（罐）</div>
            <div class="savedBeer-count">10</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less">
.pc-vip{
  padding: 10px;
  .pc-vip-search{
    display: flex;
    .vip-search-input{
      width: 200px;
      height: 40px;
      padding: 0 5px;
    }
    .vip-btn{
      line-height: 40px;
      padding: 2px 15px;
      border-radius: 3px;
      margin-left: 5px;
      background-color: @--sales-ms-btn-default-bg;
      color: #fff;
      cursor: pointer;
      user-select: none;
    }
  }
  .pc-vip-info{
    margin-top: 10px;
    .info-item{
      display: flex;
      margin-top: 10px;
      align-items: flex-start;
      .info-title{
        font-size: 20px;
      }
      .info-content{
        font-size: 18px;
        line-height: 22px;
      }
      .info-savedBeer{
        height: 490px;
        .div-bordered();
        flex: auto;
        display: grid;
        gap: 2px;
        padding: 2px;
        grid-template-columns: repeat(6,1fr);
        overflow-y: auto;
        .savedBeer-item{
          height: 130px;
          .div-bordered();
          text-align: center;
          .savedBeer-img{
            width: 100px;
            height: 80px;
            margin: 3px auto;
            img{
              width: 100%;
              height: 100%;
              .div-bordered();
            }
          }
          .savedBeer-name{
            
          }
          .savedBeer-count{
            
          }
        }
      }
    }
  }
}
</style>