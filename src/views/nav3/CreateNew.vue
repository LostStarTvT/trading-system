<template>
    <div style="width:600px;margin-top:20px;margin-left:20px">
        <el-form ref="form" :model="form"    :rules="rules"  label-width="100px">
            <el-form-item label="产品名称" prop="good_name">
              <el-input v-model="form.good_name" style="width:435px" ></el-input>
            </el-form-item>
            <el-form-item label="起购金额"  prop="good_money_begin" >
              <el-input style="width:160px" v-model="form.good_money_begin"></el-input>元    
            </el-form-item>

            <el-form-item label="递增金额" prop="good_inc_money" >
              <el-input style="width:160px" v-model="form.good_inc_money"></el-input>元      
            </el-form-item>
            <el-form-item label="收益率"  prop="good_income_rate">
              <el-input style="width:160px" v-model="form.good_income_rate"></el-input>%      
            </el-form-item>

            <el-form-item label="总额度" prop="goodSum" >
              <el-input style="width:160px" v-model="form.goodSum"></el-input>元      
            </el-form-item>
            <el-form-item label="产品认购期" >
              <el-col :span="11" prop="good_inc_money" >
                 <el-form-item prop="good_date_begin">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.good_date_begin" style="width: 100%;"></el-date-picker>
                  </el-form-item>
              </el-col>
              <el-col class="line" :span="1">----</el-col>
              <el-col :span="11" >
                  <el-form-item prop="good_date_end">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.good_date_end" style="width: 100%;"></el-date-picker>
                  </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="产品到期日" prop="good_date_income" >
              <el-col :span="11">
                <el-date-picker  @change="calculateDay" type="date" placeholder=" 选择日期" v-model="form.good_date_income" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item label="产品期限" prop="good_date_belong" >
              <!-- <el-input style="width:226px" v-model="form.good_date_belong"></el-input>天    -->
              <span>{{form.good_date_belong}} </span>天   
              <!-- <el-input style="width:226px" v-model="form.good_date_belong"></el-input>天       -->
            </el-form-item>
            
            <el-form-item label="产品介绍" prop="good_others" >
              <el-input type="textarea" v-model="form.good_others" style="width:435px" ></el-input>
            </el-form-item>

            <el-form-item label="产品发行人情况介绍" prop="goodBelongPerInfo" >
              <el-input type="textarea" v-model="form.goodBelongPerInfo" style="width:435px" ></el-input>
            </el-form-item>
            <el-form-item >
              <el-button  style="margin-left:80px" type="success" @click="onSubmit('form')" >完成</el-button>
            </el-form-item>
          </el-form>
    </div>
</template>

<script>
export default {
     data() {
      return {
        form: {
          good_name: '',
          good_money_begin: '',
          good_inc_money: '',
          good_income_rate: '',
          good_date_begin: '',
          good_date_end: '',
          good_date_income: '',
          good_date_belong: 0,
          good_others:'',
          goodSum:'',
          goodBelongPerInfo:'',//产品发行人情况介绍
        },
        user:'',
        active:1,
        rules: {
          good_name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          good_money_begin: [
            { required: true, message: '请输入起购金额', trigger: 'change' }
          ],
          good_inc_money: [
            { required: true, message: '请输入递增金额', trigger: 'change' }
          ],
          good_income_rate: [
            { required: true, message: '请输入收益率', trigger: 'change' }
          ],
          good_date_begin: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          good_date_end: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          good_date_income: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
           goodSum: [
            { required: true, message: '请输入总额度', trigger: 'change' }
          ],
           good_others: [
            { required: true, message: '请输入产品介绍', trigger: 'change' }
          ],
          goodBelongPerInfo: [
            { required: true, message: '请输入产品发行人情况介绍', trigger: 'blur' }
          ]
        },
      }
    },
    methods: {
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.form.userID = this.user.userID;
            this.form.good_belonged_bank = this.user.server_bank;
            console.log(this.form);
            this.form.good_date_begin = new Date(this.form.good_date_begin).toLocaleDateString();
            this.form.good_date_end = new Date(this.form.good_date_end).toLocaleDateString();
            this.form.good_date_income =new Date(this.form.good_date_income).toLocaleDateString();
            // console.log(this.form.good_income_rate/100);
            this.form.good_income_rate =(this.form.good_income_rate/100);//转成小数
            // console.log(this.form.good_income_rate);
            var para = { info:this.form };
        this.$http.post('./api/user/insertGoods', {   //在这里用{ } 就表示已经用的是json格式进行传输
        para:       para,
        }, {}).then((response) => {     
        this.$message({
            message: '提交成功',
            type: 'success'
            });
            this.$router.push({ path: '/GoodUploading' }) //提交表单去结算页面
     }); 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      calculateDay(){//计算日期
          if (this.form.good_date_end == '') {
              this.$message.error('错误！请填写募集期结束日期！');
              this.form.good_date_income = '';
              this.form.good_date_belong = 0;
          }else{
            var begin = new Date(this.form.good_date_end).getTime();
            var end = new Date(this.form.good_date_income).getTime();
            if (end < begin) {
                this.$message.error('错误！到期日不能小于募集期结束日期！');
                this.form.good_date_income = '';
                this.form.good_date_belong = 0;
            }else{
                var date = end - begin ;
                var days=Math.floor(date/(24*3600*1000)) ;
                this.form.good_date_belong = days;
                console.log(days);
            }    
          }
         
          
      },
    },
    mounted: function() {  //这个是与method 这个是同级的， 也就是在加载这个组件的时候就可以直接的执行的方法，也可以说是初始化。
        this.$nextTick(function() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.userID = user.userID;
				this.user = user;
				console.log(this.user);    
            }
        })
    }
  }
</script>

<style>

</style>
