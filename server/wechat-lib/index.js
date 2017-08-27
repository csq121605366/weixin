import request from 'request-promise';
import formstream from 'formstream';
import _ from 'lodash';
import fs from 'fs';
const baseUrl = 'https://api.weixin.qq.com/cgi-bin/';
const api = {
    accessToken: baseUrl + 'token?grant_type=client_credential',
    temporary:{
        upload:baseUrl+'media/upload?',
        fetch:baseUrl+'media/get?'
    },
    permanent:{
        upload:baseUrl+'material/add_material?',
        uploadNews:baseUrl+'material/add_news?',
        uploadNewsPic:baseUrl+'media/uploadimg?',
        fetch:baseUrl+'material/get_material?',
        del:baseUrl+'material/del_material?',
        update:baseUrl+'material/update_news?',
        count:baseUrl+'material/get_materialcount?',
        batch:baseUrl+'material/batchget_material?'
    }
}

function statFile (filepath){
    return new Promise((resolve,reject)=>{
        fs.stat(filepath,(err,stat)=>{
            if(err)reject(err);
            resolve(stat);
        })
    })
}


export default class Wechat {
    constructor(opts) {
        this.opts = Object.assign({}, opts);
        this.appID = opts.appID;
        this.appSecret = opts.appSecret;
        this.getAccessToken = opts.getAccessToken;
        this.saveAccessToken = opts.saveAccessToken;
        this.fetchAccessToken();
    }
    async request(options) {
        options = Object.assign({}, options, { json: true });
        try {
            const response = await request(options);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    async fetchAccessToken() {
        let data = await this.getAccessToken();
        if (!this.isVaildAccessToken(data, 'access_token')) {
            data = await this.updateAccessToken();
        }
        await this.saveAccessToken(data);
        return data
    }
    async updateAccessToken() {
        const url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret;
        const data = await this.request({ url: url });
        const now = (new Date().getTime());
        const expiresIn = now + (data.expires_in - 20) * 1000;
        data.expires_in = expiresIn;
        return data;
    }
    isVaildAccessToken(data, name) {
        // 检测获取的token是否有效
        if (!data || !data[name] || !data.expires_in) {
            return false;
        }
        // 获取token生成时间
        const expiresIn = data.expires_in;
        // 获取当前时间
        const now = (new Date().getTime());

        if (now < expiresIn) {
            return true;
        } else {
            return false;
        }
    }
    // 上传素材
    uploadMaterial(token,type,material,permanent){
        let form = {};
        let url=permanent?api.permanent:api.temporary.upload;
        if(permanent){
            _.assign(form,permanent);
        }
        if(type === 'pic'){
            url=api.permanent.uploadNewsPic
        }else if(type === 'news'){
            url=api.permanent.uploadNews
        }else {
            form = formstream();
            const stat = await statFile(material)

            form.file('media',material,path.basename(material),stat.size);
        }
    
    }
}
