import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import nanobar from './plugins/nanobar'
import "@/plugins/firebase";
import { rtdbPlugin as VueFire } from 'vuefire'
import PortalVue from 'portal-vue'
import { ToastPlugin } from 'bootstrap-vue'
Vue.use(ToastPlugin)
Vue.use(PortalVue)
Vue.use(VueFire)
Vue.config.productionTip = false
new Vue({
  nanobar,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
