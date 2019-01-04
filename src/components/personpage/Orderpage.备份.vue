<template>
  <div>
    <y-shelf title="我的订单">
      <div slot="content">
        <div v-if="orderNoResult.length">
          <div v-for="(item,i) in orderNoResult" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="date" v-text="item.orderCreateTime"></span>
                  <span class="order-id"> 订单号：
                    <!-- {{item.orderNo}} -->
                    <el-button  style="margin-top:1px;" type="text" @click="viewDetail(item.orderNo,i)">{{item.orderNo}}</el-button>
                  </span>
                </div>
                <div class="f-bc">
                  <span class="price">购买金额</span>
                  <span class="num">收益</span>
                  <span class="operation">收益到账时间</span>
                </div>
              </div>
              <div class="last">
                <span class="sub-total">实付金额</span>
                <span class="order-detail"> <a >状态<em class="icon-font"></em></a> </span>
              </div>
            </div>
            <div class="pr">
              <div class="cart" v-for="(good,j) in orderResult" v-if="item.orderNo == good.orderNo" :key="j">
                <div class="cart-l" :class="{bt:j>0}">
                  <div class="car-l-l">
                    <div class="ellipsis">{{good.good_name}}</div>
                  </div>
                  <div class="cart-l-r">
                    <div>¥ {{good.goodCnt}}</div>
                    <div class="num">{{good.goodIncomeNum}}</div>
                    <div class="num">{{good.good_date_income.substring(0,10)}}</div>

                  </div>
                </div>
                <div class="cart-r">
                  <span></span>
                  <span></span>
                </div>
               
              </div>
              <div class="prod-operation" style=" left:75%;top: -25px;">
                <div >¥ {{item.sumCnt}}</div>
                <!-- <div v-if="good.haveFinshed == 1">
                    <el-button type="success"  @click="viewDetail(item.orderNo,i)">申请返款</el-button> 
                </div>
                <div v-else-if= "good.haveFinshed == 2">
                    已完成
                </div>
                <div v-else>
                    待申请
                </div> -->
                
              </div>
            </div>
          </div>
        </div>
        <div v-else>
            <div style="padding: 100px 0;text-align: center">
                你还未创建过订单
            </div>
        </div>
      </div>
    </y-shelf>

    <div>
           <!-- 产品显示表格 -->
             <el-dialog title="产看订单详细信息" v-model="OrderDetailFormVisible"   :close-on-click-modal="false"  size="large" >
              <h3>   查看订单信息</h3>
            <el-table :data="showResults"  style="width: 100%; margin-bottom:10px">
          <el-table-column  fixed  prop="good_name" label="产品名称"  width="220">
          </el-table-column>
          <el-table-column  prop="good_belonged_bank" label="归属银行"  width="120">
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
          <el-table-column  prop="goodCnt"  label="购买金额" width="120">
            <template scope="scope">
                {{scope.row.goodCnt + '元'}}
            </template>
          </el-table-column>
          <el-table-column  prop="sumIncome"  label="预计收益"  width="120">
            <template scope="scope">
                {{scope.row.goodIncomeNum + '元'}}
            </template>
          </el-table-column>
          <el-table-column  prop="good_date_end" label="开始计算收益时间"  width="150">
            <template scope="scope">
                {{scope.row.good_date_end.substring(0,10)}}
            </template>
          </el-table-column>

          <el-table-column  prop="good_date_income"  label="收益发放时间"  width="120">
              <template scope="scope">
                {{scope.row.good_date_income.substring(0,10)}}
            </template>
          </el-table-column>
          <el-table-column  prop="good_date_income"  label="下单时间"  width="120">
              <template scope="scope">
                {{scope.row.good_date_income.substring(0,10)}}
            </template>
          </el-table-column>

           <el-table-column  label="标签" width="200px">
                  <template scope="scope">
                        <el-tag type="primary" v-if="scope.row.is_resell == 1"  close-transition>
                          转售购买
                      </el-tag>
                      <el-tag type="success" v-else  close-transition>
                          银行直买
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
                   <el-button size="small" type="warning" :disabled="scope.row.canResell || (scope.row.have_resell == 1) || (scope.row.orderStatus == 0) || (scope.row.is_resell == 1)" @click="handleResell(scope.row)">进行抛售</el-button>
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
                </el-dialog> 

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
      }
    },
    methods: {
        
      viewDetail(orderId,i){ //查看详细信息 在整个数组中根据订单号找到所有的订单信息。
            this.showResults.length = 0;
            for (var index = 0; index < this.orderResult.length; index++) {
                var element = this.orderResult[index];
                // console.log(element.orderNo);
                if(element.orderNo == orderId){  //获取到需要的数组。
                    this.showResults.push(element);
                }
            }
            this.user[0].sumIncome = this.orderNoResult[i].sumCnt;
            this.OrderDetailFormVisible = true;

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
              var DateOrder = new Date(element.good_date_income).getTime();
              // console.log(DateOrder);
              if(DateOrder > dateNow ){  //判断是否能够进行抛售
                    element.canResell = false;
              }else{
                    element.canResell = true;
              }
              this.orderResult = orderResult;
             
           } console.log(this.orderResult);
        })
      },
      selectOrderNo(){ //根据用户的id查询出所有的订单号。
        this.$http.post('./api/user/selectOrderNo', {
            userID : this.userId
        },{}).then((response) => {
          var orderResult = response.data;
          for (var  index = 0; index < orderResult.length; index++) {
              var element = orderResult[index];
              element.orderCreateTime = new Date(element.orderCreateTime).toLocaleString();
          }
          this.orderNoResult = orderResult;
          // console.log(orderResult);
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
        this.selectOrderNo();
        this.selectOrderList();
        }
    },
 
  }
</script>


<style lang="scss" scoped>
  @import "../../assets/style/mixin";

  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      // border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 6px;
  }

  .order-id {
    margin-left: 20px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 231px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }
  .prod-operation {
    height: 0px;
    display: flex;
    position:relative;
    align-items: center;
    justify-content: center;
    width: 231px;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }
</style>