const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            default:() => new Types.ObjectId(),
        },
        userName: {
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
    } 
);