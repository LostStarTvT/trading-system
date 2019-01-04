<template>
<div style="margin-top:10px">
  <div v-show="info">

    <div  class="bg-purple">
        <span style="font-size: 20px;margin-left:20px;" >   您好,{{user.user_name}} </span>
    </div>

    <div class="bg-purple-light">
        <div class="text-r-out-in" style="margin-bottom:10px">账户资金：</div>
        <el-row type="flex" >
                <el-col :span="6"><div class="grid-content ">
                    总资产：<span style="color:#13CE66 ; margin-left:10px"> {{MoneySum}} 元</span>
                    </div></el-col>
                <el-col :span="6"><div class="grid-content ">
                    持有产品本金：<span style="color:#20A0FF">{{goodCnt}} 元</span>
                    </div></el-col>
                <el-col :span="6"><div class="grid-content ">
                    分配收益：<span style="color:#13CE66">{{goodIncomeNum}}元</span>
                    </div></el-col>
            </el-row>
            <el-row type="flex" >
                <el-col :span="6"><div class="grid-content">
                抛售金额：<span style="color:#F7BA2A">{{goodsunResellNum}}元</span>
                    </div></el-col>
                <el-col :span="6"><div class="grid-content ">
                    冻结金额：<span style="color:#F7BA2A">{{freezeMoney}}元</span>
                    </div></el-col>
                <el-col :span="6"><div class="grid-content ">
                        
                    </div></el-col>
            </el-row>       
    </div>
    
    <div class="bg-purple">
        <div class="text-r-out-in" style="margin-bottom:10px" >基本信息：</div>
        <el-row type="flex" >
            <el-col :span="6"><div class="grid-content ">
                登录账号：{{user.login_name}}
                </div></el-col>
            <el-col :span="6"><div class="grid-content ">
                手机号码：{{user.userPhoneNumber}}
                </div></el-col>
            <el-col :span="6"><div class="grid-content ">
                身份证号：{{user.userIDCard}}
                </div></el-col>
        </el-row>
        <el-row type="flex" >
            <el-col :span="6"><div class="grid-content ">
            收益账号：{{user.moneybackCountType}} {{user.moneybackCountNo}}
                </div></el-col>
            <el-col :span="6"><div class="grid-content ">
                注册时间：{{user.user_register_time}}
                </div></el-col>
            <el-col :span="6"><div class="grid-content ">
                <el-button type="primary" size="small" @click="alert = true; info=false;">修改</el-button>
                <el-button type="primary" size="small" @click="alertPassword = true; info=false;">修改密码</el-button>
            </div></el-col>
        </el-row>
    </div>
    
</div>
    <div v-show="alert">
            <div class="box-l">
                <div class="text-l">买家姓名：</div>
                <div class="text-l">登录账号：</div>
                <div class="text-l">手机号码：</div>
                <div class="text-l">身份证号：</div>
                <div class="text-l">账号类型： </div>
                <div class="text-l" style="padding-bottom:10px">付款账号：</div>
            </div>
            <div class="box-m">
                <div class="text-m">{{user.user_name}}</div>
                <div class="text-m">{{user.login_name}}</div>
                <div class="text-m inputStyle"><el-input v-model="userPhoneNumber" placeholder="请输入内容" style="width:217px"></el-input></div>
                <div class="text-m ">{{user.userIDCard}}</div>
                <div class="text-m inputStyle"> 
                    <el-select v-model="payTab" placeholder="选择支付类型">
                        <el-option label="支付宝" value="支付宝"></el-option>
                        <el-option label="微信" value="微信"></el-option>
                    </el-select> 
                </div>
                <div class="text-m"><el-input v-model="userMoneyBackcount" placeholder="请输入内容" style="width:217px"></el-input></div>
                <div>
                <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
                </div>
            </div>
    </div>
     <div v-show="alertPassword">
            <div class="box-l">
                <div class="text-l">买家姓名：</div>
                <div class="text-l">登录账号：</div>
                <div class="text-l">原密码：</div>
                <div class="text-l">新密码：</div>
            </div>
            <div class="box-m">
                <div class="text-m">{{user.user_name}}</div>
                <div class="text-m">{{user.login_name}}</div>
                <div class="text-m inputStyle"><el-input v-model="oldPassword"  type="password" placeholder="请输入原密码" style="width:217px"></el-input></div>
                <div class="text-m"><el-input v-model="newPassword"  type="password" placeholder="请输入新密码" style="width:217px"></el-input></div>
                <div>
                    <el-button type="primary" :disabled="!oldPassword || !newPassword " @click="updateUserPassword">提交修改</el-button>
                </div>
            </div>
    </div>
</div>
    
</template>

<script>
export default {
    data() {
      return {
        OrderResults: [], //存储订单结果
        user:'',
        info:true,
        alert:false,
        goodCnt:0,//记录购买金额
        goodIncomeNum:0, //记录收益
        goodsunResellNum:0,//转售金额
        MoneySum:'', //资产。
        freezeMoney:'', //被冻结资产
        userPhoneNumber:'',
        userMoneyBackcount:'',
        userId:'',  //记录id账号
        payTab :'支付宝',
        alertPassword:'',//显示修改密码页面
        user_pwd:'',
        oldPassword:'',//旧密码
        newPassword:'',//新密码

      }
    },
    methods:{
        selectOrderList(){ //根据用户的id查询出所有的订单。
        this.$http.post('./api/user/selectOrderList', {
            userID : this.userId
        },{}).then((response) => {
            console.log(response.data);
            var OrderResults = response.data;
            var goodCnt = 0;
            var goodIncomeNum = 0;
            var freezeMoney = 0;
            var date = new Date().getTime(); //获取当前时间戳。
            for(var index = 0; index < OrderResults.length ;index ++ ){
                var element  = OrderResults[index];
                goodCnt = goodCnt + element.goodCnt;
                if (element.haveFinshed == 2) { //如果此订单已经完成则进行计算收益
                     goodIncomeNum = goodIncomeNum + element.goodIncomeNum;
                }
                if(element.orderStatus == 0){ //==0 表示被冻结
                    freezeMoney = freezeMoney + element.goodCnt ; //被冻结的资产包括收益不管是否到收益时间。
                    if( element.haveFinshed == 2){ // 判断被冻结的资产有没有收益 有的话就加上。
                        freezeMoney = freezeMoney +  element.goodIncomeNum;
                    }
                }
            }
            this.goodIncomeNum = goodIncomeNum;
            this.goodCnt = goodCnt.toFixed(2);
            //当计算好之后就进行后台数据表的更新。
            this.MoneySum = goodIncomeNum + goodCnt - this.goodsunResellNum;//还需要减去抛售表
            this.freezeMoney = freezeMoney;
            if(this.MoneySum != this.user.user_property){ //如果计算出来的资产不一致就进行更新。
                this.updateUserProperty();
            }
        })
      },

        updateUserProperty(){// 更新用户的资产。 当有变化的时候在进行更新。
            this.$http.post('./api/user/updateUser_property', {
                userID : this.userId,
                User_property: this.MoneySum
            },{}).then((response) => {})
        },

        selectResellResult(){ //查询转售表计算成功的抛售金额
                this.$http.post('./api/user/selectResellResult', {   //在这里用{ } 就表示已经用的是json格式进行传输
                    userId:                this.user.userID
                }, {}).then((response) => {
                var ResellResult = response.data;
                var sum = 0;
                for (var index = 0; index < ResellResult.length; index++) {
                    var element = ResellResult[index];
                    if(element.is_sold == '1'){
                        sum = sum + element.have_bought_number
                    }
                }
                this.goodsunResellNum = sum;
            }); 
        },

       updateUserInfo(){// 更新用户的信息
            this.$http.post('./api/user/updateUserInfo', {
            userPhoneNumber:this.userPhoneNumber,
            payTab: this.payTab,
            userMoneyBackcount: this.userMoneyBackcount,
            userID : this.userId,
            User_property: this.MoneySum
        },{}).then((response) => {
             this.$message({
          showClose: true,
          message: '恭喜你，修改成功',
          type: 'success'
        });
        this.alert = false;
        this.info = true;
        })
      },

        updateUserPassword(){// 更改用户密码
            var md5_oldPwd = hex_md5(this.oldPassword);
            // console.log(md5_oldPwd);
            // console.log(this.user_pwd);
            if (md5_oldPwd === this.user_pwd) { 
                this.newPassword = hex_md5(this.newPassword);
                this.$http.post('./api/user/updateUserPassword', {
                user_pwd: this.newPassword,
                userId: this.userId
            },{}).then((response) => {
                this.$message({
                showClose: true,
                message: '恭喜你，修改成功,请重新登录',
                type: 'success'
            });
            this.$router.push({ path: '/indexlogin' });
            this.alertPassword = false;
            this.info = true;
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
            if (user) {
            this.user = JSON.parse(user);
            console.log(this.user);
            this.userId = this.user.userID;
            this.userPhoneNumber = this.user.userPhoneNumber;
            this.userMoneyBackcount = this.user.moneybackCountNo
            this.user.user_register_time = this.user.user_register_time.substring(0,10);
            this.user_pwd = this.user.user_pwd; //记录原密码。
            // console.log(this.user);
            this.selectResellResult();
            this.selectOrderList();
        }
     }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
   .text-l{
       margin-bottom: 30px;
       text-align:right;
       font-family: Microsoft YaHei;
       font-size: 20px;
   }
   .box-l{
    //    border-left: 1px solid #ccc;
    //    border-top: 1px solid #ccc;
    //    border-bottom: 1px solid #ccc;
       width:120px;
       float: left;
   }
   .box-m{
    //    border-right: 1px solid #ccc;
    //    border-right: 1px solid #ccc;
    //    border-top: 1px solid #ccc;
    //    border-bottom: 1px solid #ccc;
       width:250px;
       float: left;
    //    margin-left: 20px;
   }

    .text-m{
       margin-bottom: 30px;
       text-align:left;
       font-family: Microsoft YaHei;
       font-size: 20px;
   }

   .inputStyle{
        margin-bottom: 20px;
   }

   .box-r{
        margin-left: 60px;
        width: 100%;
   }

   .text-r-moneySum{
       font-family: Microsoft YaHei;
       font-size: 20px;
       padding-left: 30px;
   }
   .text-r-out-in{
        font-family: Microsoft YaHei;
        font-size: 20px;
        margin-top: 20px;
   }

     .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
    padding: 20px;
  }
  .bg-purple-light {
    background: #e5e9f2;
    padding: 20px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

