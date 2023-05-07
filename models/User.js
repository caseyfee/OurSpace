const { Schema, model } = require('mongoose');
var validator = require('validator');


// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      default: true,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      trim:true,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
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
      // required: false,
      // Should this^ be mongoose.Schema.Types.ObjectId?
      // https://stackoverflow.com/questions/24964914/can-a-mongo-model-self-reference
      ref: 'User',
    },
  ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our reaction, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the amount of comments per user    
userSchema
      .virtual('friendCount')
      // Getter
      .get(function () {
        return this.friends.length;
      })
     

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
