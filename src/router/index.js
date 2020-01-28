import Vue from "vue";
import Router from "vue-router";

import login from "../components/login";
import menu from "../components/menu";
import home from "../components/home";

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
      path: "/home",
      name: home,
      component: home,
      children: []
    }
  ]
});
