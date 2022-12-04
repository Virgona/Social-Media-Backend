
const { Schema, Types } = require('mongoose');

const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default:() => new Types.ObjectId(),
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
            get: time => {
                let theDate = new Date(time);
            
                let dateAsString = theDate.toDateString();
                
                return dateAsString;
            }
        },
    },
    {
        toJSON: {
            getters: true,
            id: false,
        },
    }
);


module.exports = reactionsSchema;