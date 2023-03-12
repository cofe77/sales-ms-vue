<template>
<div class="vip-form">
  <div class="form">
    <div class="form-header">请填写会员信息</div>
    <div class="form-body">
      <el-form
        ref="vipFormRef"
        :model="vipForm"
        :rules="vipRules"
        label-width="80px"
        class="demo-ruleForm"
        size="default"
        status-icon
      >
        <el-form-item label="类别" prop="typeId">
          <el-space>
            <el-select v-model.string="vipForm.typeId" placeholder="类别">
              <el-option v-for="vipType in vipTypeList" :key="vipType.id" :label="vipType.name" :value="vipType.id" />
            </el-select>
            <el-button type="primary" @click="vipTypeManageShow = true">类别管理</el-button>
          </el-space>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="vipForm.name" />
        </el-form-item>
        <el-form-item label="电话号码" prop="tel">
          <el-input v-model="vipForm.tel" />
        </el-form-item>
        <el-form-item label="余额" prop="balance">
          <el-input v-model="vipForm.balance" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm(vipFormRef)"
            >重置</el-button
          >
          <el-button @click="submitForm(vipFormRef)">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <DialogModel title="会员类别管理" :show="vipTypeManageShow" width="350px" @closed="vipTypeManageShow = false" :has-footer="false">
    <div class="vipType-manage">
      <div class="vipType-header">
        <el-form ref="vipTypeFormRef" :model="vipTypeForm" :rules="vipTypeRules" :inline="true" size="default" :style="{textAlign:'center'}">
          <el-form-item  prop="name" :style="{marginRight:0}">
            <Transition name="vipType" mode="out-in">
              <el-button type="primary" @click="handleAddVipType(vipTypeFormRef)" v-if="!vipTypeInputShow" key="add">
                <el-icon><Plus /></el-icon>
                &emsp;新增会员类别
              </el-button>
              <el-input placeholder="请输入会员类别" v-model.string="vipTypeForm.name"  v-else key="edit">
                <template #append>
                  <el-button-group>
                    <el-button class="btn-primary btn-append" @click="handleAddVipTypeOk(vipTypeFormRef)">确认</el-button>
                    <el-button class="btn-primary" @click="handleAddVipTypeCancel(vipTypeFormRef)">取消</el-button>
                  </el-button-group>
                </template>
              </el-input>
            </Transition>
          </el-form-item>
        </el-form>
      </div>
      <div class="vipType-body">
        <el-table :data="vipTypeList" width="100%" :stripe="true" border>
          <el-table-column label="会员类别" property="name" width="100" align="center" />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <div style="display: flex; align-items: center ;justify-content: center;">
                <el-button type="primary" size="small" @click="handleEditVipType(scope.row)">修改</el-button>
                <el-button type="danger" size="small" @click="handleRemoveVipType(scope.row.id)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </DialogModel>
</div>
</template>

<script lang="ts" setup>
import api from '@/api'
import { HTTP_STATUS_CODE } from '@/config/config'
import type VipType from '@/types/vip'
import type { VipTypeType } from '@/types/vip'
import { Plus } from '@element-plus/icons-vue'
import type { AxiosPromise, AxiosResponse } from 'axios'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { debounce } from 'lodash'
import { ref, type Ref, reactive, watch } from 'vue'

const emit = defineEmits(['open','opened','close','closed','ok'])
const props = defineProps({
  vipId: {
    type: String
  },
  state: {
    type: String
  },
  show: {
    type: Boolean
  }
})

const originVip = {
  name: '',
  typeId: '',
  tel: '',
  state: 0,
  balance: 0
}
const vipForm:Ref<VipType> = ref(originVip)
const vipTypeList: Ref<VipTypeType[]> = ref([])
const vipTypeManageShow = ref(false)
const vipTypeForm:Ref<VipTypeType> = ref({
  name: '',
  discount: 1
})
const vipTypeInputShow = ref(false)
const vipFormRef = ref<FormInstance>()
const vipTypeFormRef = ref<FormInstance>()
const vipTypeState = ref('')


const vipRules = reactive<FormRules>({
  typeId: [
    {
      required: true,
      message: '请选择会员类别',
      trigger: 'change',
    },
  ],
  name: [
    { required: true, message: '请输入会员名称', trigger: 'blur' },
    { min: 1, max: 12, message: '商品名在1到12个字之间', trigger: 'blur' },
  ],
  tel: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { min: 1, max: 12, message: '商品名在1到12个字之间', trigger: 'blur' },
  ],
})


watch(()=>[props.state,props.vipId,props.show],async ()=>{
  api.getVipType().then(res=>{
    vipTypeList.value = res.data.data
  })
  console.log('1111')
  if(props.vipId && props.state === 'edit'){
    const { data } = await api.getVipById(props.vipId)
    if(data.status === HTTP_STATUS_CODE.HTTP_OK){
      vipForm.value = data.data
    }
  }else{
    vipForm.value = originVip
  }
},{deep:true, immediate: true})

const initVipTypeData = async () => {
  const { data } = await api.getVipType()
  if(data.status === HTTP_STATUS_CODE.HTTP_OK){
    vipTypeList.value = data.data
  }
}

initVipTypeData()


const vipTypeNameExist = (_rule: any, value: any, callback: any ) =>{
  if(!value){
    callback(new Error('请输入会员类别名称'))
  }

  api.checkIsExist('vipType', { name: vipTypeForm.value.name }).then(res=>{
    if(res.status !== HTTP_STATUS_CODE.HTTP_OK) callback(new Error(res.data.data.error))
    if(res.data.data.length >= 1) callback(new Error('会员已存在'))
    callback()
  }).catch(err=>{
    if(!(err.data.data.error instanceof Array)){
      callback(new Error(err.data.data.error))
    }
  })
}

const vipTypeRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入会员类别名称', trigger: 'blur' },
    { min: 1, max: 12, message: '会员类别名在1到12个字之间', trigger: 'blur' },
    { validator: debounce(vipTypeNameExist, 200), trigger: 'blur' }
  ],
})


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      let res:AxiosResponse
      if(props.state === 'add'){
        res = await api.addVip(vipForm.value)
      }else{
        res = await api.editVip(props.vipId!, vipForm.value)
      }
      if(res.data.status === HTTP_STATUS_CODE.HTTP_OK){
        ElMessage.success(`${props.state === 'add' ? '新增' : '修改'}成功`)
        emit('closed')
      }else{
        ElMessage.error(res.data.error)
      }
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

/**
 * 新增vipType按钮点击事件
 */
 const handleAddVipType = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  vipTypeState.value = 'add'
  formEl.resetFields()
  vipTypeInputShow.value = true
}

/**
 * 修改vipType按钮点击事件
 */
const handleEditVipType = (vipTypeData: VipTypeType) => {
  vipTypeState.value = 'edit'
  vipTypeForm.value = {...vipTypeData}
  vipTypeInputShow.value = true
}

/**
 * 删除vipType
 * @param id vipType.id
 */
const handleRemoveVipType = async (id: string) => {
  const { data } = await api.removeVipType(id)
  if(data.status === HTTP_STATUS_CODE.HTTP_OK){
    vipTypeList.value = vipTypeList.value.filter(vipType=>vipType.id !== id)
    ElMessage.success('删除成功')
  }else{
    ElMessage.error(data.data)
  }
}

const handleAddVipTypeOk = async (formEl: FormInstance | undefined) => {
      console.log('newvipType',vipTypeForm.value)
  if (!formEl) return
  await formEl.validate(async (valid) => {
    console.log('111')
    if (valid) {
      if(vipTypeState.value === 'add'){
        const { data } = await api.addVipType(vipTypeForm.value)
        if(data.status === HTTP_STATUS_CODE.HTTP_OK){
          ElMessage.success('新增成功')
          vipTypeList.value.push(data.data)
          formEl.resetFields()
        }else{
          ElMessage.error(data.data.error)
        }
      }else if(vipTypeState.value === 'edit' && vipTypeForm.value.id){
        const { data } = await api.editVipType(vipTypeForm.value.id, vipTypeForm.value)
        if(data.status === HTTP_STATUS_CODE.HTTP_OK){
          ElMessage.success('修改成功')
          vipTypeList.value.find(vipType=>(vipType.id === vipTypeForm.value.id))!.name = vipTypeForm.value.name
        }else{
          ElMessage.error(data.data.error)
        }
      }
    }
  })
}

const handleAddVipTypeCancel = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  if(vipTypeState.value === 'add'){
    formEl.resetFields()
  }
  vipTypeInputShow.value = false
}
</script>

<style lang="less" scoped>
.vip-form{
  .form{
    .form-header{
      
    }
    .form-body{
      margin-top: 10px;
    }
  }
  .vipType-enter-active,
  .vipType-leave-active {
    transition: all 0.25s ease;
  }

  .vipType-enter-from{
    opacity: 0;
    transform: translateX(30px);
  }
  .vipType-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .vipType-leave-from{
    opacity: 1;
    transform: translateX(0);
  }
  .vipType-enter-to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>