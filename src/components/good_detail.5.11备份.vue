<template>
    <div id="main">
        <div> 
            <div id="search" >
                <el-input
                        placeholder="产品名称"
                        icon="search"
                        v-model="search"
                        :on-icon-click="handleIconClick">
                    </el-input> 
            </div>
        </div>

            <div id="page" >
                <el-tabs v-model="activemoney_begin"  @tab-click="handleClick" v-loading="listLoading"  type="card" >
                     <el-tab-pane label="成交量排行" name="HaveSoldRank">
                        <el-table :data="results"  border highlight-current-row  
                        v-loading="listLoading" @selection-change="selsChange" style="width: 100%" 
                        :default-sort = "{prop: 'count_have_sold', order: 'descending'}" >
                            <el-table-column  label="排行"  type="index" width="70px"  >
                     
                            </el-table-column>
                            <el-table-column  label="销量(份)"  prop="count_have_sold"  width="90px" >
                            </el-table-column>
                            <el-table-column  label="产品名称"  prop="good_name" >
                            </el-table-column>
                            <el-table-column label="起购金额"  prop="good_money_begin"  width="122px" sortable>
                                <template scope="scope">
                                    {{scope.row.good_money_begin + '元'}}
                                </template>
                            </el-table-column>
                            <el-table-column label="投资期限" prop= "good_date_belong" width="116px"  sortable>
                                <template scope="scope">
                                    {{scope.row.good_date_belong + '天'}}
                                </template>
                            </el-table-column>
                            <el-table-column label="收益率" prop= "good_income_rate" width="109px" sortable>
                                <template scope="scope">
                                    {{ (scope.row.good_income_rate * 100).toFixed(2) + '%' }}
                                </template>
                            </el-table-column>
                             <el-table-column  label="标签" width="106px" >
                                <template scope="scope">
                                    <el-tag  type="primary"  close-transition>
                                        {{scope.row.good_belonged_bank}}
                                    </el-tag>
            
                                </template>
                            </el-table-column>
                            <el-table-column  label="操作" width="145px" >
                                <template scope="scope">
                                    <el-button size="small" type="primary" @click="handIntoCart(scope.row)">详情</el-button>
                                    <el-button size="small" type="success" @click="handleBuy(scope.row)">购买</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-col :span="24" class="toolbar">
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
                            </el-pagination>
                        </el-col>
                     </el-tab-pane>

                    <el-tab-pane  label="建设银行" name="jiansheBank">
                              <el-table :data="results"  border highlight-current-row  
                        v-loading="listLoading" @selection-change="selsChange" style="width: 100%" 
                        :default-sort = "{prop: 'count_have_sold', order: 'descending'}" >
                            <el-table-column  label="#" type="index"  width="70px"  >
                            </el-table-column>
                            <el-table-column  label="产品名称"  prop="good_name" width="227px" >
                            </el-table-column>
                            <el-table-column label="起购金额"  prop="good_money_begin" sortable>
                                <template scope="scope">
                                    {{scope.row.good_money_begin + '元'}}
                                </template>
                            </el-table-column>
                            <el-table-column label="投资期限" prop= "good_date_belong" sortable>
                                <template scope="scope">
                                    {{scope.row.good_date_belong + '天'}}
                                </template>
                            </el-table-column>
                            <el-table-column label="收益率" prop= "good_income_rate" sortable>
                                <template scope="scope">
                                    {{ (scope.row.good_income_rate * 100).toFixed(2) + '%' }}
                                </template>
                            </el-table-column>
                             <el-table-column  label="标签">
                                <template scope="scope">
                                    <el-tag  type="primary"  close-transition>
                                        {{scope.row.good_belonged_bank}}
                                    </el-tag>
                                  
                                </template>
                            </el-table-column>
                            <el-table-column  label="操作" >
                                <template scope="scope">
                                    <el-button size="small" type="primary" @click="handIntoCart(scope.row)">详情</el-button>
                                    <el-button size="small" type="success" @click="handleBuy(scope.row)">购买</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                         <el-col :span="24" class="toolbar" style="heigth:30px">
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
                            </el-pagination>
                        </el-col>
                    </el-tab-pane>
                    <el-tab-pane label="工商银行" name="GongshanBank">
                          <el-table :data="results"  border highlight-current-row  
                        v-loading="listLoading" @selection-change="selsChange" style="width: 100%" 
                        :default-sort = "{prop: 'count_have_sold', order: 'descending'}" >
                            <el-table-column  label="#" type="index"  width="70px"  >
                            </el-table-column>
                            <el-table-column  label="产品名称"  prop="good_name" width="227px"  >
                            </el-table-column>
                            <el-table-column label="起购金额"  prop="good_money_begin" sortable>
                                <template scope="scope">
                                    {{scope.row.good_money_begin + '元'}}
                                </template>
                            </el-table-column>
                            <el-table-column label="投资期限" prop= "good_date_belong" sortable>
                                <template scope="scope">
                                    {{scope.row.good_date_belong + '天'}}
                                </template>
                            </el-table-column>
                            <el-table-column label="收益率" prop= "good_income_rate" sortable>
                                <template scope="scope">
                                    {{ (scope.row.good_income_rate * 100).toFixed(2) + '%' }}
                                </template>
                            </el-table-column>
                             <el-table-column  label="标签">
                                <template scope="scope">
                                    <el-tag  type="primary"  close-transition>
                                        {{scope.row.good_belonged_bank}}
                                    </el-tag>
                                   
                                </template>
                            </el-table-column>
                            <el-table-column  label="操作" >
                                <template scope="scope">
                                    <el-button size="small" type="primary" @click="handIntoCart(scope.row)">详情</el-button>
                                    <el-button size="small" type="success" @click="handleBuy(scope.row)">购买</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                         <el-col :span="24" class="toolbar" style="heigth:30px">
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
                            </el-pagination>
                        </el-col>
                    </el-tab-pane>
                    <el-tab-pane label="农业银行" name="NongyeBank">
                           <el-table :data="results"  border highlight-current-row  
                        v-loading="listLoading" @selection-change="selsChange" style="width: 100%" 
                        :default-sort = "{prop: 'count_have_sold', order: 'descending'}" >
                            <el-table-column  label="#" type="index"  width="70px"  >
                            </el-table-column>
                            <el-table-column  label="产品名称"  prop="good_name" width="227px" >
                            </el-table-column>
                            <el-table-column label="起购金额"  prop="good_money_begin" sortable>
                                <template scope="scope">
                                    {{scope.row.good_money_begin + '元'}}
                                </template>
                            </el-table-column>
                            <el-table-column label="投资期限" prop= "good_date_belong" sortable>
                                <template scope="scope">
                                    {{scope.row.good_date_belong + '天'}}
                                </template>
                            </el-table-column>
                            <el-table-column label="收益率" prop= "good_income_rate" sortable>
                                <template scope="scope">
                                    {{ (scope.row.good_income_rate * 100).toFixed(2) + '%' }}
                                </template>
                            </el-table-column>
                             <el-table-column  label="标签">
                                <template scope="scope">
                                    <el-tag  type="primary"  close-transition>
                                        {{scope.row.good_belonged_bank}}
                                    </el-tag>
                                 
                                </template>
                            </el-table-column>
                            <el-table-column  label="操作" >
                                <template scope="scope">
                                    <el-button size="small" type="primary" @click="handIntoCart(scope.row)">详情</el-button>
                                    <el-button size="small" type="success" @click="handleBuy(scope.row)">购买</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                         <el-col :span="24" class="toolbar" style="heigth:30px">
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
                            </el-pagination>
                        </el-col>
                    </el-tab-pane>
                    
                    <el-tab-pane label="转售产品" name="resellGoods">
                          <el-table :data="results"  border highlight-current-row  
                        v-loading="listLoading" @selection-change="selsChange" style="width: 100%" 
                        :default-sort = "{prop: 'count_have_sold', order: 'descending'}" >
                            <el-table-column  label="#" type="index"  width="70px"  >
                            </el-table-column>
                            <el-table-column  label="产品名称"  prop="good_name"  width="227px" >
                            </el-table-column>

                            <el-table-column label="转售金额"  prop="have_bought_number" sortable width="120px">
                                <template scope="scope">
                                    {{scope.row.have_bought_number + '元'}}
                                </template>
                            </el-table-column>
                            <el-table-column label="转售期限" prop= "good_date_belong" sortable width="120px">
                                <template scope="scope">
                                    {{scope.row.good_date_belong + '天'}}
                                </template>
                            </el-table-column>
                            <el-table-column label="收益率" prop= "good_income_rate" sortable  width="110px">
                                <template scope="scope">
                                    {{ (scope.row.good_income_rate * 100).toFixed(2) + '%' }}
                                </template>
                            </el-table-column>
                             <el-table-column label="收益" prop= "goodIncomeNum" sortable width="110px">
                                <template scope="scope">
                                    {{ scope.row.goodIncomeNum  + '元' }}
                                </template>
                            </el-table-column>
                             <el-table-column  label="标签" width="140px">
                                <template scope="scope">
                                    <el-tag  type="primary"  close-transition>
                                        {{scope.row.good_belonged_bank}}
                                    </el-tag>
                                     <el-tag type="danger" v-show="scope.row.is_resell == 1"  close-transition>
                                        转售
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column  label="操作" width="150px" >
                                <template scope="scope">
                                    <el-button size="small" type="primary" @click="handIntoCart(scope.row)">详情</el-button>
                                    <el-button size="small" type="success" @click="handleBuy(scope.row)">购买</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                         <el-col :span="24" class="toolbar" style="heigth:30px">
                            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
                            </el-pagination>
                        </el-col>
                    </el-tab-pane>
                   
                    
                </el-tabs>
          
            </div>
            <!-- 弹出页面布局 -->
        <div>
             <!--加入购物页面-->
                <el-dialog title="加入购物车" v-model="CartFormVisible"   :close-on-click-modal="false">
                <el-form :model="CartForm" label-width="100px"   ref="CartForm" >
                    <el-form-item label="产品名：" prop="good_name">
                    <span>{{CartForm.good_name}}</span>
                    </el-form-item>
                    
                     <el-form-item label="归属银行：" prop="good_name">
                    <span>{{CartForm.good_belonged_bank}}</span>
                    </el-form-item>

                    <el-form-item label="投资期限：" prop="good_date_belong">
                    <span>{{CartForm.good_date_belong + '天'}}</span>
                    </el-form-item>

                    <el-form-item label="收益率：" >
                    <span>{{(CartForm.good_income_rate * 100 ).toFixed(2) + '%'}}</span>
                    </el-form-item>

                    <el-form-item label="起购价："   >
                    <span>{{CartForm.good_money_begin + '元' }}</span>
                    </el-form-item>

                    <el-form-item label="递增量："   >
                    <span>{{CartForm.good_inc_money + '元' }}</span>
                    </el-form-item>
                     <el-form-item label="购买金额：" prop="goodCnt" 
                     :rules="[
                        { required: true, message: '购买金额不能为空'},
                        ]" >
                        <el-input  style="width:200px" type="number" v-model.number="CartForm.goodCnt" auto-complete="off" :step=good_inc_num  :min="CartForm.goodCnt" ></el-input>
                        元
                    </el-form-item>
                </el-form>
                
                <div slot="footer" class="dialog-footer" align ="center" >
                    <el-button @click.native="CartFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="CartInfoSubmit" :loading="CartInsertLoading">提交</el-button>
                </div>
                </el-dialog> 
        </div>
          <div>
             <!--进行购买-->
                <el-dialog title="购买" v-model="BuyFormVisible"   :close-on-click-modal="false">
                <el-form :model="BuyForm" label-width="120px"   ref="BuyForm" >
                    <el-form-item label="产品名：" prop="good_name">
                    <span>{{BuyForm.good_name}}</span>
                    </el-form-item>
                    
                    <el-form-item label="币种：">
                    <span>人民币</span>
                    </el-form-item>

                     <el-form-item label="归属银行：" prop="good_name">
                    <span>{{BuyForm.good_belonged_bank}}</span>
                    </el-form-item>

                    <el-form-item label="投资期限：" prop="good_date_belong">
                    <span>{{BuyForm.good_date_belong + '天'}}</span>
                    </el-form-item>

                    <el-form-item label="收益率：" >
                    <span>{{(BuyForm.good_income_rate * 100 ).toFixed(2) + '%'}}</span>
                    </el-form-item>

                    <el-form-item label="起购价："   >
                    <span>{{BuyForm.good_money_begin + '元' }}</span>
                    </el-form-item>

                    <el-form-item label="递增量："   >
                    <span>{{BuyForm.good_inc_money + '元' }}</span>
                    </el-form-item>
                     <el-form-item label="购买金额：" prop="goodCnt"  v-if="BuyForm.is_resell == 1">
                        <span>{{BuyForm.goodCnt + '元' }}</span>
                    </el-form-item>
                      <el-form-item label="购买金额：" prop="goodCnt"  v-else
                     :rules="[
                        { required: true, message: '购买金额不能为空'},
                        ]" >
                        <el-input  style="width:200px" type="number" v-model.number="BuyForm.goodCnt" auto-complete="off" :step=good_inc_num  :min="BuyForm.goodCnt" ></el-input>
                        元
                    </el-form-item>
                    <el-form-item label="风险提示声明：">
                    <el-checkbox label="" name="type" v-model="checkek" ></el-checkbox>
                    <span  style="width:300px" >  
                        <el-button   type="text" @click="GoodsRiskFormVisible = true">本人已经阅读风险揭示，愿意承担投资风险。</el-button></span>
                    </el-form-item>

                </el-form>
                
                <div slot="footer" class="dialog-footer" align ="center" >
                    <el-button @click.native="BuyFormVisible = false">取消</el-button>
                    <el-button type="primary" :disabled=" !checkek " @click.native="BuyInfoSubmit" :loading="CartInsertLoading">提交</el-button>
                </div>
                </el-dialog> 
        </div>
        <!-- 详细信息显示 -->
        <div>
              <!-- 产品显示表格 -->
             <el-dialog title="查看详情" v-model="GoodsDetailFormVisible"   :close-on-click-modal="false"  size="large" >
            <el-table :data="showResults"  style="width: 100%; margin-bottom:10px">
          <el-table-column  fixed  prop="good_name" label="产品名称"  width="220">
          </el-table-column>
          <el-table-column  label="标签" width="200px">
                  <template scope="scope">
                        <el-tag type="primary" v-if="scope.row.is_resell == 1"  close-transition>
                          转售
                      </el-tag>
                      <el-tag type="success" v-else  close-transition>
                          银行直卖
                      </el-tag>
                  </template>
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
          <el-table-column  prop="good_money_begin"  label="起购价" width="120">
            <template scope="scope">
                {{scope.row.good_money_begin + '元'}}
            </template>
          </el-table-column>
          <el-table-column  prop="good_inc_money"  label="递增价" width="120">
            <template scope="scope">
                {{scope.row.good_inc_money + '元'}}
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

        </el-table>
        <div>
            介绍： {{good_others}}
        </div>                
                <div slot="footer" class="dialog-footer" align ="center" >
                    <el-button @click.native="GoodsDetailFormVisible = false">确定</el-button>
                </div>
                </el-dialog>        
        </div>

        <div>
                <!-- 风险提示页面。 -->
             <el-dialog title="风险提醒" v-model="GoodsRiskFormVisible"   :close-on-click-modal="false"  size="large" >
                 <div style="padding-left:50px;padding-right:50px;">
                     <h2 align="center">理财非存款、产品有风险、投资须谨慎。 </h2>
                    <h2>尊敬的客户:</h2>
                    <h4>&nbsp;&nbsp;&nbsp;&nbsp;理财产品管理运用过程，可能会面临多种风险因素。因此，根据中国银行业监督管理委员
                        会相关监管规定的要求，本网站（理财产品管理人）郑重提示：<br>
                        本期产品为保本浮动收益型理财产品，保证本收益，请您充分认识投资风险，谨
                        慎投资。存续期内产品不接受申购或赎回申请。
                    </h4>
                 </div>
                    
      
                    <div slot="footer" class="dialog-footer" align ="center" >
                        <el-button @click.native="GoodsRiskFormVisible = false">确定</el-button>
                    </div>
                </el-dialog>        
        </div>
    </div>
</template>
<script>

export default {
    data() {
			return {
                search :'',
                listLoading: false,  //查询数据时候的标志量
                CartLoading: false,  //查询数据时候的标志量
                sysUserName:'aaa',
                GoodsRiskFormVisible:false,
                good_others:'',//产品介绍
                results : [],
                showResults:[],
                GoodsDetailFormVisible:false,
                total: 20,  //分页显示需要的数据 在进行查询的时候需要进行赋值，总共有多少数据
                tabName:'成交量排行', // 判断当前是在那个页面停留。默认为成交量排行。
                page: 1,
                activemoney_begin: 'HaveSoldRank', //默认选择第一页面。
                activeIndex: '1',
                rankNumber:1,
                CartFormVisible:false, //购物弹出页面:false, //购物弹出页面
                BuyFormVisible:false,   // 购买弹出
                OrderFormVisible:false, //直接购买弹出页面
                CartInsertLoading :false, // 添加购物车进行的保证掺入成功
                usrID:'',//记录当前登录用户ID,
                checkek:false,
                // goodCnt:0,  //记录购买数量
                good_inc_num: 0 ,  //每次自增的数量
                CartForm :[{
                    goodCnt:''
                }],
                BuyForm :[{
                    goodCnt:''
                }],
			}
		},
		methods: {
            selectGoods() {  //产品表查询
                this.listLoading = true;
                this.$http.post('./api/user/selectGoods', {
                    page: this.page,
                    tabName: this.tabName
                },{}).then((response) => {
                    this.results = response.data.data;
                    this.total = response.data.total;
                    this.listLoading = false;
                })
            },
            selectResellGoods() { //转售表查询
                this.listLoading = true;
                this.$http.post('./api/user/selectResellGoods', {
                    page: this.page,
                },{}).then((response) => {
                    var results = response.data.data;
                    this.total = response.data.total;
                    this.listLoading = false;
                    var date = new Date(new Date().setHours(0, 0, 0, 0)).getTime(); //获取当天0时时间戳
                    for (var index = 0; index < results.length; index++) { //计算剩余天数
                        var element = results[index];
                        var endday = new Date(element.good_date_income).getTime();
                        var diffnum = endday - date ;
                        var days=Math.floor(diffnum/(24*3600*1000));
                        element.remainDays = days; //计算剩余天数。 后台用时间检测失效数据 确保数据都是好的。
                    }  
                    this.results = results;
                })
            },
            handleIconClick(evt) {
                console.log(ev);
            },
            handleBuy(buyResult){  //点击登录购买如果没登录则跳转登录
                console.log(buyResult);
                if(this.usrID == '') //没登录则要登录
                {
                    this.$router.push({ path: '/indexlogin' });
                }
                else{
                    //还要进行数据session 存储。在结算页面记性结算。
                    this.BuyFormVisible = true;
                    this.BuyForm = buyResult;
                    this.BuyForm.goodCnt  = buyResult.good_money_begin;  // 这是默认开始复制的
                    this.good_inc_num =buyResult.good_inc_money;  
                    // this.$router.push({ path: '/checkOut' }) //登录则跳转订单结算页面。
                }
            },
            selsChange: function (sels) {
                // this.sels = sels;
                // console.log(this.sels);
            },
            handleClick(tab) { // 导航页的方法 点击页面导航是调用的方法。 就是说在这个点击是进行条件查询。
                this.tabName = tab.label;
                this.page = 1;
                console.log(tab.label);
                if (tab.label == '转售产品') {  //准售查询转售表
                    this.selectResellGoods();
                } else {
                    this.selectGoods();
                }
                
                // console.log(tab);
            }, 
            handleCurrentChange(val) {  // 分页的方法 这个就是在点击页面的时候进行判断是多少页，所以每次把所有的数据查出来，在进行分类。
            this.page = val;
            console.log(this.page);
            this.selectGoods();
            }, 
            handIntoCart(cartResult){ //添加进购物车

                // if(this.usrID == ''){
                //     this.$router.push({ path: '/indexlogin' });
                // }else{
                //     this.CartFormVisible = true;
                //     this.CartForm = cartResult;
                //     this.CartForm.goodCnt  = cartResult.good_money_begin;
                //     this.good_inc_num =cartResult.good_inc_money;
                //     // this.numberValidateForm.goodCnt = '';
                //     console.log(cartResult );
                // }
                this.GoodsDetailFormVisible = true;
                this.good_others = cartResult.good_others;
                this.showResults.length = 0;
                this.showResults.push(cartResult);
                
                console.log(cartResult);
              
            },
            CartInfoSubmit(){ //购物车信息提交
                //进行插入cart表操作。
                  this.$refs.CartForm.validate((valid) => {
                        if (valid) {
                            this.CartLoading = true;
                            let para = Object.assign({}, this.CartForm);
                            // para.intime = (!para.intime || para.intime == '') ? '' : util.formatDate.format(new Date(para.intime), 'yyyy-MM-dd');  //进行时间格式的处理
                            console.log(para); //转成json
                            console.log(this.usrID); //转成json
                            this.$http.post('./api/user/insertCart', {   //在这里用{ } 就表示已经用的是json格式进行传输
                            userBelongedID:             this.usrID,
                            goodBelongedID:             para.goodIncID,
                            good_belonged_bank:         para.good_belonged_bank,
                            goodCnt:                    para.goodCnt,
                            good_inc_money:             para.good_inc_money,
                            good_name:                  para.good_name,
                            good_date_belong:           para.good_date_belong,
                            good_income_rate:           para.good_income_rate,
                            good_date_end:              para.good_date_end.substring(0,10),
                            good_date_income:           para.good_date_income.substring(0,10)
                            }, {}).then((response) => {
                            this.editLoading = false;
                                    //NProgress.done();
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['CartForm'].resetFields();
                                    this.CartFormVisible = false;
                                    this.selectGoods();
                                    this.CartLoading = false;});   
                        }
                        });
            },
            BuyInfoSubmit(){
                var arry = new Array();
                this.BuyForm.cartID = ''; //为了数据的唯一，一个标记量。
                arry.push(this.BuyForm);
                // console.log(arry);
                sessionStorage.setItem('goods', JSON.stringify(arry) );
                sessionStorage.setItem('', JSON.stringify(arry) );
                this.$router.push({ path: '/checkOut' }) //提交表单去结算页面
            },
		},
		mounted() {
            this.selectGoods();//页面默认加载方法
            var user = sessionStorage.getItem('user');
			if (user) {
                user = JSON.parse(user);
                this.usrID = user.userID;
			}
		}
}
</script>

<style>
    #main{
        width: 1000px;
        margin: 0 auto;
    }
    #page{
        margin: 0 auto; 
        height: 650px;
	}
     #search{

         /* margin-left: 10px; */
         float: left;
         margin-top: 10px;
         margin-bottom: 10px;
         width: 200px;
    }
     #sort{
        float: left;
        margin-top: 10px;
        margin-left: 30px;
        margin-bottom: 10px;
    }
</style>


