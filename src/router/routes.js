export const routes = [
  {
    path: '/home',
    name: 'Home',
    component: r => require(['../views/Home.vue'], r),
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: r => require(['../views/mainViews/Menu.vue'], r)
      },
      {
        path: 'order',
        name: 'Order',
        component: r => require(['../views/mainViews/Order.vue'], r)
      },
      {
        path: 'shopcart',
        name: 'Shopcart',
        component: r => require(['../views/mainViews/Shopcart.vue'], r)
      },
      {
        path: 'my',
        name: 'My',
        component: r => require(['../views/mainViews/My.vue'], r)
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: r => require(['../views/register.vue'], r),
  },
  {
    path: '/login',
    name: 'Login',
    component: r => require(['../views/Login.vue'], r),
  },
  {
    path: '/detail',
    name: 'Detail',
    component: r => require(['../views/Detail.vue'], r),
  },
  {
    path: '/search',
    name: 'Search',
    component: r => require(['../views/Search.vue'], r),
  },
  {
    path: '/address',
    name: 'Address',
    component: r => require(['../views/Address.vue'], r),
  },
  {
    path: '/placeOrder',
    name: 'PlaceOrder',
    component: r => require(['../views/PlaceOrder.vue'], r),
  },
  {
    path: '/myAccount',
    name: 'MyAccount',
    component: r => require(['../views/myViews/MyAccount.vue'], r),
  },
  {
    path: '/myAddress',
    name: 'MyAddress',
    component: r => require(['../views/myViews/MyAddress.vue'], r),
  },
  {
    path: '/myCollection',
    name: 'MyCollection',
    component: r => require(['../views/myViews/MyCollection.vue'], r),
  },
  {
    path: '/securityCenter',
    name: 'SecurityCenter',
    component: r => require(['../views/myViews/SecurityCenter.vue'], r),
  },
  {
    path:"*",
    redirect:{
      name:"Menu"
    }
  }
]