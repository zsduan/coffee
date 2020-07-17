<template>
  <div class="securityCenter">
    <!-- 显示nav -->
    <div>
      <van-nav-bar title="安全中心" left-text="返回" left-arrow @click-left="prev" class="nav"/>
    </div>
    <div class="white"></div>
    <!-- 显示操作列表 -->
    <div class="list">
      <van-cell v-for="(item,index) in listItem" :key="index" @click="popup(index)" :title="item.title" is-link />
    </div>

    <!-- 修改密码弹窗 -->
    <van-popup v-model="passwropShow" class="updatapass">
      <p>修改密码</p>
      <input type="password" v-model="oldpassWord" placeholder="原密码">
      <input type="password" v-model="newpassWord" placeholder="新密码(字母开头6位以上)">
      <div class="btn">
        <van-button type="info" plain @click="passwrodSbumit">提交</van-button>
        <van-button type="info" plain @click="passwrodCancel">取消</van-button>
      </div>  
    </van-popup>

    <!-- 找回密码 -->
    <van-popup v-model="findPasswordShow" class="updatapass">
      <p>找回密码</p>
      <input type="tel" v-model="findPasswordTel" placeholder="注册时手机号">
      <input type="password" v-model="findNewpassWord" placeholder="新密码(字母开头6位以上)">
      <div class="btn">
        <van-button type="info" plain @click="findPasswrodSbumit">提交</van-button>
        <van-button type="info" plain @click="findPasswrodCancel">取消</van-button>
      </div>  
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'SecurityCenter',
  data(){
    return{
      // 列表数据
      listItem:[
        {
          title:"修改密码",
          icon:"arrow",
        },
        {
          title:"找回密码",
          icon:"arrow",
        },
        {
          title:"注销账号",
          icon:"arrow",
        },
        {
          title:"退出登录",
          icon:"arrow",
        },
      ],
      // 修改密码
      passwropShow:false,
      // 原密码
      oldpassWord:"",
      // 新密码
      newpassWord:"",
      // 找回密码
      findPasswordShow:false,
      // 找回密码的手机号
      findPasswordTel:"",
      // 找回密码的新密码
      findNewpassWord:""
    }
  },
  methods:{
    // 返回上一层
    prev(){
      this.$router.go(-1)
    },
    // 判断谁是谁点击
    popup(index){
      if (index == 0) {
        this.passwropShow = true;
      }
      if (index == 1) {
        this.findPasswordShow = true;
      }

      if (index == 2) {
        this.$dialog.alert({
          title: 'tips',
          message: '该内容为灰度测试中...',
        });
      }

      if (index == 3) {
        this.exit();
      }
    },

    // 修改密码取消
    passwrodCancel(){
      this.passwropShow = false;
    },

    // 修改密码提交
    passwrodSbumit(){
      if (this.oldpassWord == "" || this.newpassWord == "") {
        Toast("请把信息填写完整！");
        return;
      }
      this.passwrod();
    },

    // 修改密码
    passwrod(){
      if (!/^[a-zA-Z]\w\d{5,15}$/.test(this.newpassWord)) {
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
        url:"/updatePassword",
        data:{
          appkey:this.appkey,
          tokenString,
          password:this.newpassWord,
          oldPassword:this.oldpassWord
        }
      }).then(result => {
        Toast.clear();
        Toast(result.data.msg);
        this.passwropShow = false;
        this.newpassWord = "";
        this.oldpassWord = "";
        // 清除token，方便后面验证
        localStorage.setItem("__Tk", "");
        this.$router.push({name:"Login"});
      }).catch(err => {
        Toast.clear();
        
      })
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
      if (!/^[a-zA-Z]\w\d{5,15}$/.test(this.findNewpassWord)) {
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
        this.findPasswordShow = false;
        this.findPasswordTel = "";
        this.findNewpassWord = "";
        Toast(result.data.msg);
        this.$router.push({name:"Login"});
        
      }).catch(err => {
        Toast.clear();
        
      })
    },

    // 退出登录
    exit(){
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
        method:"post",
        url:"/logout",
        params:{
          appkey:this.appkey,
          tokenString,
        }
      }).then(result => {
        Toast.clear();
        Toast(result.data.msg);
        // 删除token
        localStorage.setItem("__Tk", "");
        this.$router.push({name:"Login"});
      }).catch(err => {
        Toast.clear();
        
      })
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
  .securityCenter{
    width:100%;
    height: 667px;
    background: #ddd;
    .white{
      width: 100%;
      height: 46px;
    }
    .list{
      width: 97%;
      margin:10px auto; 
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
    .btn{
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