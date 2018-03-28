import {
  getWechatSignature,
  getUserByOAuth,
  allHouses,
  focusHouse,
  povCharacters,
  allProducts,
  focusCharacter
} from "../util/api.js";

export default {
  wechatSignature({
    commit
  }, url) {
    console.log(url)
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
  getUserByOAuth({
    commit
  }, url) {
    return getUserByOAuth(url);
  },

  async fetchHouses({state}) {
    const res = await allHouses().then(res => {
      state.houses = res.data
    })
  },

  async focusHouse({state}) {
    const res = await focusHouse().then(res => {
      state.focusHouse = res.data
    })
  },

  async fetchCharacters({state}) {
    const res = await povCharacters().then(res => {
      state.characters = res.data
    })

  },
  async focusCharacter({
    state
  }, _id) {
    if (_id === state.focusCharacter._id) 
      return
    const res = await focusCharacter(_id).then(res => {
      state.focusCharacter = res.data
    })

  },

  async fetchProducts({state}) {
    const res = await allProducts().then(res => {
      state.products = res.data
    })
  }
};
