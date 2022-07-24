const { Schema, model } = require('mongoose');
const { Thought } = require('./Thought.js');
const validator = require("email-validator");

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validator: validator.validate,
        },



        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
            friends: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            ],
        
    },
    {
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
