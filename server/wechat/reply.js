import tuling from '../config/tuling';
import axios from 'axios';
let tip = `hellow weixin`;


let mp = require('../wechat');
let client = mp.getWechat();

export default async(ctx, next) => {
    const message = ctx.weixin;
    console.log("message", message);
    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            ctx.body = tip;
        } else if (message.Event === 'unsubscribe') {
            console.log(message.FromUserName + '取关了');
        } else if (message.Event === 'LOCATION') {
            ctx.body = '经度:' + message.Latitude + ';维度:' + message.Longitude;
        } else if (message.Event === 'view') {
            ctx.body = message.EventKey + message.MenuId;
        } else if (message.Event === 'pic_sysphoto') {
            ctx.body = message.Count + 'photos sent';
        }

    } else if (message.MsgType === 'text') {
        // await axios.post(tuling.url, tuling.param).then(res => {
        //     if (res.data.intent.code == 10004) {
        //         ctx.body = res.data.results[0].values.text
        //     } else {
        //         ctx.body = message.Content;
        //     }
        // })
        let data = '';
        if (message.Content === '1') {
            data = await client.handle('getMenu');
        } else if (message.Content === '2') {
            let menu = require('./menu.js');
            console.log("menu", menu);
            data = await client.handle('createMenu', menu);
        } else if (message.Content === '3') {
            data = await client.handle('delMenu');
        } else if (message.Content === '4') {
            data = await client.handle('batchTag', ['oL4Apwv4Oz42DKG3Ngr0bstgRavQ'], 100, true);
        } else if (message.Content === '5') {
            data = await client.handle('getTagList', 'oL4Apwv4Oz42DKG3Ngr0bstgRavQ');
        }

        console.log(data);

    } else if (message.MsgType === 'image') {
        ctx.body = {
            type: message.MsgType,
            mediaId: message.MediaId
        }
    } else if (message.MsgType === 'voice') {
        ctx.body = {
            type: message.MsgType,
            mediaId: message.MediaId
        }
    } else if (message.MsgType === ('video' || 'shortvideo')) {
        ctx.body = {
            title: message.ThumbMediaId,
            type: message.MsgType,
            mediaId: message.MediaId,
            description: message.ThumbMediaId
        }
    } else if (message.MsgType === 'location') {
        ctx.body = message.Location_X + ':' + message.Location_Y + ":" + message.Label;
    } else if (message.MsgType === 'link') {
        ctx.body = {
            title: message.Title,
            description: message.Description,
            picUrl: '',
            url: message.Url
        };
    }
}