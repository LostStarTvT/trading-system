<template>
  <div>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form  :inline="true" >
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

        <el-form-item>
          <el-button type="primary" v-on:click="findSomething">查询</el-button>
        </el-form-item>

      </el-form>
    </el-col>
        <div >
            <el-table :data="orderResult" stripe style="width: 100%">
              <el-table-column  type="index"  width="50">
              </el-table-column>
              <el-table-column  prop="orderNo" label="订单号" width="130">
                <template scope="scope">
                  <el-button  style="margin-top:1px;" type="text" @click="viewDetail(scope.row)">{{scope.row.orderNo}}</el-button>
                </template>
              </el-table-column>
              <el-table-column  prop="good_name" label="产品名称" width="170">
              </el-table-column>
              <el-table-column
                prop="goodCnt"
                label="持有本金"
                width="110">
                <template scope="scope">
                  {{scope.row.goodCnt + '元'}}
              </template>
              </el-table-column>
                <el-table-column prop="goodIncomeNum" label="固定收益"  width="100">
                    <template scope="scope">
                      {{scope.row.goodIncomeNum + '元'}}
                    </template>
              </el-table-column>
              <el-table-column prop="good_date_income" label="清算日期" width="120" >
                <template scope="scope">
                  {{(scope.row.good_date_income).substring(0,10)}}
                </template>
              </el-table-column>
              <el-table-column
                prop="orderCreateDatetime"
                label="下单时间">
              </el-table-column>
              <el-table-column  label="状态"  width="100">
                <template scope="scope">
                  <div v-if="scope.row.have_resell == 0">
                     <div v-if="scope.row.haveFinshed == 1">
                              <el-button type="success"  :disabled=" scope.row.orderStatus==0 "  size="small"  @click="">待清算</el-button> 
                    </div>
                    <div v-else-if= "scope.row.haveFinshed == 2 ">
                        <el-tag type="success"  close-transition>
                            已兑付
                        </el-tag  >   
                    </div>
                    <div v-else>
                          <el-popover trigger="hover" placement="top">
                            <p>未到时间</p>
                            <div slot="reference" class="name-wrapper">
                              <el-tag>未到清算期</el-tag>
                            </div>
                          </el-popover>
                    </div>
                  </div>
                  <div v-else-if="scope.row.have_resell == 1">
                      <el-tag type="success"  close-transition>
                           转售中
                      </el-tag  >  
                  </div>
                    <div v-else-if="scope.row.have_resell == 2">
                      <el-tag type="success"  close-transition>
                           转售完成
                      </el-tag  >  
                  </div>
                </template>
              </el-table-column>
            </el-table>
        </div>


    <div>
           <!-- 产品显示表格 -->
             <el-dialog title="产看订单详细信息" v-model="OrderDetailFormVisible"   :close-on-click-modal="false"  size="large" >
              <h3>查看订单信息</h3>
            <el-table :data="showResults"  style="width: 100%; margin-bottom:10px">
          <el-table-column  fixed  prop="good_name" label="产品名称"  width="220">
          </el-table-column>
          <el-table-column  label="标签" width="200px">
                  <template scope="scope">
                        <el-tag type="primary" v-if="scope.row.is_resell == 1"  close-transition>
                          转售购买
                      </el-tag>
                      <el-tag type="success" v-else  close-transition>
                          直接购买
                      </el-tag>
                      <el-tag type="success" v-if="scope.row.orderStatus == 1"  close-transition>
                          正常
                      </el-tag>
                      <el-tag type="danger" v-else  close-transition>
                          被冻结
                      </el-tag>
                      <el-tag type="success" v-if="scope.row.have_resell == 1"  close-transition>
                          转售中
                      </el-tag>
                  </template>
            </el-table-column>
           <el-table-column   label="抛售"  width="120">
              <template scope="scope">
                <!-- 1 被冻结不能转售， 2  已经是转售的不能被转售 3 已经产生收益的不能被转售  4 已经被转售卖掉的不能转售 -->
                   <el-button size="small" type="warning" :disabled="scope.row.canResell ||(scope.row.have_resell == 1)|| (scope.row.have_resell == 2) || (scope.row.orderStatus == 0) || (scope.row.is_resell == 1)" @click="handleResell(scope.row)">进行抛售</el-button>
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
          <el-table-column  prop="good_date_end" label="认购期结束"  width="150">
            <template scope="scope">
                {{scope.row.good_date_end.substring(0,10)}}
            </template>
          </el-table-column>
          <el-table-column  prop="good_date_income"  label="清算日期"  width="120">
              <template scope="scope">
                {{scope.row.good_date_income.substring(0,10)}}
            </template>
          </el-table-column>
          <el-table-column  prop="good_date_income"  label="下单时间"  width="120">
              <template scope="scope">
                {{scope.row.orderCreateDatetime.substring(0,10)}}
            </template>
          </el-table-column>

        </el-table>
      <!-- 受益人信息表格 -->
      <h3>查看看受益人信息</h3>
        <el-table  :data="user"   border style="width: 100%;">
            <el-table-column  prop="user_name" label="受益人姓名" width="180">
            </el-table-column>
            <el-table-column prop="login_name"  label="用户名"  width="180">
            </el-table-column>
            <el-table-column prop="userIDCard"  label="身份证号"  width="180">
            </el-table-column>
            <el-table-column   prop="userPhoneNumber" label="电话">
            </el-table-column>
            <el-table-column   prop="sumIncome"    label="总付款">
              <template scope="scope">
                {{scope.row.sumIncome + '元'}}
                </template>
            </el-table-column>
              <el-table-column  label="返款账号">
                        <template scope="scope">
                            <el-tag  type="primary"  close-transition>
                                {{scope.row.moneybackCountType}}
                            </el-tag>
                              {{" 账号" + scope.row.moneybackCountNo}}
                        </template>
                    </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer" align ="center" >
            <el-button @click.native="OrderDetailFormVisible = false">确定</el-button>
        </div>

        <div style="margin-top:30px;margin-left:20px">
            注：
            标签栏标签共有四种：<br>
            1、直接购买：表示直接购买的本网站理财产品。<br>
            2、转售购买：表示购买的是网站会员转卖的理财产品。<br>
            3、正常：此条订单正常。<br>
            4、被冻结：此条订单被冻结。<br>
            5、转售中：购买的理财产品正在被转售中。<br>
      </div>
 </el-dialog> 

    </div>
      <div style="margin-top:30px;margin-left:20px">
                    注：
                    状态共有两种：
                    1、已兑付：本金收益已经发放。
                    2、未到清算期：未到清算期。
                    3、待清算：等待兑付中。
                  
      </div>
  </div>
</template>

<script>

  import YShelf from '../../common/shelf'

  export default {
    data () {
      return {
        orderResult:[], //记录所有的订单
        orderNoResult:[],//记录所有的订单号。  
        showResults:[],
        user:[],  //获取到的用户
        OrderDetailFormVisible: false,
        userId:'',  // 记录userid 查询时候用。
        datetimeRange: [],
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
        
      viewDetail(row){ //查看详细信息 在整个数组中根据订单号找到所有的订单信息。
   
            this.showResults.length = 0;
            this.showResults.push(row);
            this.user[0].sumIncome = row.goodCnt;
            this.OrderDetailFormVisible = true;
            console.log(row);

      },
      selectOrderList(){ //根据用户的id查询出所有的订单信息
        this.$http.post('./api/user/selectOrderList', {
            userID : this.userId
        },{}).then((response) => {
            // console.log(response.data);
            var orderResult = response.data;
            var dateNow = new Date().getTime(); //记录当前时间

            for (var  index = 0; index < orderResult.length; index++) {
              var element = orderResult[index];
              
          
              element.orderCreateDatetime = new Date(element.orderCreateTime).toLocaleString(); //格式化下单时间
              var DateOrder = new Date(element.good_date_income).getTime();
              // console.log(DateOrder); 
              if(DateOrder > dateNow ){  //判断是否能够进行抛售 
                    element.canResell = false; //能够抛售  意思就是还不到发放期间才能够进行售卖
                    
              }else{
                    element.canResell = true; //不能进行抛售 已经可以进行申请返款
                    if(element.haveFinshed == 0){
                      this.updateHaveFinish(1,element.orderID);
                    }
              }
              this.orderResult = orderResult;
             
           } console.log(this.orderResult);
        })
      },

       findSomething() {  //在返回来的数据中进行查询。
        var flag = false;
        if (this.datetimeRange.length != 0) {
          var dateStart = this.datetimeRange[0]; //如果不为空就取出时间
          var dateEnd = this.datetimeRange[1]; 
          var date;
          var str;
          console.log(this.datetimeRange);
          
          flag =true;
    		  for (var i = 0  ; i < this.orderResult.length ;) {  //选择出满足时间的结果
    			str = this.orderResult[i].orderCreateTime;  //将数据库中存储的时间字符串转换为时间对象
          date = new Date(str);
          console.log(date);
          
          if (dateStart <= date  &&  dateEnd >= date) {
                i++;
                continue;
            }else{
              this.orderResult.splice(i,1);
            }
        }
          this.datetimeRange.length = 0;
        }
        if ( this.datetimeRange.length == 0 && !flag ) {
            this.selectOrderList();
        }
    },
      updateHaveFinish(status,orderID){  //更改订单为可申请返款状态
        this.$http.post('./api/user/updateHaveFinish', {
                orderID : orderID,
                status: status,
            },{}).then((response) => {
              this.selectOrderList(); //更改完成进行刷新。
            })
      },
      handleResell(row){ //进行抛售操作。 1 存储数据 2 跳转我的抛售页面。
          // console.log(row);
          sessionStorage.setItem('resellGoodsInfo', JSON.stringify(row) );//验证成功将登录的用户数据存储到session里面
          this.$router.push({ path: '/Resellpage' });
      }
    },
    components: {
      YShelf
    },
    mounted () {
       var user = sessionStorage.getItem('user');
        if (user) {
        user = JSON.parse(user);
        this.userId = user.userID;
        this.user.push(user);
        this.selectOrderList();
        }
    },
 
  }
</script>


<style lang="scss" scoped>
  @import "../../assets/style/mixin";

   .el-table .info-row {
    background: #c9e5f5;
  }
  .el-table .positive-row {
    background: #e2f0e4;
  }
</style>