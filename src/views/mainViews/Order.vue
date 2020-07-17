<template>
  <div class="order">
  	<!-- 显示nav -->
    <div>
      <van-nav-bar title="订单" class="nav" @click-left="goMenu">
      	<template #left>
		      <van-icon name="home-o" size="24" />
		    </template>
      </van-nav-bar>
    </div>
    <div class="white"></div>
    <!-- 订单导航 -->
    <div class="orderNav">
      <van-tabs v-model="active" animated color="#FE874E" @click="changeTibs">
        <!-- 全部 -->
        <van-tab title="全部">
          <div v-if="typeof(all) == 'string'">
            <van-empty description="这里还没有数据哟~">
              <van-button color="#FE874E" round class="bottom-button" @click="goMenu">去逛逛</van-button>
            </van-empty>
          </div>

          <!-- 显示数据 -->
          <div class="content" v-for="(v,i) in oids" :key="i">
            <div class="title clearfix">
              <span class="fl left">{{v}}</span>
              <span v-if="all[v].status == 1" class="fr right" @click="confirmOrder(v)">确认收货</span>
              <span v-if="all[v].status == 2" class="fr right" @click="delData(v)"><van-icon name="delete" /></span>
              <span v-if="all[v].status == 2" class="fr right">已收货</span>
            </div>
            <div v-for="(item,index) in all[v].data" :key="index">
              <van-card
                :num="item.count"
                :price="item.price"
                :desc="item.rule"
                :title="item.name"
                :thumb="item.smallImg"
              />
            </div>

            <div class="bottom clearfix">
              <span class="fl left">{{all[v].createdAt.substr(0,10)}}</span>
              <span class="fr right">
                <span>共计<span>{{numprice[2*i]}}</span>件商品，共计</span>
                <span>￥{{numprice[2*i+1]}}</span>
              </span>
            </div>
          </div>
        </van-tab>
        <!-- 待收货 -->
        <van-tab title="待收货">
          <div v-if="wait.length == 0">
            <van-empty description="这里还没有数据哟~">
              <van-button color="#FE874E" round class="bottom-button" @click="goMenu">去逛逛</van-button>
            </van-empty>
          </div>

          <!-- 显示数据 -->
          <div class="content" v-for="(v,i) in oids" :key="i">
            <div class="title clearfix">
              <span class="fl left">{{v}}</span>
              <span v-if="all[v].status == 1" class="fr right" @click="confirmOrder(v)">确认收货</span>
              <span v-if="all[v].status == 2" class="fr right" @click="delData(v)"><van-icon name="delete" /></span>
              <span v-if="all[v].status == 2" class="fr right">已收货</span>
            </div>
            <div v-for="(item,index) in all[v].data" :key="index">
              <van-card
                :num="item.count"
                :price="item.price"
                :desc="item.rule"
                :title="item.name"
                :thumb="item.smallImg"
              />
            </div>

            <div class="bottom clearfix">
              <span class="fl left">{{all[v].createdAt.substr(0,10)}}</span>
              <span class="fr right">
                <span>共计<span>{{numprice[2*i]}}</span>件商品，共计</span>
                <span>￥{{numprice[2*i+1]}}</span>
              </span>
            </div>
          </div>
        </van-tab>
        <!-- 已收货 -->
        <van-tab title="已收货">
          <div v-if="confirm.length == 0">
            <van-empty description="这里还没有数据哟~">
              <van-button color="#FE874E" round class="bottom-button" @click="goMenu">去逛逛</van-button>
            </van-empty>
          </div>

          <!-- 显示数据 -->
          <div class="content" v-for="(v,i) in oids" :key="i">
            <div class="title clearfix">
              <span class="fl left">{{v}}</span>
              <span v-if="all[v].status == 1" class="fr right" @click="confirmOrder(v)">确认收货</span>
              <span v-if="all[v].status == 2" class="fr right" @click="delData(v)"><van-icon name="delete" /></span>
              <span v-if="all[v].status == 2" class="fr right">已收货</span>
            </div>
            <div v-for="(item,index) in all[v].data" :key="index">
              <van-card
                :num="item.count"
                :price="item.price"
                :desc="item.rule"
                :title="item.name"
                :thumb="item.smallImg"
              />
            </div>

            <div class="bottom clearfix">
              <span class="fl left">{{all[v].createdAt.substr(0,10)}}</span>
              <span class="fr right">
                <span>共计<span>{{numprice[2*i]}}</span>件商品，共计</span>
                <span>￥{{numprice[2*i+1]}}</span>
              </span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: 'Order',
  mounted(){
    this.getOrderData();
  },
  data(){
    return{
      // 内容显示
      active:0,
      // 全部
      all:"",
      // 待收货
      wait:0,
      // 确认收货
      confirm:0,
      // 保存商品价格和数量
      numprice:[],
      // 保存订单编号
      oids:[]
    }
  },
  methods:{
  	// 回到菜单
  	goMenu(){
  		this.$router.push({name:"Menu"});
  	},
    // 获取订单数据
    getOrderData(){
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
        url:"/findOrder",
        params:{
          appkey:this.appkey,
          tokenString,
          status:this.active,
        }
      }).then(result =>{
        Toast.clear();
        Toast(result.data.msg);
        if (result.data.code == 70000) {
            //降序排序
            result.data.result.sort((a, b) => {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })
            // 获取订单编号
            let oids = [];
            result.data.result.forEach(v => {
              if (oids.indexOf(v.oid) == -1) {
                oids.push(v.oid);
              }
            })
            this.oids = oids;
            // 获取订单数据
            let orderData = [];
            result.data.result.forEach(v => {
              if (!orderData[v.oid]) {
                orderData[v.oid] = {
                  data:[v],
                  status:v.status,
                  createdAt:v.createdAt
                }
              }else{
                orderData[v.oid].data.push(v);
              }
            })
            this.all = orderData;

            // 计算价格
            for (let key in this.all) {
              this.sumtotal(this.all[key].data);
            }

            if (this.active == 1) {
              this.wait = Object.keys(this.all);
            }
            if (this.active == 2) {
              this.confirm = Object.keys(this.all);
            }
        }
      }).catch(err => {
        Toast.clear();
        
      })
    },

    // 计算商品价格
    sumtotal(obj){
      let sum = 0;
      let price = 0;

      for (var i = 0; i < obj.length; i++) {
        sum += obj[i].count;

        price += obj[i].count * obj[i].price;
      }

      this.numprice.push(sum);
      this.numprice.push(price);
    },

    // 改变标签
    changeTibs(){
      this.getOrderData();
    },
    // 确认收货
    confirmOrder(v){
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
        url:"/receive",
        data:{
          appkey:this.appkey,
          tokenString,
          oid:v
        }
      }).then(result =>{
        Toast.clear();
        if (result.data.code == 80000) {
          Toast(result.data.msg);
          this.getOrderData();
        }
      }).catch(err =>{
        
      })
    },
    // 删除数据
    delData(v){
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
        url:"/removeOrder",
        data:{
          appkey:this.appkey,
          tokenString,
          oid:v
        }
      }).then(result =>{
        Toast.clear();
        if (result.data.code == 90000) {
          Toast(result.data.msg);
          this.getOrderData();
        }
      }).catch(err =>{
        
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .order{
    width: 100%;
    height: 667px;
    background: #ddd;

    .white{
      width: 100%;
      height: 50px;
    }
  }
  .nav{
    width: 100%;
    position: fixed;
    top:0px;
  }
  .orderNav{
    width: 100%;
    margin-bottom:50px; 
    .content{
      margin-top: 10px;
      background: #fff;
      font-size: 14px;
      border-radius: 15px;
      padding:10px 0; 
      .left{
        padding-left: 12px;
      }
      .right{
        padding-right: 12px;
      }
    }
  }
  .bottom-button {
      width: 160px;
      height: 40px;
  }
</style>