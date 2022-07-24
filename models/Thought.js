const { Schema, model } = require('mongoose');
const { Thought } = require('.');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,//moment or mongoose specific?
        },
        username: {
            type: string,
            required: true,
        },

        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reactions',
            },
        ],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `tagCount` that gets the amount of comments per user
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });







// Initialize our Thought model
const Post = model('Thought', thoughtSchema);

module.exports = Thought;
