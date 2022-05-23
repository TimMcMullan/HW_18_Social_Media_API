// Require what's needed 
const { Schema, Types, model } = require("mongoose");

// Create new schema 
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: timeStamp => dateFormat (timeStamp),
        },
        // toJSON: {
        //     getters: true,
        // },
        id: false,
    }
);

const Reaction = model('Reaction', reactionSchema);
module.exports = Reaction;