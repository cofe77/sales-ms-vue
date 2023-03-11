<template>
  <div class="carousel">
    <div class="top">
      <div class="workstation">
        <el-upload
          ref="upload"
          class="upload"
          v-model:file-list="fileList"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture"
          :auto-upload="false"
          :on-change="handleChange"
          :limit="1"
          :on-exceed="handleExceed"
          :show-file-list="false"
        >
          <el-icon :size="80" class="upload-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <div class="preview">
        <div class="preview-carousel">
          <el-carousel v-if="carouselAvailableList[0]" width="293px" height="356px" >
            <el-carousel-item v-for="img in carouselAvailableList" :key="img.id">
              <el-image :title="img.title" :src="img.src" class="carousel-img" alt="">
                <template #error>
                  <div class="image-slot">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="bottom">
      <el-table :data="carouselList" width="100%" :stripe="true" border>
        <el-table-column label="title" property="title">
          <template #default="scope">
            <span v-if="scope.row.title">{{scope.row.title}}</span>
            <span v-else style="color:red">尽快补充信息</span>
          </template>
        </el-table-column>
        <el-table-column label="href" property="href">
          <template #default="scope">
            <span v-if="scope.row.href">{{scope.row.href}}</span>
            <span v-else style="color:red">尽快补充信息</span>
          </template>
        </el-table-column>
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
                @click="handleEditIndex(scope.$index, scope.row.id,-1)"
                :disabled="scope.row.id === carouselList[0]?.id"
              ></el-button>
              <el-button type="primary" :icon="ArrowDown"
                @click="handleEditIndex(scope.$index, scope.row.id,1)"
                :disabled="scope.row.id === carouselList[carouselList.length-1]?.id"
              ></el-button>
            </el-button-group>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-button v-if="scope.row.state === 1" type="warning" size="small" @click="handlePullCarousel(scope.row.id, 0)">禁用</el-button>
              <el-button v-else type="danger" size="small" @click="handlePullCarousel(scope.row.id, 1)">启用</el-button>
              <el-button type="primary" size="small" @click="handleEditCarousel(scope.row)">修改</el-button>
              <el-button type="danger" size="small" @click="handleRemoveCarsouel(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
    <DialogModel 
      :show="carouselEditDialogShow" 
      title="修改"
      @closed="carouselEditDialogShow = false"
      @close="carouseEditDialogClose"
      @ok="carouseEditDialogOk"
    >
      <el-form
        ref="carouselFormRef"
        :model="carouselForm"
        :rules="carouselRules"
        label-width="60px"
        class="demo-ruleForm"
        size="default"
        status-icon
       >
        <el-form-item label="title" prop="title">
          <el-input  v-model="carouselForm.title" type="textarea" />
        </el-form-item>
        <el-form-item label="href" prop="href">
          <el-input  v-model="carouselForm.href" type="textarea" />
        </el-form-item>
      </el-form>
    </DialogModel>
  </div>
</template>

<script lang="ts" setup>
import type CarouselType from '@/types/carousel'
import { ElMessage, genFileId, type FormInstance, type FormRules, type UploadInstance, type UploadProps, type UploadRawFile, type UploadUserFile } from 'element-plus'
import moment from 'moment'
import { ref, reactive, type Ref, computed } from 'vue'
import {
  ArrowDown,
  ArrowUp,
} from '@element-plus/icons-vue'
import api from '@/api'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { HTTP_STATUS_CODE } from '@/config/config'

const carouselList: Ref<CarouselType[]> = ref([])
const cropper = ref()
const upload = ref<UploadInstance>()
const cropperShow = ref(false)
const carouselEditDialogShow = ref(false)
const carouselSrc = ref('')
const fileList = ref<UploadUserFile[]>([])
const carouselAvailableList = computed(()=>carouselList.value.filter(carousel=>carousel.state === 1))

const cropperOption = reactive({
  img: '',
  size: 1,
  outputType: 'jpg',
  autoCrop: true,
  autoCropWidth: 293,
  autoCropHeight: 356,
  fixed: false
})

const initData = async () => {
  const { data } = await api.getCarouselList()
  if (data.status === 11111) {
    carouselList.value = data.data.sort((a: CarouselType, b: CarouselType) => a.idx! - b.idx!)
  }
}

initData()

const originCarousel = {
  id: '',
  src: '',
  title: '',
  href: ''
}

const carouselForm: Ref<CarouselType> = ref(originCarousel)
const carouselFormRef = ref<FormInstance>()

const carouselRules = reactive<FormRules>({
  title: [
    { required: true }
  ],
  href: [
    { required: true }
  ]
})

const handleCropperOk = () => {
  cropper.value.getCropBlob(async (imgBlob: any)=>{
    const imgFormData = new FormData()
    imgFormData.append('jpg',imgBlob)
    const { data } = await api.imgUpload(imgFormData)
    if(data.status === 11111){

      //生产环境
      // carouselSrc.value = data.data
      //开发环境
      carouselSrc.value = 'http://localhost:3002'+data.data

      fileList.value = []
      fileList.value.push({
        name: data.data,
        url: carouselSrc.value
      })
      api.addCarousel({src:carouselSrc.value}).then(res=>{
        if(res.data.status === 11111){
          initData()
          ElMessage.success('上传成功')
        }
      })
    }
  })
  cropperShow.value = false
}


const handleChange: UploadProps['onChange'] = (uploadFile) => {
  cropperShow.value = true
  carouselSrc.value = ''
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
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value?.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value?.handleStart(file)
}

const handlePullCarousel = async (id: string, state: number) => {
  const { data } = await api.pullCarousel(id, state)
  if(data.status === 11111){
    carouselList.value.find(carousel=>carousel.id === id)!.state = state
    ElMessage.success(`${state===1?'启用':'禁用'}成功`)
  }
}

const handleEditCarousel = (rowData: CarouselType) => {
  console.log('rowData',rowData)
  carouselForm.value = {...rowData}
  carouselEditDialogShow.value = true
}

const carouseEditDialogOk= () => {
  if(!carouselFormRef.value) return
  carouselFormRef.value.validate(async (valid) => {
    if (valid && carouselForm.value.id) {
      const { data } = await api.editCarousel(carouselForm.value.id, {title:carouselForm.value.title, href:carouselForm.value.href})
      if(data.status === 11111){
        ElMessage.success('修改成功')
        initData()
      }else{
        ElMessage.error(data.data.error)
      }
    }
  })
  carouselEditDialogShow.value = false
}

const carouseEditDialogClose = () => {
  carouselForm.value = originCarousel
  carouselEditDialogShow.value = false
}

const handleEditIndex = async (_index: number, id:string, diff: number) => {
  let targetId
  if(diff === 1){//往后调
    targetId = carouselList.value[_index+1].id
  }else if(diff === -1){//往前调
    targetId = carouselList.value[_index-1].id
  }
  if(!targetId) return
  const { data } = await api.editCarouselIndex(id,targetId)
  if (data.status === HTTP_STATUS_CODE.GET_OK) {
    initData()
    ElMessage.success('修改成功')
  }
}

const handleRemoveCarsouel = async (id: string) => {
  const { data } = await api.removeCarousel(id)
  if(data.status === HTTP_STATUS_CODE.GET_OK){
    carouselList.value = carouselList.value.filter(carousel=>carousel.id !== id)
    ElMessage.success('删除成功')
  }
}
</script>

<style lang="less" scoped>
.carousel{
  .top{
    display: flex;
    .workstation{
      display: flex;
      margin-right: 10px;
      padding: 10px;
      .div-bordered();
      .upload{
        width: 293px;
        height: 356px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-style: dotted;
        .div-bordered();
        .upload-icon{
          width: 293px;
          height: 356px;
        }
        &:hover {
          border-color: var(--el-color-primary);
        }
      }
    }
    .preview{
      width: 512px;
      height: 384px;
      position: relative;
      background-image: url('/static/image/首页.png');
      background-repeat: no-repeat;
      background-size: cover;
      .preview-carousel{
        width: 293px;
        height: 356px;
        position: absolute;
        right: 14px;
        top: 15px;
        border-radius: 5px;
        .carousel-img{
          width: 293px;
          height: 356px;
          border-radius: 5px;
        }
        :deep(.el-carousel__button){
          width: 5px;
          height: 5px;
          border-radius: 999px;
        }
      }
    }
  }
  .bottom{
    margin-top: 10px;
  }
  .img-cropper{
    width: 293px;
    height: 356px;
  }
}
</style>