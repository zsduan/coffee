(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71993515"],{"2c05":function(t,s,a){"use strict";var e=a("37b6"),o=a.n(e);o.a},"37b6":function(t,s,a){},"4ffd":function(t,s,a){t.exports=a.p+"img/logo.8b4d07b5.png"},5172:function(t,s,a){"use strict";a("45e1"),a("5128"),a("b062"),a("b0d4"),a("8063"),a("a2ba"),a("368d")},a55b:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"login"},[a("van-nav-bar",{attrs:{title:"登录","left-text":"返回","left-arrow":"","right-text":"注册"},on:{"click-left":t.prev,"click-right":function(s){return t.goPage("Register")}}}),t._m(0),a("van-form",{staticClass:"form",attrs:{"validate-first":""}},[a("van-field",{attrs:{type:"tel",label:"手机号",placeholder:"请输入手机号",rules:[{pattern:t.pattern,message:"请输入正确手机号"}],"left-icon":"phone-o"},model:{value:t.phone,callback:function(s){t.phone=s},expression:"phone"}}),a("van-field",{attrs:{type:t.isEye?"text":"password",label:"密码",placeholder:"请输入密码",rules:[{validator:t.validator,message:"密码用字母开头6-15位"}],"left-icon":"lock","right-icon":t.isEye?"eye-o":"closed-eye"},on:{"click-right-icon":t.showpwd},model:{value:t.password,callback:function(s){t.password=s},expression:"password"}}),a("div",{staticClass:"forget"},[a("span",{on:{click:t.showPop}},[t._v("忘记密码？")])]),a("div",{staticStyle:{margin:"16px"}},[a("van-button",{staticClass:"btn",attrs:{round:"",block:"",type:"info","native-type":"submit"},on:{click:t.sbumit}},[t._v(" 登录 ")])],1)],1),a("van-popup",{staticClass:"updatapass",model:{value:t.findPasswordShow,callback:function(s){t.findPasswordShow=s},expression:"findPasswordShow"}},[a("p",[t._v("找回密码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.findPasswordTel,expression:"findPasswordTel"}],attrs:{type:"tel",placeholder:"注册时手机号"},domProps:{value:t.findPasswordTel},on:{input:function(s){s.target.composing||(t.findPasswordTel=s.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.findNewpassWord,expression:"findNewpassWord"}],attrs:{type:"password",placeholder:"新密码(字母开头6位以上)"},domProps:{value:t.findNewpassWord},on:{input:function(s){s.target.composing||(t.findNewpassWord=s.target.value)}}}),a("div",{staticClass:"btns"},[a("van-button",{attrs:{type:"info",plain:""},on:{click:t.findPasswrodSbumit}},[t._v("提交")]),a("van-button",{attrs:{type:"info",plain:""},on:{click:t.findPasswrodCancel}},[t._v("取消")])],1)])],1)},o=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"logo"},[e("img",{attrs:{src:a("4ffd"),alt:""}})])}],i=(a("5172"),a("0a68")),n={name:"Login",data:function(){return{phone:"",password:"",nickName:"",pattern:/^1[3|4|5|7|8][0-9]{9}$/,isEye:!1,findPasswordShow:!1,findPasswordTel:"",findNewpassWord:""}},methods:{prev:function(){this.$router.go(-1)},goPage:function(t){this.$router.push({name:t})},sbumit:function(){var t=this,s=/^1[3|4|5|7|8][0-9]{9}$/;if(this.validator()&&""!=this.phone&&s.test(this.phone))return i["a"].loading({message:"登录中...",forbidClick:!0,duration:0}),void this.axios({method:"POST",url:"/login",data:{appkey:this.appkey,password:this.password,phone:this.phone}}).then((function(s){i["a"].clear(),Object(i["a"])(s.data.msg),localStorage.setItem("__Tk",s.data.token),t.$router.go(-1)})).catch((function(t){i["a"].clear()}));Object(i["a"])("请检查后再次提交")},validator:function(){return/^[a-zA-Z]\w\d{5,15}$/.test(this.password)},showpwd:function(){this.isEye=!this.isEye},showPop:function(){this.findPasswordShow=!0},findPasswrodCancel:function(){this.findPasswordShow=!1},findPasswrodSbumit:function(){""!=this.findPasswordTel&&""!=this.findNewpassWord?this.findpasswrod():Object(i["a"])("请把信息填写完整！")},findpasswrod:function(){var t=this;if(/^[a-zA-Z]\w\d{5,15}$/.test(this.findNewpassWord)&&!/^1[3|4|5|7|8][0-9]{9}$/.test(this.findPasswordTel)){var s=localStorage.getItem("__Tk");void 0==s&&this.$router.push({name:"Login"}),i["a"].loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"post",url:"/retrievePassword",data:{appkey:this.appkey,phone:this.findPasswordTel,password:this.findNewpassWord}}).then((function(s){i["a"].clear(),t.findPasswordTel="",t.findNewpassWord="",Object(i["a"])(s.data.msg)})).catch((function(t){i["a"].clear()}))}else Object(i["a"])("请输入正确的格式")}}},r=n,d=(a("2c05"),a("2877")),l=Object(d["a"])(r,e,o,!1,null,"7b3346f0",null);s["default"]=l.exports}}]);
//# sourceMappingURL=chunk-71993515.aa122aef.js.map