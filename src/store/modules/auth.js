import cookies from "js-cookie";

const state = {
  userdata: {}
};
const actions = {
  saveLoginUserName(state, name) {
    cookies.set("login_user_name", name);
  }
};
const getters = {
  userdata(state) {
    return state.userdata;
  }
};
const mutations = {
  setUserData(state, data) {
    state.userdata = data;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
