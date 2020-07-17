<template>
  <div class="myAddress">
    <!-- 显示nav -->
    <div>
      <van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="prev" class="nav"/>
    </div>
    <div class="white"></div>
    <div class="content-show">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
        />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'MyAddress',
  mounted(){
    this.selectAddress();
  },
  data(){
  	return{
      // 保存地址
      chosenAddressId: '1',
      list:[]
  	}
  },
  methods:{
  	// 返回上一层
    prev(){
      this.$router.go(-1)
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

    // 新增地址
    onAdd() {
      this.$router.push({name:"Address"});
    },
    // 编辑地址
    onEdit(item, index) {
      this.$router.push({name:"Address",query:{aid:item.aid}});
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
  .myAddress{
    width:100%;
    height: 667px;
    background: #ddd;
    .white{
      width: 100%;
      height: 46px;
    }
    .van-button{
      background: #FD7C3F;
      border-color: #FD7C3F;
    }
    /deep/ .van-address-item .van-radio__icon--checked .van-icon{
      background-color: #FD7C3F;
      border-color: #FD7C3F;
      color: #fff;
    }
  }
</style>