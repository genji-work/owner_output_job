import {
  dicCountryService,
  dicCityService,
  allLanguageService
} from "../../services/api";

const state = {
  countryMap: {},
  countryList: [],
  cityMap: {},
  languages: [],
  ready: false
};

const actions = {
  async init({ commit }) {
    const countryRes = await dicCountryService();
    const cityRes = await dicCityService();
    const languageRes = await allLanguageService();
    const countryList = [];
    if (countryRes) {
      await commit("setCountryMap", {
        countryMap: countryRes
      });
    }
    if (cityRes) {
      await commit("setCityMap", {
        cityMap: cityRes
      });
      Object.keys(cityRes).map(item => {
        countryList.push({
          key: item,
          value: cityRes[item]
        });
      });
      await commit("setCountryList", {
        countryList
      });
    }

    if (languageRes && languageRes.code === "200") {
      await commit("setLanguages", {
        languages: languageRes.data
      });
    }
    await commit("setReady", {
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
  setLanguages(state, { languages }) {
    state.languages = languages;
  },
  setCountryList(state, { countryList }) {
    state.countryList = countryList;
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
