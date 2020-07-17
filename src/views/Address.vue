<template>
  <div class="address">
    <!-- 显示nav -->
    <div>
      <van-nav-bar :title="title" left-text="返回"  class="nav" left-arrow @click-left="goback">
      </van-nav-bar>
    </div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :address-info="addressList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>

import areaList from "../assets/city.js"

import { Toast } from 'vant';
// 提示框
import { Dialog } from 'vant';

export default {
  name: 'Address',
  mounted(){
    this.get();
  },
  data() {
    return {
      // 地址数据
      areaList:{},
      // 地址信息
      addressList:{
        // 姓名
        name:"",
        // 电话
        tel:"",
        // 省份
        province:"",
        // 城市
        city:"",
        // 区县
        county:"",
        // 详细地址
        addressDetail:"",
        // 地区编码
        areaCode:"",
        // 邮政编码
        postalCode:"",
        // 默认地址
        isDefault:""
      },
      // 标题名称
      title:"新增地址",
      // 获取地址id
      aid:""
    }
  },
  methods:{
    get(){
      // 获取本地数据
      let tokenString = localStorage.getItem("__Tk");
      //判断是否登录
      if (tokenString == undefined) {
        this.$router.push({name:"Login"});
      }

      this.areaList = areaList;
      let queryParams = this.$route.query;
      this.aid = queryParams.aid;
      if (this.aid) {
        this.title = "编辑地址";

        //开启加载提示
        Toast.loading({
            message: "加载中...",
            forbidClick: true,
            //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
            duration: 0
        });
        // 开始查询地址
        this.axios({
          method:"get",
          url:"/findAddressByAid",
          params:{
            appkey:this.appkey,
            tokenString,
            aid:this.aid
          }
        }).then(result =>{
          Toast.clear();
          if (result.data.code == 40000) {
            for (let key in this.addressList) {
              this.addressList[key] = result.data.result[0][key];
            }
            this.addressList.isDefault = Boolean(this.addressList.isDefault);
          }
        }).catch(err => {
          Toast.clear();
          
        })
      }
    },
    // 回到上一页
    goback(){
      this.$router.go(-1);
    },
    // 保存地址
  	onSave(content) {
      // 获取本地数据
      let tokenString = localStorage.getItem("__Tk");
      //开启加载提示
      Toast.loading({
          message: "加载中...",
          forbidClick: true,
          //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
          duration: 0
      });

      // 修改地址
      if (this.aid) {
        // 定义变量看是否是修改了地址
        let falge = 0;
        for (let key in this.addressList) {
          if (this.addressList[key] != content[key]) {
            falge = 1;
          }
        }
        if (falge) {
          let data = {
            name: "",
            tel: "",
            province: "",
            city: "",
            county: "",
            addressDetail: "",
            areaCode: "",
            postalCode: "",
            isDefault: ""
          }

          // 拷贝地址
          for (let key in data) {
            data[key] = content[key];
          }

          data.appkey = this.appkey;
          data.tokenString = tokenString;
          data.isDefault = Number(data.isDefault);
          data.aid = this.aid;

          // 开始请求数据
          this.axios({
            method:"POST",
            url:"/editAddress",
            data,
          }).then(result => {
            Toast.clear();
            if (result.data.code == 30000) {
              Toast.clear();
              Toast(result.data.msg);
              this.$router.push({name:"PlaceOrder"})
            }
            
          }).catch(err => {
            Toast.clear();
            
          })
        }
        return;
      }

      this.addressList = content;
      // 数据获取
      let data = {
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: "",
        areaCode: "",
        postalCode: "",
        isDefault: ""
      };

      // 拷贝对象
      for (let key in data) {
        data[key] = content[key];
      }

      data.appkey = this.appkey;
      data.tokenString = tokenString;
      data.isDefault = Number(data.isDefault);

      // 开始请求数据
      this.axios({
        method:"POST",
        url:"/addAddress",
        data,
      }).then(result => {
        Toast.clear();
        if (result.data.code == 9000) {
          Toast(result.data.msg);
          this.$router.push({name:"PlaceOrder"})
        }
      }).catch(err => {
        Toast.clear();
        
      })
    },
    // 删除地址
    onDelete() {
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
        method:"POST",
        url:"/deleteAddress",
        data:{
          appkey:this.appkey,
          tokenString,
          aid:this.aid
        }
      }).then(result =>{
        Toast.clear();
        if (result.data.code == 10000) {
          this.$router.push({name:"PlaceOrder"})
        }else {
          Toast(result.data.msg);
        }
      }).catch(err =>{
        Toast.clear();
        
      })
    },
    
  }
}
</script>

<style lang="less" scoped>
  /deep/ .van-button--danger{
    background:#FE864D; 
    border:#FE864D;
  }
</style>