<template>

 <section>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">后台管理登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-button  style="float:right" type="text" @click="handleAdd">新用户？点击注册</el-button>
    </el-form-item>

    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmitLogin" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset">重置</el-button>-->
    </el-form-item>

    
    <el-form-item  align ="center"> 
        <el-button  type="text" @click="handleBack">返回主页</el-button>
    </el-form-item>
  </el-form>


</section>
</template>

<script>
  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return { 

     
        addLoading: false, 
        Id_card : '',
        inputIsOk: true,
        logining: false,

        isActive: true,  //如果是员工就可以进行注册。 不然不能够输入数据 


         addFormRules: {
          name: [
            { required: true, message: '请输入物料名称', trigger: 'blur' }
          ]
        },
       // 主页界面数据
        addForm: {
          user_name:'',  //用户姓名
          userIDCard:'',//身份证号
          userPhoneNumber:'',//手机号
          user_pwd:'', //密码
          moneybackCountNo:'', //返还账号
          server_bank: '', //账户返还类型
          login_name: '',     //登录名
          check_password :'', //确认密码
          server_bank:''
        },
        
        userTypeOptions: [{ //选项卡值
          value: 'seller',
          label: '卖家'
        }, {
          value: 'root',
          label: '管理员'
        }],

        ruleForm: {
          account: '',
          checkPass: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
    
      handleSubmitLogin(ev) {  //登录
        // var _this = this;
        var temp_pwd = '';
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            // console.log(this.ruleForm.checkPass);
            temp_pwd = this.ruleForm.checkPass;
            this.ruleForm.checkPass = hex_md5(this.ruleForm.checkPass); //md5摘要
            this.$http.post('./api/user/manage_login', {   //在这里用{ } 就表示已经用的是json格式进行传输
                username: this.ruleForm.account, 
                password: this.ruleForm.checkPass
            }, {}).then((response) => {
              console.log(response);
              let { code, msg, user } = response.data;
              if (code == 500) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
                this.ruleForm.checkPass = temp_pwd;
              }else if(code == 300){
                this.$notify({
                  title: '提示',
                  message: msg ,
                  duration: 0
                 });
                this.ruleForm.checkPass = temp_pwd;
              } else {
                console.log(this.ruleForm.account);
                user.u_user = this.ruleForm.account;
                sessionStorage.setItem('user', JSON.stringify(user) );
                // sessionStorage.setItem('u_user', this.ruleForm.account ); // 这样的会直接进行组合成一个对象 {u_username: "admin", u_role: 1, u_user: "admin"}
                  // console.log(user);
                   this.$router.push({ path: '/home' });
        
              }
            });

          } else {
            console.log('error submit!!');
            return false;
          }

        });
      },
       // 返回主页
      handleBack(){
          this.$router.push({ path: '/' });
      },

      handleAdd() { //进行注册。
         this.$router.push({ path: '/SellerRegister' });
      }, 

    },
    watch:{  //用@change 这个事件也可以进行

    },

  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 20px 35px 0px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 0px 0px;
    }
  }


</style>