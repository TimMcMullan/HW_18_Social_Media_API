// Require what's needed 
const { Schema, Types } = require("mongoose");

// Create new schema 
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
            // required: true,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp => dateFormat (timeStamp)
        },
        toJSON: {
            // getters: true
        },
        id: false
    }
);


module.exports = reactionSchema;