(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41ab6012"],{"4bec":function(t,a,n){"use strict";n.r(a);var i=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"myAccount"},[n("div",[n("van-nav-bar",{staticClass:"nav",attrs:{title:"我的收藏","left-text":"返回","left-arrow":""},on:{"click-left":t.prev}})],1),n("div",{staticClass:"white"}),0==t.allinfo.length?n("div",[n("van-empty",{attrs:{description:"我的收藏空空如也"}},[n("van-button",{staticClass:"bottom-button",attrs:{color:"#FE874E",round:""},on:{click:t.goMenu}},[t._v("去逛逛")])],1)],1):t._e(),n("div",{staticClass:"content-wrop clearfix"},t._l(t.allinfo,(function(a,i){return n("div",{staticClass:"fl content"},[n("div",{staticClass:"img"},[n("img",{attrs:{src:a.smallImg,alt:""}})]),n("div",{staticClass:"title"},[n("span",{staticClass:"fl"},[t._v(t._s(a.name))]),n("span",{staticClass:"fr"},[n("van-icon",{attrs:{name:"like-o",color:t.islike?"#f00":"#000"},on:{click:function(n){return t.likeAndNotlike(a.pid)}}})],1)])])})),0)])},e=[],o=(n("5172"),n("0a68")),s={name:"MyAccount",mounted:function(){this.getinfo()},data:function(){return{islike:!0,allinfo:[]}},methods:{prev:function(){this.$router.go(-1)},goMenu:function(){this.$router.push({name:"Menu"})},getinfo:function(){var t=this,a=localStorage.getItem("__Tk");void 0==a&&this.$router.push({name:"Login"}),o["a"].loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"get",url:"/findAllLike",params:{appkey:this.appkey,tokenString:a}}).then((function(a){o["a"].clear(),2e3==a.data.code&&(t.allinfo=a.data.result)})).catch((function(t){}))},likeAndNotlike:function(t){var a=this,n=localStorage.getItem("__Tk");o["a"].loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"POST",url:"/notlike",data:{appkey:this.appkey,pid:t,tokenString:n}}).then((function(t){o["a"].clear(),800==t.data.code||900==t.data.code?(Object(o["a"])(t.data.msg),a.getinfo()):(Object(o["a"])("您的登录可能失效了"),a.$router.push({name:"Login"}))})).catch((function(t){o["a"].clear()}))}}},c=s,l=(n("f671"),n("2877")),r=Object(l["a"])(c,i,e,!1,null,"437018fa",null);a["default"]=r.exports},5172:function(t,a,n){"use strict";n("45e1"),n("5128"),n("b062"),n("b0d4"),n("8063"),n("a2ba"),n("368d")},f4c5:function(t,a,n){},f671:function(t,a,n){"use strict";var i=n("f4c5"),e=n.n(i);e.a}}]);
//# sourceMappingURL=chunk-41ab6012.a66d824b.js.map