<template>
  <div class="myAccount">
    <!-- 显示nav -->
    <div>
      <van-nav-bar title="我的收藏" left-text="返回" left-arrow @click-left="prev" class="nav"/>
    </div>
    <div class="white"></div>
    <!-- 没有东西的时候显示 -->
    <div v-if="allinfo.length == 0">
      <van-empty description="我的收藏空空如也">
        <van-button color="#FE874E" round class="bottom-button" @click="goMenu">去逛逛</van-button>
      </van-empty>
    </div>
    <div class="content-wrop clearfix">
      <div class="fl content" v-for="(item,index) in allinfo">
        <div class="img">
          <img :src="item.smallImg" alt="">
        </div>
        <div class="title">
          <span class="fl">{{item.name}}</span>
          <span class="fr">
        <van-icon name="like-o" :color="islike ? '#f00' : '#000'" @click="likeAndNotlike(item.pid)"/>
      </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: 'MyAccount',
  mounted(){
    // 查询收藏商品信息
    this.getinfo();
  },
  data(){
    return{
      // 改变收藏爱心颜色
      islike:true,
      // 所有收藏商品数据
      allinfo:[],

    }
  },
  methods:{
    // 返回上一层
    prev(){
      this.$router.go(-1)
    },
    // 回到菜单
    goMenu(){
      this.$router.push({name:"Menu"});
    },
    // 查询所有商品收藏
    getinfo(){
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
          url:"/findAllLike",
          params:{
            appkey:this.appkey,
            tokenString,
          }
        }).then(result => {
          Toast.clear();
          if (result.data.code == 2000) {
            this.allinfo = result.data.result;
          }
          
        }).catch(err => {
          
        })
    },

    // 取消收藏
    likeAndNotlike(pid){
      // 获取本地数据
      let tokenString = localStorage.getItem("__Tk");

      //开启加载提示
      Toast.loading({
          message: "加载中...",
          forbidClick: true,
          //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
          duration: 0
      });

      // 开始请求数据
      this.axios({
        method:"POST",
        url:"/notlike",
        data:{
          appkey:this.appkey,
          pid,
          tokenString
        }

      }).then(result => {
        Toast.clear();
        if (result.data.code == 800 || result.data.code == 900) {
          Toast(result.data.msg);
          this.getinfo();
        }else {
          Toast("您的登录可能失效了");
          this.$router.push({name:"Login"});
        }
      }).catch(err => {
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
  .myAccount{
    width:100%;
    height: 667px;
    background: #ddd;
    .white{
      width: 100%;
      height: 46px;
    }

    .bottom-button {
      width: 160px;
      height: 40px;
    }
    // 提交按钮
    .van-button{
      background: #FE874D;
    }
    .content-wrop{
      width: 100%;
      .content{
        width: 44%;
        margin: 11px;
        height: 180px;
        background: #fff;
        .img{
          width: 100%;
          height: 75%;
          img{
            width: 100%;
            height: 100%;
          }
        }

        .title{
          width: 100%;
          height: 20%;
          margin-top:5px;
          font-size: 20px;
          line-height: 36px;
          background: #fff;
        }
      }
    }
  }
</style>