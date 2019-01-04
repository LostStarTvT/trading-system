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
                <el-select v-model="value" placeholder="选择产品状态"  clearable >
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
		        </div>
            <div>
                <el-button type="primary" style="float: left;margin-top: 10px;margin-left:10px"  @click="filterRate" >查询</el-button>
            </div>
        </div>

  <el-table  :data="results" highlight-current-row  v-loading="listLoading" @selection-change="selsChange" style="width: 100%" label-width="0px" >
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="起购价">
            <span>{{ props.row.good_money_begin + '元' }}</span>
          </el-form-item>
          <el-form-item label="递增金额">
            <span>{{ props.row.good_inc_money + '元' }}</span>
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
          <el-form-item label="清算日期">
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
          <el-form-item label="归属公司">
            <span>{{ props.row.good_belonged_bank }}</span>
          </el-form-item>
          <el-form-item label="发行人信息">
            <span>{{ props.row.goodBelongPerInfo }}</span>
          </el-form-item>
          
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      type="index" width="60px" >
    </el-table-column>
    <el-table-column
      label="产品单号"
      prop="goodIncID"
      width="100" >
    </el-table-column>
     <el-table-column
      label="理财产品名称"
      prop="good_name"
      width="300" >
    </el-table-column>
     <el-table-column
      label="已融资"
      prop="goodHaveSoldNum"
      width="100">
        <template scope="scope">
       <span>{{ scope.row.goodHaveSoldNum + '元' }}</span>
      </template>

    </el-table-column>
    <el-table-column
      label="总量"
      prop="goodSum"
      width="100">
       <template scope="scope">
       <span>{{ scope.row.goodSum + '元' }}</span>
      </template>
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
       width="150"
      prop="goodStatus">
      <template scope="scope">
                    <el-tag type="success" v-if="scope.row.goodStatus == 1"  close-transition>
                        在售
                    </el-tag  >
                    <el-tag type="danger" v-else-if="scope.row.goodStatus == -1"  close-transition>
                        认购期结束下架
                    </el-tag  >
                    <el-tag type="danger" v-else-if="scope.row.goodStatus == 0"  close-transition>
                        被冻结下架
                    </el-tag  >
      </template>
    </el-table-column>

    <el-table-column label="管理" width="100">
          <template scope="scope">
            <div v-if="scope.row.goodStatus != -1" >
              <el-button v-if="scope.row.goodStatus == 0" type="success" size="small" @click="handleChangeStatus( 1,scope.row)">上架</el-button>
              <el-button v-else type="danger" size="small" @click="handleChangeStatus(0,scope.row)">下架</el-button>
            </div>
            
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
      search :'', 
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

      options: [
        { value: '1',
          label: '在售'
          }, {
          value: '2',
          label: '被冻结下架'
        }, {
          value: '3',
          label: '过期下架'
        }],
        value: '',

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



    
    StatusOperation(status){
          for(var index = 0; index < this.results.length ; ){
              var element = this.results[index].goodStatus;

              if (element == status ) {
                  index ++;
                  continue;
              }else{
                  this.results.splice(index,1);
              }
          }
      },

      filterRate(){ //筛选状态
          var val = this.value;
          // console.log(key);
          // parseInt(key);
          if (this.results.length != 0 && this.value!='') {
                switch (val) {
              case '1':
                  this.StatusOperation(1); //在售
                  break;
                case '2':
                  this.StatusOperation(0);//冻结
                  break;
                case '3':
                  this.StatusOperation(-1);//过期下架
                  break;
              }
          }else{
            
                  this.selectGoodsInfo();
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