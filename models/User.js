const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 40,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    },
    friends: [
      {
        type: String,
        ref: 'User'
      }
    ],
  });


UserSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.reduce(
    (total, thought) => total + thought.reactions.length + 1,
    0
  );
});



const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;