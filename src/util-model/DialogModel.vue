<template>
  <el-dialog
    :model-value="show"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed"
    center
    :title="title"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">{{cancelText}}</el-button>
        <el-button type="primary" @click="close">{{okText}}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
const emit = defineEmits(['open','opened','close','closed'])

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  okText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  }
})

const { show, title } = toRefs(props)

const open = () => {
  emit('open')
}
const opened = () => {
  emit('opened')
}
const close = () => {
  emit('close')
}
const closed = () => {
  emit('closed')
}
</script>

<style lang="less" scoped>
</style>