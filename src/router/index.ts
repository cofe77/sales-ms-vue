import { useUserStore } from './../stores/user'
import { createRouter, createWebHistory } from 'vue-router'
import HomeLayoutView from '@/views/HomeLayoutView.vue'
import PCLayoutView from '@/views/PcLayoutView.vue'
import AdminLayoutViewVue from '@/views/AdminLayoutView.vue'
import KitchenLayoutView from '@/views/KitchenLayoutView.vue'
import PcOperationVue from '@/components/PC/PcOperation.vue'
import PcOrderVue from '@/components/PC/PcOrder.vue'
import PcVIPVue from '@/components/PC/PcVIP.vue'
import PcInventoryVue from '@/components/PC/PcInventory.vue'
import PcSearchVue from '@/components/PC/PcSearch.vue'
import AdminHomeVue from '@/components/admin/AdminHome.vue'
import AdminLoginVue from '@/components/admin/AdminLogin.vue'
import GoodsManageVue from '@/components/admin/Goods/GoodsManage.vue'
import DeskManageVue from '@/components/admin/DeskManage.vue'
import UserManageVue from '@/components/admin/UserManage.vue'
import CarouselManageVue from '@/components/admin/CarouselManage.vue'
import SavedBeerManageVue from '@/components/admin/SavedBeerManage.vue'
import AnalyseViewVue from '@/components/admin/AnalyseView.vue'
import VIPManageVue from '@/components/admin/VIPManage.vue'
import OrderManageVue from '@/components/admin/OrderManage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeLayoutView,
    },
    {
      path: '/pc',
      component: PCLayoutView,
      children: [
        {
          path: '',//首页
          component: PcOperationVue
        },
        {
          path: 'order',//点餐
          component: PcOrderVue
        },
        {
          path: 'vip',//vip
          component: PcVIPVue
        },
        {
          path: 'inventory',//库存
          component: PcInventoryVue
        },
        {
          path: 'search',//搜索
          component: PcSearchVue
        },
      ]
    },
    {
      path: '/admin',//后台
      component: AdminLayoutViewVue,
      beforeEnter: (to)=>{
        // const store = useUserStore()
        // if(!store.id && to.path != '/adminLogin'){
        //   return { path: '/adminLogin', replace: true }
        // }
      },
      children: [
        {
          path: '',//首页
          component: AdminHomeVue
        },
        {
          path: 'goods',//点餐
          component: GoodsManageVue
        },
        {
          path: 'desk',//点餐
          component: DeskManageVue
        },
        {
          path: 'user',//点餐
          component: UserManageVue
        },
        {
          path: 'vip',//vip
          component: VIPManageVue
        },
        {
          path: 'carousel',//库存
          component: CarouselManageVue
        },
        {
          path: 'savedBeer',//搜索
          component: SavedBeerManageVue
        },
        {
          path: 'order',//点餐
          component: OrderManageVue
        },
        {
          path: 'analyse',//点餐
          component: AnalyseViewVue
        },
      ]
    },
    {
      path: '/adminLogin',//首页
      component: AdminLoginVue
    },
    {
      path: '/kitchen',//厨房大屏
      component: KitchenLayoutView,
    },
  ],
})

export default router
