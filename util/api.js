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

export function fetchHouses() {
  return fetch({url: '/api/houses', method: 'get'})
}

export function fetchHouse(id) {
  return fetch({url: `/api/houses/detail`, method: 'get'})
}

export function fetchCharacters() {
  return fetch({url: '/api/characters', method: 'get'})
}

export function fetchCharacter(id) {
  return fetch({url: `/api/characters/detail`, method: 'get'})
}

export function fetchCities() {
  return fetch({url: '/api/cities', method: 'get'})
}
