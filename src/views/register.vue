<template>
  	<div class="register">
  		<van-nav-bar title="注册" left-text="返回" left-arrow right-text="登录" @click-left="prev" @click-right="goPage('Login')"/>
  		<div class="logo">
		    <img src="../assets/img/logo.png" alt="">
		</div>
		<van-form validate-first class="form">
		    <!-- 输入手机号，调起手机号键盘 -->
			<van-field 
			v-model="phone" 
			type="tel" 
			label="手机号" 
			placeholder="请输入手机号" 
			:rules="[{ pattern, message: '请输入正确手机号' }]"
			left-icon="phone-o"
			>
			</van-field>
			<!-- 输入用户名，调起手机号键盘 -->
			<van-field 
			v-model="nickName" 
			type="text" 
			label="用户名" 
			placeholder="请输入用户名" 
			left-icon="user-o"
			:rules="[{ validator: asyncValidator, message: '用户名为中文或下划线' }]"
			>
			</van-field>
		    <!-- 输入密码 -->
			<van-field 
			v-model="password" 
			:type="isEye ? 'text' : 'password'" 
			label="密码" 
			placeholder="请输入密码" 
			:rules="[{ validator, message: '密码用字母开头6-15位' }]"
			left-icon="lock"
			:right-icon="isEye ? 'eye-o' : 'closed-eye'"
			@click-right-icon="showpwd"
			>
			</van-field>
		  	<div style="margin: 16px;">
			    <van-button round block type="info" native-type="submit" class="btn" @click="sbumit">
			      注册
			    </van-button>
		  	</div>
	</van-form>
  	</div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      password: '',
      nickName:'',
      pattern:/^1[3|4|5|7|8][0-9]{9}$/,
      isEye:false
    };
  },

  methods:{
  	// 返回上一层
  	prev(){
  		this.$router.go(-1)
  	},
  	//跳转指定页面
  	goPage(path){
  		this.$router.push({name:path});
  	},
  	// 提交查看
  	sbumit(){
  		let reg = /^1[3|4|5|7|8][0-9]{9}$/;
  		if (this.asyncValidator() && this.validator() && this.phone != "" && reg.test(this.phone)) {

  			// 开启加载提示
  			Toast.loading({
  				message:"注册中...",
  				// 不能点击其他
  				forbidClick:true,
  				// 如果只是0就一直显示
  				duration:0
  			})
  			this.axios({
  				method:"POST",
  				url:"/register",
  				data:{
  					appkey:this.appkey,
  					nickName: this.nickName,
				    password: this.password,
				    phone: this.phone
  				}
  			}).then(result => {
  				// 关闭注册提示
  				Toast.clear();
  				Toast(result.data.msg);
  				if (result.data.code == 100) {
  					rhis.$router.push({name:"Login"})
  				}
  			}).catch(err => {
  				// 关闭注册提示
  				Toast.clear();
  				
  			})
  			return
  		}
  		Toast("请检查后再次提交");
  	},
  	// 验证用户名
  	asyncValidator(){
  		return /^[\u4e00-\u9fa5\w]{1,10}$/.test(this.nickName);
  	},
  	// 验证密码
  	validator(){
  		return /^[a-zA-Z]\w\d{5,15}$/.test(this.password);
  	},
  	// 查看密码
  	showpwd(){
  		this.isEye = !this.isEye;
  	}
  }
}
</script>

<style lang="less" scoped>
	.register{
		position: fixed;
		top:0;
		right: 0;
		bottom: 0;
		left: 0;
		background: url("../assets/img/registerback.png") no-repeat;
		background-size: 100%;

		.logo{
			width: 100px;
			height: 100px;
			background: #fff;
			border-radius: 50%;
			margin: 60px auto;
			overflow: hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}

		.btn{
			background: #FE8247;
			outline: none;
			border: #FE8247;
		}
		.form{
			margin:0 20px;
			margin-top:135px;
		}
	}
</style>