import axios from 'axios';

const baseurl = '';

class Services {
    getWechatSignature(url) {
        return axios.get(`${baseurl}/wechat-signature?url=${url}`);
    }
    getUserByOAuth(url) {
        return axios.get(`${baseurl}/wechat-oauth?url=${url}`);
    }
}



export default new Services;