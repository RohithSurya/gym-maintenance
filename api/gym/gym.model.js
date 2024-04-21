const mongoose = require("mongoose");

const GymSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    created: {
      type: Date,
      default: Date.now,
    },
    address: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Gym = mongoose.model("Gym", GymSchema);

module.exports = Gym;
