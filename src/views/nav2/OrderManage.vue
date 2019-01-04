<template>
 <section>
  
  <!--工具条-->
     <div> 
            <div id="search" >
                <el-input
                        placeholder="产品名称或持有人"  icon="search" v-model="search"  :on-icon-click="handleIconClick">
                </el-input> 
            </div>

            
        </div>
    
      <el-table  :data="results" highlight-current-row  v-loading="listLoading" @selection-change="selsChange" style="width: 100%" label-width="0px" >
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
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
          <el-form-item label="到期日">
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
  
    <el-table-column
      type="index" width="60px" >
    </el-table-column>
    <el-table-column
      label="订单号"
      prop="orderNo"
      width="140" >
    </el-table-column>
    <el-table-column
      label="产品名称 "
      prop="good_name"
      width="250">
    </el-table-column>
    <el-table-column
      label="持有人"
      prop="user_name">
    </el-table-column>
    <el-table-column
      label="本金金额"
      prop="goodCnt">
    </el-table-column>
    <el-table-column
      label="状态"
       width="150"
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
                    </el-tag>
                    <el-tag type="primary" v-if="scope.row.have_resell==1"  close-transition>
                        转售中
                    </el-tag>
                    <el-tag type="danger" v-if="scope.row.have_resell==2"  close-transition>
                        转售成功
                    </el-tag>
      </template>
    </el-table-column>
     <el-table-column
      label="操作"
      prop="goodCnt">
        <template scope="scope">
          <el-button v-if="scope.row.resellOrderID != null"  type="success" size="small" @click="handleFindResleOrder(scope.row)">查看原订单</el-button>
        </template>
    </el-table-column>
    <el-table-column label="管理" width="100">
        <template scope="scope">
          <el-button :disabled="scope.row.haveFinshed == 2"  v-if="scope.row.orderStatus == 0 " type="success" size="small" @click="handleChangeStatus( 1,scope.row)">恢复正常</el-button>
          <el-button  :disabled="scope.row.haveFinshed == 2" v-else type="danger" size="small" @click="handleChangeStatus(0,scope.row)">冻结</el-button>
        </template>
      </el-table-column>
  </el-table> 

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
      <div style="margin-top:30px;margin-left:20px;color:red">
                    注：
                    状态共有五种：
                    1、正常：订单正常。
                    2、被冻结：订单被冻结。
                    3、转售成功：该订单已经被转售成功。
                    4、转售中：该订单正在转售。
                    5、转售购买：表示购买的是转售理财产品。
      </div>

  </section>
</template>

<script > 
  export default {
  name: 'input',      //对这个组件进行起名 ，也就是跟
  data () {
    return { 

      isUsed : true,
      checkBoxValue: [], //所属组的选择 也就是全部管理员的选择。
      listLoading: false, 
      u_name :'',
      filters: {  //
          name: ''
        },
      results : [],  //最终页面显示的情况
      finds: [] ,  // 寻找到的结果。
      sels: [],//列表选中列 
      page: 1,
      total: 0,
      search :'', 
      OrderDetailFormVisible:false,
      showResults:[],
    }
  },

  methods: {
    selectOrderInfo() {   //找到所有的理财订单信息
      // var name = this.userName;
      this.listLoading = true;
      this.$http.post('./api/user/selectOrderInfo', {
          u_name : this.u_name,
      },{}).then((response) => {
        this.results = response.body;
        console.log(this.results);
        this.listLoading = false;
      })
    },

    // 更改订单的状态
    handleChangeStatus: function (status, row) { // index 表示建立的索引  index 为标号 后面的为索引的东西
          var orderID = row.orderID;
          this.$http.post('./api/user/updateOrderStatus', { 
            status:    status,
            orderID:  orderID
            }, {}).then((response) => {
            this.listLoading = false;
            this.$message({
              message: '更改成功',
              type: 'success'
            });
            this.selectOrderInfo();
          });
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

    handleIconClick() { //按照名字查找
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
    
    selsChange: function (sels) {
        this.sels = sels;
    }
 
  },
    mounted: function() {  //这个是与method 这个是同级的， 也就是在加载这个组件的时候就可以直接的执行的方法，也可以说是初始化。   
      this.$nextTick(function() {
         var user = sessionStorage.getItem('user');
         if (user) {
          user = JSON.parse(user);
          this.u_name = user.u_user || '';
          };
          this.selectOrderInfo();
        })
    }
}
</script>

<style>
</style>