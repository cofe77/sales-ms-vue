<template>
  <div>
    <div class="header">
      <el-form :inline="true" size="large">
        <el-form-item class="input">
          <el-input placeholder="请输入商品名或商品描述进行搜索">
            <template #append>
              <el-button type="primary" class="search"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            <el-icon><Plus /></el-icon>
            &emsp;新增商品
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="body">
      <el-table :data="goodsData" width="100%" :stripe="true" border>
        <el-table-column label="商品ID" property="id" width="100" />
        <el-table-column label="名称" property="name" width="100" />
        <el-table-column label="价格（元）" property="price" width="100" />
        <el-table-column label="描述" property="desc" />
        <el-table-column label="折扣" property="discount" width="100" />
        <el-table-column label="库存" property="count" width="100" />
        <el-table-column label="类型" property="type" width="100" />
        <el-table-column label="图片" width="100">
          <template #default="scope">
            <img :src="scope.row.img" width="80" alt="" srcset="">
          </template>
        </el-table-column>
        <el-table-column label="修改时间" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ moment(scope.row.updateTime).format('YYYY-MM-DD HH:MM:SS') }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">下架</el-button>
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button type="danger" size="small" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        class="pagination"
        v-model:currentPage="currentPage1"
        :page-size="100"
        background
        layout="total, prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
    </div>
    <DialogModel :show="visible" @close="close" title="好的">
      <input type="text">
    </DialogModel>
  </div>
</template>

<script lang="ts" setup>
import type GoodsType from '@/types/goods'
import moment from 'moment'
import { ref } from 'vue'

const close = () => {
  visible.value = false
}

const visible = ref(false)

const goodsData = [
  {
    id: '1',
    name: '123',
    price: 2131,
    desc: '21321321dasd',
    discount: 0.2,
    count: 21321,
    type: '3213',
    img: '/static/image/beer.png',
    updateTime: new Date()
  },
  {
    id: '2',
    name: '321',
    price: 2131,
    desc: '21321321dasd',
    discount: 0.2,
    count: 21321,
    type: '3213',
    img: '/static/image/beer.png',
    updateTime: new Date()
  },
  {
    id: '3',
    name: '321',
    price: 2131,
    desc: '21321321dasd',
    discount: 0.2,
    count: 21321,
    type: '3213',
    img: '/static/image/beer.png',
    updateTime: new Date()
  },
  {
    id: '4',
    name: '321',
    price: 2131,
    desc: '21321321dasd',
    discount: 0.2,
    count: 21321,
    type: '3213',
    img: '/static/image/beer.png',
    updateTime: new Date()
  },
  {
    id: '5',
    name: '321',
    price: 2131,
    desc: '21321321dasd',
    discount: 0.2,
    count: 21321,
    type: '3213',
    img: '/static/image/beer.png',
    updateTime: new Date()
  },
  {
    id: '6',
    name: '321',
    price: 2131,
    desc: '21321321dasd',
    discount: 0.2,
    count: 21321,
    type: '3213',
    img: '/static/image/beer.png',
    updateTime: new Date()
  },
  {
    id: '7',
    name: '321',
    price: 2131,
    desc: '21321321dasd',
    discount: 0.2,
    count: 21321,
    type: '3213',
    img: '/static/image/beer.png',
    updateTime: new Date()
  }
]

const currentPage1 = ref(5)

const handleEdit = (index: number, rowData: GoodsType) => {
  console.log('rowData',rowData)
  console.log('index',index)
}
const handleSizeChange = (index: number, rowData: GoodsType) => {
  console.log('rowData',rowData)
  console.log('index',index)
}
const handleCurrentChange = (index: number, rowData: GoodsType) => {
  console.log('rowData',rowData)
  console.log('index',index)
}
</script>

<style lang="less" scoped>
.header{
  .input{
    width: 400px;
  }
  .search{
    background-color: #409eff;
    color: #fff;
    border-radius: 0 4px 4px 0;
    &:hover{
      background-color: #79bbff;
      color: #fff;
    }
  }
}
.footer{
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>