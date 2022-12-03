const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
    {
        userId : {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        userThoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
    
        userFriends: [
            {
                type:Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
        virtuals: true,
        id: false,
    },
} 
);

// virtual to get the length of the friends array

userSchema.virtual('friendCount')
.get(function () {
    return userSchema.userFriends.length
});

// initializing and exporting model
const User = model('user', userSchema);

module.exports = User;