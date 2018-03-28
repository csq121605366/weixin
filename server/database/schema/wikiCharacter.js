const mongoose = require("mongoose");

const WikiCharacterSchema = new mongoose.Schema({
    name: String,
    cname: String,
    playedBy: String,
    profile: String,
    images: [String],
    nmId: String,
    sections: {},
    intro: [String],
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
});

// 每次执行tokenSchema都会执行
WikiCharacterSchema.pre("save", function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

let wikiCharacter = mongoose.model("wikiCharacter", WikiCharacterSchema);
