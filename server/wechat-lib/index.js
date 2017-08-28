import request from 'request-promise';
import formstream from 'formstream';
import assign from 'lodash/assign';
import fs from 'fs';
import path from 'path';
const baseUrl = 'https://api.weixin.qq.com/cgi-bin/';
const api = {
    accessToken: baseUrl + 'token?grant_type=client_credential',
    temporary: {
        upload: baseUrl + 'media/upload?',
        fetch: baseUrl + 'media/get?'
    },
    permanent: {
        // 新增其他类型素材
        upload: baseUrl + 'material/add_material?',
        // 新增图文素材
        uploadNews: baseUrl + 'material/add_news?',
        // 上传图文消息内的图片获取URL 
        uploadNewsPic: baseUrl + 'media/uploadimg?',
        // 获取素材
        fetch: baseUrl + 'material/get_material?',
        // 删除永久素材
        del: baseUrl + 'material/del_material?',
        // 修改永久图文素材
        update: baseUrl + 'material/update_news?',
        // 获取素材总数
        count: baseUrl + 'material/get_materialcount?',
        // 获取素材列表
        batch: baseUrl + 'material/batchget_material?'
    },
    tags: {
        // 创建标签
        create: baseUrl + 'tags/create?',
        // 获取公众号已创建的标签
        fetch: baseUrl + 'tags/get?',
        // 编辑标签
        update: baseUrl + 'tags/update?',
        // 删除标签
        del: baseUrl + 'tags/delete?',
        // 获取标签下粉丝列表
        fetchUsers: baseUrl + 'user/tag/get?',
        // 批量为用户打标签
        batchTag: baseUrl + 'tags/members/batchtagging?',
        // 批量为用户取消标签
        batchUnTag: baseUrl + 'tags/members/batchuntagging?',
        // 获取用户身上的标签列表
        getTagList: baseUrl + 'tags/getidlist?'
    }
}

function statFile(filepath) {
    return new Promise((resolve, reject) => {
        fs.stat(filepath, (err, stat) => {
            if (err) reject(err);
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
            console.error('request:', error);
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

    /**
     * 
     * @param {*} data 日期
     * @param {*} name 
     */
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

    /**
     * 事件句柄
     * @param {*} operation 操作类型
     * @param {*} args 其余参数
     */
    async handle(operation, ...args) {
        let tokenData = await this.fetchAccessToken();
        let options = this[operation](tokenData.token, ...args);
        let data = await this.request(options);
        console.log(data);
        return data;
    }

    /**
     * 上传素材
     * @param {*} token token
     * @param {*} type 素材类型
     * @param {*} material 素材地址
     * @param {*} permanent 是否为永久素材，如果存在permanent则为永久素材否则相反
     */
    uploadMaterial(token, type, material, permanent) {
        let form = {};
        let url = permanent ? api.permanent.upload : api.temporary.upload;
        if (permanent) {
            assign(form, permanent);
        }
        if (type === 'pic') {
            url = api.permanent.uploadNewsPic
        }
        if (type === 'news') {
            url = api.permanent.uploadNews;
            form = material;
        } else {
            form.media = fs.createReadStream(material);
        }
        url = url + 'access_token=' + token;
        if (!permanent) {
            url += '&type=' + type;
        } else {
            if (type !== 'news') {
                form.access_token = token
            }
        }
        if (type === 'news') {
            return { method: 'POST', url: url, body: form, json: true };
        } else {
            return { method: 'POST', url: url, formData: form, json: true };
        }
    }

    /**
     * 获取素材
     * @param {*} token token
     * @param {*} mediaId 媒体id  
     * @param {*} type 获取素材类型
     * @param {*} permanent 是否为永久素材，如果存在permanent则为永久素材否则相反
     */
    fetchMaterial(token, mediaId, type, permanent) {
        let form = {};
        let url = permanent ? api.permanent.upload : api.temporary.upload;
        let fetchUrl = url + 'access_token=' + token;
        if (permanent) {
            form.media_id = mediaId;
            form.access_token = token;
        } else {
            if (type === 'video') {
                url = url.replace('https://', 'http://');
            }
            url += '&media_id=' + mediaId;
        }
        return { method: 'POST', url: url, body: form };
    }

    /**
     *  删除永久素材    
     * @param {*} token token
     * @param {*} meidaId 媒体id
     */
    deleteMaterial(token, meidaId) {
        let form = {
            media_id: mediaId
        }
        let url = api.permanent.del + 'access_token=' + token + '&media_id=' + meidaId;
        return { method: 'POST', url: url, body: form };
    }

    /**
     * 更新图文内容
     * @param {*} token token
     * @param {*} mediaId 媒体id
     * @param {*} news 新闻内容
     */
    updateMaterial(token, mediaId, news) {
        let form = {
            media_id: mediaId
        }
        assign(form, news);
        let url = api.permanent.update + 'access_token=' + token + '&media_id=' + mediaId;
        return { method: 'GET', url: url, body: form };
    }

    /**
     * 
     * @param {*} token token
     * @param {*} options 参数
     */
    countMaterial(token, options = { type: 'image', offset: 0, count: 10 }) {
        let url = api.permanent.batch + 'access_token=' + token
        return { method: 'POST', url: url, body: options };
    }

    /**
     * 新增标签
     * @param {*} token 
     * @param {*} name 要新增的标签名称
     */
    createTag(token, name) {
        let form = {
            tag: {
                name: name
            }
        }
        let url = api.tag.create + 'access_token=' + token;
        return { method: 'POST', url: url, body: form };
    }

    fetchTags(token) {
        let url = api.tag.fetch + 'access_token' + token;
        return { url: url };
    }

    updateTag(token, tagId, name) {
        let form = {
            tag: {
                id: tagId,
                name: name
            }
        }
        let url = api.tag.update + 'access_token=' + token;
        return { methods: 'POST', url: url, body: form };
    }

    delTag(token, tagId) {
        let form = {
            tag: {
                id: tagId
            }
        }
        let url = api.tag.update + 'access_token=' + token;
        return { methods: 'POST', url: url, body: form };
    }

    fetchTagUsers(token, tagId, next_openid = "") {
        let form = {
            tagid: tagId,
            next_openid: next_openid
        }
        let url = api.tag.fetchUsers + 'access_token=' + token;
    }

}