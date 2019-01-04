<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<!-- <el-dropdown-item >我的消息</el-dropdown-item> -->
						<el-dropdown-item @click.native="AlterPasswordFormVisible= true" >修改密码</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<!-- 这个是管理员的页面 用if else 进行判断不就行.. -->
		<div v-show="root">
			<el-col :span="24" class="main">
				<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
					<!--导航菜单-->
					<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
						unique-opened router v-show="!collapsed">
						<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
							<el-submenu :index="index+''" v-if="!item.leaf">
								<template slot="title">{{item.name}}</template>
								<!-- <el-menu-item v-for="child in item.children"  :index="child.path" v-if="!child.hidden">{{child.name }}</el-menu-item> -->
								<!-- 备份的权限显示路由 -->
									<el-menu-item v-for="child in item.children"  :index="child.path" v-if="!child.hidden && user_authority[child.path.substring(1) + ''] ">{{child.name }}</el-menu-item>
							</el-submenu>

							<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
						</template> 
					</el-menu>
				</aside>

				<section class="content-container">
					<div class="grid-content bg-purple-light">
						<el-col :span="24" class="breadcrumb-container">
							<strong class="title">{{$route.name}}</strong>
							<el-breadcrumb separator="/" class="breadcrumb-inner">
								<el-breadcrumb-item v-for="item in $route.matched">
									{{ item.name }}
								</el-breadcrumb-item>
							</el-breadcrumb>
						</el-col>
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<router-view></router-view>
							</transition>
						</el-col>
					</div>
				</section>
			</el-col>
		</div>	
		
		<!-- 这个是卖家的页面 -->
		<div v-show="seller">
			<el-col :span="24" class="main">
				<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
					<!--导航菜单-->
					<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
						unique-opened router v-show="!collapsed">
						<template v-for="(item,index) in $router.options.routes" v-if="item.seller">
							<el-submenu :index="index+'' " v-if="!item.leaf">
								<template slot="title">{{item.name}}</template>
								<el-menu-item v-for="child in item.children"  :index="child.path" v-if="!child.hidden">{{child.name }}</el-menu-item>
								<!-- 备份的权限显示路由 -->
									<!-- <el-menu-item v-for="child in item.children"  :index="child.path" v-if="!child.hidden && user_authority[child.path.substring(1) + ''] ">{{child.name }}</el-menu-item> -->
							</el-submenu>

							<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
						</template> 
					</el-menu>
				</aside>

				<section class="content-container">
					<div class="grid-content bg-purple-light">
						<el-col :span="24" class="breadcrumb-container">
							<strong class="title">{{$route.name}}</strong>
							<el-breadcrumb separator="/" class="breadcrumb-inner">
								<el-breadcrumb-item v-for="item in $route.matched">
									{{ item.name }}
								</el-breadcrumb-item>
							</el-breadcrumb>
						</el-col>
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<router-view></router-view>
							</transition>
						</el-col>
					</div>
				</section>
			</el-col>
		</div>	
			<!-- 修改面页面 -->
		<div>
			<el-dialog title="修改密码" :visible.sync="AlterPasswordFormVisible">
				<el-form :model="form">
					<el-form-item label="登录账号" :label-width="formLabelWidth">
					{{form.login_name}}
					</el-form-item>
					<el-form-item label="原密码" :label-width="formLabelWidth">
						<el-input   type="password" v-model="form.oldPassword" auto-complete="off" style="width:217px"></el-input>
					</el-form-item>
					<el-form-item label="新密码" :label-width="formLabelWidth">
					<el-input  type="password"  v-model="form.newPassword" auto-complete="off" style="width:217px"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer" style="text-align:center">
					<el-button @click="AlterPasswordFormVisible = false">取 消</el-button>
					<el-button type="success"  :disabled="!form.oldPassword || !form.newPassword " @click="updateUserPassword" >确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'卖家后台管理',
				root:false,
				seller:false,
				collapsed:false,
				sysUserName: '', //记录登录用户名
				user_authority: '', //记录登录用户的权限 保存登录用户的全部信息。
				AlterPasswordFormVisible:false,
        		
				form:{
					userId:'',
					login_name:'', //登录账号
					user_pwd:'',
					oldPassword:'',//旧密码
					newPassword:'',//新密码
				},
				 formLabelWidth: '120px',
			}
		},
		methods: {
			handleopen() {
			},
			handleclose() {
			},
			handleselect: function (a, b) {  //  这个其实也是很好用的，因为会在选择这个的时候可以进行操作。
			},
			//退出登录	
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {
				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},

			updateUserPassword(){// 更改用户密码
				var md5_oldPwd = hex_md5(this.form.oldPassword);
				// console.log(md5_oldPwd);
				// console.log(this.form.user_pwd);
				if (md5_oldPwd === this.form.user_pwd) {
					this.form.newPassword = hex_md5(this.form.newPassword);
					this.$http.post('./api/user/updateUserPassword', {
					user_pwd: this.form.newPassword,
					userId: this.form.userId
				},{}).then((response) => {
					this.$message({
				showClose: true,
				message: '恭喜你，修改成功,请重新登录',
				type: 'success'
				});
				this.$router.push({ path: '/login' });
				this.AlterPasswordFormVisible = false;
				})
				} else {
					this.$message({
					showClose: true,
					message: '请输入正确原密码！',
					type: 'error'
				});
				}
          
	  },
	  
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			// console.log(user);
			
			if (user) {
				user = JSON.parse(user);
				
				this.user_authority = user; 
				this.sysUserName = user.user_name || '';
				console.log(user);
				this.form.user_pwd = user.user_pwd;
				this.form.userId = user.userID;
				this.form.login_name = user.login_name;
				if(user.user_type == 'root'){
					this.root = true;
					this.sysName = '管理员后台管理' 
				}else{
					this.seller = true;
				}
				console.log(this.$router.options.routes);
			}
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
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
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>