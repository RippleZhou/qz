import Vue from "vue";
import Router from "vue-router";
// import store from "../store";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/User.vue")
    },
    {
      path: "/",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/Login.vue")
    },
    {
      path: '/findPassword',
      name: 'findPassword',
      component: () => import('@/views/FindPassword.vue')
    },
    {
      path: "/accountList",
      name: "accountList",
      component: () => import("@/views/AccountList.vue")
    },
    {
      path: "/cash",
      name: "cash",
      component: () => import("@/views/Cash.vue")
    },
    {
      path: '/accountDetails',
      name: 'accountDetails',
      component: () => import('@/views/AccountDetails.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/Order.vue')
    },
    {
      path: "/setPage",
      name: "setPage",
      component: () => import("@/views/setPage.vue")
    },
    {
      path: "/setPaypw",
      name: "setPaypw",
      component: () => import("@/views/setPaypw.vue")
    },
    {
      path: "/success",
      name: "success",
      component: () => import("@/views/Success.vue")
    },{
      path:'/modifyPayPw',
      name:'modifyPayPw',
      component: () => import("@/views/modifyPayPw.vue")
    },{
      path:'/findPayPw',
      name:'findPayPw',
      component: () => import("@/views/findPayPw.vue")
    },{
      path:'/setPawpwNext',
      name:'setPawpwNext',
      component: () => import("@/views/setPawpwNext.vue")
      }
  ]
});
