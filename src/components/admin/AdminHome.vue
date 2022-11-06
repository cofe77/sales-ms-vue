<template>
  <div class="header">
    早上好，阿城。
  </div>
  <div class="statistics">
    <div class="statistics-item">
      <div class="statistics-title">销售额</div>
      <div class="statistics-data">¥30000000.00</div>
      <div class="statistics-chart"></div>
      <div class="statistics-opation">今日</div>
    </div>
    <div class="statistics-item">
      <div class="statistics-title">销售额</div>
      <div class="statistics-data">¥30000000.00</div>
      <div class="statistics-chart"></div>
      <div class="statistics-opation">今日</div>
    </div>
    <div class="statistics-item">
      <div class="statistics-title">销售额</div>
      <div class="statistics-data">¥30000000.00</div>
      <div class="statistics-chart"></div>
      <div class="statistics-opation">今日</div>
    </div>
  </div>
  <div class="rank">
    <div class="rank-item">
      <div class="rank-title">商品销售排行</div>
      <div class="rank-content">
        <div class="rank-first-3">
          <div class="first-3-item second-item">
            <div class="rank-point">2</div>
            <div class="goods">title</div>
            <div class="data">3000</div>
          </div>
          <div class="first-3-item first-item">
            <div class="rank-point">2</div>
            <div class="goods">title</div>
            <div class="data">3000</div>
          </div>
          <div class="first-3-item third-item">
            <div class="rank-point">2</div>
            <div class="goods">title</div>
            <div class="data">3000</div>
          </div>
        </div>
        <div class="rank-last">
          <table>
            <tr>
              <th>排名</th>
              <th>商品</th>
              <th>销量</th>
            </tr>
            <tr v-for="i in 7" :key="i">
              <td>{{i+3}}</td>
              <td>示例</td>
              <td>销量</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="rank-item">
      <div class="rank-title">商品销售排行</div>
      <div class="rank-content">
        <div class="rank-first-3">
          <div class="first-3-item second-item">
            <div class="rank-point">2</div>
            <div class="goods">title</div>
            <div class="data">3000</div>
          </div>
          <div class="first-3-item first-item">
            <div class="rank-point">2</div>
            <div class="goods">title</div>
            <div class="data">3000</div>
          </div>
          <div class="first-3-item third-item">
            <div class="rank-point">2</div>
            <div class="goods">title</div>
            <div class="data">3000</div>
          </div>
        </div>
        <div class="rank-last">
          <table>
            <tr>
              <th>排名</th>
              <th>商品</th>
              <th>销量</th>
            </tr>
            <tr v-for="i in 7" :key="i">
              <td>{{i+3}}</td>
              <td>示例</td>
              <td>销量</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.header{
  font-size: 30px;
}
.statistics{
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  .statistics-item{
    width: 395px;
    position: relative;
    .div-bordered();
    background-color: #7546B3;
    color: #fff;
    border-radius: 16px;
    padding: 10px;
    .statistics-title{
      text-align: center;
      font-size: 30px;
      line-height: 50px;
    }
    .statistics-data{
      text-align: center;
      font-size: 40px;
      line-height: 50px;
      color: rgb(255, 207, 84);
    }
    .statistics-chart{
      height: 180px;
    }
    .statistics-opation{
      position: absolute;
      top: 8px;
      right: 10px;
      background-color: #b38de6;
      padding: 5px 10px;
      border-radius: 10px;
    }
  }
}
.rank{
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  .rank-item{
    width: 600px;
    .rank-title{
      font-size: 18px;
      line-height: 30px;
    }
    .rank-content{
      .div-bordered();
      border-radius: 16px;
    }
    .rank-first-3{
      display: flex;
      justify-content: space-around;
      margin: 20px;
      .first-3-item{
        width: 170px;
        height: fit-content;
        .div-bordered();
        position: relative;
        text-align: center;
        border-radius: 16px;
        background-color: #7546B3;
        .rank-point{
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          position: absolute;
          top: -18px;
          left: 68px;
          border-radius: 999px;
          border: 5px solid;
        }
        .goods{
          margin-top: 18px;
          line-height: 30px;
          font-size: 26px;
          color: #fff;
        }
        .data{
          line-height: 30px;
          font-size: 18px;
          color: #fff;
        }
      }
      .first-item{
        .rank-point{
          background-color: #FFDD00;
          border-color: #FF4400;
        }
      }
      .second-item{
        margin-top: 30px;
        .rank-point{
          background-color: #FFEC45;
          border-color: #FF8F8F;
        }
      }
      .third-item{
        margin-top: 30px;
        .rank-point{
          background-color: #FFFACC;
          border-color: #FCCAB8;
        }
      }
    }
    .rank-last{
      table{
        width: calc(100% - 20px);
        text-align: center;
        border-spacing: 0;
        border-collapse: collapse;
        margin: 10px;
        tr{
          th{
            .div-bordered();
            background-color: #AF5EFF;
            color: #fff;
          }
          td{
            .div-bordered();
            line-height: 24px;
          }
        }
      }
    }
  }
}
</style>