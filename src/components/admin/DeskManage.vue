<template>
  <div class="desk-list">
    <div class="item desk">
      <div class="name">听风阁</div>
      <div class="type">大包</div>
      <div class="delete-btn"><el-icon :size="28" color="#fab448"><CircleClose /></el-icon></div>
    </div>
    <div class="item desk">
      <div class="name">流水榭</div>
      <div class="type">中包</div>
      <div class="delete-btn"><el-icon :size="28" color="#fab448"><CircleClose /></el-icon></div>
    </div>
    <div class="item desk">
      <div class="name">流水榭</div>
      <div class="type">中包</div>
      <div class="delete-btn"><el-icon :size="28" color="#fab448"><CircleClose /></el-icon></div>
    </div>
    <div class="item desk">
      <div class="name">流水榭</div>
      <div class="type">中包</div>
      <div class="delete-btn"><el-icon :size="28" color="#fab448"><CircleClose /></el-icon></div>
    </div>
    <div class="item desk">
      <div class="name">流水榭</div>
      <div class="type">中包</div>
      <div class="delete-btn"><el-icon :size="28" color="#fab448"><CircleClose /></el-icon></div>
    </div>
    <div class="item desk">
      <div class="name">流水榭</div>
      <div class="type">中包</div>
      <div class="delete-btn"><el-icon :size="28" color="#fab448"><CircleClose /></el-icon></div>
    </div>
    <div class="item desk">
      <div class="name">流水榭</div>
      <div class="type">中包</div>
      <div class="delete-btn"><el-icon :size="28" color="#fab448"><CircleClose /></el-icon></div>
    </div>
    <div class="item desk">
      <div class="name">流水榭</div>
      <div class="type">中包</div>
      <div class="delete-btn"><el-icon :size="28" color="#fab448"><CircleClose /></el-icon></div>
    </div>
    <div class="item add">
      <div class="icon">
        <el-icon :size="48" color="#fab448"><Plus /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

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