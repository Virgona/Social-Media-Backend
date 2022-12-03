// Thoughts schema set up
const { Schema, Types, model } = require('mongoose');
const reactionsSchema = require('./Reaction');

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
            get: time => {
                // *** take the time and convert it
                // pass that into a date object
                let theDate = new Date(time);
                // call that obj.toDateString
                let dateAsString = theDate.toDateString();
                // return that string
                return dateAsString;
            }
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        reactions: [reactionsSchema],
    },
    {
        toJSON: {
            getters: true,
            id: false,
        },
    },
);

// virtual to get the length of the reactions array
thoughtSchema.virtual('reactionCount')
.get(function () {
    return this.reactions.length
});

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;