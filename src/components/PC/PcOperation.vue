<template>
  <div class="pc-operation">
    <div
      v-for="desk in deskList"
      :key="desk.id"
      :class="['pc-desk', {'pc-desk-on':!!desk.order}]"
      @click="handleClickDesk(desk)"
    >
      <div class="desk-name">{{desk.name}}</div>
      <div class="desk-type">{{desk.type?.name || '大厅'}}</div>
      <div v-show="desk.order?.createTime" class="desk-startTime">开始时间：{{ moment(desk.order?.createTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
    </div>
    <DialogModel :title="`${currentDesk.name || ''}`" :show="deskStateVisible" width="930px" :disableOk="true" @closed="deskStateClosed" :hasFooter="false">
      <Suspense>
        <PcDeskState 
          @close="deskStateClosed" 
          :show="deskStateVisible"
          :deskId="currentDesk.id"
        />
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
import { useOrderStore } from '@/stores/order'
import type { UpdateDeskType } from '@/types/desk'
import moment from 'moment'
import { reactive, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const orderStore = useOrderStore()
const router = useRouter()
const deskStateVisible = ref(false)

const originDesk = {
  id: '',
  name: ''
}
const currentDesk = ref(originDesk)
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

const deskList: Ref<UpdateDeskType[]> = ref([])
api.getDeskListWithOrder().then(res=>{
  deskList.value = res.data.data
})

const handleClickDesk = (desk: UpdateDeskType) => {
  if (!desk.order && !desk.orderId && desk.id) {
    orderStore.setDesk(desk)
    router.push('/pc/order')
  } else {
    currentDesk.value = desk
    deskStateVisible.value = true
  }
}

const onSubmit = () => {
  console.log('submit!')
}
const deskStateClosed = () => {
  currentDesk.value = originDesk
  deskStateVisible.value = false
}
</script>

<style lang="less">
  .pc-operation{
    height: 660px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    overflow-y: auto;
    .pc-desk{
      height: 160px;
      border: 1px solid #d8d8d8;
      margin: 2px;
      text-align: center;
      background-color: rgb(150, 241, 135);
      cursor: pointer;
      .desk-name{
        font-size: 24px;
        margin-top: 20px;
      }
      .desk-type{
        font-size: 18px;
        margin-top: 20px;
      }
      .desk-startTime{
        font-size: 16px;
        margin-top: 20px;
      }
    }
    .pc-desk-on{
      background-color: #e9abab;
    }
  }
</style>