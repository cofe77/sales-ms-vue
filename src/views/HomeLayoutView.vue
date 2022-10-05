<script setup lang="ts">
  import { computed } from 'vue'
  const home = computed(()=>!['pc','admin','kitchen'].includes(location.href.split('/').reverse()[0]))
  const homeNav = (target:string) =>{
    location.href = target
  }
  </script>
  
  <template>
    <ul class="home-nav" v-if="home">
      <li class="home-nav-li" @click="homeNav('/pc')">PC营业</li>
      <li class="home-nav-li" @click="homeNav('/admin')">后台管理</li>
      <li class="home-nav-li" @click="homeNav('/kitchen')">后厨大屏</li>
    </ul>
    <div v-else class="home-content">
      <router-view></router-view>
    </div>
  </template>
  
  <style scoped lang="less">
    .home-nav{
      margin: 0 auto;
      width: fit-content;
      display: flex;
      margin-top: calc(~'50vh - 100px');
      .home-nav-li{
        width: 170px;
        list-style: none;
        background-color: rgb(91, 57, 138);
        text-align: center;
        line-height: 100px;
        margin: 5px;
        color: #fff;
        cursor: pointer;
        border-radius: 10px;
        font-size: 20px;
        &:hover{
          background-color: rgb(124, 83, 166);
        }
      }
    }
    .home-content{
      margin: 0 auto;
      border: 1px solid #d8d8d8;
    }
  </style>
  