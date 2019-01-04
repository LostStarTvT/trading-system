<template>
 <section>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">欢迎登陆</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item >

    <el-form-item >
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-button  style="float:right" type="text" @click="handleAdd">新用户？点击注册</el-button>
    </el-form-item>

    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;margin-top:0px" @click.native.prevent="handleSubmitLogin" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset">重置</el-button>-->
    </el-form-item>

   

    <el-form-item  align ="center" > 
        <el-button  type="text" @click="handleBack">返回首页</el-button>
    </el-form-item>

  </el-form>
    <!--用户注册页面-->
    <el-dialog title="注册新用户" v-model="addFormVisible"  size= "tiny" :close-on-click-modal="false"  >
      <el-form :model="addForm"  :rules="addFormRules" ref="addForm"  >
        <div align = "center">
            <el-input v-model="addForm.login_name"  placeholder="账号"  auto-complete="off"  style="width:300px;margin-bottom:5px;margin-bottom:5px"></el-input> 
            <el-input v-model="addForm.user_pwd" type="password"  placeholder="密码"  auto-complete="off"  style="width:300px;margin-bottom:5px"></el-input>
            <el-input v-model="addForm.check_password"  type="password" placeholder="确认密码"  auto-complete="off"  style="width:300px;margin-bottom:5px"></el-input>
            <el-input v-model="addForm.user_name"  placeholder="姓名"  auto-complete="off"  style="width:300px;margin-bottom:5px"></el-input>
            <el-input v-model="addForm.userIDCard"  placeholder="身份证号"  auto-complete="off"  style="width:300px;margin-bottom:5px"></el-input>
            <el-input v-model="addForm.userPhoneNumber"  placeholder="手机号"  auto-complete="off"  style="width:300px;margin-bottom:5px"></el-input>
            <el-select v-model="addForm.moneybackCountType" placeholder="支付类型"  style="width:300px;">
            <el-option  v-for="item in options" :key="item.value"  :label="item.label"  :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="addForm.moneybackCountNo"  placeholder="支付账号"  auto-complete="off"  style="width:300px;margin-top:5px"></el-input>
        </div>
            
     </el-form>
          <div slot="footer" class="dialog-footer" align="center">
              <el-button @click.native="addFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native="addSubmit" :loading="addLoading" :disabled= "(!addForm.user_name || !addForm.userIDCard || !addForm.userPhoneNumber || !addForm.user_pwd || !addForm.moneybackCountNo || !addForm.moneybackCountType|| !addForm.login_name || !addForm.check_password )" >确定注册</el-button>
          </div>

    </el-dialog>

</section>
</template>

<script>
  import { requestLogin } from '../api/api';
  export default {
    data() {
      return { 

        addFormVisible: false ,//新增界面是否显示
        addLoading: false, 
        Id_card : '',
        inputIsOk: true,
        logining: false,

        isActive: true,  //如果是员工就可以进行注册。不然不能够输入数据 
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
          moneybackCountType: '', //账户返还类型
          login_name: '',     //登录名
          check_password :'', //确认密码
          server_bank:''
        },
 
        options: [{ //选项卡值
          value: '支付宝',
          label: '支付宝'
        }, {
          value: '微信',
          label: '微信'
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

      handleSubmitLogin(ev) {
        // var _this = this;
        var temp_pwd = '';
        this.$refs.ruleForm.validate((valid) => {
          // console.log(this.ruleForm.account);
          if (valid) {
            temp_pwd = this.ruleForm.checkPass;
            this.ruleForm.checkPass = hex_md5(this.ruleForm.checkPass); //md5摘要
            // console.log(this.ruleForm.checkPass);
            this.$http.post('./api/user/buyer_login', {   //在这里用{ } 就表示已经用的是json格式进行传输
                username: this.ruleForm.account, 
                password: this.ruleForm.checkPass
            }, {}).then((response) => {
              let { code, msg, user } = response.data;
              // console.log( JSON.stringify(user));
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
                //  console.log(JSON.stringify(user));
                sessionStorage.setItem('user', JSON.stringify(user) );//验证成功将登录的用户数据存储到session里面
                this.$router.push({ path: '/' });
              }
            });

          } else {
            console.log('error submit!!');
            return false;
          }

        });
      },

      handleAdd() {
          this.addFormVisible = true ;
          this.addForm = {//清零数据
            user_name:'',  //用户姓名
            userIDCard:'',//身份证号
            userPhoneNumber:'',//手机号
            user_pwd:'', //密码
            moneybackCountNo:'', //返还账号
            moneybackCountType: '', //账户返还类型
            login_name: '',     //登录名
            check_password :'', //确认密码
            server_bank:''  //归属银行
        };
      }, 
      // 返回主页
      handleBack(){
          this.$router.push({ path: '/' });
      },
      //新员工注册
     addSubmit: function () {
       var temp_pwd = '';  //记录密码如果错误重新赋值
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start()
              if ( this.addForm.user_pwd === this.addForm.check_password  ) {
                temp_pwd = this.addForm.user_pwd;
                this.addForm.user_pwd = hex_md5(this.addForm.user_pwd); //md5摘要
                this.addForm.check_password = this.addForm.user_pwd;
                this.addForm.user_type = 'buyer';
                this.addForm.user_status = 1 ;
                let para = {user : this.addForm };
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
                            this.addForm.user_pwd = temp_pwd;
                            this.addForm.check_password = temp_pwd;
                            this.addLoading = false;

                        } else {
                            this.editLoading = false;
                            //NProgress.done();
                           this.$message({
                            message: '注册成功',
                            type: 'success'
                            });
                          this.$refs['addForm'].resetFields();
                          this.addFormVisible = false;
                          this.addLoading = false;
                          this.ruleForm.account =  this.addForm.login_name ;
                          this.ruleForm.checkPass  = '';
                        }
                    });
              } else {
                  this.$notify({
                  message: '密码不一致!请重新输入！',
                  type: 'error',
                  title:'错误'
                });
                this.addLoading = false;
              }
            });
          }
        });
      },
    },
    watch:{  //用@change 这个事件也可以进行
//      'addForm.username'(curVal,oldVal){
// 　　　　    this.check_username_haved();  // username的值更改就进行查询有没有重复
// 　　},
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