import { dicCountryService, dicCityService } from "../../services/api";

const state = {
  countryMap: {},
  cityMap: {},
  ready: false
};

const actions = {
  async init({ commit }) {
    const countryRes = await dicCountryService();
    const cityRes = await dicCityService();
    if (countryRes) {
      commit("setCountryMap", {
        countryMap: countryRes
      });
    }
    if (cityRes) {
      commit("setCityMap", {
        cityMap: cityRes
      });
    }
    commit("setReady", {
      ready: true
    });
  }
};

const getters = {};
const mutations = {
  setCountryMap(state, { countryMap }) {
    state.countryMap = countryMap;
  },
  setCityMap(state, { cityMap }) {
    state.cityMap = cityMap;
  },
  setReady(state, { ready }) {
    state.ready = ready;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
