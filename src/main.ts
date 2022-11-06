import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import VueCropper from 'vue-cropper'
import VueNativeSock from 'vue-native-websocket-vue3'

import App from './App.vue'
import router from './router'
import UtilModel from '@/util-model'

import 'normalize.css/normalize.css'
import 'element-plus/es/components/message/style/css'
import '@/assets/css/main.less'
import 'vue-cropper/dist/index.css'
import { useSocketStoreWithOut } from './stores/useSocketStore'

moment.locale('zh-cn')


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(UtilModel)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(VueCropper)

app.config.globalProperties.$moment = moment

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const piniaSocketStore = useSocketStoreWithOut()
app.mount('#app')

// app.use(
//   VueNativeSock,
//   'ws://192.168.1.2:3001',
//   {
//     // 启用pinia集成 | enable pinia integration
//     store: piniaSocketStore,
//     // 数据发送/接收使用使用json
//     format: 'json',
//     // 开启手动调用 connect() 连接服务器
//     connectManually: true,
//     // 开启自动重连
//     reconnection: true,
//     // 尝试重连的次数
//     reconnectionAttempts: 5,
//     // 重连间隔时间
//     reconnectionDelay: 3000
//   }
// )

export default app
