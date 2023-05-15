import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { vTrackPlus } from '../packages/index'

const app = createApp(App)


app.use(vTrackPlus, {
  baseURL: '/track/api',
  baseParams: {
    test: '1'
  },
  baseCallBack(url, trackType, params) {
    console.log('url >>>', url)
    console.log('trackType >>>', trackType)
    console.log('params >>>', params)
  },
}).mount('#app')
