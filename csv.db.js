const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema({
  company_name: { type: String },
  connectedAt: { type: String },
  dropcontactEmail: { type: String },
  emailReplied: { type: String },
  emailSent: { type: String },
  firstMessageAt: { type: String },
  firstName: { type: String },
  jobSeeker: { type: String },
  lastName: { type: String },
  linkedinUrl: { type: String },
  location: { type: String },
  messageReplied: { type: String },
  messageSent: { type: String },
  occupation: { type: String },
  phoneNumbers: { type: String },
  premium: { type: String },
  profileStatus: { type: String },
  prospectList: { type: String },
  salesNavigatorUrl: { type: String },
  tags: { type: String },
  isUpdated: { type: Boolean },
});

const csvModel = mongoose.model("csvDocument", csvSchema);
module.exports = csvModel;
