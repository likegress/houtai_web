import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    isCollapse: false,
    routes: [], //存放面包屑导航的数组
    routesDefault: null,
    breadFlag: true, //面包屑的动画
  },
  getters: {},
  mutations: {
    isShow(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 面包屑导航的逻辑
    addBreadcrumb(state, val) {
      let index = state.routes.findIndex((item) => item.name == val.name);
      if (index === -1) {
        state.routes.push(val);
      }
    },
    defaultBreadcrumb(state, val) {
      state.routesDefault = val;
    },
    // 关闭tag标签的操作
    closeTag(state, val) {
      let index = state.routes.findIndex((item) => item.name == val.name);
      state.routes.splice(index, 1);
    },
  },
  modules: {},
});
