const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    user_type: {
      type: String,
      enum: ["ADMIN", "CUSTOMER"],
    },
    expiry: {
      type: Date,
    },
    gym: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
