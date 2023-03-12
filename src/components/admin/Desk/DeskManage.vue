<template>
<div>
  <div class="desk-list">
    <div class="item desk" v-for="desk in deskList" :key="desk.id">
      <div class="name">{{desk.name}}</div>
      <div class="type">{{desk.type?.name || '大厅'}}</div>
      <el-popconfirm @confirm="handleRemoveDesk(desk.id!)" title="确认删除？" confirm-button-text="是" cancel-button-text="否">
        <template #reference>
          <div class="delete-btn"><el-icon :size="28" color="#fab448"><CircleClose /></el-icon></div>
        </template>
      </el-popconfirm>
    </div>
    <div class="item add"  @click="deskFormVisible = true">
      <div class="icon">
        <el-icon :size="48" color="#fab448"><Plus /></el-icon>
      </div>
    </div>
  </div>
  <DialogModel title="新增桌位" :show="deskFormVisible" width="330px" :disableOk="true" @closed="closed" :hasFooter="false">
    <Suspense>
      <DeskForm @close="closed" :show="deskFormVisible" />
      <template #fallback>
        <div>
          正在获取数据
        </div>
      </template>
    </Suspense>
  </DialogModel>
</div>
</template>

<script lang="ts" setup>
import api from '@/api'
import { HTTP_STATUS_CODE } from '@/config/config'
import type DeskType from '@/types/desk'
import DialogModel from '@/util-model/DialogModel.vue'
import { ElMessage } from 'element-plus'
import { ref, type Ref } from 'vue'
import DeskForm from './DeskForm.vue'

const deskList: Ref<DeskType[]> = ref([])
const deskFormVisible = ref(false)

api.getDeskListWithType().then(res=>{
  console.log('res.data',res.data.data)
  deskList.value = res.data.data
})

const closed = () => {
  api.getDeskListWithType().then(res=>{
    deskList.value = res.data.data
  })
  deskFormVisible.value = false
}

const handleRemoveDesk = async (id: string) => {
  const { data } = await api.removeDesk(id)
  if(data.status === HTTP_STATUS_CODE.HTTP_OK){
    deskList.value = deskList.value.filter(desk=>desk.id !== id)
    ElMessage.success('删除成功')
  }else{
    ElMessage.success('删除失败')
  }
}

</script>

<style lang="less" scoped>
.desk-list{
  display: flex;
  flex-wrap: wrap;
  .item{
    width: 200px;
    height: 100px;
    .div-bordered();
    border-radius: 5px;
    margin-right: 20px;
    margin-bottom: 15px;
    background-color: rgb(179, 154, 248);
    color: #fff;
    .icon{
      color: #fff;
    }
  }
  .desk{
    position: relative;
    text-align: center;
    .name{
      font-size: 22px;
      margin-top: 25px;
    }
    .type{
      font-size: 14px;
      margin-top: 10px;
    }
    .delete-btn{
      width: 28px;
      height: 28px;
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: rgb(179, 154, 248);
      cursor: pointer;
      border-radius: 999px;
      box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.2);
    }
  }
  .add{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>