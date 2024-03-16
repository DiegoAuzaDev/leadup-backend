const { model, Schema } = require("mongoose");
const { userKey } = require("../utils/keys");

const authSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      unique: true,
      required: true,
    },
    photo : { 
      type : String, 
      required : true
    }
  },
  {
    timestamps: true,
  }
);

authSchema.set("toObject", {
  transform: (_doc, ret) => {
    return {
      ...ret,
      id: ret._id.toString(),
    };
  },
});

module.exports = model(`${userKey}`, authSchema);