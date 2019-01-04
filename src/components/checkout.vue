<template>
  <div id="checkoutstyle">
      <!-- 支付成功页面显示 -->
      <div v-show="PaySuccessShow">
            <div id="back">
                <span id="tittle" >支付成功</span>
            </div>
            <div  id="OrderSuccess">
              <div style="text-align: center">
                <p class="content">恭喜你支付成功，总共花费 <span class="price"><em style="font-size: 18px">¥</em>{{PaySum}}</span> 元</p>
                <router-link to="/OrderPage">
                    <el-button type="primary" size="large">查看订单</el-button>
                </router-link>
                <router-link to="/">
                    <el-button type="primary" size="large">继续选购</el-button>
                </router-link>
                
              </div>
                  

            </div>
      </div>
      <!-- 支付订单页面 -->
      <div v-show="OrderSuccessShow">
          <div id="back">
          <span id="tittle" >支付订单</span>
          </div>
          <div id="OrderSuccess">
              <div>
                  <div id="tipsShow">
                        <h3 >提交订单成功</h3>
                        <p class="payment-detail">请在 <span>24 小时内</span>完成支付，超时订单将自动取消。</p>
                        <!-- <p class="payment-detail">我们将在您完成支付后的 72 小时内发货</p> -->
                  </div>
                 
                  <div class="pay-type">
                      <div class="p-title">支付方式</div>
                      <div class="pay-item">
                        <div :class="{active:payType==1}" @click="payType=1"><img src="/static/images/alipay@2x.png" alt=""></div>
                        <div :class="{active:payType==2}" @click="payType=2"><img src="/static/images/weixinpay@2x.png" alt=""></div>
                      </div>
                  </div>
              </div>
          </div>
          <div>
             <el-button type="success"  style="margin-left:850px" @click="Order_success_next">下一步</el-button>  
          </div>
      </div>

      <!-- 购买人信息显示页面 -->
      <div v-show="PersonPageShow" >
          <div id="back">
          <span id="tittle" >购买人信息</span>
          </div>
          <div id="PersonBox">
                <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="收益人姓名：" label-width="150px">
                <span>{{ user.user_name}}</span>
              </el-form-item>
              <el-form-item label="用户名：">
                <span>{{ user.login_name}}</span>
              </el-form-item>
              <el-form-item label="电话（手机）：" label-width="150px">
                <span>{{ user.userPhoneNumber }}</span>
              </el-form-item>
              <el-form-item label="身份证号：">
                <span>{{ user.userIDCard }}</span>
              </el-form-item>
              </el-form>
          </div>
          <div>
             <el-button type="success"  style="margin-left:850px" @click="submit_Person_next">下一步</el-button>  
          </div>
      </div>

      <!-- 购买产品显示页面 -->
      <div v-show="GoodPageShow">
      <div id="back">
          <span id="tittle" >购买清单</span>
      </div>
      <div>
            <el-table :data="checkOutResults"  style="width: 100%">
          <el-table-column  fixed  prop="good_name" label="产品名称"  width="220">
          </el-table-column>
          <el-table-column prop="good_date_belong"  label="投资期限"  width="120">
              <template scope="scope">
                    {{scope.row.good_date_belong + '天'}}
              </template>
          </el-table-column>
          <el-table-column  label="收益率" width="120">
            <template scope="scope">
                {{ (scope.row.good_income_rate * 100).toFixed(2) + '%' }}
            </template>
          </el-table-column>
          
          <el-table-column  prop="goodCnt"  label="本金" width="120">
            <template scope="scope">
                {{scope.row.goodCnt + '元'}}
            </template>
          </el-table-column>
          <el-table-column  prop="sumIncome"  label="固定收益"  width="120">
            <template scope="scope">
                {{scope.row.sumIncome + '元'}}
            </template>
          </el-table-column>

          <el-table-column  prop="good_date_end" label="产品认购期"  width="250">
            <template scope="scope">
                {{scope.row.good_date_begin.substring(0,10) +'至' + scope.row.good_date_end.substring(0,10)}}
            </template>
          </el-table-column>

          <el-table-column  prop="good_date_income"  label="产品到期日期"  width="120">
          </el-table-column>
        </el-table>
      </div>
          <div style="margin-top:20px">
            <el-row :gutter="20" >
              <el-col :span="3"><div class="grid-content bg-purple">
                    <!-- <el-button type="success" width=90 @click="chooseAll">选择全部</el-button>   -->
              </div></el-col>
              <el-col :span="9"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="9"><div class="grid-content bg-purple" style="padding-top:8px;padding-left:0px">
                    <span style="padding-left:20px">已选商品:
                      <span style="color:red">
                          {{this.selectGoodsNum +'个'}}
                      </span>
                    </span>

                    <span style="padding-left:20px" >应付金额:
                      <span style="color:red">
                          {{'￥' + this.PaySum +'元'}}
                      </span>
                    </span>
              </div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple"  >
                <el-button type="success"  @click="submit_order_next">下一步</el-button>  
              </div></el-col>
          </el-row>
          </div>
        </div>

        <!--  步骤显示提示 -->
        <el-row :gutter="20">
          <el-col :span="12" :offset="4">
            <div class="grid-content bg-purple">
              <el-steps :space="200" :active="active">
                  <el-step title="确认购买产品信息" description="请仔细检查理财产品信息确认无误后点击下一步"></el-step>
                  <el-step title="确认购买人信息" description="请仔细检查购买人信息确认无误后点击下一步"></el-step>
                  <el-step title="立即支付" description="请选择支付方式"></el-step>
                  <el-step title="购买成功" description="恭喜购买成功"></el-step>
              </el-steps>
            </div>
          </el-col>
        </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checkOutResults: [], //后台查询到的数据
         payType: 1,
        checkOutID:0,
        selectGoodsNum:0,
        listLoading:false,
        PaySum:0  , //应付金额
        GoodPageShow :true,   //订单页面默认显示
        PersonPageShow:false,  //人物信息显示页面。
        OrderSuccessShow:false,  //账单提交成功页面
        PaySuccessShow:false,
        active: 1,
        user:'',
        orderNo:'', //存储订单号
      }
    },

    methods: {
      submit_order_next() {  //第二步 
        // console.log(this.checkOutResults)
        this.active++;
        this.GoodPageShow = false;
        this.PersonPageShow = true;
      },
      submit_Person_next() { // 第三步
         this.active++; 
         this.PersonPageShow = false;
         this.OrderSuccessShow = true;
      },
      GetRandomNum() {   // 形成随机数编号
        var now = new Date();
        var month = now.getMonth() + 1 ;
        this.orderNo = now.getFullYear().toString() + month.toString() + now.getUTCDate().toString() + now.getHours().toString() + now.getUTCMinutes().toString() + now.getUTCSeconds().toString() + Math.round(Math.random()*10).toString();
        // console.log(Math.round(new Date().getTime()/1000));
      },

      Order_success_next(){ //第四步  进行订单表的插入。
        this.active++;
        this.OrderSuccessShow = false;
        this.PaySuccessShow = true;
        // console.log(this.checkOutResults);
        this.GetRandomNum(); //生成订单标号
        let para = { goods : this.checkOutResults, orderNo: this.orderNo, userInfo : this.user }; //直接将所有的数据传过去。
        // console.log(this.orderNo);
          console.log(para); //转成json  
          this.$http.post('./api/user/InsertIntoOrderTable', {   //在这里用{ } 就表示已经用的是json格式进行传输
            paraaaa:                para,
          }, {}).then((response) => {
                  this.$message({
                      message: '订单提交成功',
                      type: 'success'
                  });
                });  
      },

    },
     mounted() {
      var goods = sessionStorage.getItem('goods');
      var user = sessionStorage.getItem('user');
      if(user){
          this.user =JSON.parse(user);
      }
			if (goods) {
              goods = JSON.parse(goods); // 是个数组
              if(goods[0].is_resell != '1'){
                for(var index = 0; index < goods.length; index ++ )
                {
                  var element = goods[index];
                  element.is_resell = 0;
                }
              }
              console.log(goods);
              this.checkOutResults = goods;
              var PaySum = 0;
              for (let index = 0; index < goods.length; index++) {
                  var dateEnd = new Date(goods[index].good_date_end);//首先将传递过来的时间进行重新的定义
                  goods[index].good_date_end = dateEnd.toLocaleDateString(); //在进行时间格式的转换
                  var dataIncome = new Date(goods[index].good_date_income);
                  goods[index].good_date_income = dataIncome.toLocaleDateString(); 
                  var sum = (goods[index].goodCnt * goods[index].good_income_rate / 365.0 ) * goods[index].good_date_belong; //收益计算公式 
                  goods[index].sumIncome = sum.toFixed(2); //保留两位小数
                  PaySum = PaySum + goods[index].goodCnt;
                  this.selectGoodsNum ++;
               }
              this.checkOutResults = goods;
              this.PaySum = PaySum;
			}
		}
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    	#checkoutstyle{
        width: 1000px;
        margin: 0 auto;
        height: 500px;
      }
      #tittle{
        font-size: 18px;
        font-weight: 400;
        color: #626262;
        display: inline-block;
      }
      #back{   //这个是表头显示。
        height: 60px;
        z-index: 10;
        line-height: 60px;
        font-size: 18px;
        color: #333;
        display: flex;
        justify-content: space-between;
        padding: 0 10px 0 24px;
        align-items: center;
        border-bottom: 1px solid #d4d4d4;
        background: linear-gradient(#fbfbfb, #ececec);
        background: -webkit-linear-gradient(#fbfbfb, #ececec);
      }
      #PersonBox{   //个人信息显示页面 画表格
        height: 150px;
        border-bottom: 1px solid #d4d4d4;
        border-left: 1px solid #d4d4d4;
        border-right: 1px solid #d4d4d4;
        padding: 50px 0px 0 190px;
        margin-bottom: 30px;
      }

      #OrderSuccess{  //订单成功显示页码 
        height: 220px;
        border-bottom: 1px solid #d4d4d4;
        border-left: 1px solid #d4d4d4;
        border-right: 1px solid #d4d4d4;
        padding: 40px 0px 0px 0px;
        margin-bottom: 30px;
      }
    /*支付类型*/
    .pay-type {
      margin: 0 auto;
      width: 95%;
      padding-bottom: 30px;
      .p-title {
        font-size: 18px;
        line-height: 40px;
        padding: 0 10px;
        position: relative;
        &:before {
          content: ' ';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          border-bottom: 1px solid #ccc;
        }
      }

    }

    .pay-type {
      .pay-item {
        display: flex;
        align-items: center;
        div {
          margin-top: 20px;
          width: 175px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #E5E5E5;
          cursor: pointer;
          border-radius: 6px;
          margin-right: 10px;
          background: #FAFAFA;
          &.active {
            border-color: #6A8FE5;
            background: #fff;
          }
          img {
            display: block;
            height: 34px;
            margin: 8px auto;
          }
        }
      }
    }

    #tipsShow{
      // margin-left: 300px;
      text-align: center;
      margin-bottom: 20px;
    }
    
    .payment-detail {
      text-align: center;
      line-height: 24px;
      font-size: 14px;
      color: #999;
    }

     span.price {
    color: #d44d44;
    font-weight: 700;
    line-height: 20px;
    text-align: right;
  }

  .content {
    padding: 20px 0;
    font-size: 30px;
  }
</style>


                    