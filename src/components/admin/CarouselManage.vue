<template>
  <div class="carousel">
    <div class="top">
      <div class="workstation">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="80px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
        </el-form>
        <div class="upload">
          <el-icon :size="80"><Plus /></el-icon>
        </div>
      </div>
      <div class="preview">

      </div>
    </div>
    <div class="bottom">
      <el-table :data="carouselData" width="100%" :stripe="true" border>
        <el-table-column label="图片ID" property="id" width="100" />
        <el-table-column label="title" property="id" width="100" />
        <el-table-column label="href" property="id" />
        <el-table-column label="图片" width="60">
          <template #default="scope">
            <img :src="scope.row.src" width="40" alt="" srcset="">
          </template>
        </el-table-column>
        <el-table-column label="修改时间" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ moment(scope.row.updateTime).format('YYYY-MM-DD HH:MM:SS') }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="顺序" width="180">
          <template #default="scope">
            <el-button-group>
              <el-button
                type="primary"
                :icon="ArrowUp"
                @click="handleUp(scope.row.id)"
              ></el-button>
              <el-button type="primary" :icon="ArrowDown"></el-button>
            </el-button-group>
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
  </div>
</template>

<script lang="ts" setup>
import type CarouselType from '@/types/carousel'
import type { FormInstance, FormRules } from 'element-plus'
import moment from 'moment'
import { ref, reactive } from 'vue'
import {
  ArrowDown,
  ArrowUp,
} from '@element-plus/icons-vue'

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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const carouselData: CarouselType[] = [
  {
    id: '1',
    src: '/static/image/beer.png',
    enable: 1,
    title: 'number',
    href: 'string',
    image_idx: 1,
    updateTime: new Date().toDateString()
  },
  {
    id: '1',
    src: '/static/image/beer.png',
    enable: 1,
    title: 'number',
    href: 'string',
    image_idx: 1,
    updateTime: new Date().toDateString()
  },
  {
    id: '1',
    src: '/static/image/beer.png',
    enable: 1,
    title: 'number',
    href: 'string',
    image_idx: 1,
    updateTime: new Date().toDateString()
  },
  {
    id: '1',
    src: '/static/image/beer.png',
    enable: 1,
    title: 'number',
    href: 'string',
    image_idx: 1,
    updateTime: new Date().toDateString()
  },
  {
    id: '1',
    src: '/static/image/beer.png',
    enable: 1,
    title: 'number',
    href: 'string',
    image_idx: 1,
    updateTime: new Date().toDateString()
  },
  {
    id: '1',
    src: '/static/image/beer.png',
    enable: 1,
    title: 'number',
    href: 'string',
    image_idx: 1,
    updateTime: new Date().toDateString()
  },
]

const handleEdit = (index: number, rowData: CarouselType) => {
  console.log('rowData',rowData)
  console.log('index',index)
}
const handleSizeChange = (index: number, rowData: CarouselType) => {
  console.log('rowData',rowData)
  console.log('index',index)
}
const handleCurrentChange = (index: number, rowData: CarouselType) => {
  console.log('rowData',rowData)
  console.log('index',index)
}
const handleUp = (id:string) => {
  console.log('id',id)
}
</script>

<style lang="less" scoped>
.carousel{
  .top{
    display: flex;
    .workstation{
      width: 512px;
      display: flex;
      margin-right: 10px;
      padding: 10px;
      .div-bordered();
      .upload{
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        .div-bordered();
      }
    }
    .preview{
      width: 512px;
      height: 384px;
      background-image: url('/static/image/首页.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .bottom{
    margin-top: 10px;
  }
}
</style>