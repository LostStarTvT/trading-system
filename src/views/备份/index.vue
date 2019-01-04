<template >
	<div id="container">
		<div id="header">
                <div id="name" align="center">
                    <h1>个人理财产品交易、推荐系统</h1>
                </div>
        </div>  
        <div id="main">
            <div> 
                <div id="search" >
                    <el-input
                            placeholder="产品名称"
                            icon="search"
                            v-model="search"
                            :on-icon-click="handleIconClick">
                        </el-input> 
                </div>

                <div id="sort">
                    <el-tag type="primary">显示方式</el-tag>
                    <span class="wrapper">
                                <el-button type="info">成交量</el-button>
                                <el-button type="info">收益率</el-button>
                                <el-button type="info">购买期限</el-button>
                            </span>
                </div> 
                <div id="login"> 
                    <!-- 登录图标显示 -->
                    <el-button type="text" @click="hand_login"  class="fa fa-user-circle-o fa-2x " ></el-button>
                    <el-button type="text"  class="fa fa-cart-arrow-down fa-2x" ></el-button>
    
                    <!-- <el-col :span="4" class="userinfo">
				        <el-dropdown trigger="hover">
                            <span class="el-dropdown-link userinfo-inner"> {{sysUserName}}</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>我的消息</el-dropdown-item>
                                <el-dropdown-item>设置</el-dropdown-item>
                                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
			        </el-col> -->
                </div>

            </div>


            <div id="page">
                <el-tabs v-model="activemoney_begin"   v-loading="listLoading"  type="card" >
                    <el-tab-pane  label="建设银行" name="first">
                        
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column   prop="goods_name" label="基本信息" width="180">
                            </el-table-column>
                            <el-table-column  sortable prop="money_begin" label="起购金额" width="180">
                            </el-table-column>
                            <el-table-column  sortable prop="good_keep_time" label="投资期限">
                                </el-table-column>
                            <el-table-column prop="time_begin" label="发行日期">
                                </el-table-column>
                            <el-table-column  sortable prop="rates" label="收益率">
                                </el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button size="small" type="primary" @click="">预购</el-button>
                                    <el-button size="small" type="success" @click="">购买</el-button>
                                </template>
                                </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="工商银行" name="second">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column   prop="goods_name" label="基本信息" width="180">
                            </el-table-column>
                            <el-table-column  sortable prop="money_begin" label="起购金额" width="180">
                            </el-table-column>
                            <el-table-column  sortable prop="good_keep_time" label="投资期限">
                                </el-table-column>
                            <el-table-column prop="time_begin" label="发行日期">
                                </el-table-column>
                            <el-table-column  sortable prop="rates" label="收益率">
                                </el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button size="small" type="primary" @click="">预购</el-button>
                                    <el-button size="small" type="success" @click="">购买</el-button>
                                </template>
                                </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="农业银行" name="third">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column   prop="goods_name" label="基本信息" width="180">
                            </el-table-column>
                            <el-table-column  sortable prop="money_begin" label="起购金额" width="180">
                            </el-table-column>
                            <el-table-column  sortable prop="good_keep_time" label="投资期限">
                                </el-table-column>
                            <el-table-column prop="time_begin" label="发行日期">
                                </el-table-column>
                            <el-table-column  sortable prop="rates" label="收益率">
                                </el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button size="small" type="primary" @click="">预购</el-button>
                                    <el-button size="small" type="success" @click="">购买</el-button>
                                </template>
                                </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="农业银行" name="fourth">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column   prop="goods_name" label="基本信息" width="180">
                            </el-table-column>
                            <el-table-column  sortable prop="money_begin" label="起购金额" width="180">
                            </el-table-column>
                            <el-table-column  sortable prop="good_keep_time" label="投资期限">
                                </el-table-column>
                            <el-table-column prop="time_begin" label="发行日期">
                                </el-table-column>
                            <el-table-column  sortable prop="rates" label="收益率">
                                </el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button size="small" type="primary" @click="">预购</el-button>
                                    <el-button size="small" type="success" @click="">购买</el-button>
                                </template>
                                </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    
                </el-tabs>
            </div>
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

         <!--登录页面-->
        <el-dialog title="登录" v-model="loginFormVisible" :close-on-click-modal="false">
      <el-form :model="login_form" label-width="80px"  >
        <el-form-item label="账号" prop="user_id">
             <el-input v-model="login_form.user_id" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="login_pwd">
            <el-input v-model="login_form.login_pwd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">登录</el-button>

      </div>
    </el-dialog> 
	</div>
</template>

<script>
	export default {
		data() {
			return {
                input23:111,
                search :'',
                listLoading: false,  //查询数据时候的标志量
                sysUserName:'aaa',
                tableData: [{
                    goods_name: 'a ',
                    money_begin: '100万',
                    good_keep_time: '42天',
                    time_begin:'2008-7-21',
                    rates:'5.05%',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    goods_name: 'b',
                    money_begin: '10万',
                    good_keep_time: '40天',
                    time_begin:'2008-7-23',
                    rates:'5.05%',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    goods_name: 'c',
                    money_begin: '30万',
                    good_keep_time: '40天',
                    time_begin:'2008-7-23',
                    rates:'2%',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    goods_name: 'd',
                    money_begin: '100',
                    good_keep_time: '2天',
                    time_begin:'2008-7-23',
                    rates:'1%',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                activemoney_begin: 'first', //默认选择第一页面。
                activeIndex: '1',
                loginFormVisible:false,
                login_form: {
                    user_id:'',
                    user_pwd:'',
                },
                editLoading:false,
			}
		},
		methods: {
            selectGoods() {
                // var name = this.userName;
                this.listLoading = true;
                this.$http.post('./api/user/selectGoods', {
                    page: this.page,
                    // name: this.filters.name
                },{}).then((response) => {
                    this.results = response.data.data;
                    this.total = response.data.total;
                    this.listLoading = false;
                    // console.log(this.results);
                })
            },
             //显示新增界面
            hand_login: function () {
                // this.loginFormVisible = true ;
                // this.login_form = {
                // user_id:'',
                // user_pwd:'',
                // };
                this.$router.push({ path: '/login' });
            },
            handleIconClick(evt) {
                console.log(ev);
            },
			handleSelect(key, keyPath) {
                  console.log(key, keyPath);
             },
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
        height: 70px;
        padding-top: 30px;
         background:#409EFF;

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
    }
    .userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
</style>