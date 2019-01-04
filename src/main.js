import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css' 这是相对路径进行引用的。
import VueRouter from 'vue-router'
import VueResource from 'vue-resource' 
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import Mock from './mock'
Mock.bootstrap();
import scroll from 'vue-seamless-scroll';
import 'font-awesome/css/font-awesome.min.css' //直接进行引用css框架。 所以要引入其他的直接加入就行 竟然有引入图标。
 //没有路径的都是直接用模块的引用
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(scroll)



const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{ 
      if (to.path == '/login' || to.path == '/indexlogin') { 
        sessionStorage.removeItem('user');
      }
      // next();
      let user = JSON.parse(sessionStorage.getItem('user'));
      if(to.path == '/home'){ 
        if(!user){   
          next({ path:'/login'});
        }
        else{
          next();
        }
      }
      else{
         next(); 
      }
});

new Vue({

  router,
  store,

  render: h => h(App)
}).$mount('#app')

