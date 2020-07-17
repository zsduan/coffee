<template>
  	<div class="home">
  		<div>
  			<router-view></router-view>
  		</div>
		<van-tabbar v-model="active" @change="toggleTabBar">
			  <van-tabbar-item v-for="(item,index) in tabBarData" :icon="item.icon" :key="index">{{item.title}}</van-tabbar-item>
		</van-tabbar>
  	</div>
</template>

<script>
export default {
  name: 'Home',
  created(){
    //BOM: 浏览器对象模型(Browser Object Model)
    //获取hash，#xxxx
    let url = location.hash.slice(2).split('/').splice(1, 2).join('/');
    // 增加数据进行浏览器判断
    let arr = ["menu","order","shopcart","my"];
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
      if(url == arr[i]){
          index = i;
          break;
      }
    }
    this.active = index;
  },
  updated(){
    //BOM: 浏览器对象模型(Browser Object Model)
    //获取hash，#xxxx
    let url = location.hash.slice(2).split('/').splice(1, 2).join('/');
    // 增加数据进行浏览器判断
    let arr = ["menu","order","shopcart","my"];
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
      if(url == arr[i]){
          index = i;
          break;
      }
    }
    this.active = index;
  },
  data(){
  	return{
  		active:0,
  		//底部导航数据
        tabBarData: [
          {
            icon: 'coupon-o',
            title: '菜单',
            routeName: 'Menu'
          },
          {
            icon: 'orders-o',
            title: '订单',
            routeName: 'Order'
          },
          {
            icon: 'shopping-cart-o',
            title: '购物车',
            routeName: 'Shopcart'
          },
          {
            icon: 'contact',
            title: '我的',
            routeName: 'My'
          }
        ]
  	}
  },
  methods:{
  	toggleTabBar(index){
  		this.$router.push({name:this.tabBarData[index].routeName});
  	}
  }
}
</script>

<style lang="less" scoped>

</style>
