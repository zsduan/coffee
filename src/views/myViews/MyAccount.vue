<template>
  <div class="myAddress">
    <!-- 显示nav -->
    <div>
      <van-nav-bar title="账户信息" left-text="返回" left-arrow @click-left="prev" class="nav"/>
    </div>
    <div class="white"></div>
    <div class="content" v-for="(item,index) in userInfo">
      <p class="img">
        <img :src="item.userImg" alt="">
      </p>

      <van-cell title="用户名" :value="item.nickName" />
      <van-cell title="用户id" :value="item.userId" />
      <van-cell title="电话号码" :value="item.phone" />
      <van-cell title="个性签名" :value="item.desc" />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'MyAddress',
  mounted(){
    this.AccountInfo();
  },
  data(){
  	return{
      // 用户信息
      userInfo:{}
  	}
  },
  methods:{
  	// 返回上一层
    prev(){
      this.$router.go(-1)
    },
    // 账户信息
    AccountInfo(){
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
        method:"get",
        url:"/findAccountInfo",
        params:{
          appkey:this.appkey,
          tokenString,
        }
      }).then(result =>{
        Toast.clear();
        Toast(result.data.msg);
        this.userInfo = result.data.result;
        
      }).catch(err =>{
        Toast.clear();
        
      })
    },
  }
}
</script>

<style lang="less" scoped>
  .nav{
    width: 100%;
    position: fixed;
    top:0px;
  }
  .myAddress{
    width:100%;
    height: 667px;
    background: #ddd;
  }
  .white{
    width: 100%;
    height: 46px;
  }
  .content{
    width: 100%;
    .img{
      margin: 10px auto;
      width: 80px;
      height: 80px;
      background: #fff;
      border-radius: 50%;
      overflow:hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>