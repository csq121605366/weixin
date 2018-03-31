import fetch from './axios.js';

export function getWechatSignature(url) {
  return fetch({url: '/wechat-signature', method: 'get', params: {
      url
    }})
}

export function getUserByOAuth(url) {
  return fetch({url: '/wechat-oauth', method: 'get', params: {
      url
    }})
}

export function allHouses() {
  return fetch({url: '/api/houses', method: 'get'})
}

export function focusHouse(id) {
  return fetch({url: `/houses/detail`, method: 'get'})
}

export function povCharacters() {
  return fetch({url: '/characters', method: 'get'})
}

export function focusCharacter(id) {
  return fetch({url: `/characters/detail`, method: 'get'})
}


export function fetchCities() {
  return fetch({url: '/cities', method: 'get'})
}

export function allProducts(){
  return fetch({url: '/products', method: 'get'})
}