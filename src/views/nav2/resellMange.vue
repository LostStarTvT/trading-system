<template>
 <section>
  
   <!--工具条-->
     <div> 
            <div id="search" >
                <el-input
                        placeholder="产品名称或发行公司"  icon="search" v-model="search"  :on-icon-click="handleIconClick">
                </el-input> 
            </div>
            <div class="block"  style="float: left;margin-top: 10px;margin-left:10px">
                <el-select v-model="value" placeholder="选择抛售申请状态"  clearable >
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
		    </div>
            <div>
                <el-button type="primary" style="float: left;margin-top: 10px;margin-left:10px"  @click="filterStatus" >查询</el-button>
            </div>
        </div>
    
      <el-table  :data="results" highlight-current-row  v-loading="listLoading" @selection-change="selsChange" style="width: 100%" label-width="0px" >
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="产品名称">
            <span>{{ props.row.good_name }}</span>
          </el-form-item>
          <el-form-item label="发行期结束">
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
          <el-form-item label="清算日期">
            <span>{{ props.row.good_date_income.substring(0,10) }}</span>
          </el-form-item>
          <el-form-item label="归属公司">
            <span>{{ props.row.good_belonged_bank}}</span>
          </el-form-item>
          <el-form-item label="收益账号">
            <span>{{  props.row.moneybackCountType + ' ' +  props.row.moneybackCountNo }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      type="index" width="60px" >
    </el-table-column>
    <el-table-column label="订单号" prop="orderNo"  width="140" >
    </el-table-column>
    <el-table-column label="申请时间 "  prop="apply_data"  width="250">
    </el-table-column>
    <el-table-column label="申请人" prop="user_name">
    </el-table-column>
    <el-table-column label="申请理由" prop="apply_reason">
    </el-table-column>
     <el-table-column label="状态" prop="is_ok">
        <template scope="scope">
                <div v-if="scope.row.is_sold == 0">
                  <el-tag  type="danger" v-if="scope.row.is_ok == 0"  close-transition>
                                          待确定
                                    </el-tag>
                                      <el-tag type="success" v-else-if="scope.row.is_ok == 1"  close-transition>
                                          已同意
                                      </el-tag  >
                                      <el-tag type="danger" v-else  close-transition>
                                          已拒绝
                        </el-tag >
                </div>
                <div v-else>
                    <el-tag type="success"   close-transition>
                        已完成
                    </el-tag  >
                </div>
                
          </template>
    </el-table-column>
    
    <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button type="success"  size="small" :disabled="(scope.row.is_sold == 1)" @click="handleAgree(scope.row)">同意</el-button>
          <el-button type="danger" size="small" :disabled="(scope.row.is_sold == 1)"  @click="handleRefuse(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
  </el-table> 
    
    <div style="margin-top:30px;margin-left:20px">
                    注：
                    状态共有四种：
                    1、已完成：转售成功。
                    2、待确定：转售尚未同意。
                    3、已同意：已经同意申请。
                    4、已拒绝：已经拒绝申请。  
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
       search :'', 
      u_name :'',
      filters: {  //
          name: ''
        },
      results : [],  //最终页面显示的情况
      finds: [] ,  // 寻找到的结果。
      sels: [],//列表选中列 
      page: 1,
      total: 0,
      options: [{
        value: '1',
        label: '已完成'
        }, {
        value: '2',
        label: '待确定'
        }, {
        value: '3',
        label: '已同意'
        }, {
        value: '4',
        label: '已拒绝'
        }],
      value: '',
    }
  },

  methods: {

    
    StatusOperation(flag,status){
      if(flag == 1){
          for(var index = 0; index < this.results.length ; ){
            var element = this.results[index].is_sold;
            if (element == status ) {
                index ++;
                continue;
            }else{
                this.results.splice(index,1);
            }
        }
      }else{
        for(var index = 0; index < this.results.length ; ){
            var element = this.results[index].is_ok;
            if (element == status ) {
                index ++;
                continue;
            }else{
                this.results.splice(index,1);
            }
        }
      }
        
    },

    filterStatus(){ //筛选状态
        var val = this.value;
        if (this.results.length != 0 && this.value!='') {
              switch (val) {
            case '1':
                this.StatusOperation(1,1); //已完成
                break;
            case '2':
                this.StatusOperation(2,0);//待确定
                break;
            case '3':
                this.StatusOperation(2,1); //已同意
                break;
            case '4':
                this.StatusOperation(2,-1);//已拒绝
                break;
            }
        }else{
              this.selectResellInfo();
        }
    },

    handleIconClick() { //按照名字查找
      console.log(this.search);
      var key = this.search;
        if ( (key  == '' || this.results.length ==0 )  ) {
                  this.selectGoodsInfo();
          }
          else{
                for (var i = 0  ; i < this.results.length ; ) {
                    if ( this.results[i].good_name.toString().search(key) != -1 || this.results[i].good_belonged_bank.toString().search(key) != -1 ) 	  
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


    selectResellInfo() {   //查看所有的抛售信息
      // var name = this.userName;
      this.listLoading = true;
      this.$http.post('./api/user/selectResellInfo', {
          u_name : this.u_name,
      },{}).then((response) => {
        var orderResult = response.data; //转换成标准时间
        for (var  index = 0; index < orderResult.length; index++) {
              var element = orderResult[index];
              element.apply_data = new Date(element.apply_data).toLocaleString();
        }
        this.results = orderResult;
        console.log(this.results);
        this.listLoading = false;
      })
    },

    handleRefuse(row){ //拒绝申请
        var isOk = -1;
        this.handleUpdate(row,isOk);
    },
    handleAgree(row){ //同意申请
        var isOk = 1;
        this.handleUpdate(row,isOk);
    },
    //更改状态请求
    handleUpdate(row,isOk) { // index 表示建立的索引  index 为标号 后面的为索引的东西
         
        console.log(row);
        var resell_id = row.resell_id; //获取id 
        var is_ok = isOk;
        this.$http.post('./api/user/updateResellOk', { 
        resell_id:    resell_id,
        is_ok:        is_ok
        }, {}).then((response) => {
        //NProgress.done();
        this.$message({
            message: '更改成功',
            type: 'success'
        });
        this.selectResellInfo();
        });
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
          this.selectResellInfo();
        })
    }
}
</script>

<style>
</style>