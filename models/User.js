// Require what's needed 
const { Schema, model } = require("mongoose");

// Create new schema 
const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //match: look up regex [must be an email address]
        },
        thoughts: [
            {
                type: Schema.Types.objectId,
                ref: "Thoughts",
            },
        ],
        friends: [
            {
                type: Schema.Types.objectId,
                ref: "User",
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('User', userSchema);
module.exports = User;