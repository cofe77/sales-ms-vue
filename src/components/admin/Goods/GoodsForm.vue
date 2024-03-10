<template>
  <div class="add-goods">
    <div class="form">
      <div class="form-header">请填写商品信息</div>
      <div class="form-body">
        <el-form
          ref="goodsFormRef"
          :model="goodsForm"
          :rules="goodsRules"
          label-width="80px"
          class="demo-ruleForm"
          size="default"
          status-icon
        >
          <el-form-item label="类别" prop="typeId">
            <el-space>
              <el-select v-model.string="goodsForm.typeId" placeholder="类别">
                <el-option v-for="goodsType in goodsTypeList" :key="goodsType.id" :label="goodsType.name" :value="goodsType.id" />
              </el-select>
              <el-button type="primary" @click="goodsTypeDialogShow = true">类别管理</el-button>
            </el-space>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="goodsForm.name" />
          </el-form-item>
          <el-form-item label="库存" prop="count">
            <el-input v-model="goodsForm.count" />
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model.number="goodsForm.price" />
          </el-form-item>
          <el-form-item label="折扣" prop="discount">
            <el-input-number
              v-model="goodsForm.discount"
              controls-position="right"
              :min="0"
              :max="1"
              :step="0.05"
              :precision="2"
            />
          </el-form-item>
          <el-form-item label="图片" prop="img">
            <div>
              <el-upload
                ref="upload"
                class="upload-demo"
                v-model:file-list="fileList"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                list-type="picture"
                :auto-upload="false"
                :on-change="handleChange"
                :limit="1"
                :on-exceed="handleExceed"
              >
                <el-button type="primary">点击上传</el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                  </div>
                </template>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="是否上架" prop="deleted">
            <el-switch v-model="goodsForm.state" />
          </el-form-item>
          <el-form-item label="商品描述" prop="desc">
            <el-input v-model="goodsForm.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetForm(goodsFormRef)"
              >重置</el-button
            >
            <el-button @click="submitForm(goodsFormRef)">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="preview">
      <div class="pc">
        <div class="preview-header">前台预览</div>
        <div class="preview-body">
          <div class="pc-preview">
            <el-image :src="goodsForm.img">
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
            <div class="pc-preview-name">{{goodsForm.name}}</div>
            <div class="pc-preview-desc">{{goodsForm.desc}}</div>
            <div class="pc-preview-price">{{goodsForm.price}}元</div>
          </div>
        </div>
      </div>
      <div class="pos">
        <div class="preview-header">POS预览</div>
        <div class="preview-body">
          <div class="pos-preview">
            <el-image :src="goodsForm.img">
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
            <div class="pos-preview-name">{{goodsForm.name}}</div>
            <div class="pos-preview-desc">{{goodsForm.desc}}</div>
            <div class="pos-preview-price">{{goodsForm.price}}元</div>
          </div>
        </div>
      </div>
      <div class="pad">
        <div class="preview-header">PAD预览</div>
        <div class="preview-body">
          <div class="pad-preview">
            <el-image :src="goodsForm.img">
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
            <div class="pad-preview-name">{{goodsForm.name}}</div>
            <div class="pad-preview-desc">{{goodsForm.desc}}</div>
            <div class="pad-preview-price">{{goodsForm.price}}元</div>
          </div>
        </div>
      </div>
      <div class="kitchen">
        <div class="preview-header">后厨预览</div>
        <div class="preview-body">
          <div class="kitchen-preview">
            <el-image :src="goodsForm.img">
              <template #error>
                <div class="image-slot">
                  <el-icon><IconPicture /></el-icon>
                </div>
              </template>
            </el-image>
            <div class="kitchen-preview-name">{{goodsForm.name}}</div>
            <div class="kitchen-preview-desc">{{goodsForm.desc}}</div>
            <div class="kitchen-preview-price">{{goodsForm.price}}元</div>
          </div>
        </div>
      </div>
    </div>
    <DialogModel :show="cropperShow" title="" width="400px" @ok="handleCropperOk" @closed="cropperShow = false">
      <div class="img-cropper">
        <vueCropper
          ref="cropper"
          :img="cropperOption.img"
          :outputSize="cropperOption.size"
          :outputType="cropperOption.outputType"
          :autoCrop="cropperOption.autoCrop"
          :autoCropWidth="cropperOption.autoCropWidth"
          :autoCropHeight="cropperOption.autoCropHeight"
          :fixed="cropperOption.fixed"
        ></vueCropper>
      </div>
    </DialogModel>
    <DialogModel :show="goodsTypeDialogShow" title="商品类别管理" width="350px" @closed="goodsTypeDialogShow = false" :has-footer="false">
      <div class="goodsType-manage">
        <div class="goodsType-header">
          <el-form ref="goodsTypeFormRef" :model="goodsTypeForm" :rules="goodsTypeRules" :inline="true" size="default" :style="{textAlign:'center'}">
            <el-form-item  prop="name" :style="{marginRight:0}">
              <Transition name="goodsType" mode="out-in">
                <el-button type="primary" @click="handleAddgoodsType(goodsTypeFormRef)" v-if="!goodsTypeInputShow" key="add">
                  <el-icon><Plus /></el-icon>
                  &emsp;新增商品类别
                </el-button>
                <el-input placeholder="请输入商品类别" v-model.string="goodsTypeForm.name"  v-else key="edit">
                  <template #append>
                    <el-button-group>
                      <el-button class="btn-primary btn-append" @click="handleAddGoodsTypeOk(goodsTypeFormRef)">确认</el-button>
                      <el-button class="btn-primary" @click="handleAddGoodsTypeCancel(goodsTypeFormRef)">取消</el-button>
                    </el-button-group>
                  </template>
                </el-input>
              </Transition>
            </el-form-item>
          </el-form>
        </div>
        <div class="goodsType-body">
          <el-table :data="goodsTypeList" width="100%" :stripe="true" border>
            <el-table-column label="商品类别" property="name" width="100" align="center" />
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <div style="display: flex; align-items: center ;justify-content: center;">
                  <el-button type="primary" size="small" @click="handleEditGoodsType(scope.row)">修改</el-button>
                  <el-button type="danger" size="small" @click="handleRemoveGoodsType(scope.row.id)">删除</el-button>
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
import { reactive, ref, watch, type Ref } from 'vue'
import { type UploadProps, type UploadUserFile, type UploadInstance, type FormInstance, type FormRules, type UploadRawFile, genFileId, ElMessage } from 'element-plus'
import api from '@/api'
import type { GoodsTypeType } from '@/types/goods'
import type GoodsType from '@/types/goods'
import { Plus } from '@element-plus/icons-vue'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { debounce } from 'lodash'
import { HTTP_STATUS_CODE } from '@/config/config'
import type CreateGoodsType from '@/types/goods'

const emit = defineEmits(['open','opened','close','closed','ok'])
const props = defineProps({
  goodsId: {
    type: String
  },
  state: {
    type: String
  },
  show: {
    type: Boolean
  }
})

const goodsTypeList: Ref<GoodsTypeType[]> = ref([])


const cropper = ref()
const cropperShow = ref(false)
const goodsTypeDialogShow = ref(false)
const goodsTypeInputShow = ref(false)
const goodsFormRef = ref<FormInstance>()
const goodsTypeFormRef = ref<FormInstance>()
const goodsTypeState = ref('')
const upload = ref<UploadInstance>()

const originGoods = {
  id: '',
  name: '',
  price: 0,
  desc: '',
  discount: 1,
  count: 10,
  typeId: '',
  img: '',
  state: 0
}
const goodsForm = ref(originGoods)
const goodsTypeForm:Ref<GoodsTypeType> = ref({
  name: ''
})

watch(()=>[props.state,props.goodsId,props.show],async ()=>{
  api.getGoodsTypeList().then(res=>{
    goodsTypeList.value = res.data.data
  })
  console.log('1111')
  if(props.goodsId && props.state === 'edit'){
    const { data } = await api.getGoodsById(props.goodsId)
    if(data.status === HTTP_STATUS_CODE.HTTP_OK){
      goodsForm.value = data.data
    }
  }else{
    goodsForm.value = originGoods
  }
},{deep:true, immediate: true})

const fileList = ref<UploadUserFile[]>([])

const cropperOption = reactive({
  img: '',
  size: 1,
  outputType: 'jpg',
  autoCrop: true,
  autoCropWidth: 350,
  autoCropHeight: 250,
  fixed: false
})

const goodsRules = reactive<FormRules>({
  typeId: [
    {
      required: true,
      message: '请选择商品类别',
      trigger: 'change',
    },
  ],
  name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
    { min: 1, max: 12, message: '商品名在1到12个字之间', trigger: 'blur' },
  ],
  count: [
    {
      required: true,
      message: '请输入库存',
      trigger: 'change',
    },
  ],
  price: [
    {
      type: 'number',
      required: true,
      message: '请输入商品价格',
      trigger: 'change',
    },
  ],
  discount: [
    {
      type: 'number',
      required: true,
      message: '请输入商品折扣',
      trigger: 'change',
    },
  ],
  img: [
    {
      type: 'string',
      required: true,
      message: '请上传商品图片',
      trigger: 'change',
    },
  ],
  desc: [
    { message: '请输入商品简介', trigger: 'blur' },
  ],
})

const goodsTypeNameExist = (_rule: any, value: any, callback: any ) =>{
  if(!value){
    callback(new Error('请输入商品类别名称'))
  }

  api.checkIsExist('goodsType', goodsTypeForm.value).then(res => {
    if(res.status !== 201) callback(new Error(res.data.data.error))
    if(res.data.data.length >= 1) callback(new Error('商品已存在'))
    callback()
  }).catch(err=>{
    if(!(err.data.data.error instanceof Array)){
      callback(new Error(err.data.data.error))
    }
  })
}

const goodsTypeRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入商品类别名称', trigger: 'blur' },
    { min: 1, max: 12, message: '商品名在1到12个字之间', trigger: 'blur' },
    { validator: debounce(goodsTypeNameExist, 200), trigger: 'change' }
  ],
})


const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value?.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value?.handleStart(file)
}

const handleCropperOk = () => {
  cropper.value.getCropBlob(async (imgBlob: any)=>{
    const imgFormData = new FormData()
    imgFormData.append('jpg',imgBlob)
    const { data } = await api.imgUpload(imgFormData)
    if(data.status === HTTP_STATUS_CODE.HTTP_OK){

      //生产环境
      // goodsForm.img = data.data
      //开发环境
      goodsForm.value.img = 'http://localhost:3002'+data.data

      fileList.value = []
      fileList.value.push({
        name: data.data,
        url: goodsForm.value.img
      })
      ElMessage.success('上传成功')
    }
  })
  cropperShow.value = false
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      if(props.state === 'add'){
        const { data } = await api.addGoods(goodsForm.value)
        if(data.status === HTTP_STATUS_CODE.HTTP_OK){
          ElMessage.success('新增成功')
          emit('close')
        }else{
          ElMessage.error(data.data.error)
        }
      }else if(props.state === 'edit' && goodsForm.value.id){
        const { data } = await api.editGoods(goodsForm.value.id, goodsForm.value)
        if(data.status === HTTP_STATUS_CODE.HTTP_OK){
          ElMessage.success('修改成功')
          emit('close')
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


const handleChange: UploadProps['onChange'] = (uploadFile) => {
  cropperShow.value = true
  goodsForm.value.img = ''
  cropperOption.img = ''
  if(uploadFile.url){
    cropperOption.img = uploadFile.url
  }
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}

/**
 * 新增goodsType按钮点击事件
 */
const handleAddgoodsType = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  goodsTypeState.value = 'add'
  formEl.resetFields()
  goodsTypeInputShow.value = true
}

/**
 * 修改goodsType按钮点击事件
 */
const handleEditGoodsType = (goodsTypeData: GoodsTypeType) => {
  goodsTypeState.value = 'edit'
  goodsTypeForm.value = {...goodsTypeData}
  goodsTypeInputShow.value = true
}

/**
 * 删除goodsType
 * @param id goodsType.id
 */
const handleRemoveGoodsType = async (id: string) => {
  const { data } = await api.removeGoodsType(id)
  if(data.status === HTTP_STATUS_CODE.HTTP_OK){
    goodsTypeList.value = goodsTypeList.value.filter(goodsType=>goodsType.id !== id)
    ElMessage.success('删除成功')
  }else{
    ElMessage.error(data.data)
  }
}

const handleAddGoodsTypeOk = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      console.log('newGoodsType',goodsTypeForm.value)
      if(goodsTypeState.value === 'add'){
        const { data } = await api.addGoodsType(goodsTypeForm.value)
        if(data.status === HTTP_STATUS_CODE.HTTP_OK){
          ElMessage.success('新增成功')
          goodsTypeList.value.push(data.data)
          formEl.resetFields()
        }else{
          ElMessage.error(data.data.error)
        }
      }else if(goodsTypeState.value === 'edit' && goodsTypeForm.value.id){
        const { data } = await api.editGoodsType(goodsTypeForm.value.id, goodsTypeForm.value)
        if(data.status === HTTP_STATUS_CODE.HTTP_OK){
          ElMessage.success('修改成功')
          goodsTypeList.value.find(goodsType=>(goodsType.id === goodsTypeForm.value.id))!.name = goodsTypeForm.value.name
        }else{
          ElMessage.error(data.data.error)
        }
      }
    }
  })
}

const handleAddGoodsTypeCancel = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  if(goodsTypeState.value === 'add'){
    formEl.resetFields()
  }
  goodsTypeInputShow.value = false
}
</script>

<style lang="less" scoped>
.add-goods{
  display: flex;
  .form{
    flex-basis: 500px;
    padding: 0 10px;
    .form-body{
      margin-top: 10px;
    }
  }
  .preview{
    flex: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    .pc{
      padding: 10px;
      .div-bordered();
    }
    .pos{
      padding: 10px;
      .div-bordered();
    }
    .pad{
      padding: 10px;
      .div-bordered();
    }
    .kitchen{
      padding: 10px;
      .div-bordered();
    }
    .preview-header{
    }
    .preview-body{
      display: flex;
      justify-content: space-around;
      align-items: center;
      .pc-preview{
        width: 200px;
        height: 200px;
        .div-bordered();
        img{
          width: 200px;
          height: 120px;
        }
        .pc-preview-name{
          font-size: 20px;
        }
        .pc-preview-desc{
          
        }
        .pc-preview-price{
          
        }
      }
      .pos-preview{
        width: 200px;
        height: 200px;
        .div-bordered();
        img{
          width: 200px;
          height: 200px;
        }
        .pos-preview-name{

        }
        .pos-preview-desc{
          
        }
        .pos-preview-price{
          
        }
      }
      .pad-preview{
        width: 200px;
        height: 200px;
        .div-bordered();
        img{
          width: 200px;
          height: 200px;
        }
        .pad-preview-name{

        }
        .pad-preview-desc{
          
        }
        .pad-preview-price{
          
        }
      }
      .kitchen-preview{
        width: 200px;
        height: 200px;
        .div-bordered();
        img{
          width: 200px;
          height: 200px;
        }
        .kitchen-preview-name{

        }
        .kitchen-preview-desc{
          
        }
        .kitchen-preview-price{
          
        }
      }
    }
  }
  .img-cropper{
    width: 350px;
    height: 350px;
  }
  .goodsType-enter-active,
  .goodsType-leave-active {
    transition: all 0.25s ease;
  }

  .goodsType-enter-from{
    opacity: 0;
    transform: translateX(30px);
  }
  .goodsType-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .goodsType-leave-from{
    opacity: 1;
    transform: translateX(0);
  }
  .goodsType-enter-to {
    opacity: 1;
    transform: translateX(0);
  }
  .el-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 200px;
}
}
</style>