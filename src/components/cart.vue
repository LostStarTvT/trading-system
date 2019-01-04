<template>
<div id="cartstyle">
      <div id="page">
        <el-table ref="multipleTable" :data="cart_result" border tooltip-effect="dark" 
            v-loading="listLoading"  @selection-change="handleSelectionChange">
                  <el-table-column  width="55">
                      <template scope="scope" >
                        <!-- `checked` 为 true 或 false -->
                        <el-checkbox v-model="scope.row.IsChoose" @change = "handleChangeChoose(scope.row)" >备选项</el-checkbox>
                      </template>
                  </el-table-column>
                  <el-table-column label="产品名称" width="330">
                    <template scope="scope">{{ scope.row.good_name }}</template>
                  </el-table-column>

                   <el-table-column  label="归属银行" width="120">
                                <template scope="scope">
                                    <el-tag  type="primary"  close-transition>
                                        {{scope.row.goodIncID}}
                                    </el-tag>
                                </template>
                    </el-table-column>
                  <el-table-column label="投资期限" width="120">
                    <template scope="scope">{{ scope.row.good_date_belong + '天'}}</template>
                  </el-table-column>
                  <el-table-column label="收益率" width="120">
                    <template scope="scope">{{ (scope.row.good_income_rate * 100).toFixed(2) + '%' }}</template>
                  </el-table-column>
                  <el-table-column label="购买金额（元）" width="160">
                    <!-- <template scope="scope">{{ scope.row.goodCnt + '元'}}</template> -->
                    <template scope="scope" >
                      <el-input-number size="small"  :step ="scope.row.good_inc_money" :disabled="incIsOk"   :debounce= "1000" @change="handleNumChange(scope.row)" v-model="scope.row.goodCnt"></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column  prop="address" label="操作"  show-overflow-tooltip>
                    <template scope="scope">
                            <el-button size="small" type="danger" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
            </el-table>
      </div>
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple-dark">
                  <el-col :span="24" class="toolbar">
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="7" :total="total" style="float:right;">
                            </el-pagination>
                  </el-col>
                 </div></el-col>
          </el-row>

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
                        {{'￥' + this.sum +'元'}}
                    </span>
                  </span>
            </div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple"  >
              <el-button type="success"  @click="submit_order">提交订单</el-button>  
            </div></el-col>
        </el-row>
     
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: true,
        cart_result: [],
        multipleSelection: [],  //复选框中选中的数据都会保存在这个数组中。所以在下订单的时候就是直接用这个数组进行数据获取。
        sum : 700000,
        userId:'',//认证用户的ID
        user_authority:'',//认证用户的信息。
        listLoading:false,
        page: 1,
        total: 20,  //分页显示需要的数据 在进行查询的时候需要进行赋值，总共有多少数据
        incIsOk:false,
        selectGoodsNum :0,
        flag : true, //记录对数组操作几次，是否有过全选
      }
    },

    methods: {
      selectGoods() {
              this.listLoading = true;
              this.$http.post('./api/user/selectCartInfo', {
                  userId: this.userId,
                  page: this.page
              },{}).then((response) => {
                  this.cart_result = response.data.data;
                  this.listLoading = false;
                  this.total = response.data.total;
                  // console.log(this.cart_result);
                  var sum = 0;
                  var cnt = 0; //记录已经选择多少个数据
                  for(var i = 0 ; i < this.cart_result.length ; i ++ )
                  {    

                      if(this.cart_result[i].IsChoose == 0) this.cart_result[i].IsChoose  = false;
                      else {  //进行初始赋值 和计算总和
                          this.cart_result[i].IsChoose  = true;
                           sum  = sum + this.cart_result[i].goodCnt;
                           cnt ++ ;
                      } 
                  }
                  this.sum = sum ;
                  this.selectGoodsNum = cnt;
              })
          },
       handleCurrentChange(val) {  // 分页的方法 这个就是在点击页面的时候进行判断是多少页，所以每次把所有的数据查出来，在进行分类。
            this.page = val;
            this.selectGoods();
            },
      handleSelectionChange(val) { 
        this.multipleSelection = val;
      },

      handleChangeSelectCart(row){ //当有选中的时候进行更改后台数据库
        console.log(row);   
        var cartID = row.cartID;
        var IsChoose = row.IsChoose?1:0;
        console.log(IsChoose);
        this.$http.post('./api/user/updateCartChoose', { 
          cartID:     cartID,
          IsChoose:   IsChoose
        }, {}).then((response) => {
          console.log(response);
            });
      },
      chooseAll(){ //选择全部
          var sum = 0;
          if(this.flag) //为true进行全选
          {
              for(var i = 0 ; i < this.cart_result.length ; i ++ )
              { 
                  this.cart_result[i].IsChoose = true ;
                  sum  = sum + this.cart_result[i].goodCnt;
              }
              this.flag = false;
              this.sum = sum;
              this.selectGoodsNum =  i ;
          }else{
              for(var i = 0 ; i < this.cart_result.length ; i ++ )
              { 
                  this.cart_result[i].IsChoose = false ;
              }
              this.flag = true;
              this.sum = sum;
              this.selectGoodsNum =  0;
          }
          
      },
      handleChangeChoose(row){  //当变换选择是，会调用这个函数，调用是会进行的操作就是更新金额，更新数据库。
          // console.log(row);
          this.handleChangeSelectCart(row);
          // this.row = row;
          // setTimeout(this.handleChangeSelectCart(row),"1000");//定时一秒之后进行执行。
          var sum = 0; // 计算总的价格
          var cnt = 0; //进行计数
          for(var i = 0 ; i < this.cart_result.length ; i ++ )
          { 
              if(this.cart_result[i].IsChoose == true )
              {
                  sum  = sum + this.cart_result[i].goodCnt;
                  cnt ++ ;
              }
          }
          // console.log(sum);
          this.sum = sum ;
          this.selectGoodsNum = cnt;
      },
      submit_order(){
          var cart_result = new Array();
          for (let index = 0; index < this.cart_result.length; index++) {
                if (this.cart_result[index].IsChoose) {
                  cart_result.push(this.cart_result[index])
                }
          }
          if(cart_result.length > 4 || cart_result.length <= 0){
               this.$notify.error({
                title: '错误',
                message: '交易数量不能超过四个或者为空！'
              });
          }else{
            sessionStorage.setItem('goods', JSON.stringify(cart_result) );
            this.$router.push({ path: '/Checkout' });
          }
          
      },
        //手动删除购物车信息
    handleDel: function (cart_result) { // index 表示建立的索引  index 为标号 后面的为索引的东西
        // console.log(cart_result);
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start()
          var cartID = cart_result.cartID;

          this.$http.post('./api/user/deleteCartGoods', { 
            cartID:    cartID
            }, {}).then((response) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.selectGoods();
          });
        }).catch(() => {

        });
    },
    handleNumChange(cart_result){ //更新购物车购买数量 点击一次就进行一次更新
        var cartID = cart_result.cartID;
        var goodCnt = cart_result.goodCnt +cart_result.good_inc_money; //因为是绑定之前的值，所以要加上增长值才是对的
        var cartID = cart_result.cartID;
        var cartNum =cart_result.goodCnt;
        this.$http.post('./api/user/updateCartNumber', { 
          cartID:    cartID,
          cartNum:   goodCnt
        }, {}).then((response) => {
          console.log(response) ;
          });
      },
    },
     mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
            this.user_authority = JSON.parse(user);
            this.userId = this.user_authority.userID; //获取到当前登录用户的ID          
            }
            this.selectGoods();
            // this.autoSelectRow([this.cart_result[1], this.cart_result[2]]);
		}
  }
</script>
<style>
    	#cartstyle{
        width: 1000px;
        margin: 0 auto;
        height: 472px;
      }

      #page{
        margin: 0 auto; 
	    } 
      .el-row {
          margin-bottom: 10px;
          width: 1000px;
          /* margin-left: 180px; */
        
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
