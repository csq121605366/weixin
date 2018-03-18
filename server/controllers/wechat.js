import * as api from '../api'
import { parse as urlParse } from 'url'
import { parse as queryParse } from 'querystring'
import config from '../config'

export async function signature (ctx, next) {
  let url = ctx.query.url ? decodeURIComponent(ctx.query.url) : ctx.throw(404)
  let params = await api.getSignatureAsync(url)
  ctx.body = {
    success: true,
    params: params
  }
}

export async function redirect (ctx, next) {
  let target = config.SITE_ROOT_URL + '/oauth'
  let scope = 'snsapi_userinfo'
  let { visit, id } = ctx.query
  let params = `${visit}_${id}`
  let url = api.getAuthorizeURL(scope, target, params)
  ctx.redirect(url)
}

export async function oauth (ctx, next) {
  let url = ctx.query.url ? decodeURIComponent(ctx.query.url) : ctx.throw(404)
  let urlObj = urlParse(url)
  let params = queryParse(urlObj.query)
  let code = params.code
  let user = await api.getUserByCode(code)
  ctx.body = {
    success: true,
    data: user
  }
}
