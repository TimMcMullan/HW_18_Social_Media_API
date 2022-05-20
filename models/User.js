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
            //match: look up regex [must be an email address], input as string
            match: [
                /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thoughts",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
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