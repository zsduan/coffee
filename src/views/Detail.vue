<template>
  <div class="detail">
    <!-- 显示nav -->
    <div>
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="prev" class="nav"/>
    </div>
  	
    <!-- 显示商品图片 -->
  	<div class="img">
  		<img v-for="(item,index) in particulars" :key="index" :src="item.large_img" alt="">
  	</div>
    <!-- 显示商品名称与收藏商品 -->
  	<div class="title clearfix w">
  		<span class="fl content-title" v-for="(item,index) in particulars" :key="index">{{item.name}}</span>
  		<span class="fr heart">
  			<van-icon name="like-o" :color="islike ? '#f00' : '#000'" size="30px" @click="likeAndNotlike"/>
  		</span>
  	</div>

    <!-- 选择商品的种类 -->
  	<div class="change w">
      <!-- 温度 -->
  		<p v-if="temperature.length != 1">
  			<span class="change-title" v-for="(item,index) in particulars" :key="index">{{item.tem_desc}}</span>
  			<span v-for="(item,index) in temperature" class="change-item" :class="item.isActive ? 'active' : ''" @click="changeAction(temperature,index)">{{item.name}}</span>
  		</p>
      <!-- 糖 -->
  		<p v-if="sweetness.length != 1">
  			<span class="change-title" v-for="(item,index) in particulars" :key="index">{{item.sugar_desc}}</span>
  			<span v-for="(item,index) in sweetness" class="change-item" :class="item.isActive ? 'active' : ''" @click="changeAction(sweetness,index)">{{item.name}}</span>
  		</p>
      <!-- 奶油 -->
      <p v-if="cream.length != 1">
        <span class="change-title" v-for="(item,index) in particulars" :key="index">{{item.cream_desc}}</span>
        <span v-for="(item,index) in cream" class="change-item" :class="item.isActive ? 'active' : ''" @click="changeAction(cream,index)">{{item.name}}</span>
      </p>
      <!-- 奶 -->
      <p v-if="milk.length != 1">
        <span class="change-title" v-for="(item,index) in particulars" :key="index">{{item.milk_desc}}</span>
        <span v-for="(item,index) in milk" class="change-item" :class="item.isActive ? 'active' : ''" @click="changeAction(milk,index)">{{item.name}}</span>
      </p>
  	</div>

    <!-- 商品描述 -->
  	<div class="describe w">
  		<p><span>商品描述</span></p>
  		<p v-for="(item,index) in desc" :key="index">{{item}}</p>
  	</div>

    <!-- 商品价格 -->
  	<div class="numchange w clearfix">
  		<span v-for="(item,index) in particulars" :key="index">￥{{item.price}}</span>
  		<van-stepper v-model="count" integer class="fr"/>
  	</div>

    <!-- 立即购买和加入购物车模块 -->
  	<div>
  		<van-goods-action>
			  <van-goods-action-icon icon="cart-o" text="购物车" :badge="commodity" @click="goShopcart"/>
			  <van-goods-action-button color="#FE874E" type="warning" text="加入购物车" @click="addShopcart"/>
			  <van-goods-action-button color="#F76C2C" type="danger" text="立即购买" @click="buyNow"/>
		</van-goods-action>
  	</div>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: 'Detail',
  mounted(){
    // 获取localStorage中的pid数据为后面的查询做准备
  	this.pid = JSON.parse(localStorage.getItem('pid'));
    // 在localStorage中放sids为支付页面做准备
    localStorage.setItem('putsids',JSON.stringify(""));
    // 如果数据获取失败返回主页
  	if (this.pid == "") {
  		Toast("数据获取失败，请重试！");
  		this.$router.push({name:"Menu"});
  		return;
  	}

    //调用获取详细数据 
  	this.getParticulars();

    // 查询收藏
    this.findLike(this.pid);

    // 查询商品数量
    this.findAllShopcart();

    // 在localStorage中放sids为支付页面做准备
    localStorage.setItem('putsids',JSON.stringify(""));
  },
  data(){
  	return{
  		// 数量
  		count:"",
  		// 详情页数据
  		particulars:[],
  		// 请求的pid值
  		pid:"",
  		// 温度
  		temperature:"",
  		// 甜度
  		sweetness:"",
      // 奶油
      cream:"",
      // 奶
      milk:"",
      // 简介
      desc:[],
      // 查询是否收藏
      islike:false,
      // 商品数量
      commodity:"",
      // 保存购物车数据，为立即购买做准备
      shopData:[],
      // 判断是否立即购买
      falge:0,
  	}
  },
  methods:{
  	// 返回上一层
  	prev(){
  		this.$router.go(-1)
  	},
  	// 获取详细数据对象
  	getParticulars(){

  		//开启加载提示
	    Toast.loading({
	      	message: "加载中...",
	      	forbidClick: true,
	      	//延迟自动关闭加载提示，如果该值为0，则不会自动关闭
	      	duration: 0
	    });
      // 开始获取数据
  		this.axios({
  			method:"get",
  			url:"/productDetail",
  			params:{
  				appkey:this.appkey,
  				pid:this.pid
  			}
  		}).then(result => {
  			Toast.clear();
  			if (result.data.code == 600) {
  				Toast(result.data.msg);
  				// 获取数据
  				this.particulars = result.data.result;

          // 获取简介
          this.desc = result.data.result[0].desc.split("\n");
  				
  				// 获取温度
  				this.temperature = result.data.result[0].tem.split("/");
  				if (this.temperature == "") {
  					
  				}else {
  					let arr = [];
	  				for (var i = 0; i < this.temperature.length; i++) {
	  					arr.push({name:this.temperature[i],isActive:false});
	  				}
	  				arr[0].isActive = true;
	  				this.temperature = arr;
  				}

          // 获取甜度
          this.sweetness = result.data.result[0].sugar.split("/");
          if (this.sweetness == "") {
            
          }else {
            let arr = [];
            for (var i = 0; i < this.sweetness.length; i++) {
              arr.push({name:this.sweetness[i],isActive:false});
            }
            arr[1].isActive = true;
            this.sweetness = arr;
          }

          // 获取奶油
          this.cream = result.data.result[0].cream.split("/");
          if (this.cream == "") {
            
          }else {
            let arr = [];
            for (var i = 0; i < this.cream.length; i++) {
              arr.push({name:this.cream[i],isActive:false});
            }
            arr[1].isActive = true;
            this.cream = arr;
          }
          // 获取奶
          this.milk = result.data.result[0].milk.split("/");
          if (this.milk == "") {
          }else {
            let arr = [];
            for (var i = 0; i < this.milk.length; i++) {
              arr.push({name:this.milk[i],isActive:false});
            }
            arr[1].isActive = true;
            this.milk = arr;
            
          }

  			}
  			
  		}).catch(err => {
  			Toast.clear();
  			
  		})
  	},
    // 改变选中颜色
    changeAction(obj,index){
        for (let i = 0; i < obj.length; i++) {
          obj[i].isActive = false;
        }
        obj[index].isActive = true;
    },

    // 收藏-取消收藏
    likeAndNotlike(){
      // 获取本地数据
      let tokenString = localStorage.getItem("__Tk");
      // 判断url值
      let url = this.islike ? "/notlike" : "/like";

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
        url,
        data:{
          appkey:this.appkey,
          pid:this.pid,
          tokenString
        }

      }).then(result => {
        Toast.clear();
        if (result.data.code == 800 || result.data.code == 900) {
          Toast(result.data.msg);
          this.islike = result.data.code == 800;
        }else {
          Toast("您的登录可能失效了");
          this.$router.push({name:"Login"});
        }
      }).catch(err => {
        Toast.clear();
        
      })
    },

    // 查询收藏
    findLike(pid){
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
          url:"/findlike",
          params:{
            appkey:this.appkey,
            pid,
            tokenString,
          }
        }).then(result => {
          Toast.clear();
          if (result.data.code == 1000) {
            this.islike = result.data.result.length > 0;
          }else {
            this.$router.push({name:"Login"});
          }
        }).catch(err => {
          
        })

    },
    // 添加购物车
    addShopcart(){
      // 获取本地数据
      let tokenString = localStorage.getItem("__Tk");

      let arr = [];
      // 遍历温度
      for (var i = 0; i < this.temperature.length; i++) {
        if (this.temperature[i].isActive) {
          arr.push(this.temperature[i].name);
          break;
        }
      }
      // 遍历甜度
      for (var i = 0; i < this.sweetness.length; i++) {
        if (this.sweetness[i].isActive) {
          arr.push(this.sweetness[i].name);
          break;
        }
      }
      // 遍历奶油
      for (var i = 0; i < this.cream.length; i++) {
        if (this.cream[i].isActive) {
          arr.push(this.cream[i].name);
          break;
        }
      }
      // 遍历奶
      for (var i = 0; i < this.milk.length; i++) {
        if (this.milk[i].isActive) {
          arr.push(this.milk[i].name);
          break;
        }
      }

      arr = arr.join("/");
      
      //开启加载提示
      Toast.loading({
          message: "加载中...",
          forbidClick: true,
          //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
          duration: 0
      });

      this.axios({
        method:"POST",
        url:"/addShopcart",
        data:{
          appkey:this.appkey,
          count:this.count,
          pid:this.pid,
          rule:arr,
          tokenString
        }

      }).then(result => {
        Toast.clear();
        Toast(result.data.msg);
      }).catch(err => {
        Toast.clear();
        
      });

      this.findAllShopcart();

    },
    // 查询购物车条数
    findAllShopcart(){
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
          url:"/findAllShopcart",
          params:{
            appkey:this.appkey,
            tokenString
          }
        }).then(result => {
          Toast.clear();
          if (result.data.code == 5000) {
            this.shopData = result.data.result;
            this.commodity = this.shopData.length;
          }
        }).catch(err => {
          Toast.clear();
          
        })
    },

    // 立即购买
    buyNow(){
      this.falge = 1;
      let arr = [];
      // 遍历温度
      for (var i = 0; i < this.temperature.length; i++) {
        if (this.temperature[i].isActive) {
          arr.push(this.temperature[i].name);
          break;
        }
      }
      // 遍历甜度
      for (var i = 0; i < this.sweetness.length; i++) {
        if (this.sweetness[i].isActive) {
          arr.push(this.sweetness[i].name);
          break;
        }
      }
      // 遍历奶油
      for (var i = 0; i < this.cream.length; i++) {
        if (this.cream[i].isActive) {
          arr.push(this.cream[i].name);
          break;
        }
      }
      // 遍历奶
      for (var i = 0; i < this.milk.length; i++) {
        if (this.milk[i].isActive) {
          arr.push(this.milk[i].name);
          break;
        }
      }

      arr = arr.join("/");
      let _this = this;
      for (let i = 0; i < this.shopData.length; i++) {
        if (this.shopData[i].name == this.particulars[0].name) {
         if (this.shopData[i].rule == arr) {
            Toast("购物车中有相同的商品哟，请到购物车购买");
            setTimeout(function(){_this.$router.push({name:"Shopcart"});},500);
            return;
         }
        }
      }

      this.addShopcart();
      setTimeout(function(){Toast("商品在购物车中了哟，请小主移步购物车购买");},500);      
      this.$router.push({name:"Shopcart"});

      
    },
    // 跳转购物车
    goShopcart(){
      this.$router.push({name:"Shopcart"});
    },
  	
  }
}
</script>

<style lang="less" scoped>
	.detail{
		width: 100%;
		background: #ddd;
    height: 617px;
		.img{
			width: 100%;
			margin-top:46px; 
			img{
				width: 100%;
			}
		}
		.title{ 
			line-height: 40px;
			.content-title{
				padding-left: 10px;
				font-size: 14px; 
			} 
			.heart{
				display: block;
				width: 30px;
				height: 30px;
				margin-top:5px;
				margin-right: 20px; 
			}
		}
		.change{
			p{
				padding:10px 0;
				span{
					display: inline-block;
					width: 60px;
					height: 30px;
					margin-right:5px; 
					line-height:30px;
				}
				.change-title{
					padding-left: 10px;
				}
				.change-item{
					text-align: center;
					color: #181818;
					background: #ddd;
					border-radius: 10px;
					&.active{
						background: #FE874E;
						color: #fff;
					}
				}
			}
		}
		.describe{
			p{
				padding: 0 10px;
				span{
					font-size: 16px;
					
				}
			}

		}
		.numchange{
			margin-bottom: 60px; 
			span{
				font-size: 20px;
				color: red;
			}
		}
	}
	// 公共样式
	.w{
		width: 100%;
		padding: 10px 0;
		margin-top:5px;
		background: #fff;
		border-radius: 10px;
	}
	.nav{
		width: 100%;
		position: fixed;
		top:0px;
	}
</style>