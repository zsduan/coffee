<template>
  <div class="my">
  	<!-- 显示nav -->
    <div>
      <van-nav-bar title="我的" class="nav" @click-left="goMenu" right-text="设置" @click-right="gopage('SecurityCenter')">
      	<template #left>
		      <van-icon name="home-o" size="24" />
		    </template>
      </van-nav-bar>
    </div>
    <div class="white"></div>
    <!-- 显示头部 -->
    <div class="topwrop" v-for="(item,index) in userDate">
      <div class="back clearfix">
        <img :src="item.userBg" alt="">
        <div class="changeback">
          <van-uploader :after-read="updatebg">
            <span>更换背景</span>
          </van-uploader>          
        </div>
        <div class="usericon">
          <van-uploader :after-read="updateuserImg">
            <span class="updata">上传</span>
            <img :src="item.userImg" alt="">
          </van-uploader> 
        </div>
        <div class="content">
          <p class="top">
            <span>{{item.nickName}}</span>
            <span class="edit" @click="inputname(0)"><van-icon name="edit" /></span>
          </p>
          <p class="bottom" v-if="item.desc == ''">
            <span>这个人很懒~~啥都没有写</span>
            <span class="edit" @click="inputname(1)"><van-icon name="edit" /></span>
          </p>
          <p class="bottom" v-if="item.desc">
            <span>{{item.desc}}</span>
            <span class="edit" @click="inputname(1)"><van-icon name="edit" /></span>
          </p>
        </div>
      </div>
    </div>
    <!-- 显示操作列表 -->
    <div class="list">
      <van-cell v-for="(item,index) in listItem" :key="index" @click="gopage(item.path)" :title="item.title" is-link />
    </div>

    <!-- 弹出填写姓名、昵称 -->
    <van-popup v-model="show" class="inputname">
      <p>{{title}}</p>
      <input type="text" v-model="value" :placeholder="title">
      <div class="btn">
        <van-button type="info" plain @click="sbumit">提交</van-button>
        <van-button type="info" plain @click="cancel">取消</van-button>
      </div>
      
    </van-popup>
  </div>
</template>

<script>

import { Toast } from 'vant';

export default {
  name: 'My',
  mounted(){
    // 获取个人信息
    this.getUserData();
  },
  data(){
    return{
      // 列表数据
      listItem:[
        {
          title:"账户信息",
          icon:"arrow",
          path:"MyAccount",
        },
        {
          title:"地址管理",
          icon:"arrow",
          path:"MyAddress",
        },
        {
          title:"我的收藏",
          icon:"arrow",
          path:"MyCollection",
        },
        {
          title:"安全中心",
          icon:"arrow",
          path:"SecurityCenter"
        },
      ],
      // 我的数据
      userDate:[],
      // 展示弹出谈些姓名个性签名
      show:false,
      // 判断弹框数据
      falge:0,
      // 弹窗文字
      title:"请输入昵称",
      // 获取输入框文字
      value:""
    }
  },
  methods:{
  	// 回到菜单
  	goMenu(){
  		this.$router.push({name:"Menu"});
  	},
    // 请求数据
    getUserData(){
      // 获取本地数据
      let tokenString = localStorage.getItem("__Tk");

      //开启加载提示
      Toast.loading({
          message: "加载中...",
          forbidClick: true,
          //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
          duration: 0
      });

      this.axios({
        method:"get",
        url:"/findMy",
        params:{
          appkey:this.appkey,
          tokenString,
        }
      }).then(result => {
        Toast.clear();
        this.userDate = result.data.result;
        if (result.data.code == 700) {
          this.$router.push({name:"Login"});
        }
      }).catch(err => {
        Toast.clear();
        
      })
    },
    // 输入修改姓名/签名
    inputname(val){
      if (val) {
        this.title = "请输入签名";
        this.show = true;
        this.falge = 1;
        return;
      }
      this.falge = 0;
      this.title = "请输入昵称";
      this.show = true;
    },

    // 取消
    cancel(){
      this.show = false;
    },

    // 提交
    sbumit(){
      if (this.falge) {
        this.changedesc();
        return;
      }
      this.changeUsername();
    },

    // 修改昵称
    changeUsername(){
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
        url:"/updateNickName",
        data:{
          appkey:this.appkey,
          tokenString,
          nickName:this.value,
        }
      }).then(result =>{
        Toast.clear();
        Toast(result.data.msg);
        this.getUserData();
      }).catch(err =>{
        Toast.clear();
        
      })
    },

    // 更改签名
    changedesc(){
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
        url:"/updateDesc",
        data:{
          appkey:this.appkey,
          tokenString,
          desc:this.value,
        }
      }).then(result =>{
        Toast.clear();
        Toast(result.data.msg);
        this.getUserData();
      }).catch(err =>{
        Toast.clear();
        
      })
    },

    // 上传图片
    updatebg(file) {
      // 此时可以自行将文件上传至服务器
      let type = file.file.type.substr(6,4);
      let base = file.content;
      base = base.replace(/^data:image\/[A-Za-z]+;base64,/,"");
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
        url:"/updateUserBg",
        data:{
          appkey:this.appkey,
          tokenString,
          imgType:type,
          serverBase64Img:base
        }
      }).then(result =>{
        Toast.clear();
        Toast(result.data.msg);
        this.getUserData();
      }).catch(err =>{
        Toast.clear();
        
      })
    },

    // 修改头像
    updateuserImg(file){
      // 此时可以自行将文件上传至服务器
      let type = file.file.type.substr(6,3);

      let base = file.content;
      base = base.replace(/^data:image\/[A-Za-z]+;base64,/,"");

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
        url:"/updateAvatar",
        data:{
          appkey:this.appkey,
          tokenString,
          imgType:type,
          serverBase64Img:base
        }
      }).then(result =>{
        Toast.clear();
        Toast(result.data.msg);
        this.getUserData();
      }).catch(err =>{
        Toast.clear();
        
      })
    },
    // 去相应地址
    gopage(path){
      this.$router.push({name:path});
    }
  }
}
</script>

<style lang="less" scoped>
  .nav{
    width: 100%;
    position: fixed;
    top:0px;
  }
  .my{
    width: 100%;
    background: #ddd;
    height: 617px;
    .white{
      width: 100%;
      height: 50px;
    }
    .topwrop{
      width: 100%;
      color:white;
      .back{
        height: 200px;
        position: relative;
        margin:0 5px 0 5px;
        img{
          width: 100%;
          height: 100%;
        }
        .usericon{
          width: 80px;
          height: 80px;
          background: #fff;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left:7%;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 60%;
          }
        }
        .content{
          width: 60%;
          height: 100px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left:33%;
          .top{
            padding: 10px 0 0 10px;
            font-size: 20px;
            .edit{
              padding-left: 10px;
            }
          }
          .bottom{
            position: absolute;
            bottom:0;
            padding-left: 10px
          }
        }
        .changeback{
          position: absolute;
          top: 5%;
          right:5%;
        }
      }
    }
    .list{
      width: 97%;
      margin:10px auto; 
    }
  }

  .inputname{
    width: 70%;
    height: 150px;
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
    .btn{
      width: 54%;
      margin: 0 auto;
      button{
        margin-right: 10px;
      }
    }
  }
</style>