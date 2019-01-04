<template>
<div style="margin-top:10px">
  <div v-show="info">

    <div  class="bg-purple-light">
        <span style="font-size: 20px;margin-left:20px;" >   您好,{{user.user_name}} </span>
    </div>

    <div class="bg-purple">
        <div class="text-r-out-in" style="margin-bottom:10px">账户融资：</div>
        <el-row type="flex" >
                <el-col :span="6"><div class="grid-content ">
                    总融资：<span style="color:#13CE66 ; margin-left:10px">{{sum}} 元</span>
                    </div></el-col>
                <el-col :span="6"><div class="grid-content ">
                    已融资：<span style="color:#20A0FF">{{payed}} 元</span> <div style="float:right"> 完成度： </div>
                </div></el-col>
                <el-col :span="12"><div class="grid-content"  >
                 <el-progress   :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress>
                </div></el-col>
                   
        </el-row>  
          
    </div>
    
    <div class="bg-purple-light">
        <div class="text-r-out-in" style="margin-bottom:10px" >基本信息：</div>
        <div style="color:red">个人信息：</div>
        <el-row type="flex" >
            <el-col :span="8"><div class="grid-content ">
                登录账号：{{user.login_name}}
                </div></el-col>
            <el-col :span="8"><div class="grid-content ">
                手机号码：{{user.userPhoneNumber}}
                </div></el-col>
            <el-col :span="8"><div class="grid-content ">
                身份证号：{{user.userIDCard}}
                </div></el-col>
        </el-row>
        <el-row type="flex" >
            <el-col :span="8"><div class="grid-content ">
            收益账号：{{user.moneybackCountType}} {{user.moneybackCountNo}}
                </div></el-col>
            <el-col :span="8"><div class="grid-content ">
                注册时间：{{user.user_register_time}}
                </div></el-col>
         
        </el-row>
        <div style="color:red">企业信息：</div>
         <el-row type="flex" >
            <el-col :span="8"><div class="grid-content ">
            企业名称：{{CompanyInfo.companyName}} 
                </div></el-col>
            <el-col :span="8"><div class="grid-content ">
                营业执照注册号：{{CompanyInfo.companyRegisterId}}
                </div></el-col>
            <el-col :span="8"><div class="grid-content ">
                组织机构代码：{{CompanyInfo.companyInstitutionalId}}
            </div></el-col>
        </el-row>
         <el-row type="flex" >
            <el-col :span="8"><div class="grid-content ">
            常用地址：{{CompanyInfo.comanyAddress}} 
                </div></el-col>
            <el-col :span="8"><div class="grid-content ">
                联系电话：{{CompanyInfo.companyTellNumber}}
                </div></el-col>
            <el-col :span="8"><div class="grid-content ">
                营业执照所在地:{{CompanyInfo.CompanyLicenseAddress}} 
            </div></el-col>
        </el-row>
        <el-row type="flex" >
            <el-col :span="8"><div class="grid-content ">
            注册资金：{{CompanyInfo.RegisterMoneny}}
                </div></el-col>
            <el-col :span="8"><div class="grid-content ">
                法定法人姓名：{{CompanyInfo.LegalPersonName}}
                </div></el-col>
            <el-col :span="8"><div class="grid-content ">
                身份证号： {{CompanyInfo.LegalPersonIDCard}} 
            </div></el-col>
        </el-row>
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
        payed:0,//已经融资
        sum:0, //总发布
        goodIncomeNum:0, //记录收益
        goodsunResellNum:0,//转售金额
        MoneySum:'', //资产。
        freezeMoney:'', //被冻结资产
        userPhoneNumber:'',
        userMoneyBackcount:'',
        userId:'',  //记录id账号
        payTab :'支付宝',
        CompanyInfo:'',//记录公司信息
        percentage:0,

      }
    },
    methods:{
    
    selectGoodsInfo(userID) {  //显示所有产品信息
	    // var userID = this.userID;
	    console.log(userID);
      this.$http.post('./api/user/selectGoodSumInfoByID', {
		  userID: userID,
      },{}).then((response) => {
        var results = response.data
        console.log(results);
        var sum = 0;
        var payed  = 0;
        for (var  index = 0; index < results.length; index++) {
            var  element = results[index];
            sum = sum + element.goodSum;
            payed = payed + element.goodHaveSoldNum;
        }
        this.sum = sum;
        this.payed = payed;
        this.percentage =  (parseInt(payed) / parseInt(sum) * 100).toFixed(2);
        this.percentage =  parseInt( this.percentage) ;
      })
    },

        updateUserProperty(){// 更新用户的资产。 当有变化的时候在进行更新。
            this.$http.post('./api/user/updateUser_property', {
                userID : this.userId,
                User_property: this.MoneySum
            },{}).then((response) => {})
        },


        selectCompanyInfo(){ //查询公司信息
                this.$http.post('./api/user/selectCompanyInfo', {   //在这里用{ } 就表示已经用的是json格式进行传输
                 companyRegisterId:                this.user.companyRegisterId
                }, {}).then((response) => {
                this.CompanyInfo = response.data[0];
                
            }); 
        },
    

    },
     mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
            this.user = JSON.parse(user);
            // console.log(this.user);
            this.userId = this.user.userID;
            // console.log(this.userId);
            this.selectGoodsInfo(this.userId);
            this.selectCompanyInfo();
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

