import Login from './views/Login.vue'
import index from './views/index.vue'
import NotFound from './views/404.vue'
import Goods from './components/good_detail.vue'
import Person from './components/person_detail.vue'
import Checkout from './components/checkout.vue'
import SellerRegister from './components/SellerRegister.vue'
import Cart from './components/cart.vue'
import OrderPage from './components/personpage/Orderpage.vue'
import info from './components/personpage/info.vue'
import Personinfo from './components/personpage/personinfo.vue'
import Resellpage from './components/personpage/resellpage.vue'
import Indexlogin from './components/index-login.vue'
import Forbidden from './views/forbidden.vue'
import ChangePwd from './views/changePasswd.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
// 用户模块管理
import RegisterManage from './views/nav1/RegisterManage.vue' 
import PersonManage from './views/nav1/personManage.vue'  
import AuthrityManage from './views/nav1/AuthrityManage.vue'  
// 交易模块管理
import OrderManage from './views/nav2/OrderManage.vue'
import ResellManage from './views/nav2/resellMange.vue'
import GoodsManage from './views/nav2/GoodsManage.vue'


import GoodUploading from './views/nav3/GoodUploading.vue'
import CreateNew from './views/nav3/CreateNew.vue'
import SellerInfo from './views/nav3/sellerInfo.vue'
import compayInfo from './views/nav3/companyInfo.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
      {
        path: '/',
        component: index,
        name: '网站首页',
        redirect: '/Goods',
        hidden: true,   //所有属性为hidden的 都不会被后台管理给渲染出来。
        seller:false,
        children: [ //子路由和router配置是完全一样的
                    { path: '/Goods', component: Goods, name: '商品显示', hidden: true },
                    { path: '/info', component: info, name: '主页' ,hidden: true},
                    { path: '/Person', component: Person, name: '个人信息' ,redirect: '/OrderPage',
                
                        children: [  // person下的子路由
                            {path: '/OrderPage', component: OrderPage, name: '查看订单',},
                            {path: '/Personinfo', component: Personinfo, name: '查看个人信息',},
                            {path: '/Resellpage', component: Resellpage, name: '转售操作',},
                        ]},
                    { path: '/Checkout', component: Checkout, name: '订单页面' },
                    { path: '/Cart', component: Cart, name: '购物车页面' },
                    // { path: '/SellerRegister', component: SellerRegister, name: '卖家注册' },
                ]
    },
    {
        path: '/login',
        component: Login,
        name: '后台管理登录',
        seller:false,
        hidden: true
    },
    {
        path: '/SellerRegister',
        component: SellerRegister,
        name: '卖家注册',
        seller:false,
        hidden: true
    },
    {
        path: '/indexlogin',
        component: Indexlogin,
        name: '购买登录',
        seller:false,
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        seller:false,
        hidden: true
    },
    {
        path: '/forbidden',
        component: Forbidden,
        name: '',
        seller:false,
        hidden: true
    },
    { //这是主页的页面。也就是直接进行匹配
        path: '/home',
        component: Home,
        name: '用户模块管理',
        seller:false,
        iconCls: 'el-icon-message',//图标样式class
        children: [ //子路由和router配置是完全一样的
            { path: '/PersonManage', component: PersonManage, name: '人员管理' },
            { path: '/AuthrityManage', component: AuthrityManage, name: '权限管理' },
        ]
    },
    {
        path: '/home',
        component: Home,
        name: '交易模块管理',
        seller:false,
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/GoodsManage', component: GoodsManage, name: '产品管理' },
            { path: '/OrderManage', component: OrderManage, name: '订单管理' },
            { path: '/ResellManage', component: ResellManage, name: '抛售管理' }
        ]
    },
    {
        path: '/home',
        component: Home,
        name: '产品管理',
        hidden:true,
        seller:true, //seller 显示的页面导航。
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/GoodUploading', component: GoodUploading, name: '我的发布'},
            { path: '/CreateNew', component: CreateNew, name: '新建产品' },
        ]
    }, {
        path: '/home',
        component: Home,
        name: '个人信息',
        hidden:true,
        seller:true, //seller 显示的页面导航。
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/SellerInfo', component: SellerInfo, name: '融资详情' },
            { path: '/compayInfo', component: compayInfo, name: '我的信息' },
        ]
    },
    {
        path: '*',
        hidden: true,
        seller:false,
        redirect: { path: '/index' }
    }
];

export default routes;