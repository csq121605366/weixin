import axios from 'axios';

const baseurl = '';

class Services {
    getWechatSignature(url) {
        return axios.get(`${baseurl}/wechat-signature?url=${url}`);
    }
}



export default new Services;