const { Schema, model } = require('mongoose');

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
      validate: [isEmail, 'invalid email']
    },

    first: String,
    last: String,
    age: Number,

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
    friends: 
    {
      type: Schema.Types.ObjectId,
      // Should this^ be mongoose.Schema.Types.ObjectId?
      // https://stackoverflow.com/questions/24964914/can-a-mongo-model-self-reference
      ref: 'User',
    },
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    // toJSON: {
    //   virtuals: true,
    // },
    // id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
    // userSchema
    //   .virtual('fullName')
    //   // Getter
    //   .get(function () {
    //     return `${this.first} ${this.last}`;
    //   })
    //   // Setter to set the first and last name
    //   .set(function (v) {
    //     const first = v.split(' ')[0];
    //     const last = v.split(' ')[1];
    //     this.set({ first, last });
    //   });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
