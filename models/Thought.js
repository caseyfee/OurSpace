const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
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
      // @casey, use a getter to format the timestamp on the query
    },
    username: {
      User,
      type: String,
      // Do i need to have the type here if it is already included in the user model?
      required: true,
    },

    // const reactionSchema = new mongoose.Schema({
    //   reactionId: {default: () => new Types.ObjectId(),
    //     , default: true},
    //   reactionBody: {type: String, required: true, maxLength: 280},
    //   createdAt: {type: Date, default: Date.now, // @casey, use a getter to format the timestamp on the query
    //   },

  },
  // reactions: [Reaction],
  // },
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
