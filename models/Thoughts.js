// Require what's needed 
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
// const dateFormat = require("../utils/dateFormat");
// Create new schema 

const thoughtsSchema = new Schema(
    {
        thoughtsText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
            createdAt: {
            type: Date,
            default: Date.now
            // FORMAT DATE 
            // get: timeStamp => dateFormat (timeStamp),
            // new Date("<YYYY-mm-ddTHH:MM:ss>")
            // dateToString: {
            //     format: "%H:%M:%S:%L:%z",
            //     date: "$date",
            //     timezone: "America/New_York"
            // }
            },
        username: {
            type: String, 
            required: true
        },
        reactions: [
            reactionSchema
]
    },
        {    
        toJSON: {
            // getters: true
        },
        id: false
    }
);
thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thoughts = model('Thoughts', thoughtsSchema);
module.exports = Thoughts;