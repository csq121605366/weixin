import {wechatHear, signature, redirect, oauth} from "../controllers/wechat";
import {controller, get, post, all} from '../decorator/router'

@controller('')
export class WebchatController {
    @all('/wechat-hear')
    async GET_wechatHear(ctx, next) {
        await wechatHear(ctx, next)
    }
    @get('/wechat-signature')
    async GET_wechatSignature(ctx, next) {
        await signature(ctx, next)
    }
    @get('/wechat-redirect')
    async GET_wechatRedirect(ctx, next) {
        await redirect(ctx, next)
    }
    @get('/wechat-oauth')
    async GET_wechatOauth(ctx, next) {
        await oauth(ctx, next)
    }
}

