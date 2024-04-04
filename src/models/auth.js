const { model, Schema } = require("mongoose");
const { userKey } = require("../utils/keys");

const authSchema = new Schema({
  local: {
    name: String,
    email: String,
    password: String,
    photo: String,
  },
  facebook: {
    id: String,
    name: String,
    email: String,
    photo: String,
  },
  twitter: {
    id: String,
    displayName: String,
    username: String,
    photo: String,
  },
  google: {
    id: String,
    email: String,
    name: String,
    photo: String,
  },
});

authSchema.set("toObject", {
  transform: (_doc, ret) => {
    return {
      ...ret,
      id: ret._id.toString(),
    };
  },
});

module.exports = model(`${userKey}`, authSchema);
