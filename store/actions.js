import { getWechatSignature, getUserByOAuth } from "../util/api.js";

export default {
  wechatSignature({ commit }, url) {
    return new Promise((response, reject) => {
      getWechatSignature(url).then(res => {
        console.log(res);
        if (res.success) {
          commit("SET_WXJSSDKPARAMS", res.params);
          response(res);
        } else {
          reject(res);
        }
      });
    })
  },
  getUserByOAuth({ commit }, url) {
    return getUserByOAuth(url);
  }
  /*  
        async fetchHouses({ state }) {
            const res = await Services.fetchHouses();
            state.houses = res.data.data;
            return res;
        },
        async fetchCharacters({ state }) {
            const res = await Services.fetchCharacters();
            state.characters = res.data.data;
            return res;
        },
        async fetchCities({ state }) {
            const res = await Services.fetchCities();
            state.cities = res.data.data;
            return res;
        } */
};
