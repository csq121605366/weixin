import tuling from '../config/tuling';
import axios from 'axios';
let tip =`hellow weixin`;
export default async(ctx, next) => {
    const message = ctx.weixin;
    console.log('repy:', message);


    if(message.MsgType === 'event'){
        if(message.Event==='subscribe'){
            ctx.body=tip;
        }else if(message.Event==='unsubscribe'){
            console.log(message.FromUserName+'取关了');
        }else if(message.Event==='LOCATION'){
            ctx.body='经度:'+message.Latitude+';维度:'+message.Longitude;
        }
    } else if (message.MsgType === 'text') {
        await axios.post(tuling.url, tuling.param).then(res => {
            if (res.data.intent.code == 10004) {
                ctx.body = res.data.results[0].values.text
            } else {
                ctx.body = message.Content;
            }
        })
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
    } else if (message.MsgType === ('video'||'shortvideo')){
        ctx.body = {
            title: message.ThumbMediaId,
            type: message.MsgType,
            mediaId: message.MediaId,
            description:message.ThumbMediaId
        }
    } else if (message.MsgType === 'location') {
        ctx.body = message.Location_X + ':' + message.Location_Y + ":" + message.Label;
    } else if (message.MsgType === 'link') {
        ctx.body ={
            title: message.Title,
            description:message.Description,
            picUrl:'',
            url:message.Url
        };
    }
}