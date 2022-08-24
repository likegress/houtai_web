import instance from "@/api/api";
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
  },
  mutations: {
    setUser(state, v) {
      state.user = v;
    },
  },
  actions: {
    getUser({ commit }) {
      //获取用户权限
      return instance.get("/who").then(({data:data}) => {
        if (!data.errcode) {
          commit("setUser", data.data);
          return true;
        } else {
          return false;
        }
      });
    },
  },
  namespaced: true,
};
