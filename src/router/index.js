import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from 'nprogress'   // 导入 nprogress
import "nprogress/nprogress.css";
import layout from "@/views/layout/shopLayout.vue";
NProgress.configure({ showSpinner: false })   // 显示右上角螺旋加载提示

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/home",
    name: "home",
    redirect: "/home/index",
    meta: { pathName: "首页" },
    component: () => import("../views/HomeView.vue"),
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("../views/home/TableView.vue"),
        meta: { pathName: "首页" },
      },
      {
        path: "about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
        meta: { pathName: "关于页面" },
      },
      {
        path: "shop",
        name: "shop",
        component: () => import("../views/ShopView.vue"),
        meta: { pathName: "商品管理", need: true },
      },
      {
        path: "xiajia",
        name: "xiajia",
        meta: { pathName: "商品下架" },
        component: layout,
        children: [
          {
            path: "todu",
            name: "todu",
            meta: { pathName: "toduList" },
            component: () => import("@/views/layout/ToduListView.vue"),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
   NProgress.start()   // 开启进度条
  if (to.name == "login") {
    // 登录界面不设权限
    next();
  } else {
    // 非登录界面设置权限
    let token = localStorage.getItem("token");    
    if (token) {
      // 有权限
      next();
    } else {
      // 没有权限
      next("/login");
    }
  }
});
router.afterEach((to, from) => {
  NProgress.done();
});

// 重复点击进入该组件不报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default router;
