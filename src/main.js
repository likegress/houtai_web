import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// console.log(router);
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueLazyload from "vue-lazyload";
import axios from "axios";

import ProTable from "@/components/ProTable.vue";
import ProForm from "@/components/ProForm.vue";

Vue.component("ProTable", ProTable);
Vue.component("ProForm", ProForm);

//引入mock 拦截
// console.log(process.env.VUE_APP_API);
if(process.env.NODE_ENV === 'development'){
  
  require("./mock/mock")
}
Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.use(VueLazyload, {
  loading: require("@/assets/404_images/404.png"),
  error: require("@/assets/404_images/404_cloud.png"),
});


Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate(){
    Vue.prototype.$eventBus = this
  }
}).$mount("#app");
