<template>
  <div>
    <div class="header">
      <el-form :inline="true" size="large">
        <el-form-item class="input">
          <el-input placeholder="请输入员工姓名或电话号码进行搜索">
            <template #append>
              <el-button type="primary" class="search"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddUser">
            <el-icon><Plus /></el-icon>
            &emsp;新增员工
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="body">
      <el-table :data="userData" width="100%" :stripe="true" border>
        <el-table-column label="员工ID" property="id" width="100" />
        <el-table-column label="姓名" property="nick" width="100" />
        <el-table-column label="登录名" property="username" width="100" />
        <el-table-column label="电话号码" property="tel" />
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
              <el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">禁用</el-button>
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
    <DialogModel :show="visible" @close="close" title="新增员工">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="电话号码" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="登录名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="确认密码" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
      </el-form>
    </DialogModel>
  </div>
</template>

<script lang="ts" setup>
import type GoodsType from '@/types/goods'
import type UserType from '@/types/user'
import type { FormInstance, FormRules } from 'element-plus'
import moment from 'moment'
import { reactive, ref } from 'vue'

const close = () => {
  visible.value = false
}

const visible = ref(false)

const userData: UserType[] = [
  {
    id: '1',
    username: '123',
    nick: '21321321dasd',
    tel: 21321,
    createTime: new Date().toDateString()
  },
  {
    id: '1',
    username: '123',
    nick: '21321321dasd',
    tel: 21321,
    createTime: new Date().toDateString()
  },
  {
    id: '1',
    username: '123',
    nick: '21321321dasd',
    tel: 21321,
    createTime: new Date().toDateString()
  },
  {
    id: '1',
    username: '123',
    nick: '21321321dasd',
    tel: 21321,
    createTime: new Date().toDateString()
  },
  {
    id: '1',
    username: '123',
    nick: '21321321dasd',
    tel: 21321,
    createTime: new Date().toDateString()
  },
  {
    id: '1',
    username: '123',
    nick: '21321321dasd',
    tel: 21321,
    createTime: new Date().toDateString()
  },
  {
    id: '1',
    username: '123',
    nick: '21321321dasd',
    tel: 21321,
    createTime: new Date().toDateString()
  },
]

const handleAddUser = () => {
  visible.value = true
}

const currentPage1 = ref(5)

const handleEdit = (index: number, rowData: UserType) => {
  console.log('rowData',rowData)
  console.log('index',index)
}
const handleSizeChange = (index: number, rowData: UserType) => {
  console.log('rowData',rowData)
  console.log('index',index)
}
const handleCurrentChange = (index: number, rowData: UserType) => {
  console.log('rowData',rowData)
  console.log('index',index)
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})
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