import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/reset.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './mock'


//全局配置
import http from './api/config'
import apiurl from './api/apiurl'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  store.commit('getToken')
  store.commit('getMenu')
  let token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    });
  } else {
    next();
  }
})

Vue.use(ElementUI);
//挂载到vue的原型上
Vue.prototype.$http = http;
Vue.prototype.$url = apiurl;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  },
}).$mount('#app')