const { model, Schema, Types } = require("mongoose");
const { employeeKey, companyKey } = require("../utils/keys.js");
const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    employee_id: {
      type: Number,
      require: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
      unique: true,
    },
    companyId : { 
        type : Types.ObjectId,
        ref : `${companyKey}`,
        require : true
    },
    email :  { 
      type : String,
      default: "",
    }
  },
  { timestamps: true }
);

employeeSchema.set("toObject", {
  transform: (_doc, ret) => {
    return {
      ...ret,
      id: ret._id.toString(),
    };
  },
});

module.exports = model(`${employeeKey}`, employeeSchema);
