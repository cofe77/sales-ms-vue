<template>
  <el-dialog
    :model-value="show"
    @open="open"
    @opened="opened"
    @closed="closed"
    center
    :title="title"
    :top="top"
  >
    <slot></slot>
    <template #footer v-if="hasFooter">
      <span class="dialog-footer">
        <el-button v-if="!disableCancel" @click="close">{{cancelText}}</el-button>
        <el-button v-if="!disableOk" type="primary" @click="ok">{{okText}}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
const emit = defineEmits(['open','opened','close','closed','ok'])

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
  },
  top: {
    type: String,
    default: '',
  },
  disableOk: {
    type: Boolean,
    default: false,
  },
  disableCancel: {
    type: Boolean,
    default: false,
  },
  hasFooter: {
    type: Boolean,
    default: true,
  },
})

const { show, title, top, disableOk, disableCancel, hasFooter } = toRefs(props)

const open = () => {
  emit('open')
}
const opened = () => {
  emit('opened')
}
const close = () => {
  emit('close')
}
const ok = () => {
  emit('ok')
}
const closed = () => {
  emit('closed')
}
</script>

<style lang="less" scoped>
</style>