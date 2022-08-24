import instance from "@/api/api"

export default {
  state: {
    categoryList: [],
    categoryTagList: [],
  },
  getters: {
    //返回商品数组列表
    categoryList: (state) => state.categoryList,
    categoryTagList: (state) => state.categoryTagList,
  },
  mutations: {
    setCategoryList(state,list){
        state.categoryList = list
    },
    setCategoryTagList(state,list){
        state.categoryTagList = list;
    }
  },
  actions: {
    //请求出数据给vuex
    getCategoryList({commit}){
        instance.get("/category/list").then(({ data:{data}}) => {
            console.log(data);
            commit("setCategoryList", data.list);
        });
    },
    getCategoryTagList({commit}){
        instance.get("/category/tag/list").then(({ data:{data} }) => {
          commit("setCategoryTagList", data);
        });
    }
  },
  namespaced:true
}; 