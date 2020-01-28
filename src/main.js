import Vue from "vue";
import * as ElementUI from "element-ui";
import _ from "lodash";
import cookies from "js-cookie";

import router from "./router";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";

import { intercept } from "./router/intercept";

import "element-ui/lib/theme-chalk/index.css";
import "./styles/reset.scss";
import "./styles/app.scss";

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype = Object.assign(Vue.prototype, {
  _,
  cookies
});

intercept(router);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
