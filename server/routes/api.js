import {api} from "../controllers/pages";
import {controller, get, post, all} from '../decorator/router'

@controller('/api')
export class WebchatController {
    @all(':type')
    async GET_Hourses(ctx, next) {
        await api(ctx, next)
    }
}