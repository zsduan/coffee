(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d495110"],{"2d3b":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"search"},[a("div",[a("van-nav-bar",{staticClass:"nav",attrs:{title:"我的"},on:{"click-left":t.goMenu},scopedSlots:t._u([{key:"left",fn:function(){return[a("van-icon",{attrs:{name:"home-o",size:"24"}})]},proxy:!0}])})],1),a("div",{staticClass:"searcvalue"},[a("van-search",{attrs:{placeholder:"请输入种类搜索","input-align":"center"},on:{search:t.onSearch},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),0==t.productData.length?a("div",[a("van-empty",{attrs:{description:"哎哟喂！好像没有搜到，要不来过？"}})],1):a("div",{staticClass:"content-menu"},t._l(t.productData,(function(e,n){return a("van-card",{key:n,attrs:{price:e.price,desc:e.desc,title:e.name,thumb:e.smallImg},on:{click:function(a){return t.commitid(e)}}})})),1)])},i=[],c=(a("5172"),a("0a68")),o={name:"Search",mounted:function(){this.getType()},data:function(){return{value:"",productData:[],option1:[]}},methods:{getValueAndsearch:function(){for(var t=this.$route.query,e=0;e<this.option1.length;e++)if(this.option1[e].typeDesc==t.w){this.getProductByType(this.option1[e].type);break}},goMenu:function(){this.$router.push({name:"Menu"})},onSearch:function(t){this.$router.push({name:"Search",query:{w:t}}),this.value="",this.getValueAndsearch()},getType:function(){var t=this;c["a"].loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"get",url:"/type",params:{appkey:this.appkey}}).then((function(e){c["a"].clear(),t.option1=e.data.result,t.getValueAndsearch()})).catch((function(t){c["a"].clear()}))},getProductByType:function(t){var e=this;this.productData=[];var a={appkey:this.appkey,key:"type",value:t};c["a"].loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"GET",url:"/typeProducts",params:a}).then((function(t){500==t.data.code&&(c["a"].clear(),e.productData=t.data.result)})).catch((function(t){}))},commitid:function(t){localStorage.setItem("pid",JSON.stringify(t.pid)),this.$router.push({name:"Detail"})}}},r=o,s=(a("6c7d"),a("2877")),u=Object(s["a"])(r,n,i,!1,null,"4abee710",null);e["default"]=u.exports},5172:function(t,e,a){"use strict";a("45e1"),a("5128"),a("b062"),a("b0d4"),a("8063"),a("a2ba"),a("368d")},"6c7d":function(t,e,a){"use strict";var n=a("8886"),i=a.n(n);i.a},8886:function(t,e,a){}}]);
//# sourceMappingURL=chunk-7d495110.3b111ad6.js.map