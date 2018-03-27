
import fetch from './axios.js';

export function getWechatSignature(url) {
    return fetch({
        url: '/wechat-signature',
        method: 'get',
        params: { url }
    })
};

export function getUserByOAuth(url) {
    return fetch({
        url: '/wechat-oauth',
        method: 'get',
        params: { url }
    })
};

export function fetchHouses() {
    return fetch({
        url: '/houses',
        method: 'get'
    })
};

export function fetchHouse(id) {
    return fetch({
        url: `/houses/${id}`,
        method: 'get'
    })
};

export function fetchCharacters() {
    return fetch({
        url: '/characters',
        method: 'get'
    })
};

export function fetchCharacter(id) {
    return fetch({
        url: `/characters/${id}`,
        method: 'get'
    })
};

export function fetchCities() {
    return fetch({
        url: '/cities',
        method: 'get'
    })
};