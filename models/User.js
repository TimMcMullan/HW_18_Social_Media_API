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
                'Must be a valid email address!'
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

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);
module.exports = User;