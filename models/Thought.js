const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const User = require('./User');
// var moment = require('moment');

// Schema to create Post model
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
      default: Date.now,
      created: Date,
      // @casey, use a getter to format the timestamp on the query
      // dateformat - look up on Mongoose, get
      // https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js
    },
    username: {
      type: String,
      required: true,
    },
    reaction: [reactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });
// );

// Create a virtual property `reactions` that gets the amount of reaction per Thought
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
      return this.reactions.length;
    });

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
