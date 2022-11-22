<template>
<div class="desk-form">
  <div class="form">
    <div class="form-header">请填写桌位信息</div>
    <div class="form-body">
      <el-form
        ref="deskFormRef"
        :model="deskForm"
        :rules="deskRules"
        label-width="60px"
        class="demo-ruleForm"
        size="default"
        status-icon
      >
        <el-form-item label="类别" prop="typeId">
          <el-space>
            <el-select v-model.string="deskForm.typeId" placeholder="类别">
              <el-option v-for="deskType in deskTypeList" :key="deskType.id" :label="deskType.name" :value="deskType.id" />
            </el-select>
            <el-button type="primary" @click="deskTypeManageShow = true">类别管理</el-button>
          </el-space>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="deskForm.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm(deskFormRef)"
            >重置</el-button
          >
          <el-button @click="submitForm(deskFormRef)">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <DialogModel title="桌位类别管理" :show="deskTypeManageShow" width="350px" @closed="handleDeskTypeClosed" :has-footer="false">
    <div class="deskType-manage">
      <div class="deskType-header">
        <el-form ref="deskTypeFormRef" :model="deskTypeForm" :rules="deskTypeRules" :inline="true" size="default" :style="{textAlign:'center'}">
          <el-form-item  prop="name" :style="{marginRight:0}">
            <Transition name="deskType" mode="out-in">
              <el-button type="primary" @click="handleAddDeskType(deskTypeFormRef)" v-if="!deskTypeInputShow" key="add">
                <el-icon><Plus /></el-icon>
                &emsp;新增桌位类别
              </el-button>
              <el-input placeholder="请输入桌位类别" v-model.string="deskTypeForm.name"  v-else key="edit">
                <template #append>
                  <el-button-group>
                    <el-button class="btn-primary btn-append" @click="handleAddDeskTypeOk(deskTypeFormRef)">确认</el-button>
                    <el-button class="btn-primary" @click="handleAddDeskTypeCancel(deskTypeFormRef)">取消</el-button>
                  </el-button-group>
                </template>
              </el-input>
            </Transition>
          </el-form-item>
        </el-form>
      </div>
      <div class="deskType-body">
        <el-table :data="deskTypeList" width="100%" :stripe="true" border>
          <el-table-column label="桌位类别" property="name" width="100" align="center" />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <div style="display: flex; align-items: center ;justify-content: center;">
                <el-button type="primary" size="small" @click="handleEditDeskType(scope.row)">修改</el-button>
                <el-button type="danger" size="small" @click="handleRemoveDeskType(scope.row.id)">删除</el-button>
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
import type DeskType from '@/types/desk'
import type { DeskTypeType } from '@/types/desk'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { debounce } from 'lodash'
import { ref, type Ref, reactive } from 'vue'

const emit = defineEmits(['open','opened','close','closed','ok'])
const props = defineProps({
  show: {
    type: Boolean
  }
})

const originDesk = {
  name: '',
  typeId: '',
}
const deskForm:Ref<DeskType> = ref(originDesk)
const deskTypeList: Ref<DeskTypeType[]> = ref([])
const deskTypeManageShow = ref(false)
const deskTypeForm:Ref<DeskTypeType> = ref({
  name: ''
})
const deskTypeInputShow = ref(false)
const deskFormRef = ref<FormInstance>()
const deskTypeFormRef = ref<FormInstance>()
const deskTypeState = ref('')


const deskRules = reactive<FormRules>({
  typeId: [
    {
      required: true,
      message: '请选择桌位类别',
      trigger: 'change',
    },
  ],
  name: [
    { required: true, message: '请输入桌位名称', trigger: 'blur' },
    { min: 1, max: 12, message: '商品名在1到12个字之间', trigger: 'blur' },
  ],
})

const initData = async () => {
  const { data } = await api.getDeskType()
  if(data.status === 11111){
    deskTypeList.value = data.data
  }
}

initData()

const deskTypeNameExist = (_rule: any, value: any, callback: any ) =>{
  if(!value){
    callback(new Error('请输入桌位类别名称'))
  }

  api.checkIsExist('deskType', deskTypeForm.value).then(res=>{
    if(res.status === 10000) callback(new Error(res.data.data.error))
    if(res.data.data.length >= 1) callback(new Error('桌位已存在'))
    callback()
  }).catch(err=>{
    if(!(err.data.data.error instanceof Array)){
      callback(new Error(err.data.data.error))
    }
  })
}

const deskTypeRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入桌位类别名称', trigger: 'blur' },
    { min: 1, max: 12, message: '桌位类别名在1到12个字之间', trigger: 'blur' },
    { validator: debounce(deskTypeNameExist, 200), trigger: 'change' }
  ],
})


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      const { data } = await api.addDesk(deskForm.value)
      if(data.status === 11111){
        ElMessage.success('新增成功')
        emit('close')
      }else{
        ElMessage.error(data.data.error)
      }
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const handleDeskTypeManage = () => {
  deskTypeManageShow.value = true
}

/**
 * 新增deskType按钮点击事件
 */
 const handleAddDeskType = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  deskTypeState.value = 'add'
  formEl.resetFields()
  deskTypeInputShow.value = true
}

/**
 * 修改deskType按钮点击事件
 */
const handleEditDeskType = (deskTypeData: DeskTypeType) => {
  deskTypeState.value = 'edit'
  deskTypeForm.value = {...deskTypeData}
  deskTypeInputShow.value = true
}

/**
 * 删除deskType
 * @param id deskType.id
 */
const handleRemoveDeskType = async (id: string) => {
  const { data } = await api.removeDeskType(id)
  if(data.status === 11111){
    deskTypeList.value = deskTypeList.value.filter(deskType=>deskType.id !== id)
    ElMessage.success('删除成功')
  }else{
    ElMessage.error(data.data)
  }
}

const handleAddDeskTypeOk = async (formEl: FormInstance | undefined) => {
      console.log('newdeskType',deskTypeForm.value)
  if (!formEl) return
  await formEl.validate(async (valid) => {
    console.log('111')
    if (valid) {
      if(deskTypeState.value === 'add'){
        const { data } = await api.addDeskType(deskTypeForm.value)
        if(data.status === 11111){
          ElMessage.success('新增成功')
          deskTypeList.value.push(data.data)
          formEl.resetFields()
        }else{
          ElMessage.error(data.data.error)
        }
      }else if(deskTypeState.value === 'edit' && deskTypeForm.value.id){
        const { data } = await api.editDeskType(deskTypeForm.value.id, deskTypeForm.value)
        if(data.status === 11111){
          ElMessage.success('修改成功')
          deskTypeList.value.find(deskType=>(deskType.id === deskTypeForm.value.id))!.name = deskTypeForm.value.name
        }else{
          ElMessage.error(data.data.error)
        }
      }
    }
  })
}

const handleAddDeskTypeCancel = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  if(deskTypeState.value === 'add'){
    formEl.resetFields()
  }
  deskTypeInputShow.value = false
}

const handleDeskTypeClosed = ()=> {
  initData()
  deskTypeManageShow.value = false
}
</script>

<style lang="less" scoped>
.desk-form{
  .form{
    .form-header{
      
    }
    .form-body{
      margin-top: 10px;
    }
  }
  .deskType-enter-active,
  .deskType-leave-active {
    transition: all 0.25s ease;
  }

  .deskType-enter-from{
    opacity: 0;
    transform: translateX(30px);
  }
  .deskType-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .deskType-leave-from{
    opacity: 1;
    transform: translateX(0);
  }
  .deskType-enter-to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>