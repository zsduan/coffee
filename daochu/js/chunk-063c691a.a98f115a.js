(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-063c691a"],{5172:function(s,a,t){"use strict";t("45e1"),t("5128"),t("b062"),t("b0d4"),t("8063"),t("a2ba"),t("368d")},a585:function(s,a,t){"use strict";var o=t("fbaf"),e=t.n(o);e.a},fbaf:function(s,a,t){},ff7a:function(s,a,t){"use strict";t.r(a);var o=function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",{staticClass:"securityCenter"},[t("div",[t("van-nav-bar",{staticClass:"nav",attrs:{title:"安全中心","left-text":"返回","left-arrow":""},on:{"click-left":s.prev}})],1),t("div",{staticClass:"white"}),t("div",{staticClass:"list"},s._l(s.listItem,(function(a,o){return t("van-cell",{key:o,attrs:{title:a.title,"is-link":""},on:{click:function(a){return s.popup(o)}}})})),1),t("van-popup",{staticClass:"updatapass",model:{value:s.passwropShow,callback:function(a){s.passwropShow=a},expression:"passwropShow"}},[t("p",[s._v("修改密码")]),t("input",{directives:[{name:"model",rawName:"v-model",value:s.oldpassWord,expression:"oldpassWord"}],attrs:{type:"password",placeholder:"原密码"},domProps:{value:s.oldpassWord},on:{input:function(a){a.target.composing||(s.oldpassWord=a.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:s.newpassWord,expression:"newpassWord"}],attrs:{type:"password",placeholder:"新密码(字母开头6位以上)"},domProps:{value:s.newpassWord},on:{input:function(a){a.target.composing||(s.newpassWord=a.target.value)}}}),t("div",{staticClass:"btn"},[t("van-button",{attrs:{type:"info",plain:""},on:{click:s.passwrodSbumit}},[s._v("提交")]),t("van-button",{attrs:{type:"info",plain:""},on:{click:s.passwrodCancel}},[s._v("取消")])],1)]),t("van-popup",{staticClass:"updatapass",model:{value:s.findPasswordShow,callback:function(a){s.findPasswordShow=a},expression:"findPasswordShow"}},[t("p",[s._v("找回密码")]),t("input",{directives:[{name:"model",rawName:"v-model",value:s.findPasswordTel,expression:"findPasswordTel"}],attrs:{type:"tel",placeholder:"注册时手机号"},domProps:{value:s.findPasswordTel},on:{input:function(a){a.target.composing||(s.findPasswordTel=a.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:s.findNewpassWord,expression:"findNewpassWord"}],attrs:{type:"password",placeholder:"新密码(字母开头6位以上)"},domProps:{value:s.findNewpassWord},on:{input:function(a){a.target.composing||(s.findNewpassWord=a.target.value)}}}),t("div",{staticClass:"btn"},[t("van-button",{attrs:{type:"info",plain:""},on:{click:s.findPasswrodSbumit}},[s._v("提交")]),t("van-button",{attrs:{type:"info",plain:""},on:{click:s.findPasswrodCancel}},[s._v("取消")])],1)])],1)},e=[],i=(t("5172"),t("0a68")),n={name:"SecurityCenter",data:function(){return{listItem:[{title:"修改密码",icon:"arrow"},{title:"找回密码",icon:"arrow"},{title:"注销账号",icon:"arrow"},{title:"退出登录",icon:"arrow"}],passwropShow:!1,oldpassWord:"",newpassWord:"",findPasswordShow:!1,findPasswordTel:"",findNewpassWord:""}},methods:{prev:function(){this.$router.go(-1)},popup:function(s){0==s&&(this.passwropShow=!0),1==s&&(this.findPasswordShow=!0),2==s&&this.$dialog.alert({title:"tips",message:"该内容为灰度测试中..."}),3==s&&this.exit()},passwrodCancel:function(){this.passwropShow=!1},passwrodSbumit:function(){""!=this.oldpassWord&&""!=this.newpassWord?this.passwrod():Object(i["a"])("请把信息填写完整！")},passwrod:function(){var s=this;if(/^[a-zA-Z]\w\d{5,15}$/.test(this.newpassWord)){var a=localStorage.getItem("__Tk");void 0==a&&this.$router.push({name:"Login"}),i["a"].loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"post",url:"/updatePassword",data:{appkey:this.appkey,tokenString:a,password:this.newpassWord,oldPassword:this.oldpassWord}}).then((function(a){i["a"].clear(),Object(i["a"])(a.data.msg),s.passwropShow=!1,s.newpassWord="",s.oldpassWord="",localStorage.setItem("__Tk",""),s.$router.push({name:"Login"})})).catch((function(s){i["a"].clear()}))}else Object(i["a"])("请输入正确的格式")},findPasswrodCancel:function(){this.findPasswordShow=!1},findPasswrodSbumit:function(){""!=this.findPasswordTel&&""!=this.findNewpassWord?this.findpasswrod():Object(i["a"])("请把信息填写完整！")},findpasswrod:function(){var s=this;if(/^[a-zA-Z]\w\d{5,15}$/.test(this.findNewpassWord)){var a=localStorage.getItem("__Tk");void 0==a&&this.$router.push({name:"Login"}),i["a"].loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"post",url:"/retrievePassword",data:{appkey:this.appkey,phone:this.findPasswordTel,password:this.findNewpassWord}}).then((function(a){i["a"].clear(),s.findPasswordShow=!1,s.findPasswordTel="",s.findNewpassWord="",Object(i["a"])(a.data.msg),s.$router.push({name:"Login"})})).catch((function(s){i["a"].clear()}))}else Object(i["a"])("请输入正确的格式")},exit:function(){var s=this,a=localStorage.getItem("__Tk");i["a"].loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"post",url:"/logout",params:{appkey:this.appkey,tokenString:a}}).then((function(a){i["a"].clear(),Object(i["a"])(a.data.msg),localStorage.setItem("__Tk",""),s.$router.push({name:"Login"})})).catch((function(s){i["a"].clear()}))}}},r=n,d=(t("a585"),t("2877")),p=Object(d["a"])(r,o,e,!1,null,"bac977be",null);a["default"]=p.exports}}]);
//# sourceMappingURL=chunk-063c691a.a98f115a.js.map