const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  name: String,
  token: String,
  expires_in: Number,
  meta: {
    created: {
      type: Date,
      default: new Date()
    },
    updated: {
      type: Date,
      default: new Date()
    }
  }
});

// 每次执行tokenSchema都会执行
TokenSchema.pre("save", function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = new Date();
  } else {
    this.meta.updateAt = new Date();
  }
  next();
});

TokenSchema.statics = {
  async getAccessToken() {
    let token = await this.findOne({
      name: "access_token"
    }).exec();
    if (token && token.token) {
      token.access_token = token.token;
    }
    return token;
  },
  async saveAccessToken(data) {
    let token = await this.findOne({ name: "access_token" }).exec();
    if (token) {
      token.token = data.access_token;
      token.expires_in = data.expires_in;
    } else {
      token = new Token({
        name: "access_token",
        token: data.access_token,
        expires_in: data.expires_in
      });
      console.log("token更新成功");
    }
    await token.save((error, doc) => {
      if (error) {
        console.error(error);
        return false;
      }
    });
    return data;
  }
};

let Token = mongoose.model("Token", TokenSchema);
