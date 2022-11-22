<template>
  <div>
    <div class="header">
      <el-form :inline="true" size="large">
        <el-form-item class="input">
          <el-input placeholder="请输入员工姓名或电话号码进行搜索">
            <template #append>
              <el-button class="btn-primary btn-append"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddStaff">
            <el-icon><Plus /></el-icon>
            &emsp;新增员工
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="body">
      <el-table :data="staffList" width="100%" :stripe="true" border>
        <el-table-column label="姓名" property="name" width="100" />
        <el-table-column label="登录名" property="account" width="100" />
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
              <el-button v-if="scope.row.state === 1" type="warning" size="small" @click="handlePullStaff(scope.row.id, 0)">禁用</el-button>
              <el-button v-else type="danger" size="small" @click="handlePullStaff(scope.row.id, 1)">启用</el-button>
              <el-button type="primary" size="small" @click="handleEditStaff(scope.row)">修改</el-button>
              <el-button type="danger" size="small" @click="handleRemoveStaff(scope.row.id)">删除</el-button>
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
    <DialogModel :show="staffDialogShow" @closed="closed" :title="`${staffState==='add'?'新增员工':'员工信息修改'}`" width="350px" :hasFooter="false">
      <el-form
          ref="staffFormRef"
          :model="staffForm"
          :rules="staffRules"
          label-width="80px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="staffForm.name" />
        </el-form-item>
        <el-form-item label="电话号码" prop="tel">
          <el-input v-model="staffForm.tel" />
        </el-form-item>
        <el-form-item label="登录名" prop="account">
          <el-input v-model="staffForm.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="staffForm.password" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="staffForm.password2" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm(staffFormRef)"
            >重置</el-button
          >
          <el-button @click="submitForm(staffFormRef)">确认</el-button>
        </el-form-item>
      </el-form>
    </DialogModel>
  </div>
</template>

<script lang="ts" setup>
import api from '@/api'
import type StaffType from '@/types/staff'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import moment from 'moment'
import { reactive, ref, type Ref } from 'vue'

const closed = () => {
  staffDialogShow.value = false
}

const staffDialogShow = ref(false)
const staffList: Ref<StaffType[]> = ref([])
const staffState = ref('')

const initData = () => {
  api.getStaffList().then(res=>{
    if(res.data.status === 11111){
      staffList.value = res.data.data
    }
  })
}

initData()

const handleAddStaff= () => {
  staffState.value = 'add'
  staffDialogShow.value = true
}

const currentPage1 = ref(5)

const handleSizeChange = (index: number, rowData: StaffType) => {
  console.log('rowData',rowData)
  console.log('index',index)
}
const handleCurrentChange = (index: number, rowData: StaffType) => {
  console.log('rowData',rowData)
  console.log('index',index)
}

const formSize = ref('default')
const staffFormRef = ref<FormInstance>()
const staffOrigin = {
  name: '',
  tel: '',
  account: '',
  password: '',
  password2: '',
}
const staffForm: Ref<StaffType> = ref(staffOrigin)

const checkTel = (rule: any, value: any, callback: any) => {
  if(!/^1[3-9]\d{9}$/.test(value)){
    callback(new Error('请输入正确的手机号码'))
  }
  callback()
}

const checkPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (staffForm.value.password2 !== '') {
      if (!staffFormRef.value) return
      staffFormRef.value.validateField('password2', () => null)
    }
    callback()
  }
}

const checkPass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== staffForm.value.password) {
    callback(new Error('两次输入密码不一致！'))
  } else {
    callback()
  }
}

const staffRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入员工姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '员工姓名的长度在2至10个字之间', trigger: 'blur' },
  ],
  tel: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'change',
    },
    {
      validator: checkTel,
      trigger: 'change'
    }
  ],
  account: [
    {
      required: true,
      message: '请输入员工姓名',
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      validator: checkPass,
      trigger: 'change'
    }
  ],
  password2: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur',
    },
    {
      validator: checkPass2,
      trigger: 'change'
    }
  ],
})


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      if(staffState.value === 'add'){
        const { data } = await api.addStaff(staffForm.value)
        if(data.status === 11111){
          ElMessage.success('新增成功')
          const newStaff = data.data
          newStaff.password2 = data.data.password
          staffList.value.push(newStaff)
          staffDialogShow.value = false
        }else{
          ElMessage.error(data.data.error)
        }
      }else if(staffState.value === 'edit' && staffForm.value.id){
        const { id } = staffForm.value
        delete staffForm.value.password2
        delete staffForm.value.updateTime
        const { data } = await api.editStaff(id, staffForm.value)
        if(data.status === 11111){
          ElMessage.success('修改成功')
          initData()
          staffDialogShow.value = false
        }else{
          ElMessage.error(data.data.error)
        }
      }
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const handlePullStaff = async (id: string, state: number) => {
  const { data } = await api.pullStaff(id, state)
  if(data.status === 11111){
    staffList.value.find(staff=>staff.id === id)!.state = state
    ElMessage.success(`${state===1?'启用':'禁用'}成功`)
  }
}

const handleEditStaff = (staff: StaffType) => {
  console.log('staff',staff)
  staff.password2 = staff.password
  staffForm.value = staff
  staffState.value = 'edit'
  staffDialogShow.value = true
}

const handleRemoveStaff = async (id: string) => {
  const { data } = await api.removeStaff(id)
  if(data.status === 11111){
    staffList.value = staffList.value.filter(staff=>staff.id !== id)
    ElMessage.success('删除成功')
  }else{
    ElMessage.error(data.data.error)
  }
}
</script>

<style lang="less" scoped>
.header{
  .input{
    width: 400px;
  }
}
.footer{
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>