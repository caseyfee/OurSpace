const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const User = require('./User');

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
      get: (timestamp) => new Date(timestamp).toLocaleDateString(),
    },
    username: {
      type: String,
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
// thoughtSchema
//     .virtual('reactionCount')
//     // Getter
//     .get(function () {
//       return this.reactions.length;
//     });

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
