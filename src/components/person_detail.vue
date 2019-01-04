<template>
   <div id="personDisplay">

    <el-row :gutter="20" style="width:1200px">
        <el-col :span="4">
            <!-- 导航栏 -->
            <div class="grid-content bg-purple" style="height: 462px;">
                        <el-menu mode="vertical" default-active="/OrderPage" class="el-menu-vertical-demo" router >
                    <el-menu-item-group title="信息">
                        <el-menu-item index="/OrderPage"><i class="el-icon-message"></i>我的订单</el-menu-item>
                        <el-menu-item index="/Personinfo"><i class="el-icon-message"></i>个人信息</el-menu-item>
                        <el-menu-item index="/Resellpage"><i class="el-icon-message"></i>我的抛售</el-menu-item>
                        <!-- <el-menu-item index="3"><i class="el-icon-message"></i>信息统计</el-menu-item> -->
                    </el-menu-item-group>
                    </el-menu>       
            </div>
        </el-col>
        <el-col :span="20">
            <div class="grid-content bg-purple"  >
            <!-- 根据导航选择输出 -->
            <transition name="fade" mode="out-in">
					<router-view></router-view>
			</transition>
            </div>
        </el-col>
    </el-row>

   </div>
</template>
<script>
export default {
    data() {
      return {
      }
    },
    methods:{
    },
     mounted() {
		}
  }
</script>

<style>

    #personDisplay{
        overflow: hidden;
        position: relative;
        height: 100%;
    }
        
</style>


