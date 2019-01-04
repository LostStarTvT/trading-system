<template >
	<div id="container">
		<div id="header"> 
              <div id="name" align="center">
                    <h2>个人理财产品交易、推荐系统</h2>
                </div>  
        </div>  
        <!-- 导航 -->
        <div id="navigation">
           <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="3" style="margin-left: 900px;"><router-link to="/Goods">理财产品</router-link></el-menu-item>
                <div id="login">
                    <el-button type="text" @click="hand_login"  class="fa fa-user-circle-o fa-2x ">
                        <router-link to="/Person"></router-link>
                    </el-button>
                    <el-button type="text"  class="fa fa-cart-arrow-down fa-2x" ></el-button>
                </div>
            </el-menu>
        </div>
        <div>
            <router-view></router-view>
        </div>

		<div id="footer">
            <center>
                <div id="foot_font">
                     <font face="黑体" size = 3 >
                         © 版权所有 <br>
                    </font>
                </div>
           
            </center>
        </div>

         <!-- 登录页面
        <el-dialog title="登录" v-model="loginFormVisible" :close-on-click-modal="false">
      <el-form :model="login_form" label-width="80px"  >
        <el-form-item label="账号" prop="user_id">
             <el-input v-model="login_form.user_id" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="login_pwd">
            <el-input v-model="login_form.login_pwd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form> -->
      
        <!-- <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">登录</el-button>
        </div>
        </el-dialog>  -->
	</div>
</template>

<script>
    import Goods from "../components/good_detail.vue"

	export default {
		data() {
			return {
                input23:111,
			}
        },
        components: {
            Goods,
	    },
		methods: {
		},
		mounted() {
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
        height: 50px;
        padding-top: 10px;
        background:#409EFF;

	}
    #navigation{
        height: 50px;
        margin-bottom: 20px;

    }
    #imgload{
        float: right;
     
      
    }
    #main{
        width: 1000px;
        margin: 0 auto;
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
        position:absolute;
        bottom:0;
        width:100%;
        height:100px;
        background-color: #c0e1ff;
    }
    #foot_font{
        padding: 20px;
    }
    #login{
        padding:10px;
        float: right;
        margin-right: 180px;

    }
</style>