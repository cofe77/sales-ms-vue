<template>
  <div class="pc-search">
    <div class="pc-search-search">
      <div class="search-btn">今日订单</div>
      <div class="search-btn">近三日订单</div>
      <div class="search-btn">近七日订单</div>
    </div>
    <div class="pc-search-info">
      <el-table :data="tableData" style="width: 100%" stripe size="large">
        <el-table-column label="Date" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Name" width="180">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #default>
                <div>name: {{ scope.row.name }}</div>
                <div>address: {{ scope.row.address }}</div>
              </template>
              <template #reference>
                <el-tag>{{ scope.row.name }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Timer } from '@element-plus/icons-vue'

interface User {
  date: string
  name: string
  address: string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style lang="less">
.pc-search{
  padding: 10px;
  .pc-search-search{
    display: flex;
    .search-search-input{
      width: 200px;
      height: 40px;
      padding: 0 5px;
    }
    .search-btn{
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
  .pc-search-info{
    margin-top: 10px;
  }
}
</style>