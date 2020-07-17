<template>
  <div class="search">
  	<!-- 显示nav -->
    <div>
      <van-nav-bar title="我的" class="nav" @click-left="goMenu">
      	<template #left>
		      <van-icon name="home-o" size="24" />
		    </template>
      </van-nav-bar>
    </div>
    <!-- 搜索框 -->
    <div class="searcvalue">
    	<van-search
		  	v-model="value"
		  	placeholder="请输入种类搜索"
		  	input-align="center"
		  	@search="onSearch" 
		/>
    </div>
    <!-- 显示菜单 -->
    <div v-if="productData.length == 0">
    	<van-empty description="哎哟喂！好像没有搜到，要不来过？">
		</van-empty>
    </div>
  	<div class="content-menu" v-else>
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

import { Toast } from 'vant';

export default {
  name: 'Search',
  mounted(){
  	this.getType();
  },
  data(){
  	return{
  		// 获取搜索值
  		value:"",
  		// 商品数据处理
	    productData:[],
	    // 处理菜单
	    option1:[]
  	}
  },
  methods:{
  	// 获取上个界面的值且处理搜索
  	getValueAndsearch(){
  		let queryParams = this.$route.query;
  		for (let i = 0; i < this.option1.length; i++) {
  			if (this.option1[i].typeDesc == queryParams.w) {
  				
  				this.getProductByType(this.option1[i].type);
  				break;
  			}
  		}

  	},
  	// 回到菜单
  	goMenu(){
  		this.$router.push({name:"Menu"});
  	},
  	// 搜索处理
    onSearch(val) {
      this.$router.push({name:"Search",query:{w:val}});
      this.value="";
      this.getValueAndsearch();
    },
    // 获取类别的数据
  	getType(){
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
  			this.option1 = result.data.result;
  			// 获取上一个界面传值进行搜索
  			this.getValueAndsearch();
  		}).catch(err => {
  			Toast.clear();
  			
  		})
  	},
    //根据类型获取商品数据
    getProductByType(item) {
      this.productData = [];

      let params = {
        appkey: this.appkey,
        key: 'type',
        value: item
      };
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
  }
}
</script>

<style lang="less" scoped>
	.nav{
		width: 100%;
		position: fixed;
		top:0px;
	}
	.searcvalue{
		margin-top: 50px;
	}
</style>