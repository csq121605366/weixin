const mongoose = require("mongoose");

const WikiSchema = new mongoose.Schema({
    _id: String,
    name: String,
    cname: String,
    words: String,
    intro: String,
    wikiId: String,
    sections: {},
    swornMembers: [
        {
            character: {
                type: String,
                ref: 'WikiCharacter'
            },
            text: String
        }
    ],
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
WikiSchema.pre("save", function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

let wiki = mongoose.model("wiki", WikiSchema);
