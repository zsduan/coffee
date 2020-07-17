<template>
  	<div class="login">
  		<van-nav-bar title="登录" left-text="返回" left-arrow right-text="注册" @click-left="prev" @click-right="goPage('Register')"/>
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
      <div class="forget">
        <span @click="showPop">忘记密码？</span>
      </div>
		  <div style="margin: 16px;">
			   <van-button round block type="info" native-type="submit" class="btn" @click="sbumit">
			      登录
			   </van-button>
		  </div>
	   </van-form>

     <!-- 找回密码 -->
    <van-popup v-model="findPasswordShow" class="updatapass">
      <p>找回密码</p>
      <input type="tel" v-model="findPasswordTel" placeholder="注册时手机号">
      <input type="password" v-model="findNewpassWord" placeholder="新密码(字母开头6位以上)">
      <div class="btns">
        <van-button type="info" plain @click="findPasswrodSbumit">提交</van-button>
        <van-button type="info" plain @click="findPasswrodCancel">取消</van-button>
      </div>  
    </van-popup>
  	</div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'Login',
  data() {
    return {
      phone: '',
      password: '',
      nickName:'',
      pattern:/^1[3|4|5|7|8][0-9]{9}$/,
      isEye:false,
      // 找回密码
      findPasswordShow:false,
      // 找回密码的手机号
      findPasswordTel:"",
      // 找回密码的新密码
      findNewpassWord:""
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
  		if (this.validator() && this.phone != "" && reg.test(this.phone)) {

  			// 开启加载提示
  			Toast.loading({
  				message:"登录中...",
  				// 不能点击其他
  				forbidClick:true,
  				// 如果只是0就一直显示
  				duration:0
  			})
  			this.axios({
  				method:"POST",
  				url:"/login",
  				data:{
  					appkey:this.appkey,
				    password: this.password,
				    phone: this.phone
  				}
  			}).then(result => {
  				Toast.clear();
  				Toast(result.data.msg);
  				// 存储token，方便后面验证
  				localStorage.setItem("__Tk", result.data.token);
          this.$router.go(-1);
  			}).catch(err => {
  				// 关闭注册提示
  				Toast.clear();
  				
  			})
  			return
  		}
  		Toast("请检查后再次提交");
  	},
  	// 验证密码
  	validator(){
  		return /^[a-zA-Z]\w\d{5,15}$/.test(this.password);
  	},
  	// 查看密码
  	showpwd(){
  		this.isEye = !this.isEye;
  	},

    // 弹出找回密码框
    showPop(){
      this.findPasswordShow = true;
    },

    // 找回密码取消
    findPasswrodCancel(){
      this.findPasswordShow = false;
    },

    // 找回密码提交
    findPasswrodSbumit(){
      if (this.findPasswordTel == "" || this.findNewpassWord == "") {
        Toast("请把信息填写完整！");
        return;
      }
      this.findpasswrod();
    },

    // 找回密码
    findpasswrod(){
      if (!/^[a-zA-Z]\w\d{5,15}$/.test(this.findNewpassWord) || /^1[3|4|5|7|8][0-9]{9}$/.test(this.findPasswordTel)) {
        Toast("请输入正确的格式");
        return;
      }
      // 获取本地数据
      let tokenString = localStorage.getItem("__Tk");

      if (tokenString == undefined) {
        this.$router.push({name:"Login"});
      }
      //开启加载提示
      Toast.loading({
          message: "加载中...",
          forbidClick: true,
          //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
          duration: 0
      });

      this.axios({
        method:"post",
        url:"/retrievePassword",
        data:{
          appkey:this.appkey,
          phone:this.findPasswordTel,
          password:this.findNewpassWord
        }
      }).then(result => {
        Toast.clear();
        this.findPasswordTel = "";
        this.findNewpassWord = "";
        Toast(result.data.msg);
        
      }).catch(err => {
        Toast.clear();
        
      })
    },
  }
}
</script>

<style lang="less" scoped>
	.login{
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

    .forget{
      float: right;
      padding:10px 0; 
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

      .updatapass{
    width: 80%;
    border-radius: 10px;
    font-size:16px;
    p{
      padding:10px; 
    } 
    input{
      margin: 20px 0 10px 20px;
      width: 80%;
      height: 30px;
      border:0;
      border-bottom: 2px solid #ccc; 
    }
    .btns{
      width: 48%;
      margin: 0 auto;
      button{
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
	}
</style>