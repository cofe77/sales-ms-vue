<template>
  <div>
    <div class="header">
      <el-form :inline="true" size="large">
        <el-form-item class="input">
          <el-input placeholder="请输入商品名或商品描述进行搜索">
            <template #append>
              <el-button class="btn-primary btn-append"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleGoodsAdd">
            <el-icon><Plus /></el-icon>
            &emsp;新增商品
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="body">
      <el-table :data="goodsData" width="100%" :stripe="true" border>
        <el-table-column label="名称" property="name" width="100" />
        <el-table-column label="价格（元）" property="price" width="100" />
        <el-table-column label="描述">
          <template #default="scope">
            <p class="goods-desc" :title="scope.row.desc">{{scope.row.desc}}</p>
          </template>
        </el-table-column>
        <el-table-column label="折扣" property="discount" width="100" />
        <el-table-column label="库存" property="count" width="100" />
        <el-table-column label="类型" width="100">
          <template #default="scope">
            <p>{{scope.row.type?.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="图片" width="100">
          <template #default="scope">
            <el-image :src="scope.row.img" width="80" alt="" srcset="">
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
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
              <el-button v-if="scope.row.state===1" type="warning" size="small" @click="handleGoodsPull(scope.row.id, 0)">下架</el-button>
              <el-button v-else type="danger" size="small" @click="handleGoodsPull(scope.row.id, 1)">上架</el-button>
              <el-button type="primary" size="small" @click="handleGoodsEdit(scope.row)">修改</el-button>
              <el-button type="danger" size="small" @click="handleGoodsRemove(scope.row.id)">删除</el-button>
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
    <DialogModel :show="goodsFormVisible" :title="goodsFormTitle" width="1100px" top="60px" :disableOk="true" @closed="closed" :hasFooter="false">
      <Suspense>
        <GoodsForm @close="closed" :goodsId="goodsId" :state="state" :show="goodsFormVisible" />
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
import type GoodsType from '@/types/goods'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import moment from 'moment'
import { nextTick, proxyRefs, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import GoodsForm from './GoodsForm.vue'

const router = useRouter()
const goodsId = ref('')

const closed = () => {
  api.getGoodsWithType().then(res=>{
    goodsData.value = res.data.data
  })
  goodsFormVisible.value = false
}

const goodsFormVisible = ref(false)
const state = ref('add')
const goodsData: Ref<GoodsType[]> = ref([])
const goodsFormTitle = ref('新增商品')

api.getGoodsWithType().then(res=>{
  goodsData.value = res.data.data
})

const currentPage1 = ref(5)

const handleGoodsAdd = () => {
  console.log('goodsFormVisible.value',goodsFormVisible.value)
  state.value = 'add'
  goodsId.value = ''
  goodsFormTitle.value = '新增商品'
  goodsFormVisible.value = true
}

const handleGoodsPull = async (id: string, state: number) => {
  const { data } = await api.pullGoods(id, state)
  if(data.status === HTTP_STATUS_CODE.HTTP_OK){
    goodsData.value.find(goods=>goods.id === id)!.state = state
    ElMessage.success(`${state===1?'上架':'下架'}成功`)
  }
}
const handleGoodsEdit = (rowData: GoodsType) => {
  goodsFormTitle.value = '修改商品信息'
  state.value = 'edit'
  if(rowData.id){
    goodsId.value = rowData.id
  }
  goodsFormVisible.value = true
}
const handleGoodsRemove = async (id: string) => {
  const { data } = await api.removeGoods(id)
  if(data.status === HTTP_STATUS_CODE.HTTP_OK){
    goodsData.value = goodsData.value.filter(goods=>goods.id !== id)
    ElMessage.success('删除成功')
  }else{
    ElMessage.error(data.data.error)
  }
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
}
.body{
  .goods-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.footer{
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.el-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 80px;
  width: 100%;
  height: 200px;
}
</style>