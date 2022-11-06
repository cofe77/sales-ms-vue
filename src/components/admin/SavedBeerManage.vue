<template>
  <div class="saved-beer">
    <div class="search">
      <el-form size="large" label-width="100px" :model="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="日期：">
              <el-row>
                <el-col :span="11">
                  <el-date-picker
                    v-model="form.date1"
                    type="date"
                    placeholder="选择一个日期"
                    style="width: 100%"
                  />
                </el-col>
                <el-col :span="2" class="text-center">
                  <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                  <el-date-picker
                    v-model="form.date2"
                    type="date"
                    placeholder="选择一个日期"
                    style="width: 100%"
                  />
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码：">
              <el-input placeholder="请输入VIP手机号码" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="存酒号码：">
              <el-input placeholder="放入光标，使用扫码枪" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品名称：">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="VIP姓名：">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="6">
            <el-space>
              <el-button type="primary">搜索</el-button>
              <el-button>重置</el-button>
            </el-space>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="result">
      <el-table :data="resultData" width="100%" :stripe="true" border>
        <el-table-column label="存酒单ID" property="id" width="100" />
        <el-table-column label="商品" property="goodsId" width="100" />
        <el-table-column label="数量" property="count" />
        <el-table-column label="VIP" property="vipId" />
        <el-table-column label="电话号码" property="tel" width="100" />
        <el-table-column label="创建时间" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ moment(scope.row.createTime).format('YYYY-MM-DD HH:MM:SS') }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">消费</el-button>
              <el-button type="danger" size="small" @click="handleEdit(scope.$index, scope.row)">作废</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import moment from 'moment'
import type SavedBeerType from '@/types/savedBeer'

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

const resultData: SavedBeerType[] = [
  {
    id: '1',
    goodsId: '1',
    count: 1,
    vipId: 'string',
    tel: 1,
    createTime: new Date().toDateString()
  }
]

const handleEdit = (index: any,row: any) => {
  console.log(' ', )
}
</script>

<style lang="less" scoped>
.saved-beer{
  .search{

  }
  .result{

  }
}
</style>