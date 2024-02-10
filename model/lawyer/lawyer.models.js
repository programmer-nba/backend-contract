const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const complexityOptions = {
  min: 6,
  max: 30,
  lowerCase: 0,
  upperCase: 0,
  numeric: 0,
  symbol: 0,
  requirementCount: 2,
};

const LawyerSchema = new mongoose.Schema({
  lawyer_number: { type: String, required: false }, //หรัสประจำตัว
  profile_image: { type: String, required: false }, //รูปภาพ
  card_number: { type: Number, required: true }, //บัตรประชาชน
  lawyer_name: { type: String, required: true }, //ชื่อ
  lawyer_tel: { type: String, required: true }, //เบอร์โทร
  lawyer_username: { type: String, required: true }, //เลขบัตร
  lawyer_password: { type: String, required: true }, //รหัส
  lawyer_position: { type: String, required: true },
});

LawyerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.lawyer_name, row: "lawyer" },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "90d",
    }
  );
  return token;
};

const Lawyer = mongoose.model("Lawyer", LawyerSchema);

const validateLawyer = (data) => {
  const schema = Joi.object({
    lawyer_name: Joi.string().required().label("กรุณากรอกชื่อผู้ใช้ด้วย"),
    lawyer_username: Joi.string().required().label("กรุณากรอก ไอดี ผู้ใช้ด้วย"),
    card_number: Joi.string().required().label("กรุณากรอกเลขบัตรผู้ใช้ด้วย"),
    lawyer_tel: Joi.string().required().label("กรุณากรอกเบอร์โทรผู้ใช้ด้วย"),
    lawyer_password: passwordComplexity(complexityOptions)
      .required()
      .label("lawyer_password"),
    lawyer_position: Joi.string().required().label("กรุณากรอกเลเวลผู้ใช้ด้วย"),
  });
  return schema.validate(data);
};

module.exports = { Lawyer, validateLawyer };
