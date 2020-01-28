import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const files = require.context("./modules/", false, /\.js$/);
const modules = {};

files.keys().map(item => {
  const tmpKey = item.replace(/\.\//g, "").replace(/\.js/g, "");
  modules[tmpKey] = files(item).default;
});

export default new Vuex.Store({
  modules
});
