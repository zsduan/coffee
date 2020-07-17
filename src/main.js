import Vue from 'vue'
import App from './App.vue'
// 导入axios的数据
import axios from 'axios'
import VueAxios from 'vue-axios'

import router from './router'
import store from './store'
Vue.prototype.$axios = axios;

// 导入图标
import "font-awesome/css/font-awesome.min.css"

//防止点击同一路由，出现错误
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
    return originalPush.call(this, location).catch(err => err);
}

// 导入组件
import {
    Button,
    NavBar,
    Form,
    Field,
    Tabbar,
    TabbarItem,
    Swipe,
    SwipeItem,
    Search,
    DropdownMenu,
    DropdownItem,
    Card,
    Icon,
    Stepper,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    SwipeCell,
    Empty,
    Checkbox,
    CheckboxGroup,
    SubmitBar,
    Tab,
    Tabs,
    ActionSheet,
    AddressList,
    AddressEdit,
    List,
    Popup,
    Uploader,
    Dialog,
    Cell,
    CellGroup
} from 'vant'
// 导入配置rem的配置文件
import 'lib-flexible'

Vue.config.productionTip = false

// 注册axios组件
Vue.use(VueAxios, axios)

// 配置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

// 配置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'

// 添加appkey属性保存appkey
Vue.prototype.appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="

Vue.config.productionTip = false

// 发起请求前处理
axios.interceptors.request.use(config => {
    if (config.method == "post") {
        let paramsString = "";
        for (let key in config.data) {
            paramsString += key + "=" + config.data[key] + "&";
        }
        config.data = paramsString.slice(0, -1);
    }
    return config;
})

// 发起请求

Vue
    .use(Button)
    .use(NavBar)
    .use(Form)
    .use(Field)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Swipe)
    .use(SwipeItem)
    .use(Search)
    .use(DropdownMenu)
    .use(DropdownItem)
    .use(Card)
    .use(Icon)
    .use(Stepper)
    .use(GoodsAction)
    .use(GoodsActionIcon)
    .use(GoodsActionButton)
    .use(SwipeCell)
    .use(Empty)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(SubmitBar)
    .use(Tab)
    .use(Tabs)
    .use(ActionSheet)
    .use(AddressList)
    .use(AddressEdit)
    .use(List)
    .use(Popup)
    .use(Uploader)
    .use(Dialog)
    .use(Cell)
    .use(CellGroup);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')