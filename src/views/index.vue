<template >
	<div id="container">
		<div id="header"> 
              <div id="name" align="center">
                    <h2>个人理财产品交易、推荐系统</h2>
                </div>  
        </div>  
        <!-- 导航 -->
        <div id="navigation">
           <el-menu  router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <div style=" margin-left: 180px;">
                    <el-menu-item index="/Goods"  >理财产品</el-menu-item>
                    <!-- <el-menu-item index="/info"  >理财首页</el-menu-item>
                    <el-menu-item index="/Goods"  >服务指南</el-menu-item> -->
                    <!-- 以后再写个介绍。。 -->
                </div>
              
                <div id="login">
                    <el-popover
                        ref="popover"
                        placement="top"
                        width="160"
                        v-model="visible">
                        <p>确定退出吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="hand_logout">确定</el-button>
                        </div>
                    </el-popover>

                     <el-button type="text"   @click="hand_login">{{log_unlog}}</el-button>
                        <!-- <router-link to="/Person"></router-link> -->
                    </el-button>
                    <!-- <el-button type="text"   @click="open_cart" class="fa fa-cart-arrow-down fa-2x" ></el-button> -->
                    <el-button type="text"  v-show="this.wether_login"  v-popover:popover >退出</el-button>
                </div>
            </el-menu>
        </div>
        <div >
            <transition name="fade" mode="out-in">
							<router-view></router-view>
			</transition>
        </div>

		<div id="footer">
            <center>
                <div id="foot_font">
                     <font face="黑体" size = 3 >
                         © 版权所有 <br>
                    </font>
                </div>
                <div>
                     <router-link to="/login">管理员登录</router-link>
                </div>
           
            </center>
        </div>

	</div>
</template>

<script >
    // import Goods from "../components/good_detail.vue"

	export default {
		data() {
			return {
                visible: false,
                log_unlog:"点击登录",
                wether_login:false,//判断是否登录
                activeIndex: '1',
                listLoading: false,  //查询数据时候的标志量
                activemoney_begin: 'first', //默认选择第一页面。
                loginFormVisible:false,
                editLoading:false,
                sysUserName: '',
			}
        },
        // components: {
        //     Goods,
	    // },
		methods: {
            handleSelect(key, keyPath) {
                //   console.log(key, keyPath);
             },
            hand_login: function () {
                if(!this.wether_login)
                {
                    this.$router.push({ path: '/indexlogin' })
                }
                else
                {
                    this.$router.push({ path: '/Person' });
                }
             
            },
            hand_logout:function(){ //登出
                this.visible = false;
                this.wether_login = false;
                this.log_unlog = '点击登录';
                sessionStorage.removeItem('user');//退出的时候也要将用户数据清除
                this.$router.push({ path: '/Goods' });
            },
            open_cart:function(){
                 this.$router.push({ path: '/Cart' });
            },
        },
        watch:{  //用@change 这个事件也可以进行
            'sysUserName'(curVal,oldVal){
                if (!this.wether_login) {
                    this.log_unlog = this.sysUserName;
                    this.wether_login = true;
                }else
                {
                     this.log_unlog = '点击登录';
                }
    　　　　 
　　    },
        },
		mounted() {
            var user = sessionStorage.getItem('user');
			if (user) {
                user = JSON.parse(user);
				this.sysUserName = user.user_name || '';
                // console.log(this.sysUserName);    
            }
      
		}
	}
</script>

<style>
    *{padding: 0;margin: 0;border: 0;}
	#container{
		margin:0px 0px 0px 0px ;
        padding:0px;
	}
 
	#header{
        margin: 0px;
        height: 40px;
        padding-top: 10px;
        background:#409EFF;

	}
    #navigation{
        height: 50px;
        margin-bottom: 20px;

    }
	#page{
        margin: 0 auto; 
	}

    #search{

         /* margin-left: 10px; */
         float: left;
         margin-top: 10px;
         margin-bottom: 10px;
         width: 200px;
    }

    #sort{
        float: left;
        margin-top: 10px;
        margin-left: 30px;
        margin-bottom: 10px;
    }
	#footer{
        /* position:absolute;
        bottom: 0px;
        width:100%;
        height:60px; */
        background-color: #c0e1ff;
        position:relative;
        flex: 0 0 auto;
        padding: 10px 0 20px;
    /* background: #fff; */
        margin-top: 0px;
        height:40px;
        }
    #foot_font{
        padding: 5px;
    }
    #login{
        padding:10px;
        float: right;
        margin-right: 180px;

    }
</style>