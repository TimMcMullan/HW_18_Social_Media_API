// Require what's needed 
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
// Create new schema 
const reachtionSchema = require("./Reaction");
const thoughtsSchema = new Schema(
    {
        thoughtsText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
            createdAt: {
            type: Date,
            default: Date.now,
            // get: timeStamp => dateFormat (timeStamp),
            },
        username: {
            type: String, 
            required: true,
        },
        reactions: [
            'Reaction'
]
    },
        {    
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const Thoughts = model('Thoughts', thoughtsSchema);
module.exports = Thoughts;