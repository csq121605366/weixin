const mongoose = require('mongoose');


const TokenSchema = new mongoose.Schema({
    name: String,
    token: String,
    expires_in: Number,
    meta: {
        created: {
            type: Date,
            default: Date.now()
        },
        updated: {
            type: Date,
            default: Date.now()
        }
    }
})



TokenSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now();
    } else {
        this.meta.createdAt = Date.now()
    }
})

TokenSchema.statics = {
    async getAccessToken() {
        let token = await this.findOne({
            name: 'access_token'
        }).exec();
        if (token && token.token) {
            token.access_token = token.token;
        }
        return token;
    },
    async saveAccessToken(data) {
        let token = await this.findOne({ name: 'access_token' }).exec();
        if (token) {
            token.token = data.access_token;
            token.expires_in = data.expires_in;
        } else {
            token = new Token({
                name: 'access_token',
                token: data.access_token,
                expires_in: data.expires_in
            })
            console.log(token);
            await token.save(function(error) {
                console.log('存储成功')
            })
        }

        // try {
        //     console.log(token);
        //     await token.save(function(error) {
        //         console.log('存储成功')
        //     })
        // } catch (e) {
        //     console.log('存储失败');
        //     console.error(e);
        // }
        return data;
    }
}

let Token = mongoose.model('Token', TokenSchema);