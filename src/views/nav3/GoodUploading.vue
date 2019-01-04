<template>
 <section>
  
  <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :model="filters" :inline="true" >
          <el-form style="float:left;margin-right:10px">
          <div class="block" >
            <el-date-picker
              v-model="datetimeRange"
              type="daterange"
              align="right"
              placeholder="选择上架日期范围"
              :picker-options="Time_pickerOptions">
            </el-date-picker>
		      </div>
        </el-form>

        <el-form-item>
          <el-button type="primary" v-on:click="findSomething">查询</el-button>
        </el-form-item>

      </el-form>
    </el-col>

  <el-table  :data="results" highlight-current-row  v-loading="listLoading" @selection-change="selsChange" style="width: 100%" label-width="0px" >
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
			
          <el-form-item label="起点金额">
            <span>{{ props.row.good_money_begin + '元' }}</span>
          </el-form-item>
          <el-form-item label="递增金额">
            <span>{{ props.row.good_inc_money + '元' }}</span>
          </el-form-item>
          <el-form-item label="收益率" >
            <span>{{  (props.row.good_income_rate * 100).toFixed(2) + '%' }}</span>
          </el-form-item>
          <el-form-item label="产品认购期" >
            <span>{{ props.row.good_date_begin.substring(0,10)+ ' 至 '+ props.row.good_date_end.substring(0,10)}}</span>
          </el-form-item>
          <el-form-item label="产品到期日">
            <span>{{ props.row.good_date_income.substring(0,10) }}</span>
          </el-form-item>
          <el-form-item label="投资期限">
            <span>{{ props.row.good_date_belong  + '天'}}</span>
          </el-form-item>
          <el-form-item label="已售">
            <span>{{ props.row.count_have_sold + '份' }}</span>
          </el-form-item>
          <el-form-item label="产品介绍">
              <span>{{ props.row.good_others }}</span>
            </el-form-item>
          <el-form-item label="发行人信息">
              <span>{{ props.row.goodBelongPerInfo }}</span>
          </el-form-item>
          <el-form-item label="上架人姓名">
            <span>{{ props.row.user_name }}</span>
          </el-form-item>
          <el-form-item label="上架人电话">
            <span>{{ props.row.userPhoneNumber }}</span>
          </el-form-item>
          <el-form-item label="上架人身份证号">
            <span>{{ props.row.userIDCard }}</span>
          </el-form-item>
         
          <el-form-item label="上架时间">
                <span>{{ props.row.goodsInOutDate}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      type="index" width="60px" >
    </el-table-column>
    <el-table-column
      label="理财产品名称"
      prop="good_name"
      width="250" >
    </el-table-column>
    <el-table-column
      label="已融资" width="120"
       >
      <template scope="scope">
       <span>{{ scope.row.goodHaveSoldNum + '元' }}</span>
      </template>
    </el-table-column>
	  <el-table-column
      label="总量"
      width="120"
       >
      <template scope="scope">
       <span>{{ scope.row.goodSum + '元' }}</span>
      </template>
    </el-table-column>

      <el-table-column label="项目进度" width="230"   prop="percentage">
        <template scope="scope">
             <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.percentage" status="success"></el-progress>
      </template>
      </el-table-column>

     <el-table-column
      label="状态"
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
     <el-table-column
      label="操作"
      width="80">
      <template scope="scope">
        <div v-if="scope.row.goodStatus != -1" >
          <el-button  type="danger" :disabled="scope.row.goodStatus == 0" size="small" @click="handleChangeStatus(0,scope.row)">下架</el-button>
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
      userID: '',
      OrderDetailFormVisible: false,
      results : [],
      datetime:'',
      showResults:[],
      listLoading: false, 
      editFormVisible: false,//编辑界面是否显示
      editLoading: false, 
      sels: [],//列表选中列 
	    users: [], //mockjs 生成的数据 
	    user:'',//保存传递过过来的user数据
      page: 1,
      total: 0,

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
        },

      editFormRules: {
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

    selectGoodsInfo() {  //显示所有产品信息
	  var userID = this.userID;
	  console.log(userID);
      this.listLoading = true;
      this.$http.post('./api/user/selectGoodsInfoByID', {
		  page: this.page,
		  userID: userID,
          name: this.filters.name
      },{}).then((response) => {
        this.results = response.body.data;
        this.total = response.body.total;
        
        for(var index = 0; index < this.results.length; index ++ ){
            var element = this.results[index] ;
            element.goodsInOutDate = new Date(element.goodsInDate).toLocaleString();
            element.percentage = (parseInt(element.goodHaveSoldNum)  / parseInt(element.goodSum) * 100).toFixed(2);
            element.percentage = parseInt(element.percentage); //转成数值。
        }
        console.log( this.results);
        this.listLoading = false;
      })
    },
    handleViewDetail(row){ //查看详情。 根据本行的产品号从订单表中查询所有的数据。
        var goodIncID = row.goodIncID;
        console.log(row.goodIncID);
        
         this.showResults.length = 0;
         this.$http.post('./api/user/selectOrderByGoodIncId', {
                goodIncID : goodIncID,
            },{}).then((response) => {
               this.showResults = response.body;
                console.log(response.body);
               
            })
        console.log(this.showResults);
        var date = new Date();
        this.datetime = date.toLocaleString();
        this.OrderDetailFormVisible = true;
    },


    //显示编辑界面
    handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
    },

     findSomething() {  //在返回来的数据中进行查询。
        if (this.datetimeRange.length != 0) {
        var dateStart = this.datetimeRange[0]; //如果不为空就取出时间
        var dateEnd = this.datetimeRange[1]; 
    		var date;
    		var str;
    		for (var i = 0  ; i < this.results.length ;) {  //选择出满足时间的结果
    			str = this.results[i].goodsInDate;  //将数据库中存储的时间字符串转换为时间对象
       		// str = str.replace(/-/g,"/");
          console.log(str);
          
    			date = new Date(str);
          if (dateStart <= date  &&  dateEnd >= date) {
                i++;
                continue;
            }else{
              this.results.splice(i,1);
            }
        }
        	console.log(this.results);
        }
        if ( this.datetimeRange.length == 0 || this.results.length ==0 ) {
            this.selectGoodsInfo();
        }
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
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.userID = user.userID;
				this.user = user;
				this.selectGoodsInfo();
				// console.log(this.user);    
            }
		  
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