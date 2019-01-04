<template>
    <div id="main">
        <div> 
            <div id="search" >
                <el-input
                        placeholder="产品名称"  icon="search" v-model="search"  :on-icon-click="handleIconClick">
                </el-input> 
            </div>
            <div class="block"  style="float: left;margin-top: 10px;margin-left:10px">
                <el-select v-model="value" placeholder="固定收益"  @change="RateChage" clearable  style="width:130px" >
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="belongTime" placeholder="投资期限"   @change="TimeChange"  clearable style="width:130px" >
                    <el-option
                    v-for="item in optionsTime"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="StartMoney" placeholder="起购金额"  @change="MoneyChange" clearable  style="width:130px" >
                    <el-option
                    v-for="item in optionsMoney"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
		    </div>
            <div>
                <el-button type="primary" style="float: left;margin-top: 10px;margin-left:10px"  @click="StartMoney='';belongTime='';value='';" >重置查询</el-button>
            </div>
        </div>

            <div id="page" >
                <el-tabs v-model="activemoney_begin"  @tab-click="handleClick" v-loading="listLoading"  type="card" >
                     <el-tab-pane label="综合排名" name="HaveSoldRank">
                        <el-table :data="results"  border highlight-current-row  
                        v-loading="listLoading" @selection-change="selsChange" style="width: 100%" 
                        :default-sort = "{prop: 'score', order: 'descending'}" >
                            <el-table-column  label="排行"  type="index" width="70px"  >
                     
                            </el-table-column>
                            <el-table-column  label="综合分数"  prop="score"  width="100px" >
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

                            <el-table-column  label="操作" width="145px" >
                                <template scope="scope">
                                    <el-button size="small" type="primary" @click="handIntoCart(scope.row)">详情</el-button>
                                    <el-button size="small" type="success" :disabled="scope.row.goodSum -scope.row.goodHaveSoldNum <=0"  @click="handleBuy(scope.row)">购买</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-col :span="24" class="toolbar">
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
             <!--进行购买-->
                <el-dialog title="购买" v-model="BuyFormVisible"   :close-on-click-modal="false">
                <el-form :model="BuyForm" label-width="120px"   ref="BuyForm" >
                    <el-form-item label="产品名：" prop="good_name">
                    <span>{{BuyForm.good_name}}</span>
                    </el-form-item>
                    
                    <el-form-item label="币种：">
                    <span>人民币</span>
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
                      <el-form-item label="购买金额：" prop="goodCnt"   v-else
                     :rules="[
                        { required: true, message: '购买金额不能为空'},
                        ]" >
                        <el-input  style="width:200px" type="number" @change="checkNumberOk"  v-model.number="BuyForm.goodCnt" auto-complete="off" :step=good_inc_num  :min="BuyForm.goodCnt" :max=" BuyForm.goodSum - BuyForm.goodHaveSoldNum   " ></el-input>
                        元  <el-button   type="text" @click="">产品剩余额度</el-button> {{BuyForm.goodSum - BuyForm.goodHaveSoldNum + '元'}}
        
                    </el-form-item>
                    <el-form-item label="风险提示声明：">
                    <el-checkbox label="" name="type" v-model="checkek" ></el-checkbox>
                    <span  style="width:300px" >  
                        <el-button   type="text" @click="GoodsRiskFormVisible = true">本人已经阅读风险揭示，愿意承担投资风险。</el-button></span>
                    </el-form-item>

                </el-form>
                
                <div slot="footer" class="dialog-footer" align ="center" >
                    <el-button @click.native="BuyFormVisible = false">取消</el-button>
                    <el-button type="primary" :disabled=" !checkek || buyDisable " @click.native="BuyInfoSubmit" :loading="CartInsertLoading">提交</el-button>
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
          <el-table-column  prop="good_belonged_bank" label="发行公司"  width="220">
          </el-table-column>
          <el-table-column  label="标签" width="100px">
                  <template scope="scope">
                        <el-tag type="primary" v-if="scope.row.is_resell == 1"  close-transition>
                          转售
                      </el-tag>
                      <el-tag type="success" v-else  close-transition>
                          直卖
                      </el-tag>
                  </template>
            </el-table-column>
          <el-table-column prop="good_date_belong"  label="投资期限"  width="120">
              <template scope="scope">
                    {{scope.row.good_date_belong + '天'}}
              </template>
          </el-table-column>
          <el-table-column prop="good_date_belong"  label="剩余可投资金额（元）"  width="200">
              <template scope="scope">
                    {{scope.row.goodSum -scope.row.goodHaveSoldNum  + '元'}}
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
          <el-table-column  prop="good_date_end" label="产品认购期"  width="200">
            <template scope="scope">
                {{scope.row.good_date_begin.substring(0,10) + '至' +  scope.row.good_date_end.substring(0,10) }}
            </template>
          </el-table-column>

          <el-table-column  prop="good_date_income"  label="产品到期日"  width="120">
              <template scope="scope">
                {{scope.row.good_date_income.substring(0,10)}}
            </template>
          </el-table-column>
            <el-table-column  label="本息到账日"  width="200">
              <template scope="scope">
                产品到期后三个工作日
            </template>
          </el-table-column>
        </el-table>
        <div>
            介绍： {{good_others}}
        </div>
        <div>
            发行人介绍：{{goodBelongPerInfo}}
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
                belongTime:'',//投资期限筛选条件
                StartMoney:'',//起购金额筛选条件
                GoodsRiskFormVisible:false,
                good_others:'',//产品介绍
                results : [],
                backupResult:[],//作为选择结果的备份
                showResults:[],
                GoodsDetailFormVisible:false,
                total: 20,  //分页显示需要的数据 在进行查询的时候需要进行赋值，总共有多少数据
                tabName:'综合排名', // 判断当前是在那个页面停留。默认为综合排名。
                page: 1,
                activemoney_begin: 'HaveSoldRank', //默认选择第一页面。
                activeIndex: '1',
                rankNumber:1,
                BuyFormVisible:false,   // 购买弹出
                CartInsertLoading :false, // 添加购物车进行的保证掺入成功
                usrID:'',//记录当前登录用户ID,
                checkek:false,
                goodRemain:'', //产品余量
                good_inc_num: 0 ,  //每次自增的数量
                buyDisable:false,
                CartForm :[{
                    goodCnt:''
                }],
                BuyForm :[{
                    goodCnt:''
                }],
                options: [{
                    value: '1',
                    label: '3%以下'
                    }, {
                    value: '2',
                    label: '3%-%4'
                    }, {
                    value: '3',
                    label: '4%-%5'
                    }, {
                    value: '4',
                    label: '%5-%6'
                    }, {
                    value: '5',
                    label: '%6以上'
                }],
                 optionsMoney: [{
                    value: '1',
                    label: '1万以内'
                    }, {
                    value: '2',
                    label: '1-5万'
                    }, {
                    value: '3',
                    label: '5-10万'
                    }, {
                    value: '4',
                    label: '10万以上'
                    }],
                 optionsTime: [{
                    value: '1',
                    label: '90天内'
                    }, {
                    value: '2',
                    label: '90-180天'
                    }, {
                    value: '3',
                    label: '180天以上'
                    }],
                value: '',
                flag:0,
                goodBelongPerInfo:'',//发行人介绍
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
                    this.backupResult = this.results;
                    this.total = response.data.total;
                    this.listLoading = false;
                    console.log(this.results );
                    //  console.log(this.results );
                })
            },
            
            RateChage(){ //选择收益率变化
                this.filterRate();
            },
            TimeChange(){ //选择时间变化
                // this.filterRate();
                console.log(this.belongTime);
                var val = this.belongTime;
                if (this.results.length != 0 && val !='') {
                    switch (val) {
                    case '1':
                        this.TimeOperation(0,90);
                        break;
                     case '2':
                        this.TimeOperation(90,180);
                        break;
                    case '3':
                        this.TimeOperation(180,100000); //给个巨大的时间
                        break;
                    }
                }else{
                    if (this.tabName == '综合排名') {
                        this.selectGoods();
                    }else{
                        this.selectResellGoods();
                    }
                    this.belongTime='';
                }
                
            },
            MoneyChange(){ //钱财范围变化
                // this.filterRate();
                console.log(this.StartMoney);
                var val = this.StartMoney;
                if (this.results.length != 0 && val !='') {
                     switch (val) {
                    case '1':
                        this.MOneyOperation(0,10000);
                        break;
                     case '2':
                        this.MOneyOperation(10000,50000);
                        break;
                    case '3':
                        this.MOneyOperation(50000,100000);
                        break;
                    case '4':
                        this.MOneyOperation(100000,100000000);
                        break;
                    }
                }else{
                    if (this.tabName == '综合排名') {
                        this.selectGoods();
                    }else{
                        this.selectResellGoods();
                    }
                   this.StartMoney='';
                }
                
                
            },
            RateOperation(rateL,rateR){  //进行收益率的筛选
                for(var index = 0; index < this.results.length ; ){
                    var element = this.results[index].good_income_rate;
                    if (element <= rateR  &&  element >= rateL) {
                        index ++;
                        continue;
                    }else{
                        this.results.splice(index,1);
                    }
                }
            },

            TimeOperation(rateL,rateR){  //进行时间长度的筛选
            console.log('111');
            
                for(var index = 0; index < this.results.length ; ){
                    var element = this.results[index].good_date_belong;
                    if (element <= rateR  &&  element >= rateL) {
                        index ++;
                        continue;
                    }else{
                        this.results.splice(index,1);
                    }
                }
            },

            MOneyOperation(rateL,rateR){  //进行起始钱财的筛选
                for(var index = 0; index < this.results.length ; ){
                    var element = this.results[index].good_money_begin;
                    if (element <= rateR  &&  element >= rateL) {
                        index ++;
                        continue;
                    }else{
                        this.results.splice(index,1);
                    }
                }
            },

            checkNumberOk(){//检测数据正常
                var remain = this.BuyForm.goodSum - this.BuyForm.goodHaveSoldNum;
                if (remain < this.BuyForm.goodCnt) { //超出购买
                  this.$message.error('错误！已经超出最大购买量！请修改数量');
                  this.buyDisable = true;
                }else{
                    this.buyDisable = false;
                }
            },
            filterRate(){ //筛选固定收益率
                var val = this.value;
                if (this.results.length != 0 && this.value!='') {
                     switch (val) {
                    case '1':
                        this.RateOperation(0,0.03);
                        break;
                     case '2':
                        this.RateOperation(0.03,0.04);
                        break;
                    case '3':
                        this.RateOperation(0.04,0.05);
                        break;
                    case '4':
                        this.RateOperation(0.05,0.06);
                        break;
                    case '5':
                        this.RateOperation(0.06,1);
                        break;
                    }
                }else{
                    if (this.tabName == '综合排名') {
                        this.selectGoods();
                    }else{
                        this.selectResellGoods();
                    }
                    this.value='';
                }
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
            handleIconClick() { //按照名字查找
                console.log(this.search);
                var key = this.search;
                 if ( (key  == '' || this.results.length ==0 )  ) {
                        if (this.tabName == '综合排名') {
                            this.selectGoods();
                        }else{
                            this.selectResellGoods();
                        }
                    }
                    else{
                         for (var i = 0  ; i < this.results.length ; ) {
                                    if ( this.results[i].good_name.toString().search(key) != -1 ) 	  
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
                    if(buyResult.is_resell == 1)//表明是转售产品
                    {
                         this.BuyForm.goodCnt  = buyResult.have_bought_number;
                    }else{
                         this.BuyForm.goodCnt  = buyResult.good_money_begin;  // 这是默认开始复制的
                    }
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
            }, 
            handleCurrentChange(val) {  // 分页的方法 这个就是在点击页面的时候进行判断是多少页，所以每次把所有的数据查出来，在进行分类。
            this.page = val;
            console.log(this.page);
            this.selectGoods();
            }, 
            handIntoCart(cartResult){ //产看详情

                this.GoodsDetailFormVisible = true;
                this.good_others = cartResult.good_others;
                this.showResults.length = 0;
                this.showResults.push(cartResult);
                this.goodBelongPerInfo = cartResult.goodBelongPerInfo//发行人介绍
                
                console.log(cartResult);
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
            // setInterval(() => { 定时熟悉页面。现在不用了..进行推荐计算。
            //     this.selectGoods();
            // },"10000");
        },
}
</script>

<style>
    #main{
        width: 1000px;
        margin: 0 auto;
    }
    #page{
        margin: 0 auto; 
        height: 620px;
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

     .seamless-warp {
        height: 229px;
        overflow: hidden;
    }
</style>


