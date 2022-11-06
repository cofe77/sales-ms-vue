<template>
  <div class="add-goods">
    <div class="form">
      <div class="form-header">请填写商品信息</div>
      <div class="form-body">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="类别" prop="region">
            <el-space>
              <el-select v-model="ruleForm.region" placeholder="类别">
                <el-option label="酒水" value="beer" />
                <el-option label="饮料" value="drink" />
              </el-select>
              <el-button type="primary">类别管理</el-button>
            </el-space>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="库存" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="价格" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="折扣" prop="region">
            <el-input-number
              v-model="ruleForm.name"
              :min="1"
              :max="10"
              controls-position="right"
            />
          </el-form-item>
          <el-form-item label="图片" prop="region">
            <div>
              <el-upload
                v-model:file-list="fileList"
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                list-type="picture"
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
          <el-form-item label="是否上架" prop="delivery">
            <el-switch v-model="ruleForm.delivery" />
          </el-form-item>
          <el-form-item label="商品描述" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >锁定</el-button
            >
            <el-button @click="resetForm(ruleFormRef)">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="preview">
      <div class="pc">
        <div class="preview-header">前台预览</div>
        <div class="preview-body">
          <div class="pc-preview">
            <img src="/static/image/beer.png" alt="">
            <div class="pc-preview-name">啤酒（罐）</div>
            <div class="pc-preview-desc">雪花啤酒</div>
            <div class="pc-preview-price">8.00元</div>
          </div>
        </div>
      </div>
      <div class="pos">
        <div class="preview-header">POS预览</div>
        <div class="preview-body">
          <div class="pos-preview">
            <img src="/static/image/beer.png" alt="">
            <div class="pos-preview-name">啤酒（罐）</div>
            <div class="pos-preview-desc">雪花啤酒</div>
            <div class="pos-preview-price">8.00元</div>
          </div>
        </div>
      </div>
      <div class="pad">
        <div class="preview-header">PAD预览</div>
        <div class="preview-body">
          <div class="pad-preview">
            <img src="/static/image/beer.png" alt="">
            <div class="pad-preview-name">啤酒（罐）</div>
            <div class="pad-preview-desc">雪花啤酒</div>
            <div class="pad-preview-price">8.00元</div>
          </div>
        </div>
      </div>
      <div class="kitchen">
        <div class="preview-header">后厨预览</div>
        <div class="preview-body">
          <div class="kitchen-preview">
            <img src="/static/image/beer.png" alt="">
            <div class="kitchen-preview-name">啤酒（罐）</div>
            <div class="kitchen-preview-desc">雪花啤酒</div>
            <div class="kitchen-preview-price">8.00元</div>
          </div>
        </div>
      </div>
    </div>
    <DialogModel :show="true" title="">
      <div class="img-cropper">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
        ></vueCropper>
      </div>
    </DialogModel>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import DialogModel from '../../../util-model/DialogModel.vue'

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

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  }
])

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}

const option = {
  img: '/static/image/beer.png',
  size: 1,
  outputType: 'jpeg'
}
</script>

<style lang="less" scoped>
.add-goods{
  display: flex;
  .form{
    flex-basis: 500px;
    padding: 0 10px;
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
          height: 200px;
        }
        .pc-preview-name{

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
    width: 200px;
    height: 200px;
  }
}
</style>