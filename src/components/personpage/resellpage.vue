<template>
    <div >
        <!-- 进行插入转售的div -->
        <div v-if="show" style="margin-top:20px;" >
            <h3 style="margin-left:360px;margin-bottom:10px">确认转售信息并提交</h3>
             <div class="box-l">
                <div class="text-l">订单编号：</div>
                <div class="text-l">产品名称：</div>
                <div class="text-l">归属公司：</div>
                <div class="text-l">投资期限：</div>
                <div class="text-l">购买金额：</div>
                <div class="text-l">收益率：</div>
            </div>
            <div class="box-m">
                <div class="text-m">{{goodinfo.orderNo}}</div>
                <div class="text-m">{{goodinfo.good_name}}</div>
                <div class="text-m">{{goodinfo.good_belonged_bank}}</div>
                <div class="text-m">{{goodinfo.good_date_belong + '天'}}</div>
                <div class="text-m">{{goodinfo.goodCnt + '元'}}</div>
                <div class="text-m">{{(goodinfo.good_income_rate * 100).toFixed(2) + '%'}}</div>
                <!-- <div>
                <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
                </div> -->
            </div>
            
            <div class="box-l">
                <div class="text-l">预计收益： </div>
                <div class="text-l">收益发放时间：</div>
                <div class="text-l">买家姓名：</div>
                <div class="text-l">买家手机号：</div>
                <div class="text-l">打款账号类型：</div>
                <div class="text-l">打款账号：</div>
            </div>
            <div class="box-m">
                <div class="text-m">{{goodinfo.goodIncomeNum + '元'}}</div>
                <div class="text-m">{{goodinfo.good_date_income.substring(0,10)}}</div>
                <div class="text-m">{{user.user_name}}</div>
                <div class="text-m">{{user.userPhoneNumber}}</div>
                <div class="text-m">{{user.moneybackCountType}}</div>
                <div class="text-m">{{user.moneybackCountNo}}</div>
            </div>
            <div class="reason">
                    <div style="float:left" >
                    申请理由：
                    </div>
                    <div style="float:left;margin-left: 20px; width:400px">
                         <el-input  type="textarea" :rows="2"  placeholder="请输入理由" v-model="others">
                            </el-input>
                    </div> 
            </div>
            <br>
            <div class="submit">
                <el-button type="primary" @click="InsertResellInfo">提交请求</el-button>
            </div>
           
        </div>
        <!-- 显示转售信息的div -->
        <div v-else style="margin-top:10px;">
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form  :inline="true" >
          <el-form style="float:left;margin-right:10px">
          <div class="block" >
            <el-date-picker
              v-model="datetimeRange"
              type="daterange"
              align="right"
              placeholder="选择申请日期范围 "
              :picker-options="Time_pickerOptions">
            </el-date-picker>
		      </div>
        </el-form>

        <el-form-item>
          <el-button type="primary" v-on:click="findSomething">查询</el-button>
        </el-form-item>

      </el-form>
    </el-col>
                  <el-table :data="resellResult"  border style="width: 100%">
                    <el-table-column  prop="goodIncID" label="申请单号"   width="95">
                    </el-table-column>
                    <el-table-column  prop="orderNo" label="订单号"   width="140">
                    </el-table-column>
                    <el-table-column  prop="good_name" label="产品名称"   width="140">
                    </el-table-column>
                    <el-table-column  prop="have_bought_number" label="持有本金"  width="100">
                    </el-table-column>
                    <el-table-column  prop="applyDate" label="申请时间" width="180" > </el-table-column>
                    <el-table-column  prop="apply_reason" label="申请理由"> </el-table-column>
                    <el-table-column  prop="address" label="状态"> 
                        <template scope="scope">
                                    <el-tag  type="success"  v-if="scope.row.is_sold == 1 &&  scope.row.is_ok == 1 " close-transition>
                                            成功
                                    </el-tag>
                                    <el-tag  type="primary"  v-else-if="scope.row.is_ok == 0 " close-transition>
                                            待确定
                                    </el-tag>
                                    <el-tag  type="success"  v-else-if="scope.row.is_ok == 1" close-transition>
                                            在售
                                    </el-tag>
                                    <el-tag  type="danger"  v-else-if="scope.row.is_ok == -1" close-transition>
                                            被拒绝
                                    </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="address" label="操作"> 
                        <template scope="scope">
                            <el-button type="primary" @click="deleteResell(scope.row)" :disabled="scope.row.is_sold == 1" >删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div style="margin-top:30px;margin-left:20px">
                    注：
                    状态共有四种：
                    1、成功：转售成功。
                    2、待确定：待管理员同意转售。
                    3、在售：可被别人选购。
                    4、被拒绝：抛售请求被管理员拒绝。  
                </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        resellResult: [], //存储订单结果
        user:'',
        show:false,
        goodinfo:'', //存储保存过来的数据
        others:'',
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
      }
      }
    },
    methods:{
        InsertResellInfo(){ //转售信息信息插入。
            let para = { goodinfo : this.goodinfo, user: this.user, others: this.others }; //直接将所有的数据传过去。
            console.log(para); //转成json  
            this.$http.post('./api/user/InsertResellInfo', {   //在这里用{ } 就表示已经用的是json格式进行传输
                paraaaa:                para,
            }, {}).then((response) => {
                    this.$message({
                        message: '订单提交成功',
                        type: 'success'
                    });
                   this.$router.push({ path: '/Personinfo' });
                   this.$router.go(-1);
            });  
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
    	for (var i = 0  ; i < this.resellResult.length ;) {  //选择出满足时间的结果
    			str = this.resellResult[i].apply_data;  //将数据库中存储的时间字符串转换为时间对象
            date = new Date(str);
            console.log(date);
            
            if (dateStart <= date  &&  dateEnd >= date) {
                    i++;
                    continue;
                }else{
                this.resellResult.splice(i,1);
                }
        }
          this.datetimeRange.length = 0;
        }
        if ( this.datetimeRange.length == 0 && !flag ) {
            this.selectResellResult();
        }
    },
        selectResellResult(){ //查询转售表。 
                this.$http.post('./api/user/selectResellResult', {   //在这里用{ } 就表示已经用的是json格式进行传输
                    userId:                this.user.userID
                }, {}).then((response) => {
                var ResellResult = response.data;
                for (var index = 0; index < ResellResult.length; index++) {
                    var element = ResellResult[index];
                    // element.apply_data = new Date(element.apply_data).toLocaleString();
                    element.applyDate = new Date(element.apply_data).toLocaleString();

                }
                console.log(ResellResult);
                 this.resellResult = ResellResult;
            }); 
        },
        deleteResell(row){ //删除抛售记录
            console.log(row);
            var resell_id = row.resell_id;
             this.$http.post('./api/user/deleteResell', {   //在这里用{ } 就表示已经用的是json格式进行传输
                    resell_id:                resell_id
                }, {}).then((response) => {
                      this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                var ResellResult = response.data;
                console.log(ResellResult);
                this.selectResellResult();
            }); 
        }
    },
     mounted() {
            var user = sessionStorage.getItem('user');
            var goodinfo = sessionStorage.getItem('resellGoodsInfo');
            if(goodinfo){ //如果有则显示添加页面，否则显示查询抛售页面。
                this.show = true;
                sessionStorage.removeItem('resellGoodsInfo');
            } 
            if (user) {
                this.goodinfo = JSON.parse(goodinfo);
                this.user = JSON.parse(user); 
                console.log(this.user);
                this.selectResellResult();
        }
     }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .text-l{
       margin-bottom: 30px;
       text-align:right;
       font-family: Microsoft YaHei;
       font-size: 15px;
   }
   .box-l{
    //    border-right: 1px solid #ccc;
       width:160px;
       float: left;
   }
   .box-m{
    //    border-right: 1px solid #ccc;
       width:300px;
       float: left;
       margin-left: 20px;
   }

    .text-m{
       margin-bottom: 30px;
       text-align:left;
       font-family: Microsoft YaHei;
       font-size: 15px;
   }
   .reason{
       margin-left: 159px;
   }

   .submit{
        margin-left: 30px;
        float: left;

   }
</style>

