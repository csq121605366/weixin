import tuling from '../config/tuling';
import axios from 'axios';
export default async(ctx, next) => {
    const message = ctx.weixin;
    console.log('repy:', message);
    if (message.MsgType === 'text') {
        await axios.post(tuling.url, tuling.param).then(res => {
            if (res.data.intent.code == 10004) {
                ctx.body = res.data.results[0].values.text
            } else {
                ctx.body = message.Content;
            }
        })
    } else if (message.MsgType === 'image') {
        ctx.body = {
            type: 'image',
            mediaId: message.MediaId
        }
    } else if (message.MsgType === 'voice') {
        ctx.body = {
            type: 'voice',
            mediaId: message.MediaId
        }
    } else if (message.MsgType === 'video') {
        ctx.body = {
            title: message.ThumbMediaId,
            type: 'voice',
            mediaId: message.MediaId
        }
    } else if (message.MsgType === 'location') {
        ctx.body = message.Location_X + ':' + message.Location_Y + ":" + message.Label;
    } else if (message.MsgType === 'link') {
        ctx.body = message.title;
    }
}