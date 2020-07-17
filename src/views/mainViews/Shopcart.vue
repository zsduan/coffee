<template>
  <div class="shopcart">
  	<!-- 显示nav -->
    <div>
      <van-nav-bar title="购物车" right-text="管理" class="nav" @click-right="manages" @click-left="goMenu">
      	<template #left>
		    <van-icon name="home-o" size="24" />
		</template>
      </van-nav-bar>
    </div>

    <!-- 显示图片 -->
    <div v-if="commodityData.length == 0">
    	<van-empty description="购物车空空如也">
		  	<van-button color="#FE874E" round class="bottom-button" @click="goMenu">去逛逛</van-button>
		  </van-empty>
    </div>
    <div v-else>
      <van-list
        v-model="loadOptions.isLoading"
        :finished="loadOptions.isFinished"
        finished-text="没有更多了"
        @load="loadData"
        :offset="50"
        class="shopcartList"
      >
    	<div class="list-item">
    		<!-- 复选框 -->
    		<van-checkbox-group v-model="checkboxValue" ref="checkboxGroup" @change="changeValue">
    			<!-- 显示商品 -->
    			<van-swipe-cell v-for="(item,index) in commodityData" :key="index">
	    			<div class="checkbox clearfix">
						<van-checkbox :name="index" checked-color="#FE874E" class="fl check" @click="totalAndGetsid"></van-checkbox>
						<div class="fl item-img">
							<img :src="item.small_img" alt="">
						</div>
						<div class="content fr">
							<div class="top">
								<p>
									<span class="title">{{item.name}}</span>
									<span class="flavor">{{item.rule}}</span>
								</p>
								<p>
									<span class="english-name">{{item.enname}}</span>
								</p>	
							</div>
							<div class="bottom clearfix">
								<div>
									<span class="fl price">￥{{item.price}}</span>
									<span class="fr stepper">
										<van-stepper v-model="item.count" integer @change="updataCount(index)"/>
									</span>
								</div>
							</div>
						</div>
	    			</div>	    		
					<template #right>
				  		<van-button square text="删除" type="danger" class="delete-button" @click="delData(index)"/>
					</template>
				</van-swipe-cell>				
			 </van-checkbox-group>
    	</div>
    </van-list>
      <!-- 提交订单 -->
      <van-submit-bar :price="price" button-text="提交订单"  class="submit-bar" v-if="manage" @submit="goAddress" :disabled="isSbumit">
          <van-checkbox v-model="checked" checked-color="#FE874E"  @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
      <van-submit-bar button-text="删除"  class="submit-bar" v-else @submit="delData">
          <van-checkbox v-model="checked" checked-color="#FE874E"  @click="checkAll" class="check">全选</van-checkbox>
      </van-submit-bar>	
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: 'Shopcart',
  mounted(){
  	this.findAllShopcart();
    // 在localStorage中放sids为支付页面做准备
    localStorage.setItem('putsids',JSON.stringify(""));
  },
  data(){
  	return{
  		// 商品选取数据
  		commodityData:[],
      // 加载所有商品数据
      allShopcartData: [],
  		// 全选数据
  		checked:"",
  		// 判断全选数据
  		checkboxValue:[],
  		// 步进器value
  		Stepper:"",
      // list加载数据
      loadOptions:{
        isLoading:true,

        isFinished:false
      },
      // 每次加载5条数据
      loadCount: 5,
      // 是否可以提交
      isSbumit:true,
  		// 管理
  		manage:true,
  		// 保存价格
  		price:0.00,
      // 放sids数组方便传参
      getSids:[],
  	}
  },
  methods:{
  	// 回到菜单
  	goMenu(){
  		this.$router.push({name:"Menu"});
  	},
  	// 全选
  	checkAll() {
      	this.$refs.checkboxGroup.toggleAll(this.checked);
      	this.totalAndGetsid();
    },
    // 查看是否改变
    changeValue(){
      if (this.checkboxValue.length > 0) {
        this.isSbumit = false;
        return;
      }
      this.isSbumit = true;
    },
    // 管理购物车
  	manages(){
  		this.manage = !this.manage;
  	},
  	// 查询购物车
  	// 查询购物车条数
    findAllShopcart(){
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
          url:"/findAllShopcart",
          params:{
            appkey:this.appkey,
            tokenString
          }
        }).then(result => {
          Toast.clear();
          Toast(result.data.msg);
          this.allShopcartData = result.data.result;

          this.commodityData  = this.allShopcartData.splice(0, this.loadCount);

          //根据截取购物车商品数量和总购物车商品数量判断是否加载完成
          if (this.allShopcartData.length > 0) {
            this.loadOptions.isLoading = false;
          }else {
            this.loadOptions.isFinished = true;
          }
        }).catch(err => {
          Toast.clear();
          
        })

      
    },
    // 计算总金额和获取选择项
    totalAndGetsid(){
      // 计算中金额
    	let arr = [];
    	this.price = 0.00;
    	for (let i = 0; i < this.checkboxValue.length; i++) {
    		let index = this.checkboxValue[i];
    		arr.push(parseFloat(this.commodityData[index].price) * this.commodityData[index].count)
    	}
    	for (let i = 0; i < arr.length; i++) {
    		this.price +=  arr[i] * 100;
    	}

      // 获取选择项
      let sids = [];
      for (var i = 0; i < this.checkboxValue.length; i++) {
            let index = this.checkboxValue[i];
            let num = this.commodityData[index].sid;
            sids.push(num);
      }
      if (sids.length == 0 ) {
        // Toast("您还没有选择商品");
        return;
      }
      this.getSids = JSON.stringify(sids);


    },

    updataCount(index){
    	// 重新计算价格
    	this.totalAndGetsid();
    	// 获取本地数据
        let tokenString = localStorage.getItem("__Tk");

        //开启加载提示
        Toast.loading({
            message: "加载中...",
            forbidClick: true,
            //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
            duration: 0
        });


        // 请求数据
        this.axios({
        	method:"POST",
        	url:"/modifyShopcartCount",
        	data:{
        		appkey:this.appkey,
        		tokenString,
        		sid:this.commodityData[index].sid,
        		count:this.commodityData[index].count
        	}
        }).then(result => {
        	Toast.clear();
        	if (result.data.code != 6000) {
        		Toast("网络出了点小问题");
        	}
        }).catch(err => {
        	Toast.clear();
        	
        })

    },
    // 删除数据
    delData(index){
    	// 获取本地数据
        let tokenString = localStorage.getItem("__Tk");

        let arr = [];

        if (index == 0 || index) {
          arr = JSON.stringify([this.commodityData[index].sid]);
        }else {
          arr = this.getSids;
        }

        //开启加载提示
        Toast.loading({
            message: "加载中...",
            forbidClick: true,
            //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
            duration: 0
        });

        // 请求数据
        this.axios({
        	method:"POST",
        	url:"/deleteShopcart",
        	data:{
        		appkey:this.appkey,
        		tokenString,
        		sids:arr,
        	}
        }).then(result => {
        	Toast.clear();
          Toast.success('删除成功');
        	this.findAllShopcart();
        }).catch(err => {
        	Toast.clear();
          Toast.fail('删除失败');
        	
        });

        // 重新计算价格
    	   this.totalAndGetsid();
    },

    // 跳转选择地址
    goAddress(){
      // 在localStorage中放pid为商品详情页做准备
      localStorage.setItem('putsids',this.getSids);
      this.$router.push({name:"PlaceOrder"});
    },
    // 判断加载中
    loadData(){
      this.commodityData.push(...this.allShopcartData.splice(0, this.loadCount));
      if (this.allShopcartData.length == 0) {

        //没有数据可加载
        this.loadOptions.isLoading = true;
        this.loadOptions.isFinished = true;
      }
    }

  }
}
</script>

<style lang="less" scoped>
      
    // 块的背景色
    .goods-card {
      margin: 0;
      background-color: white;
    }
    // 删除
    .delete-button {
      height: 100%;
      background: red ! important;
    }
    // 列表
    .shopcartList{
      padding-bottom: 110px; 
    }

  	.bottom-button {
    	width: 160px;
    	height: 40px;
  	}
    // 提交按钮
    .van-button{
      background: #FE874D;
    }

  	.shopcart{
  		width: 100%;
  		background: #ddd;
  		height: 617px;
  	}
  	.nav{
  		width: 100%;
  		position: fixed;
  		top: 0;
  		z-index: 2;
  	}
  	.list-item{
  		width: 100%;
  		// margin-bottom: 50px;
  		margin-top:50px; 
  		.checkbox{
  			background: #fff;
  			width: 100%;
  			margin: 5px 0;
  			padding:5px 0; 
  			border-radius: 10px;
  			.check{
  				margin-top:38px;
  				padding:0 10px;  
  			}
  			.item-img{
  				width: 25%;
  				img{
  					width: 100%;
  					border-radius: 10px;
  				}
  			}
  			.content{
				width: 60%;
				.title{
					font-size: 16px;
				}
				.flavor{
					padding-left: 5px;
					color: #777;
				}
				.english-name{
					font-size: 14px;
					color: #555;
				}
				.bottom{
					position: absolute;
					bottom: 10px;
					font-size: 20px;
					width: 60%;
					.stepper{
						padding-right: 10px;
					}
					.price{
						color: red;
					}
				}
  			}
  		}
  	}

  	.submit-bar{
  		margin-bottom: 55px;
  		.check{
  			position: absolute;
  			left: 0;
  			padding-left: 10px;
  		}
  	}

    .nav{
      width: 100%;
      position: fixed;
      top:0px;
    }

    // 地址弹出框
    .content-show {
      padding: 16px 16px 160px;
    }
</style>