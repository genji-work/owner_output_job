import Vue from "vue";
import Router from "vue-router";

import login from "../components/login";
import menu from "../components/menu";
import main from "../components/main";
import home from "../components/main/home";
import info from "../components/main/info";
import baseInfo from "../components/main/basicInfo";
import uploads from "../components/main/uploads";
import collects from "../components/main/collects";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/",
      name: "menu",
      component: menu
    },
    {
      path: "/main",
      name: "main",
      component: main,
      children: [
        {
          path: "/",
          name: "home",
          component: home
        },
        {
          path: "/main/info",
          name: "info",
          component: info
        },
        {
          path: "/main/base_info",
          name: "base_info",
          component: baseInfo
        },
        {
          path: "/main/uploads",
          name: "uploads",
          component: uploads
        },
        {
          path: "/main/collects",
          name: "collects",
          component: collects
        }
      ]
    }
  ]
});
