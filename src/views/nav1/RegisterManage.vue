<template>
 <section>
  
  <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :model="filters" :inline="true" >
          <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" v-on:click="selectGoodsInfo">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="mock_addusers">自动增加</el-button>
        </el-form-item>
      </el-form>
    </el-col>

  <el-table  :data="results" highlight-current-row  v-loading="listLoading" @selection-change="selsChange" style="width: 100%" label-width="0px" >
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="起购价">
            <span>{{ props.row.good_money_begin + '元' }}</span>
          </el-form-item>
          <el-form-item label="递增金额">
            <span>{{ props.row.goodIncID + '元' }}</span>
          </el-form-item>
          <el-form-item label="收益率" >
            <span>{{  (props.row.good_income_rate * 100).toFixed(2) + '%' }}</span>
          </el-form-item>
          <el-form-item label="开始销售" >
            <span>{{ props.row.good_date_begin.substring(0,10) }}</span>
          </el-form-item>
          <el-form-item label="截止销售">
            <span>{{ props.row.good_date_end.substring(0,10) }}</span>
          </el-form-item>
          <el-form-item label="收益发放">
            <span>{{ props.row.good_date_income.substring(0,10) }}</span>
          </el-form-item>
          <el-form-item label="投资期限">
            <span>{{ props.row.good_date_belong  + '天'}}</span>
          </el-form-item>
          <el-form-item label="已售">
            <span>{{ props.row.count_have_sold + '份' }}</span>
          </el-form-item>
          <el-form-item label="上架时间">
            <span>{{ props.row.goodsInDate.substring(0,10) }}</span>
          </el-form-item>
          <el-form-item label="上架人ID">
            <span>{{ props.row.userID }}</span>
          </el-form-item>
          <el-form-item label="上架人姓名">
            <span>{{ props.row.user_name }}</span>
          </el-form-item>
          <el-form-item label="上架人电话">
            <span>{{ props.row.userPhoneNumber }}</span>
          </el-form-item>
          <el-form-item label="身份证号">
            <span>{{ props.row.userIDCard }}</span>
          </el-form-item>
          <el-form-item label="备注">
            <span>{{ props.row.good_others }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column type="selection" width="55">
      </el-table-column>
    <el-table-column
      type="index" width="60px" >
    </el-table-column>
    <el-table-column
      label="理财产品名称"
      prop="good_name"
      width="300" >
    </el-table-column>
    <el-table-column
      label="归属银行"
      prop="good_belonged_bank"
      width="150">
    </el-table-column>
    <el-table-column
      label="已售"
      prop="count_have_sold"
       >
      <template scope="scope">
       <span>{{ scope.row.count_have_sold + '份' }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="状态"
      prop="goodStatus">
      <template scope="scope">
                    <el-tag type="success" v-if="scope.row.goodStatus == 1"  close-transition>
                        已上线
                    </el-tag  >
                    <el-tag type="danger" v-else  close-transition>
                        已下线
                    </el-tag  >
          </template>
    </el-table-column>

    <el-table-column label="管理" width="150">
          <template scope="scope">
            <el-button v-if="scope.row.goodStatus == 0" type="success" size="small" @click="handleChangeStatus( 1,scope.row)">上线</el-button>
            <el-button v-else type="danger" size="small" @click="handleChangeStatus(0,scope.row)">下线</el-button>
        </template>
       
      </el-table-column>
  </el-table> 

  <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
     
    </el-col>

  <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules"  ref="editForm">
        <el-form-item label="员工号" prop="number_id">
         <span>{{editForm.number_id}}</span>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>

       <el-form-item label="性别">
          <el-radio class="radio" v-model="editForm.sex" label="1">男</el-radio>
            <el-radio class="radio" v-model="editForm.sex" label="0">女</el-radio>
        </el-form-item>

        <el-form-item label="生日" type="birthday">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birthday "></el-date-picker>
        </el-form-item>
         <el-form-item label="籍贯" prop="native_place">
          <el-input v-model="editForm.native_place" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="ID_card">
          <el-input v-model="editForm.ID_card" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input type="textarea" v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="editForm.others"></el-input>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog> 

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birthday"></el-date-picker>
        </el-form-item>

        <el-form-item label="籍贯">
          <el-input  v-model="addForm.native_place"></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input  v-model="addForm.phone"></el-input>
        </el-form-item>
        
        <el-form-item label="身份证">
          <el-input  v-model="addForm.ID_card"></el-input>
        </el-form-item>

        <el-form-item label="家庭住址">
          <el-input type="textarea" v-model="addForm.address"></el-input>
        </el-form-item> 

        <el-form-item label="备注">
          <el-input type="textarea" v-model="addForm.others"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
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
      this.$http.post('./api/user/selectGoodsInfo', {
          page: this.page,
          name: this.filters.name
      },{}).then((response) => {
        //console.log(response.body[0].username);  
         // console.log(response.body); 
        this.results = response.body.data;
        this.total = response.body.total;
        console.log( this.results);
        this.listLoading = false;
      })
    },

     // 更改订单的状态
    handleChangeStatus: function (status, row) { // index 表示建立的索引  index 为标号 后面的为索引的东西
          console.log(status);
          console.log(row);
          var goodIncID = row.goodIncID;
          this.$http.post('./api/user/updateGoodStatus', { 
            status:    status,
            goodIncID:  goodIncID
            }, {}).then((response) => {
            this.$message({
              message: '更改成功',
              type: 'success'
            });
            this.selectGoodsInfo();
          });
    },
      //进行更新
    editSubmit: function (index, row) {
      this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            let para =Object.assign({}, this.editForm); 
            this.$http.post('./api/user/updateUser', { 
              username:     para.name,
              birthday:     para.birthday.substring(0,10),
              sex:          para.sex,
              id_card:      para.ID_card,
              native_place: para.native_place,
              address:      para.address,
              phone:        para.phone,
              others:       para.others,
              number_id:    para.number_id, 
            }, {}).then((response) => {
                this.editLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['editForm'].resetFields();
                  this.editFormVisible = false;
                  this.selectGoodsInfo();
                });
          });
          }
        });
    },
    //手动删除用户
    handleDel: function (index, results) { // index 表示建立的索引  index 为标号 后面的为索引的东西
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start()
          var num_id = results[index].number_id;
          // console.log(num_id);
          this.$http.post('./api/user/deleteUser', { 
            id:    num_id
            }, {}).then((response) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.selectGoodsInfo();
          });
        }).catch(() => {

        });
    },
    //显示编辑界面
    handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
    },

    //显示新增界面
    handleAdd: function () {
        this.addFormVisible = true ;
        this.addForm = {
          Id_card: 0,
          name: '',
          sex:  -1 ,
          ID_card: '',
          birthday : '',
          native_place: '',
          phone: '' ,
          address: '',
          others: '',
        };
    },

    //添加用户
    addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              // console.log(para);
             
              para.birthday = (!para.birthday || para.birthday == '') ? '' : util.formatDate.format(new Date(para.birthday), 'yyyy-MM-dd');  //进行时间格式的处理


              this.$http.post('./api/user/addUser', {   //在这里用{ } 就表示已经用的是json格式进行传输
              username:     para.name,
              birthday:     para.birthday.substring(0,10),
              sex:          para.sex,
              id_card:      para.ID_card,
              native_place: para.native_place,
              address:      para.address,
              phone:        para.phone,
              others:       para.others,
            }, {}).then((response) => {
              this.editLoading = false;
                      //NProgress.done();
                      this.$message({
                        message: '提交成功',
                        type: 'success'
                      });
                      this.$refs['addForm'].resetFields();
                      this.addFormVisible = false;
                      this.selectGoodsInfo();
                      this.addLoading = false;
            });   });
          }
        });
      },

    //mockjs 添加用户
    mock_addusers: function () { 
            this.$confirm('确认自动增加吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              // console.log(para);  

              let para = {
                page: this.page,
                name: this.filters.name
              };
              this.listLoading = true;
              var i;
              //NProgress.start();
              getUserListPage(para).then((res) => {
                this.total = res.data.total;
                //获取到整个后台数据
                this.users = res.data.users; 
                //NProgress.done();
                // console.log(this.users[0].name); 
                 for ( i=0; i < this.users.length; i++) {
                    var _native_place = this.users[i].addr.substring(0,2); 
                    this.$http.post('./api/user/addUser', {   //在这里用{ } 就表示已经用的是json格式进行传输
                    username:     this.users[i].name,
                    birthday:     this.users[i].birth,
                    sex:          this.users[i].sex,
                    id_card:      this.users[i].id_card,
                    native_place: _native_place,
                    address:      this.users[i].addr,
                    phone:        this.users[i].phone,
                    others:       this.users[i].other,
                  }, {}).then((response) => {});
              }
              if (i == this.users.length) {
                this.$message({
                        message: '提交成功',
                        type: 'success'
                      });
                      this.selectGoodsInfo();
                      this.addLoading = false; //当增加 完成之后释放
                      this.listLoading = false;
              } 
  
                // console.log(this.total);
              });  

          });
          
       
      },
    
    selsChange: function (sels) {
        this.sels = sels;
    },

    //批量删除数据
    batchRemove: function () {
        var ids = this.sels.map(item => item.number_id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let para = { ids: ids };  //存储数据  这样也就是直接形成json格式的文件

          this.listLoading = false;
          this.$http.post('./api/user/batchdeleteUser', { 
            paraaaa:      para
            }, {}).then((response) => {
            this.listLoading = false;
            this.$message({
              message: '删除成功',
              type: 'success'
            });
              this.selectGoodsInfo();
          });
        }).catch(() => {

        });
      }

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