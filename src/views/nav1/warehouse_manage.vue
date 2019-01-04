<template>
 <section>
  
  <el-tabs type="border-card" @tab-click="handleClick"   >

   <el-tab-pane label="单物料操作">
  <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :model="filters" :inline="true" >
          <el-form-item>
          <el-input v-model="filters.name" placeholder="输入查询内容"></el-input>
        </el-form-item>	
		<el-form-item>
			<div class="block">
		    <el-date-picker
		      v-model="datetimeRange"
		      type="daterange"
		      align="right"
		      placeholder="选择查询日期范围"
		      :picker-options="Time_pickerOptions">
		    </el-date-picker>
		  </div>
		 </el-form-item> 
		<br />	
		 <el-form-item>
          <el-button type="primary" v-on:click="findSomething">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">进仓</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  type="danger" @click="handleEdit">出仓</el-button>
        </el-form-item>
      </el-form>
    </el-col>

     <el-table
    :data="results_InOutInf"  
    border 
    highlight-current-row  v-loading="listLoading" @selection-change="selsChange" style="width: 100%" :default-sort = "{prop: 'goods_id', order: 'descending'}" >
    <el-table-column
      type="index" width="60px" >
    </el-table-column>
	
	 <el-table-column 
      prop="in_out_id" 
      label="进出货物单号"
      sortable
      width="140">
    </el-table-column>

    <el-table-column
      label="操作人员ID"
      width="130"
	  prop= "opera_person_id"
      sortable
      >
    </el-table-column>
    <el-table-column
      label="物料代码" 
      prop= "opera_goods_id"
      sortable
      width="120px">
    </el-table-column>
	
	<el-table-column  
      label="(进/出)仓" 
      width="100px">
      <template scope="scope">
        <span style="margin-left: 10px">{{ (scope.row.InOrOut == 1) ? '进':'出' }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="数量"
	  prop= "g_sum"
	  width="100px"
      sortable
      >
    </el-table-column>

    <el-table-column
       label="日期"
	   prop= "in_date"
	   width="120px"
       sortable
      >
    </el-table-column> 

     <el-table-column
       label="备注"
	   prop= "g_others" 
       sortable
      >
    </el-table-column> 
  </el-table>

  <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
     
    </el-col>

  <!--出仓界面-->
    <el-dialog title="出仓" v-model="outFormVisible" :close-on-click-modal="false">
      <el-form :model="outForm" label-width="80px" :rules="outFormRules"  ref="outForm">
        <el-form-item label="进仓代码" prop="in_out_id">
         <span>{{outForm.in_out_id}}</span>
        </el-form-item>

       <el-form-item label="出仓日期" type="intime">
          <el-date-picker type="date" placeholder="选择日期" v-model="outForm.intime "></el-date-picker>
        </el-form-item>
		  
      <el-form-item label="操作人员" >
         <span>{{user_ID}}</span>
        </el-form-item>

		 <el-form-item label="物料代码"  >
          <el-select
              v-model="outForm.g_goods_id"
              filterable
              placeholder="请选择物料代码" auto-complete="off" >
              <el-option
                v-for="item in checkBoxValue_goods_id "
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
 
        </el-form-item>
        
        <el-form-item label="出仓数量" prop="g_sum">
          <el-input-number v-model="outForm.g_sum" auto-complete="off" :min="0" :max="9999"></el-input-number>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" v-model="outForm.g_others"></el-input>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="outFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog> 
    
    <!--进仓界面-->
    <el-dialog title="进仓" v-model="inFormVisible" :close-on-click-modal="false">
      <el-form :model="inForm" label-width="80px" :rules="inFormRules" ref="inForm">
      <el-form-item label="出仓单号" prop="g_name">
          <span>{{inForm.in_out_id}}</span>
        </el-form-item>

        <el-form-item label="进仓日期" type="intime">
          <el-date-picker type="date" placeholder="选择日期" v-model="inForm.intime "></el-date-picker>
        </el-form-item>

      <el-form-item label="操作人员" >
         <span>{{user_ID}}</span>
        </el-form-item>
		
		 <el-form-item label="物料代码"  >
          <el-select
              v-model="inForm.g_goods_id"
              filterable
              placeholder="请选择物料代码" auto-complete="off" >
              <el-option
                v-for="item in checkBoxValue_goods_id "
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
 
        </el-form-item>
        <el-form-item label="进仓数量" prop="g_sum">
          <el-input-number v-model="inForm.g_sum" auto-complete="off" :min="0" :max="9999"></el-input-number>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" v-model="inForm.g_others"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="inFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </el-tab-pane>

   <el-tab-pane label="多物料操作">
     
         <!--多物料页面 直接借助 outform表进行数据的存储-->
  <div id="main" >
  <div id="left" style="float:left ;  width:50%;  height:100%;">
     <el-form :model="outForm" label-width="80px"  :rules="outFormRules"  ref="outForm">
       <el-form-item label="进仓出仓" prop="in_out_id">
         <el-radio-group v-model="inOrOut">
        <el-radio-button label="进仓"></el-radio-button>
        <el-radio-button label="出仓"></el-radio-button>
      </el-radio-group>
        </el-form-item>
    
        <el-form-item label="操作代码" prop="in_out_id">
         <span>{{outForm.in_out_id}}</span>
        </el-form-item>

       <el-form-item label="操作日期" type="intime">
          <el-date-picker type="date" placeholder="选择日期" v-model="outForm.intime "></el-date-picker>
         
        </el-form-item>
      
      <el-form-item label="操作人员" >
         <span>{{user_ID}}</span>
          <div style="float:right" > <el-button type="success"  @click.native="MulAddToArray"  >增加物料到右表</el-button> </div> 
        </el-form-item>

      <el-form-item label="物料代码"  >
          <el-select
              v-model="outForm.g_goods_id"
              filterable
              placeholder="请选择物料代码" auto-complete="off" >
              <el-option
                v-for="item in checkBoxValue_goods_id "
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="float:right" > <el-button type="danger"  @click.native="DelAddArray"  > 清空表</el-button> </div> 
        </el-form-item>
        <el-form-item label="操作数量" prop="g_sum">
          <el-input-number v-model="outForm.g_sum" auto-complete="off" :min="0" :max="9999"></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="outForm.g_others"></el-input>
        </el-form-item>
      </el-form>
        
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="MuleditSubmit">提交</el-button>
      </div>
       
  </div>
  <div id="right" style="float:left ;  width:50%; height:100%;">
    <el-table :data="mulForm"> 
    <el-table-column property="g_goods_id" label="物料代码" width="100"></el-table-column>
    <el-table-column property="g_sum" label="操作数量" width="100"></el-table-column>
    <el-table-column property="g_others" label="备注"></el-table-column>
  </el-table>
 
  </div>     
    </div>
   </el-tab-pane>
    </el-tabs>

  </section>
</template>

<script > 
  import util from '../../common/js/util'
  export default {
  name: 'input',      //对这个组件进行起名 ，也就是跟
  data () {
    return { 

      filters: {
          name: ''
        },
        mulForm :[], //存储多个进出仓的数
      //存储复选框数据
      checkBoxValue_goods_id:[],  //物料代码id

      user_ID: '',
      inOrOut : '进仓',
      results_goods : [],  // 货物显示结果
      results_InOutInf :[],  //货物进出表显示
      listLoading: false, 
      outFormVisible: false,//编辑界面是否显示 
      editLoading: false, 
      sels: [],//列表选中列 
      users: [], //mockjs 生成的数据 
      page: 1,
      total: 0,

      outFormRules: {
          name: [
            { required: true, message: '请输入物料名称', trigger: 'blur' }
          ]
        },

      //出仓页面
        outForm: {
          in_out_id: 0, //进出仓id
          g_models : '',
          g_unit : '' ,
          g_sum : 0,
          g_others: '',
        },

        inFormVisible: false ,//新增界面是否显示
        addLoading: false, 
        inFormRules: {
          name: [
            { required: true, message: '请输入物料名称', trigger: 'blur' }
          ]
        },
        //进仓界面
        inForm: {          
          in_out_id: 0, //进出仓号
          intime:'',
          g_goods_id : '',
          g_number_id :'',
          g_sum : 0,
          g_others: '',
        },



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
        datetimeRange: [],
    }
  },

  methods: {

    // 进行分页显示
    handleCurrentChange(val) {
        this.page = val;
        this.selectGoods();
      }, 


    handleClick(tab, event) {
        this.outForm = {            //作为每一次重新点击的初始化，不然的话会出现记录上次数据的情况
          in_out_id: 0, //物料号
          intime:'',
          g_goods_id : '',
          g_sum : 0,
          g_others: '',
        };
        this.GetRandomNum(); //获取根据时间形成的进出仓号
        this.GetGoodsId(); //获取下拉需要的商品号
      },
    formatter(row, column) {
        return row.address;
      },

    MulAddToArray(){  //将数据增加到数组中 也就是在表中显示出来。
      // console.log(this.outForm.g_goods_id);
      var goods_id = this.outForm.g_goods_id;
      var goods_number = this.outForm.g_sum;

      for (var i = 0; i < this.results_goods.length; i++) {
        if (this.results_goods[i].goods_id === goods_id ) {
            if (this.results_goods[i].g_sum >= goods_number ) {
                 this.mulForm.push( {    //数据入数组
                    in_out_id :this.outForm.in_out_id,
                    intime    :this.outForm.intime,
                    g_goods_id : this.outForm.g_goods_id,
                    g_sum :this.outForm.g_sum ,
                    g_others :this.outForm.g_others,
                    g_number_id : this.user_ID
                  }) //进行初始化
            }else{
                      this.$message({
                        message: '出仓大于库存量',
                        type: 'warning' 
                      });
                  }
            break;
        }
      }
      this.outForm.g_goods_id = '';
      this.outForm.g_sum = 0;
      this.outForm.g_others = 0;
      // console.log(this.mulForm);
    },

    DelAddArray(){
      while(this.mulForm.length != 0)
      {
         this.mulForm.pop();
      }
    },

    findSomething() {  //在返回来的数据中进行查询。
        var key = this.filters.name; 
        if (this.datetimeRange.length != 0) {
        	var dateStart = this.datetimeRange[0]; //如果不为空就取出时间
        	var dateEnd = this.datetimeRange[1]; 
    		var date;
    		var str;
    		for (var i = 0  ; i < this.results_InOutInf.length ;) {  //选择出满足时间的结果
    			str = this.results_InOutInf[i].in_date;  //将数据库中存储的时间字符串转换为时间对象
       		str = str.replace(/-/g,"/");
    			date = new Date(str);
    	    	if (dateStart <= date  &&  dateEnd >= date) {
    	    	 		 i++;
    	                 continue;
    	    		}else{
    	    		this.results_InOutInf.splice(i,1);
    	    		}
        	}
        	console.log(this.results_InOutInf);
        }
        if ( (key  == '' || this.results_InOutInf.length ==0 ) && this.datetimeRange.length == 0 ) {
            this.selectInOutInf();
        }else{
                for (var i = 0  ; i < this.results_InOutInf.length ; ) {
                      if ( this.results_InOutInf[i].in_out_id.toString().search(key) != -1  ||  this.results_InOutInf[i].opera_person_id.toString().search(key) != -1  || this.results_InOutInf[i].opera_goods_id.toString().search(key) != -1  || this.results_InOutInf[i].g_others.toString().search(key) != -1   ) 	  
                          {
                              i++;
                              continue;
                          }
                          else
                          {
                            this.results_InOutInf.splice(i,1);
                            //主要原因就是 在删除一个数据的时候 length 会自动的减一 并且数据会前移，所有直接在检测本条数据就行。
                          }
                    }

              }
            this.datetimeRange.length = 0;
           
    },

    selectGoods() {
      // var name = this.userName;
      this.listLoading = true;
      this.$http.post('./api/user/selectGoods', {
          page: this.page,  
          // name: this.filters.name
      },{}).then((response) => {
        this.results_goods = response.data.data;
        // this.total = response.data.total;
        this.listLoading = false;
      })
    },

    selectInOutInf() {  //显示出入仓记录
    	this.listLoading = true;
      	this.$http.post('./api/user/selectInOutInf', {
        page: 1,
          // name: this.filters.name
      },{}).then((response) => {
        this.results_InOutInf = response.data.data;
        this.total = response.data.total;
        this.listLoading = false;
        for (var i  =  0 ; i < this.results_InOutInf.length; i++) {  // 因为从数据库传递过来的是utc时间 所以要转成本地时间
          var date = new Date(this.results_InOutInf[i].in_date);//首先将传递过来的时间进行重新的定义
          this.results_InOutInf[i].in_date = date.toLocaleDateString(); //在进行时间格式的转换
        }
      })
    },
  
    //显示出仓界面 更新数据
    handleEdit: function () {
        this.outFormVisible = true;
        this.outForm = {            //作为每一次重新点击的初始化，不然的话会出现记录上次数据的情况
          in_out_id: 0, //物料号
          intime:'',
          g_goods_id : '',
          g_sum : 0,
          g_others: '',
        };
       	this.GetRandomNum(); //获取根据时间形成的进出仓号
       	this.GetGoodsId(); //获取下拉需要的商品号
    },
    
    //显示进仓增界面更新数据
    handleAdd: function () {
        this.inFormVisible = true ;
        this.inForm = {            //作为每一次重新点击的初始化，不然的话会出现记录上次数据的情况
          in_out_id: 0, //物料号
          intime:'',
          g_goods_id : '',
          g_sum : 0,
          g_others: '',
        };
        this.GetRandomNum();
        this.GetGoodsId();
    },

    MuleditSubmit:function(){  //多物料进出管理函数。
        // console.log(this.inOrOut);
        if (this.inOrOut === '进仓') {
          console.log(this.mulForm);
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              for (var i = 0;  i < this.mulForm.length ;  i++) {
              // console.log(mulForm);
              let para = this.mulForm[i];
              console.log(para);
               para.intime = (!para.intime || para.intime == '') ? '' : util.formatDate.format(new Date(para.intime), 'yyyy-MM-dd');  //进行时间格式的处理             
              this.$http.post('./api/user/inGoods', {   //在这里用{ } 就表示已经用的是json格式进行传输
              in_out_id:        para.in_out_id,
              intime:           para.intime,
              g_goods_id:       para.g_goods_id,
              g_sum:            para.g_sum,
              g_others:         para.g_others,
              g_number_id:      this.user_ID,
            }, {}).then((response) => {
                      var {code} = response.data;
                      if (code == 500) {
                        this.$message({
                        message: '提交成功',
                        type: 'success'
                        });
                      this.selectInOutInf();
                      this.mulForm.length=0;
                      } else {
                        this.$message({
                        message: '不能有空值',
                        type: 'warning' 
                      });
                      }
                });  } });
        } else {
           this.$confirm('确认提交吗？', '提示', {}).then(() => {
              for (var i = 0;  i < this.mulForm.length ; i++) {
              let para = this.mulForm[i];
              para.intime = (!para.intime || para.intime == '') ? '' : util.formatDate.format(new Date(para.intime), 'yyyy-MM-dd');  //进行时间格式的处理
              // console.log(para.intime); 
              this.$http.post('./api/user/outGoods', {   //在这里用{ } 就表示已经用的是json格式进行传输
              in_out_id:      para.in_out_id,
              intime:         para.intime.substring(0,10),
              g_goods_id:     para.g_goods_id,
              g_sum:          para.g_sum,
              g_others:       para.g_others,
              g_number_id:    this.user_ID,
            }, {}).then((response) => {
                 var {code, msg } = response.data; 
                  if ( code== 500 ) {
                        this.$message({
                        message: '提交成功',
                        type: 'success'
                        });
                      this.selectInOutInf();
                      this.editLoading = false;
                      } 
                      else {
                        this.$message({
                        message: '提交失败',
                        type: 'warning' 
                      });
                        this.editLoading = false;
                      }
            }); 
            }
             this.mulForm.length = 0;
             });
        }
    },
    //进仓
    addSubmit: function () {
        this.$refs.inForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.inForm);
               para.intime = (!para.intime || para.intime == '') ? '' : util.formatDate.format(new Date(para.intime), 'yyyy-MM-dd');  //进行时间格式的处理             
              console.log(para.intime);
              this.$http.post('./api/user/inGoods', {   //在这里用{ } 就表示已经用的是json格式进行传输
              in_out_id:      	para.in_out_id,
              intime:     		  para.intime,
              g_goods_id:       para.g_goods_id,
              g_sum:        	  para.g_sum,
              g_others:     	  para.g_others,
              g_number_id:   	  this.user_ID,
            }, {}).then((response) => {
                      //NProgress.done();
                      // console.log(response.data);
                      var { code, msg}  = response.data;
                      if (code == 500) {
                      	this.$message({
                        message: '提交成功',
                        type: 'success'
                      	});
                      this.$refs['inForm'].resetFields();
	                    this.inFormVisible = false;
	                    this.selectInOutInf();
	                    this.addLoading = false;
                      } else {
                      	this.$message({
                        message: '不能有空值',
                        type: 'warning' 
                      });
                      	this.addLoading = false;
                      }
            });   });
          }
        });
      },

     //出仓
    editSubmit: function () {
        this.$refs.outForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.outForm);

             	console.log(para.intime.get);
               para.intime = (!para.intime || para.intime == '') ? '' : util.formatDate.format(new Date(para.intime), 'yyyy-MM-dd');  //进行时间格式的处理
            	// console.log(para.intime); 
              this.$http.post('./api/user/outGoods', {   //在这里用{ } 就表示已经用的是json格式进行传输
              in_out_id:      para.in_out_id,
              intime:     		para.intime.substring(0,10),
              g_goods_id:     para.g_goods_id,
              g_sum:        	para.g_sum,
              g_others:     	para.g_others,
              g_number_id:    this.user_ID,
            }, {}).then((response) => {
                      var {code, msg } = response.data;
                      // console.log(code);
                      if (code == 500) {
                      	this.$message({
                        message: msg,
                        type: 'success'
                      	});
                      this.$refs['outForm'].resetFields();
	                    this.outFormVisible = false;
	                    this.selectInOutInf();
	                    this.editLoading = false;
                      } else {
                      	this.$message({
                        message: msg,
                        type: 'warning' 
                      });
                      	this.editLoading = false;

                      }
            });   });
          }
        });
      },
   	
     selsChange: function (sels) {
        this.sels = sels;
    },

    GetRandomNum() {   // 形成随机数编号
        var now = new Date();
        var month = now.getMonth() + 1 ;
        this.inForm.in_out_id = now.getFullYear().toString() + month.toString() + now.getUTCDate().toString() + now.getHours().toString() + now.getUTCMinutes().toString() + now.getUTCSeconds().toString();
        this.outForm.in_out_id = this.inForm.in_out_id;
        // console.log(Math.round(new Date().getTime()/1000));
    },

    GetGoodsId(){ //获取商品号 为下拉框进行
      this.checkBoxValue_goods_id.length=0;
    	for(var i = 0 ; i < this.results_goods.length ; i ++ ){
        	// console.log(this.results_goods[i].goods_id);
        	this.checkBoxValue_goods_id.push({
          		value: this.results_goods[i].goods_id,
          		label: this.results_goods[i].goods_id  + ' ' + this.results_goods[i].g_name}) ;
        }
    },

  },


    mounted: function() {  //这个是与method 这个是同级的， 也就是在加载这个组件的时候就可以直接的执行的方法，也可以说是初始化。
        this.$nextTick(function() {
          this.selectGoods();
          this.selectInOutInf();
          var userlogin = sessionStorage.getItem('user');
          userlogin = JSON.parse(userlogin);
          this.user_ID = userlogin.u_number_id;
        })
    }
}

</script>

<style>
</style>