<template>
 <section>
  
  <!--工具条-->
     <div> 
            <div id="search" >
                <el-input
                        placeholder="用户名"  icon="search" v-model="search"  :on-icon-click="handleIconClick">
                </el-input> 
            </div>
        </div>

  <el-table  :data="results" highlight-current-row  v-loading="listLoading" @selection-change="selsChange" style="width: 100%" label-width="0px" >
   
    <el-table-column
      type="index" width="60px" >
    </el-table-column>
    <el-table-column
      label="用户名"
      prop="user_name"
      width="150">
    </el-table-column>
    <el-table-column
      label="登录名"
      prop="login_name">
      <template scope="scope">
       <span>{{ scope.row.login_name}}</span>
      </template>
    </el-table-column>

       <el-table-column
      label="人员管理"
      prop="PersonManage">
      <template scope="scope">
        <el-switch on-text="" off-text="" v-model="scope.row.PersonManage"></el-switch>
      </template>
    </el-table-column>
       <el-table-column
      label="产品管理"
      prop="GoodsManage">
      <template scope="scope">
        <el-switch on-text="" off-text="" v-model="scope.row.GoodsManage"></el-switch>
      </template>
    </el-table-column>
       <el-table-column
      label="订单管理"
      prop="OrderManage">
      <template scope="scope">
        <el-switch on-text="" off-text="" v-model="scope.row.OrderManage"></el-switch>
      </template>
    </el-table-column>
       <el-table-column
      label="抛售管理"
      prop="ResellManage">
      <template scope="scope">
        <el-switch on-text="" off-text="" v-model="scope.row.ResellManage"></el-switch>
      </template>
    </el-table-column>

    <el-table-column label="管理" width="150">
          <template scope="scope">
            <el-button  type="danger" size="small" @click="handleChangeStatus(scope.row)">修改</el-button>
        </template>
       
    </el-table-column>
  </el-table> 

  <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
     
    </el-col>


  </section>
</template>

<script > 
  export default {
  name: 'input',      //对这个组件进行起名 ，也就是跟
  data () {
    return { 

      filters: {
          name: ''
        },
      user_ID: '',
      results : [],
      showResults:[],
      listLoading: false, 
      editLoading: false, 
      page: 1,
      total: 0,
      search :'', 

      editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
   
    }
  },

  methods: {

    // 进行分页显示
    handleCurrentChange(val) {
        this.page = val;
        this.selectGoodsInfo();
        // console.log(val);
      },

    selectGoodsInfo() {  //查询所有的管理员信息
      // var name = this.userName;
      this.listLoading = true;
      this.$http.post('./api/user/selectRootPersonInfo', {
          page: this.page,
          name: this.filters.name
      },{}).then((response) => {
        //console.log(response.body[0].username);  
         // console.log(response.body); 
        this.results = response.body.data;
        for (var i  = 0 ; i < this.results.length ; i++ ) {
              this.results[i].PersonManage =  Boolean(this.results[i].PersonManage);
              this.results[i].GoodsManage =   Boolean(this.results[i].GoodsManage);
              this.results[i].OrderManage =   Boolean(this.results[i].OrderManage);
              this.results[i].ResellManage =  Boolean(this.results[i].ResellManage);
        }
        this.total = response.body.total;
        console.log( this.results);
        this.listLoading = false;
      })
    },

    StatusOperation(UserType){
          for(var index = 0; index < this.results.length ; ){
              var element = this.results[index].user_type;

              if (element === UserType ) {
                  index ++;
                  continue;
              }else{
                  this.results.splice(index,1);
              }
          }
      },

 
     handleIconClick() { //按照名字查找
      var key = this.search;
        if ( (key  == '' || this.results.length ==0 )  ) {
                  this.selectGoodsInfo();
          }
          else{
                for (var i = 0  ; i < this.results.length ; ) {
                    if ( this.results[i].user_name.toString().search(key) != -1  ) 	  
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
     // 更改权限
    handleChangeStatus: function (row) { // index 表示建立的索引  index 为标号 后面的为索引的东西
          
          console.log(row);
          var userID = row.userID;
          this.$http.post('./api/user/updatePersonAuthority', { 
            GoodsManage: row.GoodsManage ?  1:0,
            OrderManage: row.OrderManage ?  1:0,
            PersonManage: row.PersonManage ? 1:0,
            ResellManage: row.ResellManage ? 1:0,
            userID: userID
            }, {}).then((response) => {
            this.$message({
              message: '更改成功',
              type: 'success'
            });
            this.selectGoodsInfo();
          });
    },



    selsChange: function (sels) {
        this.sels = sels;
    },

  },

    mounted: function() {  //这个是与method 这个是同级的， 也就是在加载这个组件的时候就可以直接的执行的方法，也可以说是初始化。
        this.$nextTick(function() {
          this.selectGoodsInfo();
        })
    }
}



</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-form-item__label{
    width: 140px;
    height: 51px;
  }
</style>