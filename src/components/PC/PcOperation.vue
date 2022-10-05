<template>
  <div class="pc-operation">
    <div v-for="i in 18" :key="i" class="pc-desk">
      <div class="desk-name">听风阁</div>
      <div class="desk-type">大包</div>
      <div class="desk-startTime">开始时间：16:00:00</div>
    </div>
  </div>
</template>

<script lang="ts" setup>

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
      background-color: rgb(216, 216, 216);
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
  }
</style>