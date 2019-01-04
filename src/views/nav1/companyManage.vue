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
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="身份证号">
            <span>{{ props.row.userIDCard }}</span>
          </el-form-item>
          <el-form-item label="手机号">
            <span>{{ props.row.userPhoneNumber }}</span>
          </el-form-item>
          <el-form-item label="资产" >
            <span>{{  props.row.user_property  + '元' }}</span>
          </el-form-item>
          <el-form-item label="注册时间" >
            <span>{{ props.row.user_register_time.substring(0,10) }}</span>
          </el-form-item>
          <el-form-item label="支付类型">
            <span>{{ props.row.moneybackCountType }}</span>
          </el-form-item>
          <el-form-item label="支付账号">
            <span>{{ props.row.moneybackCountNo }}</span>
          </el-form-item>
          <el-form-item label="公司">
            <span>{{ props.row.server_bank  }}</span>
          </el-form-item>
          <el-form-item label="备注">
            <span>{{ props.row.others }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
   
    <el-table-column
      type="index" width="60px" >
    </el-table-column>
    <el-table-column
      label="用户ID"
      prop="userID"
      width="150" >
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
      label="身份"
      prop="user_type">
      <template scope="scope">
                    <el-tag type="success" v-if="scope.row.user_type == 'buyer' "  close-transition>
                        买家
                    </el-tag  >
                    <el-tag type="danger" v-else-if="scope.row.user_type == 'root'"  close-transition>
                        管理员
                    </el-tag  >
                    <el-tag type="primary" v-else-if="scope.row.user_type == 'seller'"  close-transition>
                        卖家
                    </el-tag  >
          </template>
    </el-table-column>
     <el-table-column
      label="状态"
      prop="user_status">
      <template scope="scope">
                    <el-tag type="success" v-if="scope.row.user_status == 1"  close-transition>
                        正常
                    </el-tag  >
                    <el-tag type="danger" v-else  close-transition>
                        冻结
                    </el-tag  >
          </template>
    </el-table-column>

    <el-table-column label="管理" width="150">
          <template scope="scope">
            <el-button v-if="scope.row.user_status == 0" type="success" size="small" @click="handleChangeStatus( 1,scope.row)">解冻</el-button>
            <el-button v-else type="danger" size="small" @click="handleChangeStatus(0,scope.row)">冻结</el-button>
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
  import util from '../../common/js/util'
  import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
  export default {
  name: 'input',      //对这个组件进行起名 ，也就是跟
  data () {
    return { 

      filters: {
          name: ''
        },
      user_ID: '',
      results : [],
      listLoading: false, 
      editFormVisible: false,//编辑界面是否显示
      editLoading: false, 
      sels: [],//列表选中列 
      users: [], //mockjs 生成的数据 
      page: 1,
      total: 0,
      search :'', 

      editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },

      //编辑界面数据
        editForm: {
          number_id: 0, //员工号
          Id_card: 0,
          name: '',
          sex:  -1,
          ID_card: '',
          birthday : '',
          native_place: '',
          phone: '',
          address: '',
          others: '',
        },

        addFormVisible: false ,//新增界面是否显示
        addLoading: false, 
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          Id_card: 0,
          name: '',
          sex:  -1 ,
          ID_card: '',
          birthday : '',
          native_place: '',
          phone:  '',
          address: '',
          others: '',
        }
    }
  },

  methods: {

    // 进行分页显示
    handleCurrentChange(val) {
        this.page = val;
        this.selectGoodsInfo();
        // console.log(val);
      },

    selectGoodsInfo() {  //显示所有产品信息
      // var name = this.userName;
      this.listLoading = true;
      this.$http.post('./api/user/selectSellerInfo', {
          page: this.page,
      },{}).then((response) => {
         // console.log(response.body); 
        this.results = response.body.data;
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
     // 更改用户的状态
    handleChangeStatus: function (status, row) { // index 表示建立的索引  index 为标号 后面的为索引的东西
          console.log(status);
          console.log(row);
          var userID = row.userID;
          this.$http.post('./api/user/updatePersonStatus', { 
            status:    status,
            userID:    userID
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