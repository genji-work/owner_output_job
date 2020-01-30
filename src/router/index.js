import Vue from "vue";
import Router from "vue-router";

import login from "../components/login";
import menu from "../components/menu";
import main from "../components/main";
import home from "../components/main/home";

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
        }
      ]
    }
  ]
});
