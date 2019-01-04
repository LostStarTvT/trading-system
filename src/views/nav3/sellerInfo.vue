<template>
  <div>
      <!-- 这个是订单具体的订单详情 -->
      <div v-show="orderDetail">
    <!--工具条-->
    <el-col :span="24" class="toolbar" >
      <el-form  :inline="true" >

        <el-form style="float:left;margin-right:10px">
          <el-input
                    placeholder="产品名称或买家姓名"  icon="search" v-model="search"  :on-icon-click="handleIconClick">
                </el-input> 
        </el-form>

        <el-form style="float:left;margin-right:10px">
          <div class="block" >
            <el-date-picker
              v-model="datetimeRange"
              type="daterange"
              align="right"
              placeholder="选择下单日期范围"
              :picker-options="Time_pickerOptions">
            </el-date-picker>
		      </div>
        </el-form>

         <el-form style="float:left;margin-right:10px">
             <el-button type="primary" v-on:click="findSomething">查询</el-button>
        </el-form>
         <el-form style="float:left;margin-right:10px">
           <el-select v-model="Orderstatus" placeholder="选择操作状态"   @change="OrderChange"  clearable style="width:130px" >
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
          </el-form> 
      </el-form>

    </el-col>
    
      <el-table  :data="results" highlight-current-row  v-loading="listLoading" @selection-change="selsChange" style="width: 100%" label-width="0px" >
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item 
            label="订单号 ">
             <span>{{ props.row.orderNo }}</span>
            </el-form-item >
          <el-form-item label="募集期结束">
            <span>{{ props.row.good_date_end.substring(0,10) }}</span>
          </el-form-item>
          <el-form-item label="持有天数">
            <span>{{ props.row.good_date_belong + '天' }}</span>
          </el-form-item>
          <el-form-item label="收益率" >
            <span>{{  (props.row.good_income_rate * 100).toFixed(2) + '%' }}</span>
          </el-form-item>
          <el-form-item label="固定收益" >
            <span>{{ props.row.goodIncomeNum + '元' }}</span>
          </el-form-item>
          <el-form-item label="清算期">
            <span>{{ props.row.good_date_income.substring(0,10) }}</span>
          </el-form-item>
          <el-form-item label="归属公司">
            <span>{{ props.row.good_belonged_bank}}</span>
          </el-form-item>
          <el-form-item label="收益账号">
            <span>{{  props.row.moneybackCountType + ' ' +  props.row.moneybackCountNo }}</span>
          </el-form-item>
          <el-form-item label="买家手机号">
            <span>{{ props.row.userPhoneNumber }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

            <el-table-column type="index" width="40px" >
            </el-table-column>
            <el-table-column
            label="下单日期"
            prop="orderCreateTime"
            width="110" >
            <template scope="scope">
                {{scope.row.orderCreateTime.substring(0,10)}}
            </template>
            </el-table-column>
            <el-table-column
            label="产品名称 "
            prop="good_name"
            width="200">
            </el-table-column>
            <el-table-column
            label="买家姓名"
             width="90"
            prop="user_name">
            </el-table-column>
            <el-table-column
            label="购买金额"
             width="100"
            prop="goodCnt">
            <template scope="scope">
                {{scope.row.goodCnt+ '元'}}
            </template>
            </el-table-column>
            <el-table-column
            label="固定收益"
            prop="goodIncomeNum"
            width="100" 
            >
            <template scope="scope">
                {{scope.row.goodIncomeNum + '元'}}
            </template>
            </el-table-column>
              <el-table-column
      label="操作"
       width="100"
      prop="goodCnt">
        <template scope="scope">
          <el-button v-if="scope.row.resellOrderID != null"  type="success" size="small" @click="handleFindResleOrder(scope.row)">查看原订单</el-button>
        </template>
    </el-table-column>
            <el-table-column
            label="状态"
            prop="orderStatus">
            <template scope="scope">
                    <el-tag type="success" v-if="scope.row.orderStatus == 1"  close-transition>
                        正常
                    </el-tag  >
                    <el-tag type="danger" v-else  close-transition>
                        被冻结
                    </el-tag  >
                    <el-tag type="gray" v-if="scope.row.is_resell==1"  close-transition>
                        转售购买
                    </el-tag  >
                    <el-tag type="primary" v-if="scope.row.have_resell==1"  close-transition>
                        转售中
                    </el-tag  >
                    <el-tag type="danger" v-if="scope.row.have_resell==2"  close-transition>
                        转售成功
                    </el-tag  >
                </template>
            </el-table-column>
    <el-table-column label="管理" width="110">
        <template scope="scope">
          <!-- 不是转售的才能进行结算 -->
          <div v-show="scope.row.have_resell == 0">
            <div v-if="scope.row.haveFinshed == 1">
                        <el-button type="success"  :disabled=" scope.row.orderStatus==0 "  size="small"  @click="handleRepay(scope.row)">进行清算</el-button> 
            </div>
            <div v-else-if= "scope.row.haveFinshed == 2 ">
                <el-tag type="success"  close-transition>
                    已兑付
                </el-tag  >   
            </div>
            <div v-else>
                  <el-popover trigger="hover" placement="top">
                    <p>{{'清算期：' + scope.row.good_date_income.substring(0,10)}}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag>未到清算期期</el-tag>
                    </div>
                  </el-popover>
            </div>
          </div>
            
        </template>
    </el-table-column>
  </el-table> 
    <div style="margin-top:30px;margin-left:20px;color:red">
                    注：
                    状态共有四种：
                    1、正常：订单正常。
                    2、被冻结：订单被冻结。
                    3、转售成功：该订单已经被转售成功。
                    4、转售购买：表示购买的是转售理财产品。
      </div>
  </div>
  <!-- 这个是清算显示的页面。就死一个付款的操作。 -->
    <div v-show="repayShow">
              <!-- 购买产品显示页面 -->
        <div id="back">
          <span id="tittle" >返款清单</span>
          </div>
          <div id="OrderSuccess">
              <div>
                  <div id="tipsShow">
              <el-table :data="resultsRepayShow"  style="width: 98%;margin-left:10px">
                <el-table-column  fixed  prop="good_name" label="产品名称"  width="240">
                </el-table-column>
                <el-table-column prop="good_date_belong"  label="投资期限"  width="130">
                    <template scope="scope">
                          {{scope.row.good_date_belong + '天'}}
                    </template>
                </el-table-column>
                <el-table-column  label="收益率" width="120">
                  <template scope="scope">
                      {{ (scope.row.good_income_rate * 100).toFixed(2) + '%' }}
                  </template>
                </el-table-column>
                
                <el-table-column  prop="goodCnt"  label="本金" width="130">
                  <template scope="scope">
                      {{scope.row.goodCnt + '元'}}
                  </template>
                </el-table-column>
                <el-table-column  prop="sumIncome"  label="固定收益"  width="140">
                  <template scope="scope">
                      {{scope.row.goodIncomeNum + '元'}}
                  </template>
                </el-table-column>
                <el-table-column  prop="sumIncome"  label="返款金额"  width="140">
                  <template scope="scope">
                      {{scope.row.goodIncomeNum + scope.row.goodCnt + '元'}}
                  </template>
                </el-table-column>
                <el-table-column  prop="sumIncome"  label="收益人姓名"  width="140">
                  <template scope="scope">
                      {{scope.row.user_name }}
                  </template>
                </el-table-column>
                <el-table-column  prop="sumIncome"  label="返款账号"  width="140">
                  <template scope="scope">
                      {{scope.row.moneybackCountType + scope.row.moneybackCountNo}}
                  </template>
                </el-table-column>
                <el-table-column label="募集期结束"  width="160">
                <template scope="scope">
                    {{scope.row.good_date_end.substring(0,10)}}
                </template>
              </el-table-column>
          <el-table-column  prop="good_date_income"  label="清算期"  width="150">
              <template scope="scope">
              {{scope.row.good_date_income.substring(0,10)}}
          </template>
          </el-table-column>
        </el-table>
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
                <span style="padding-left:20px" >应付金额:
                      <span style="color:red">
                          {{'￥' + this.PaySum +'元'}}
                      </span>
                    </span>
                <el-button type="success"  @click="Order_success_next" style="margin-left:10px">立即支付</el-button> 
          </div>
      </div>
      <!-- 成功支付的页面 -->
        <div v-show="PaySuccessShow">
            <div id="back">
                <span id="tittle" >支付成功</span>
            </div>
            <div  id="OrderSuccess">
              <div style="text-align: center">
                <p class="content">恭喜你支付成功，总共花费 <span class="price"><em style="font-size: 18px">¥</em>{{PaySum}}</span> 元</p>
                    <el-button type="primary" size="large" @click="returnShow" >查看融资</el-button>
              </div>
            </div>
      </div>

       <!-- 产品显示表格 -->
             <el-dialog title="产看订单详细信息" v-model="OrderDetailFormVisible"   :close-on-click-modal="false"  size="large" >
              <h3>查看订单信息</h3>
            <el-table :data="showResults"  style="width: 100%; margin-bottom:10px">
          <el-table-column  fixed  prop="orderNo" label="订单号"  width="220">
          </el-table-column>
          <el-table-column prop="good_name"  label="产品名称"  width="250">
              <template scope="scope">
                    {{scope.row.good_name}}
              </template>
          </el-table-column>
           <el-table-column prop="user_name"  label="持有人"  width="120">
              <template scope="scope">
                    {{scope.row.user_name}}
              </template>
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
          <el-table-column  prop="goodCnt"  label="持有本金" width="120">
            <template scope="scope">
                {{scope.row.goodCnt + '元'}}
            </template>
          </el-table-column>
          <el-table-column  prop="sumIncome"  label="固定收益"  width="120">
            <template scope="scope">
                {{scope.row.goodIncomeNum + '元'}}
            </template>
          </el-table-column>
          <el-table-column  prop="good_date_end" label="募集期结束"  width="150">
            <template scope="scope">
                {{scope.row.good_date_end.substring(0,10)}}
            </template>
          </el-table-column>
          <el-table-column  prop="good_date_income"  label="到期日"  width="120">
              <template scope="scope">
                {{scope.row.good_date_income.substring(0,10)}}
            </template>
          </el-table-column>
          <el-table-column label="下单时间"  width="120">
              <template scope="scope">
                {{scope.row.orderCreateTime.substring(0,10)}}
            </template>
          </el-table-column>

        </el-table>
    
        <div slot="footer" class="dialog-footer" align ="center" >
            <el-button @click.native="OrderDetailFormVisible = false">确定</el-button>
        </div>

      
 </el-dialog> 
  </div>
</template>

<script > 
  export default {
  name: 'input',      //对这个组件进行起名 ，也就是跟
  data () {
    return { 
      userID: '',
      datetime:'',
      payType: 1,
      PaySum:'',
      results:[],
      OrderID:'', //订单号
      resultsRepayShow:[],//返款页面存储数组
      listLoading: false, 
      editFormVisible: false,//编辑界面是否显示
      filters: {  //
        name: ''
      },
      search :'', 
      repayShow:false, //返款操作页面
      orderDetail:true, //具体的订单详情显示页面。
      OrderDetailFormVisible:false,
      dateTime:'',//当前时间
      PaySuccessShow:false, //成功支付的页面
      datetimeRange: [],
      showResults:[],
      Orderstatus:'',
       options: [{
                    value: 3,
                    label: '未到清算期'
                    }, {
                    value: 1,
                    label: '进行清算'
                    }, {
                    value: 2,
                    label: '已兑付'
                    }],
      Time_pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    }
  },

  methods: {

    selectOrderInfo() {  //根据用户id查询订单详情。
      this.$http.post('./api/user/selectOrderByUserId', {
          userID : this.userID,
      },{}).then((response) => {
        this.results = response.body;
        console.log(this.results);
        var dateNow = new Date().getTime(); //记录当前时间
         for (var  index = 0; index < this.results.length; index++) {
              var element = this.results[index];
              var DateOrder = new Date(element.good_date_income).getTime();
              if(DateOrder < dateNow ){  //已经到了发放收益期
                   if(element.haveFinshed == 0){
                        this.updateHaveFinish(1,element.orderID);
                    }
              }
           }
      })
    },

       // 查看原订单
    handleFindResleOrder: function (row) { // index 表示建立的索引  index 为标号 后面的为索引的东西
        
          var resellOrderID = row.resellOrderID;//获取到的订单ID
          console.log(resellOrderID);
          this.showResults.length = 0;
          for(var index = 0;index < this.results.length; index++ ){
            var element = this.results[index];
            console.log(element.orderID);
            if(element.orderID === resellOrderID ){
                this.showResults.push(element);
                this.OrderDetailFormVisible = true;
                break;
            }
          }
    },

     OrderChange(){ //选
                // this.filterRate();
                console.log(this.Orderstatus);
                var val = this.Orderstatus;
                if (this.results.length != 0 && val !='') {
                  if(val == 3)
                      val = 0;
                  this.StatusOperation(val);
                }else{
                    this.selectOrderInfo();
                    this.Orderstatus='';
                }
            },

    
     StatusOperation(status){  //进行时间长度的筛选
            // console.log(status);
        for(var index = 0; index < this.results.length ; ){
            var element = this.results[index].haveFinshed;
            console.log(element);
            if (element  == status) {
                index ++;
                continue;
            }else{
                this.results.splice(index,1);
            }
        }
       },


    updateHaveFinish(status,orderID){  //更改订单为可申请返款状态 对于卖家来说就是可以进行返款的操作。 1 可以进行返款操作 2 订单已经完成
        this.$http.post('./api/user/updateHaveFinish', {
                orderID : orderID,
                status: status,
            },{}).then((response) => {
              this.selectOrderInfo(); //更改完成进行刷新。
              console.log("111");
              
            })
      },

    selsChange: function (sels) {
        this.sels = sels;
    },
     
     Order_success_next(){ //确认订单时候点击
        this.repayShow = false;
        this.PaySuccessShow = true;
        this.updateHaveFinish(2,this.orderID);
     },
//  进行返款操作
    handleRepay: function (row) { // index 表示建立的索引  index 为标号 后面的为索引的东西
        console.log(row);
        this.resultsRepayShow.length = 0;
        this.PaySum = row.goodCnt + row.goodIncomeNum;
        this.orderID = row.orderID; //保存订单的编号。
        this.resultsRepayShow.push(row);
        this.orderDetail = false;
        this.repayShow = true;
        console.log(this.resultsRepayShow);
        this.dateTime = new Date().toLocaleString();
    },

    returnShow(){ //返回操作。
      this.repayShow =false; //返款操作页面
      this.orderDetail =true; //具体的订单详情显示页面。
      this.PaySuccessShow =false; //成功支付的页面
      this.selectOrderInfo();
    },

    findSomething() {  //在返回来的数据中进行查询。
        var flag = false;
        if (this.datetimeRange.length != 0) {
        var dateStart = this.datetimeRange[0]; //如果不为空就取出时间
        var dateEnd = this.datetimeRange[1]; 
    		var date;
        var str;
        flag =true;
    		for (var i = 0  ; i < this.results.length ;) {  //选择出满足时间的结果
    			str = this.results[i].orderCreateTime;  //将数据库中存储的时间字符串转换为时间对象
       		// str = str.replace(/-/g,"/");
          console.log(str);
          
    			date = new Date(str);
          if (dateStart <= date  &&  dateEnd >= date) {
                i++;
                      continue;
            }else{
              this.results.splice(i,1);
            }
        }
           this.datetimeRange.length = 0;
        }

        if ( this.datetimeRange.length == 0 && !flag  ) {
            this.selectOrderInfo();
        }
    
    },

      handleIconClick() { //按照名字查找
      console.log(this.search);
      var key = this.search;
        if ( (key  == '' || this.results.length ==0 )  ) {
                  this.selectOrderInfo();
          }
          else{
                for (var i = 0  ; i < this.results.length ; ) {
                    if ( this.results[i].good_name.toString().search(key) != -1 || this.results[i].user_name.toString().search(key) != -1 ) 	  
                        {
                            i++;
                            continue;
                        }
                        else
                        {
                            this.results.splice(i,1);
                            //主要原因就是 在删除一个数据的时候 length 会自动的减一 并且数据会前移，所有直接在检测本条数据就行。
                        }
                      }
                  }
  },

  },

	 mounted: function() {  //这个是与method 这个是同级的， 也就是在加载这个组件的时候就可以直接的执行的方法，也可以说是初始化。
        this.$nextTick(function() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.userID = user.userID;
				this.user = user;
				this.selectOrderInfo();
				// console.log(this.user);    
            }
		  
        })
    }
}

</script>

    
<style lang="scss" scoped rel="stylesheet/scss">
   
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

    #OrderSuccess{  //订单成功显示页码 
    height: 250px;
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
    padding: 10px 0;
    font-size: 30px;
  }
</style>
