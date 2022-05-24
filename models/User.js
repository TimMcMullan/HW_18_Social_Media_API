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
                /.+@.+\..+/,
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

userSchema.virtual('thoughtsCount').get(function () {
    return this.thoughts.length;
});

const User = model('User', userSchema);
module.exports = User;