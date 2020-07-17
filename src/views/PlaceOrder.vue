<template>
  <div class="placeOrder">
    <!-- 显示nav -->
    <div>
      <van-nav-bar title="确认支付" left-text="返回"  class="nav" left-arrow @click-left="goback">
      </van-nav-bar>
    </div>
    <div class="whit"></div>
    <div class="address">
      <span @click="changeAddress">请选择收货地址</span>
      <!-- 显示地址 -->
      <div class="addressitem">
        <p class="title">当前地址：</p>
        <p>姓名：{{current.name}}</p>
        <p>电话：{{current.tel}}</p>
        <p>地址：{{current.address}}</p>
      </div>
    </div>

    <!-- 提交订单 -->
    <van-submit-bar :price="this.numprice[1]*100" button-text="立即支付" @submit="sbumitOrder">
    </van-submit-bar>

    <!-- 显示商品 -->
    <div class="showgoods">
      <van-card
        v-for="(item,index) in commodityData"
        :num="item.count"
        :price="item.price"
        :desc="item.rule"
        :title="item.name"
        :thumb="item.small_img"
      />
    </div>

    <!-- 显示总价 -->
    <div class="total clearfix">
      <p class="fr">
        <span>共计<span class="num">{{numprice[0]}}</span>件商品，共计</span>
        <span class="price">￥{{numprice[1]}}</span>
      </p>
    </div>

        <!-- 提交地址 -->
    <van-action-sheet v-model="show" title="请选择地址">
      <div class="content-show">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="switchAddress"
        />
      </div>
    </van-action-sheet>
    
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: 'PlaceOrder',
  mounted(){
    // 获得上一个界面的值和获取商品数据
    this.getSidsAndGoods();
    // 获取地址数据
    this.selectAddress();
  },
  data(){
  	return{
      // 展示选择地址
      show:false,
      // 地址列表车
      chosenAddressId: '1',
      list: [],

      // 商品数据
      commodityData:[],
      // 保存商品价格和数量
      numprice:[],
      // 当前地址信息
      current:{},
  	}
  },
  methods:{
  	// 回到上一页
    goback(){
      this.$router.go(-1);
    },
    // 新增地址
    onAdd() {
      this.$router.push({name:"Address"});
    },
    // 编辑地址
    onEdit(item, index) {
      this.$router.push({name:"Address",query:{aid:item.aid}});
    },
    // 选择地址
    changeAddress(){
      this.show = true;
    },
    // 获取上一个界面的数据和处理商品数据
    getSidsAndGoods(){
      // 获取本地数据
      let tokenString = localStorage.getItem("__Tk");
      //判断是否登录
      if (tokenString == undefined) {
        this.$router.push({name:"Login"});
      }
      // 获取订单号
      let putsids = localStorage.getItem("putsids");
      
      //开启加载提示
      Toast.loading({
          message: "加载中...",
          forbidClick: true,
          //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
          duration: 0
      });

      // 进行商品数据的获取
      this.axios({
        method:"get",
        url:"/commitShopcart",
        params:{
          appkey:this.appkey,
          tokenString,
          sids:putsids
        }
      }).then(result =>{
        Toast.clear();
        this.commodityData = result.data.result;
        // 计算商品的总价格
        this.sumtotal();
      }).catch(err =>{
        Toast.clear();
        
      })
    },
    // 计算商品价格
    sumtotal(){
      let sum = 0;
      let price = 0;

      for (var i = 0; i < this.commodityData.length; i++) {
        sum += this.commodityData[i].count;

        price += this.commodityData[i].count * this.commodityData[i].price;
      }

      this.numprice.push(sum);
      this.numprice.push(price);
    },

    // 查询地址数据
    selectAddress(){
      // 获取本地数据
      let tokenString = localStorage.getItem("__Tk");

      //开启加载提示
      Toast.loading({
          message: "加载中...",
          forbidClick: true,
          //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
          duration: 0
      });

      // 开始请求
      this.axios({
        method:"get",
        url:"/findAddress",
        params:{
          appkey:this.appkey,
          tokenString
        }
      }).then(result =>{
        Toast.clear();
        if (result.data.code == 20000) {
          result.data.result.forEach(v => {
            let currentAddress = {
              id:v.id,
              tel:v.tel,
              name:v.name,
              address:v.province + v.county + v.city + v.addressDetail,
              isDefault:Boolean(v.isDefault),
              aid:v.aid
            }
            this.list.push(currentAddress);
          })
          // 判断是否是默认值
          let index = 0; 
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].isDefault) {
              index = i;
            }
          }
          this.chosenAddressId = this.list[index].id;
          this.current = this.list[index];
        }
      }).catch(err =>{
        Toast.clear();
        
      })

    },
    // 切换地址
    switchAddress(item,index){
      this.current = item;
      this.show = false;
    },
    // 提交地址
    sbumitOrder(){
      // 获取本地数据
      let tokenString = localStorage.getItem("__Tk");
      // 获取订单号
      let putsids = localStorage.getItem("putsids");

      //开启加载提示
      Toast.loading({
          message: "加载中...",
          forbidClick: true,
          //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
          duration: 0
      });

      this.axios({
        method:"POST",
        url:"/pay",
        data:{
          appkey:this.appkey,
          tokenString,
          sids:putsids,
          phone:this.current.tel,
          address:this.current.address,
          receiver:this.current.name
        }
      }).then(result => {
        Toast.clear();
        if (result.data.code == 60000) {
          Toast(result.data.msg);
          this.$router.push({name:"Order"})
        }
      }).catch(err => {
        Toast.clear();
        
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .placeOrder{
    width: 100%;
    height: 667px;
    background: #ddd;
    .whit{
      width: 100%;
      height: 50px;
    }
    .address{
      margin-top: 10px;
      margin-bottom:10px;
      padding:10px 0 10px 10px; 
      background: #fff; 
      font-size: 18px;
      span{
        display: inline-block;
        width: 100%;
        padding-bottom:10px; 
      }

      .addressitem{
        font-size: 14px;
        border-top: 1px solid #000;
        .title{
          padding-left: 0px;
          padding-bottom: 10px;
          font-size: 16px;
        }
        p{
          padding-left: 15px;
        }
      }
    }

    .showgoods{
      width: 100%;
      border-radius: 10px;
    }

    .total{
      width: 100%;
      margin-top: 5px;
      background: #fff;
      color: #666;
      margin-bottom: 50px;
      .num{
        font-size: 16px;
      }
      .price{
        font-size: 20px;
        font-weight: 100;
        padding-right: 15px;
        color: #000;
      }
    }
  }
  .nav{
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 2;
  }
  // 提交按钮
  .van-button{
    background: #FE874D;
  }
</style>