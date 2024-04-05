const { model, Schema } = require("mongoose");
const { userKey } = require("../utils/keys");
const bcrypt = require("bcrypt-nodejs")

const authSchema = new Schema({
  local: {
    id: Schema.Types.UUID,
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

authSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSalt(8), null);
};

 authSchema.methods.validPassword = function (password) {
   return bcrypt.compareSync(password, this.local.password);
 };

authSchema.set("toObject", {
  transform: (_doc, ret) => {
    return {
      ...ret,
      id: ret._id.toString(),
    };
  },
});

module.exports = model(`${userKey}`, authSchema);
