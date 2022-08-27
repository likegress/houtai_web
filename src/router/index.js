import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress"; // 导入 nprogress
import "nprogress/nprogress.css";
import layout from "@/views/layout/shopLayout.vue";
import store from "../store";
NProgress.configure({ showSpinner: false }); // 显示右上角螺旋加载提示

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
        path: "/home/index",
        name: "index",
        component: () => import("../views/home/TableView.vue"),
        meta: { pathName: "首页", icon: "el-icon-s-home" },
      },
      {
        path: "/home/sale",
        name: "sale",
        component: () => import("../views/sale/AboutView.vue"),
        meta: {
          pathName: "订单管理",
          permissions: ["sale.order.current"],
          icon: "el-icon-message-solid",
        },
        children: [
          {
            path: "/home/sale/current",
            name: "current",
            component: () => import("../views/sale/Current.vue"),
            meta: {
              pathName: "备餐套餐",
              icon: "el-icon-message-solid",
              permissions: ["sale.order.current"],
            },
          },
          {
            path: "/home/sale/history",
            name: "history",
            component: () => import("../views/sale/History.vue"),
            meta: {
              pathName: "历史订单",
              icon: "el-icon-s-claim",
              permissions: ["sale.order.history"],
            },
          },
        ],
      },
      {
        path: "/home/xiajia",
        name: "xiajia",
        meta: { pathName: "商品管理", icon: "el-icon-s-shop" },
        component: layout,
        children: [
          {
            path: "/home/xiajia/shop",
            name: "shop",
            component: () => import("../views/ShopView.vue"),
            meta: {
              pathName: "分类管理",
              icon: "el-icon-menu",
              permissions: ["shop.category.read"],
            },
          },
          {
            path: "/home/xiajia/product",
            name: "product",
            meta: {
              pathName: "商品管理",
              icon: "el-icon-s-goods",
              permissions: ["shop.product.read"],
            },
            component: () => import("@/views/layout/Product.vue"),
          },
          {
            path: "/home/xiajia/sale",
            name: "sale",
            meta: {
              pathName: "上架下架",
              icon: "el-icon-s-platform",
              permissions: ["shop.sale.read"],
            },
            component: () => import("@/views/layout/Sale.vue"),
          },
        ],
      },
      {
        path: "/home/admin",
        name: "admin",
        meta: { pathName: "系统管理", icon: "el-icon-s-tools" },
        component: () => import("@/views/admin/Admin.vue"),
        children: [
          {
            path: "/home/admin/user",
            name: "user",
            meta: {
              pathName: "用户管理",
              icon: "el-icon-user-solid",
              permissions: ["admin.user.read"],
            },
            component: () => import("@/views/admin/User.vue"),
          },
          {
            path: "/home/admin/role",
            name: "role",
            meta: {
              pathName: "角色管理",
              icon: "el-icon-s-check",
              permissions: ["admin.role.read"],
            },
            component: () => import("@/views/admin/Role.vue"),
          },
        ],
      },
    ],
  }
];

const router = new VueRouter({
  routes,
});
router.beforeEach(async (to, from, next) => {
  NProgress.start(); // 开启进度条
  next();
  if (to.name == "login") {
    // 登录界面不设权限
    next();
  } else {
    // 非登录界面设置权限
    // let token = localStorage.getItem("token");
    if (document.cookie.includes("seec_shop")) {
      //获取权限数组
      let pass = store.state.user.user.permissions.length > 0;
      if (!pass) pass = await store.dispatch("user/getUser");
      if (pass) {
        next();
      } else {
        next("/login");
      }
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
export const authRoutes = [{
  path: "/home",
  name: "home",
  redirect: "/home/index",
  meta: { pathName: "首页" },
  component: () => import("../views/HomeView.vue"),
  children: [
    {
      path: "/home/index",
      name: "index",
      component: () => import("../views/home/TableView.vue"),
      meta: { pathName: "首页", icon: "el-icon-s-home" },
    },
    {
      path: "/home/sale",
      name: "sale",
      component: () => import("../views/sale/AboutView.vue"),
      meta: {
        pathName: "订单管理",
        permissions: ["sale.order.current"],
        icon: "el-icon-message-solid",
      },
      children: [
        {
          path: "/home/sale/current",
          name: "current",
          component: () => import("../views/sale/Current.vue"),
          meta: {
            pathName: "备餐套餐",
            icon: "el-icon-message-solid",
            permissions: ["sale.order.current"],
          },
        },
        {
          path: "/home/sale/history",
          name: "history",
          component: () => import("../views/sale/History.vue"),
          meta: {
            pathName: "历史订单",
            icon: "el-icon-s-claim",
            permissions: ["sale.order.history"],
          },
        },
      ],
    },
    {
      path: "/home/xiajia",
      name: "xiajia",
      meta: { pathName: "商品管理", icon: "el-icon-s-shop" },
      component: layout,
      children: [
        {
          path: "/home/xiajia/shop",
          name: "shop",
          component: () => import("../views/ShopView.vue"),
          meta: {
            pathName: "分类管理",
            icon: "el-icon-menu",
            permissions: ["shop.category.read"],
          },
        },
        {
          path: "/home/xiajia/product",
          name: "product",
          meta: {
            pathName: "商品管理",
            icon: "el-icon-s-goods",
            permissions: ["shop.product.read"],
          },
          component: () => import("@/views/layout/Product.vue"),
        },
        {
          path: "/home/xiajia/sale",
          name: "sale",
          meta: {
            pathName: "上架下架",
            icon: "el-icon-s-platform",
            permissions: ["shop.sale.read"],
          },
          component: () => import("@/views/layout/Sale.vue"),
        },
      ],
    },
    {
      path: "/home/admin",
      name: "admin",
      meta: { pathName: "系统管理", icon: "el-icon-s-tools" },
      component: () => import("@/views/admin/Admin.vue"),
      children: [
        {
          path: "/home/admin/user",
          name: "user",
          meta: {
            pathName: "用户管理",
            icon: "el-icon-user-solid",
            permissions: ["admin.user.read"],
          },
          component: () => import("@/views/admin/User.vue"),
        },
        {
          path: "/home/admin/role",
          name: "role",
          meta: {
            pathName: "角色管理",
            icon: "el-icon-s-check",
            permissions: ["admin.role.read"],
          },
          component: () => import("@/views/admin/Role.vue"),
        },
      ],
    },
  ],
}];
export const resetRouter = ()=>{
  const _router = new VueRouter({routes})
  router.matcher = _router.matcher
}
