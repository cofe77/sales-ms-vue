import api from '@/api'
import type { UpdateGoodsType } from '@/types/goods'
import { defineStore } from 'pinia'
import { HTTP_STATUS_CODE } from '@/config/config'
import { ElMessage } from 'element-plus'
import type CreateOrderType from '@/types/order'
import type { UpdateDeskType } from '@/types/desk'

export const useOrderStore = defineStore({
  id: 'order',
  state: (): CreateOrderType => ({
    desk: {
      name: '',
      typeId: ''
    },
    deskId: '',
    staffId: '',
    consume: 0,
    item: []
  }),
  getters: {
    getDeskId: (state) => state.deskId,
    getDeskName: (state) => state.desk.name,
    getOrderItem: (state) => state.item,
    getAmount: (state) => state.consume
  },
  actions: {
    addItem(newGoods: UpdateGoodsType) {
      const res = this.item.find(item => item.goods.id === newGoods.id)
      if (res) {
        res.count++
      } else {
        this.item.push({
          goods: newGoods,
          count: 1
        })
      }
      this.consume = this.item.reduce((a,b) =>a+b.count*b.goods.price,0)
    },
    async createOrder() {
      const { data } = await api.newOrder(this.$state)
      if (data.status === HTTP_STATUS_CODE.HTTP_OK) {
        ElMessage.success('下单成功！')
        this.$reset()
      }
    },
    setDesk(desk: UpdateDeskType) {
      this.deskId = desk.id
      this.desk.name = desk.name
      this.desk.typeId = desk.typeId
    },
    setTakeAway() {
      this.deskId = ''
      this.desk.name = ''
      this.desk.typeId = ''
    },
    clean() {
      this.$reset
    }
  },
  persist: {
    enabled: true
  }
})
