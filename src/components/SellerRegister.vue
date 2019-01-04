<template>
<div id="container">
  <div id="header"> 
              <div id="name" align="center">
                    <h2>个人理财产品交易、推荐系统</h2>
                </div>  
        </div>  
    <div style="width:600px;margin-top:20px;margin-left:270px">
    
        <el-form ref="form" :model="form"    :rules="rules"  label-width="130px">
          <div style="margin-left:130px;color:red">
                请选择注册用户类型！
              </div>
             <el-form-item label="用户类型"  prop="user_type" >
               <el-select v-model="form.user_type" placeholder="用户类型"  style="width:300px;">
                <el-option  v-for="item in userTypeOptions" :key="item.value"  :label="item.label"  :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
            <!-- 具体信息注册 -->
            <div v-show="personInfo">
              <div style="margin-left:130px">
                用户基本信息
              </div>
              <el-form-item label="登录账号" prop="login_name">
                      <el-input v-model="form.login_name" style="width:300px" ></el-input>
                    </el-form-item>
                    <el-form-item label="密码"  prop="user_pwd" >
                      <el-input  type="password"  style="width:300px" v-model="form.user_pwd"></el-input>    
                    </el-form-item>

                    <el-form-item label="确认密码" prop="check_password" >
                      <el-input  type="password"  style="width:300px" v-model="form.check_password"></el-input>      
                    </el-form-item>
                    <el-form-item label="姓名"  prop="user_name">
                      <el-input style="width:300px" v-model="form.user_name"></el-input>      
                    </el-form-item>

                    <el-form-item label="身份证号" prop="userIDCard" >
                      <el-input style="width:300px" v-model="form.userIDCard"></el-input>      
                    </el-form-item>
                    <el-form-item label="手机号" prop="userPhoneNumber" >
                      <el-input style="width:300px" v-model="form.userPhoneNumber"></el-input>     
                    </el-form-item>
                     </div>
            </el-form>
            <!-- 企业信息注册 -->
            <el-form ref="formCompany" :model="formCompany"   label-width="130px">
            <div v-show="companyInfo">
              <div style="margin-left:130px">
              公司信息
            </div>
            
              <el-form-item label="企业名称" prop="companyName">
                <el-input v-model="form.companyName" style="width:300px" ></el-input>
              </el-form-item>
              <el-form-item label="营业执照注册号" prop="companyRegisterId">
                <el-input v-model="form.companyRegisterId" style="width:300px" ></el-input>
              </el-form-item>
              <el-form-item label="组织机构代码" prop="companyInstitutionalId">
                <el-input v-model="form.companyInstitutionalId" style="width:300px" ></el-input>
              </el-form-item>
              <el-form-item label="常用地址" prop="comanyAddress">
                <el-input v-model="form.comanyAddress" style="width:300px" ></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="companyTellNumber">
                <el-input v-model="form.companyTellNumber" style="width:300px" ></el-input>
              </el-form-item>
              <el-form-item label="营业执照所在地" prop="CompanyLicenseAddress">
                <el-input v-model="form.CompanyLicenseAddress" style="width:300px" ></el-input>
              </el-form-item>
              <el-form-item label="注册资金" prop="RegisterMoneny">
                <el-input v-model="form.RegisterMoneny" style="width:300px" ></el-input>
              </el-form-item>
              <el-form-item label="法定法人姓名" prop="LegalPersonName">
                <el-input v-model="form.LegalPersonName" style="width:300px" ></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="LegalPersonIDCard">
                <el-input v-model="form.LegalPersonIDCard" style="width:300px" ></el-input>
              </el-form-item>
              <el-form-item label="公司账号类型" prop="moneybackCountType" >
                        <el-select v-model="form.moneybackCountType" placeholder="支付类型"  style="width:300px;">
                    <el-option  v-for="item in options" :key="item.value"  :label="item.label"  :value="item.value">
                      </el-option>
                    </el-select>
                    </el-form-item>
                  
                    <el-form-item label="公司账号" prop="moneybackCountNo" >
                      <el-input style="width:300px" v-model="form.moneybackCountNo"></el-input>      
                    </el-form-item>
            </div>

            <el-form-item >
              <div v-show="form.user_type == 'seller'" style="float:left">
                  <el-button  v-show="companyInfo" style="margin-left:80px" type="success" @click="personInfo=true;companyInfo=false" >上一步</el-button>
                  <el-button  v-show="personInfo" style="margin-left:80px" type="success" @click="personInfo=false;companyInfo=true" >下一步</el-button>
              </div>
              <div>
                <el-button v-if="form.user_type == 'root'"  style="margin-left:20px" type="success" @click="RootAddSubmit" >注册</el-button>
                <el-button v-else-if="companyInfo == true"  style="margin-left:20px" type="success" @click="SellerAddSubmit" >注册</el-button>
              </div>
                
            </el-form-item>
          </el-form>
    </div>
</div>    
</template>

<script>
export default {
     data() {
      return {
        form: {
          user_name:'',  //用户姓名
          userIDCard:'',//身份证号
          userPhoneNumber:'',//手机号
          user_pwd:'', //密码
          moneybackCountNo:'', //返还账号
          server_bank: '', //归属公司
          login_name: '',     //登录名
          check_password :'', //确认密码
          moneybackCountType:'',
          user_type:'seller'

        },
        formCompany:{
          companyName:'', //公司名称
          companyRegisterId:'', //营业执照注册号
          companyInstitutionalId:'', //组织机构代码
          comanyAddress:'', //常用地址
          companyTellNumber:'', //联系电话
          CompanyLicenseAddress:'', //营业执照所在地
          RegisterMoneny:'', //注册资金
          LegalPersonIDCard:'', //身份证号
          LegalPersonName:'', //法定法人姓名
          moneybackCountType:'',//公司账号类型
          moneybackCountNo:'',//公司账号
        },
        personInfo:true,
        companyInfo:false,
        userTypeOptions: [{ //选项卡值
          value: 'seller',
          label: '卖家'
        }, {
          value: 'root',
          label: '管理员'
        }],
        user:'root',
        active:1,
          options: [{ //选项卡值
          value: '支付宝',
          label: '支付宝'
        }, {
          value: '微信',
          label: '微信'
        }],
        rules: {
          login_name: [
            { required: true, message: '请输入登录账号', trigger: 'blur' },
          ],
          user_pwd: [
            { required: true, message: '请输入登录密码', trigger: 'blur' }
          ],
          check_password: [
            { required: true, message: '请确认密码', trigger: 'blur' }
          ],
          user_name: [
            { required: true, message: '请输入用户姓名', trigger: 'blur' }
          ],
          userIDCard: [
            {  required: true, message: '请输入身份证号', trigger: 'blur' }
          ],
          userPhoneNumber: [
            {  required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          server_bank: [
            {  required: true, message: '请选择收益账号类型', trigger: 'blur' }
          ],
          moneybackCountNo: [
            {  required: true, message: '请输入绑定收益账号', trigger: 'blur' }
          ],

        },
      }
    },
    methods: {

    //管理员注册页面
     RootAddSubmit: function () {
       console.log(this.form);
    this.form.server_bank = this.formCompany.companyName;
     var temp_pwd = '';  //记录密码如果错误重新赋值
        if ( this.form.user_pwd === this.form.check_password  ) {
          temp_pwd = this.form.user_pwd;
          this.form.user_pwd = hex_md5(this.form.user_pwd); //md5摘要
          this.form.check_password = this.form.user_pwd;
          this.form.user_status = 0 ;
          let para = {user : this.form };
          console.log(para);
          this.$http.post('./api/user/register', {   //在这里用{ } 就表示已经用的是json格式进行传输
            userInfo : para
          }, {}).then((response) => {
                console.log(response.body.code);//200为用户名已经被注册  500为注册成功。
                  if (response.body.code == 200) {
                        this.$message({
                      message: '账号已经存在！',
                      type: 'error'
                      });
                      this.form.user_pwd = temp_pwd;
                      this.form.check_password = temp_pwd;
                
                  } else {
                      //NProgress.done();
                      this.$message({
                      message: '注册成功，请等待管理员确认！',
                      type: 'success'
                      });
                     this.$router.push({ path: '/login' });  
                  }
              });
        } else {
            this.$notify({
            message: '密码不一致!请重新输入！',
            type: 'error',
            title:'错误'
          });
        }
      },

       //卖家注册
     SellerAddSubmit: function () {
      console.log(this.form);
      this.form.server_bank = this.form.companyName;
     var temp_pwd = '';  //记录密码如果错误重新赋值
        if ( this.form.user_pwd === this.form.check_password  ) {
          temp_pwd = this.form.user_pwd;
          this.form.user_pwd = hex_md5(this.form.user_pwd); //md5摘要
          this.form.check_password = this.form.user_pwd;
          this.form.user_status = 0 ;
          let para = {user : this.form };
          console.log(para);
          this.$http.post('./api/user/SellerRegister', {   //在这里用{ } 就表示已经用的是json格式进行传输
            userInfo : para
          }, {}).then((response) => {
                console.log(response.body.code);//200为用户名已经被注册  500为注册成功。
                  if (response.body.code == 200) {
                        this.$message({
                      message: '账号已经存在！',
                      type: 'error'
                      });
                      this.form.user_pwd = temp_pwd;
                      this.form.check_password = temp_pwd;
                
                  } else {
                      //NProgress.done();
                      this.$message({
                      message: '注册成功，请等待管理员确认！',
                      type: 'success'
                      });
                     this.$router.push({ path: '/login' });  
                  }
              });
        } else {
            this.$notify({
            message: '密码不一致!请重新输入！',
            type: 'error',
            title:'错误'
          });
        }
      },
  
    },
    mounted: function() {  //这个是与method 这个是同级的， 也就是在加载这个组件的时候就可以直接的执行的方法，也可以说是初始化。
      this.$nextTick(function() {
		
        })
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
</style>
