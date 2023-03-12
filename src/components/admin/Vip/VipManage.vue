<template>
  <div>
    <div class="header">
      <el-form :inline="true" size="large">
        <el-form-item class="input">
          <el-input placeholder="请输入VIP姓名或电话号码进行搜索">
            <template #append>
              <el-button type="primary" class="search"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddUser">
            <el-icon><Plus /></el-icon>
            &emsp;新增VIP
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="body">
      <el-table :data="vipList" width="100%" :stripe="true" border>
        <el-table-column label="姓名" property="name" width="100" />
        <el-table-column label="等级" property="type" width="100">
          <template #default="scope">
            <p>{{scope.row.type?.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="电话号码" property="tel" />
        <el-table-column label="账户余额" property="balance" />
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
              <el-button v-if="scope.row.state === 1" type="warning" size="small" @click="handlePullVip(scope.row.id, 0)">禁用</el-button>
              <el-button v-else type="danger" size="small" @click="handlePullVip(scope.row.id, 1)">启用</el-button>
              <el-button type="primary" size="small" @click="handleEditVip(scope.row)">修改</el-button>
              <el-button type="danger" size="small" @click="handleRemoveVip(scope.row.id)">删除</el-button>
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
    <DialogModel :show="vipDialogShow" @closed="closed" :title="dialogState === 'add' ? '新增VIP': '修改VIP信息'" width="350px" :hasFooter="false">
      <VipForm @closed="closed" :vipId="vipId" :state="dialogState" :show="vipDialogShow" />
    </DialogModel>
  </div>
</template>

<script lang="ts" setup>
import api from '@/api'
import { HTTP_STATUS_CODE } from '@/config/config'
import type VipType from '@/types/vip'
import { ElMessage } from 'element-plus'
import moment from 'moment'
import { ref, type Ref } from 'vue'
import VipForm from './VipForm.vue'


const vipDialogShow = ref(false)
const vipList: Ref<VipType[]> = ref([])
const dialogState = ref('')
const vipId = ref('')

const initData = () => {
  api.getVipWithType().then(res=>{
    if(res.data.status === HTTP_STATUS_CODE.HTTP_OK){
      vipList.value = res.data.data
    }
  })
}

initData()

const closed = () => {
  initData()
  vipDialogShow.value = false
}
const handleAddUser = () => {
  dialogState.value = 'add'
  vipDialogShow.value = true
}

const currentPage1 = ref(5)

const handlePullVip = async (id: string, state: number) => {
  const { data } = await api.pullVip(id, state)
  if(data.status === HTTP_STATUS_CODE.HTTP_OK){
    vipList.value.find(vip=>vip.id === id)!.state = state
    ElMessage.success(`${state===1?'解冻':'冻结'}成功`)
  }
}
const handleEditVip = (rowData: VipType) => {
  dialogState.value = 'edit'
  if(rowData.id){
    vipId.value = rowData.id
  }
  vipDialogShow.value = true
}
const handleRemoveVip = async (id: string) => {
  const { data } = await api.removeVip(id)
  if(data.status === HTTP_STATUS_CODE.HTTP_OK){
    vipList.value = vipList.value.filter(vip=>vip.id !== id)
    ElMessage.success('删除成功')
  }else{
    ElMessage.error(data.data.error)
  }
}
const handleSizeChange = (index: number, rowData: VipType) => {
  console.log('rowData',rowData)
  console.log('index',index)
}
const handleCurrentChange = (index: number, rowData: VipType) => {
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