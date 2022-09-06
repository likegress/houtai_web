import instance from "@/api/api";
import router,{authRoutes} from "@/router/index"
import { deepTree, filterMenus } from "@/plugin/premissions";
export default {
  state: {
    user: {
      id: "",
      username: "",
      avatar: "",
      permissions: [],
    },
    menus: [],
  },
  getters: {
    userId: (state) => state.user.id,
    user: (state) => state.user,
    permissions: (state) => state.user.permissions,
    menus:(state)=> state.menus
  },
  mutations: {
    setUser(state, v) {
      state.user = v;
    },
    setMenus(state,v){
      state.menus = v
    }
  },
  actions: {
    getUser({ commit}) {
      //获取用户权限
      return instance.get("/who").then(({data:data}) => {
        if (!data.errcode) {
          commit("setUser", data.data);
        
          const menu = deepTree(authRoutes)[0].children;
          // console.log(menu);
          const m = filterMenus(menu,data.data.permissions);
          authRoutes.forEach((r) => router.addRoute(r));
          // router.addRoute(authRoutes);
          commit("setMenus", m);
          return true;
        } else {
          return false;
        }
      });
    },
  },
  namespaced: true,
};
