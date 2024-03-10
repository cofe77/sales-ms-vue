<template>
  <div class="order-finish">
    <div class="left">
      <el-descriptions title="订单">
        <el-descriptions-item label="下单时间">{{moment(deskData.order.createTime).format('YYYY-MM-DD HH:MM:SS')}}</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-form :model="form" label-width="60px" :inline="true" size="large">
        <el-form-item label="会员">
          <el-input v-model="form.name" placeholder="请输入会员姓名或手机号码">
            <template #append>
              <el-button class="btn-primary btn-append"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="折扣">
          <el-switch v-model="form.delivery" />
        </el-form-item>
      </el-form>
      会员存酒
      <el-table :data="deskData.order.goods" style="width: 100%">
        <el-table-column label="商品" width="80">
          <template #default="scope">
            <p>{{scope.row.data?.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="单价">
          <template #default="scope">
            <p>{{scope.row.data?.price.toFixed(2)}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="数量" width="80" />
        <el-table-column label="折扣">
          <template #default="scope">
            <p>{{scope.row.data?.discount * 100}}%</p>
          </template>
        </el-table-column>
        <el-table-column label="价格">
          <template #default="scope">
            <p>{{(scope.row.data?.price * scope.row.data?.discount * scope.row.count).toFixed(2)}}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right">
      <div class="receipt">
        <div class="receipt-header">
          <div>
            xxx酒吧
          </div>
        </div>
        <div class="receipt-body">
          <div class="receipt-item">
            <div class="receipt-item-name">商品</div>
            <div class="receipt-item-count">数量</div>
            <div class="receipt-item-price">价格</div>
          </div>
          <div v-for="item in deskData.order.goods" :key="item.id" class="receipt-item">
            <div class="receipt-item-name">{{item.data.name}}</div>
            <div class="receipt-item-count">×{{item.count}}</div>
            <div class="receipt-item-price">{{item.data.price.toFixed(2)}}</div>
          </div>
        </div>
        <div class="receipt-total">
          <div class="receipt-item">
            <div class="receipt-item-name">合计</div>
            <div class="receipt-item-count">1</div>
            <div class="receipt-item-price">{{1}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from '@/api'
import { reactive, ref, toRefs, watch } from 'vue'
import moment from 'moment'

const emit = defineEmits(['open','opened','close','closed','ok'])
const props = defineProps({
  deskId: String,
  show: {
    type: Boolean
  }
})

const originDeskState = {
  id: '',
  order: {
    goods: [
      {
        id: '',
        data: {
          name: '',
          price: 0
        },
        count: 0
      }
    ],
    createTime: ''
  }
}
const finalOrder = {

}

const deskData = ref(originDeskState)
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const { deskId } = toRefs(props)
const initData = async () => {
  if (deskId?.value) {
    const { data } = await api.getDeskWithOrderById(deskId.value)
    deskData.value = data.data
  }
}
initData()
watch(() => deskId?.value, () => {
  initData()
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="less">
.order-finish{
  display: flex;
  .left{
    width: 500px;
    margin-right: 15px;
  }
  .right{
    .receipt{
      border: 1px solid #d8d8d8;
      .receipt-header{
        background-color: #d8d8d8;
        text-align: center;
        line-height: 30px;
      }
      .receipt-body{
        height: 500px;
        .div-bordered-bottom()
      }
      .receipt-total{
        height: 50px;
      }
      .receipt-item{
        display: flex;
        font-size: 12px;
        line-height: 20px;
        .receipt-item-name{
          margin-left: 5px;
          width: 120px;
        }
        .receipt-item-count{
          margin-left: 5px;
          width: 30px;
        }
        .receipt-item-price{
          margin-left: 5px;
        }
      }
    }
  }
}
</style>