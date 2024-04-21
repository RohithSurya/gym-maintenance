const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
  {
    name: String,
    logo_url: String,
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = Organization;
