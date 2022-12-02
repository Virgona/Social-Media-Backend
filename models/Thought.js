// Thoughts schema set up
const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1,

        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        toJSON: {
            getters: true,
        },
        id: false,
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        reactions: [reactionsSchema],
    }
);

// virtual to get the length of the reactions array
thoughtSchema.virtual('reactionCount')
.get(function () {
    return thoughtSchema.reactions.length
});

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;