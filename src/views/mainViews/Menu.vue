<template>
  	<div class="menu">
      <!-- 搜索栏 -->
  		<div class="search">
  			<form action="/">
			  	<van-search
			  	  v-model="value"
			  	  show-action
			  	  placeholder="请输入种类进行搜索"
            @search="onSearch" 
			  	/>
			  </form>
  		</div>
  		<!-- banner图 -->
  		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="skyblue">
			  <van-swipe-item v-for="(item,index) in swipesrc"><img :src="item.bannerImg" alt=""></van-swipe-item>
		  </van-swipe>
      <!-- 选择列表 -->
  		<van-dropdown-menu>
  			  <van-dropdown-item v-model="value1" :options="option1" @change="changeVlue"/>
  			  <van-dropdown-item v-model="value2" :options="option2" />
  		</van-dropdown-menu>
      <!-- 显示菜单 -->
  		<div class="content-menu">
  			<van-card
  				  v-for="(item,index) in productData"
  				  :key="index"
  			  	:price="item.price"
  			  	:desc="item.desc"
  			  	:title="item.name"
  			  	:thumb="item.smallImg"
            @click="commitid(item)"
  			/>
  		</div>
  	</div>
</template>

<script>
//配置全局的vuex引入
import {createNamespacedHelpers} from 'vuex'
//引入全局的state
const {mapState} = createNamespacedHelpers('menuModule')

import { Toast } from 'vant';

export default {
  name: 'Menu',
  data(){
  	return{
  		// 搜索
  		value:"",
  		// 切换菜单
  		// 新品的菜单
  		value1: 0,
  		// 排序的菜单
	    value2: 'a',
	    // 新品菜单选项
	    option1: [],
	    // 排序菜单选项
	    option2: [
	      { text: '默认排序', value: 'a' },
	      { text: '价格从高到低', value: 'b' },
	      { text: '价格从低到高', value: 'c' },
	    ],
	    // 商品数据处理
	    productData:[],
	    // banner图
	    swipesrc:[],
  	}
  },
   mounted(){
      // 获取banner图
   		this.getBnner();
      // 获取类别
  		this.getType();
      // 在localStorage中放pid为商品详情页做准备
      localStorage.setItem('pid',JSON.stringify(""));
  },
  computed: {
    // 全局store的处理
    	...mapState(['bannerDataCache','option1Cache'])

  },

  methods:{
  	// 获取banner数据
  	getBnner(){

  		//获取vuex的banner缓存数据，如果存在缓存数据，则不发起请求，否则发起请求
	    if (this.bannerDataCache.length > 0) {
	        this.swipesrc = this.bannerDataCache;
	        return;
	    }

	    //开启加载提示
	    Toast.loading({
	      	message: "加载中...",
	      	forbidClick: true,
	      	//延迟自动关闭加载提示，如果该值为0，则不会自动关闭
	      	duration: 0
	    });

      // 获取banner图的数据

	 	  this.axios({
	  			url:"http://1.zsduan.applinzi.com/wm/banner/banner.php",
	  			method:'get'
	  		}).then(result => {
	  			if (result.data.code == 300 ) {
	  				Toast.clear();
	  				this.swipesrc = result.data.result;
		            //缓存banner数据在vuex中
		            this.$store.commit('menuModule/changeData', {
		              key: 'bannerDataCache',
		              value: result.data.result
		            })
	  			}
	  		}).catch(err => {
	  			Toast.clear();
	  			
	  	})
  	},

    // 获取类别的数据
  	getType(){
  		//获取vuex的选择条件缓存数据，如果存在缓存数据，则不发起请求，否则发起请求
	    if (this.option1Cache.length > 0) {
	        this.option1 = this.option1Cache;
	        this.getProductByType('isHot');
	        return;
	    }

	    //开启加载提示
	    Toast.loading({
	      	message: "加载中...",
	      	forbidClick: true,
	      	//延迟自动关闭加载提示，如果该值为0，则不会自动关闭
	      	duration: 0
	    });

      // 开始获取类别
  		this.axios({
  			method:"get",
  			url:"/type",
  			params:{
  				appkey:this.appkey
  			}
  		}).then(result => {
  			Toast.clear();
        // 进行类别的数据处理
  			result.data.result.forEach(v => {
            v.text = "";
            v.value = 0;
          })
        // 讲返回的类别赋值给数组
  			for (var i = 0; i < result.data.result.length; i++) {
  				
  				result.data.result[i].value = i+1;
  				result.data.result[i].text = result.data.result[i].typeDesc;
  			}
        // 推一个数组在最前面
  			result.data.result.unshift({type: 'isHot', typeDesc: '最新推荐', isActive: true,text:"最新推荐",value:0});
  			this.option1 = result.data.result;


  			//缓存选择数据在vuex中
		    this.$store.commit('menuModule/changeData', {
		      key: 'option1Cache',
		      value: result.data.result
		    })
        // 调用处理菜单函数
  			this.getProductByType('isHot');
  		}).catch(err => {
  			Toast.clear();
  			
  		})
  	},
  	// 改变选择的值，老获取商品的数据
  	changeVlue(){		
  		this.getProductByType(this.option1[this.value1].type);
  	},

  	//根据类型获取商品数据
    getProductByType(item) {
      this.productData = [];

      let params = {
        appkey: this.appkey,
        key: 'type',
        value: item
      };

      //最近推荐
      if (item == 'isHot') {
        params.key = 'isHot';
        params.value = 1
      }

      //开启加载提示
	    Toast.loading({
	      message: "加载中...",
	      forbidClick: true,
	      //延迟自动关闭加载提示，如果该值为0，则不会自动关闭
	      duration: 0
	    });

      // 开始处理菜单
      this.axios({
        method: 'GET',
        url: '/typeProducts',
        params
      }).then(result => {
        if (result.data.code == 500) {
        	Toast.clear();
        	Toast.clear();
            this.productData = result.data.result;
        }
      }).catch(err => {
        
      })
      
    },
    // 发送pid给详情页
    commitid(item){
      localStorage.setItem('pid',JSON.stringify(item.pid));
      this.$router.push({name:"Detail"});
    },
    // 搜索处理
    onSearch(val) {
      if (this.value == "") {
        Toast("请输入搜索内容");
        return;
      }
      this.$router.push({name:"Search",query:{w:val}});
    },
  }
  

}
</script>

<style lang="less" scoped>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    height: 200px;
    margin-top: 54px;
    img{
    	width: 100%;
    	height: 100%;
    }
  }
  .menu{
  	background: #ddd;
   	padding-bottom: 50px;
    .search{
      position: fixed;
      width: 100%;
      z-index: 2;
      top:0;
    }
  }
  // 设置菜单可以滑动
  .content-menu{
  	overflow-y: auto;
  }
  // 改变价格颜色
  .van-card__price{
  	color: red;
  }

</style>