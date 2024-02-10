const bcrypt = require("bcrypt");
const dayjs = require("dayjs");
const Joi = require("joi");
const { google } = require("googleapis");;
const { default: axios } = require("axios");
const { Lawyer, validateLawyer } = require("../../model/lawyer/lawyer.models");
const req = require("express/lib/request.js");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
    // console.log(file.originalname);
  },
});
const {
  uploadFileCreate,
  deleteFile,
} = require("../../funtions/uploadfilecreate");

exports.create = async (req, res) => {
  try {
    let upload = multer({ storage: storage }).array("imgCollection", 20);
    upload(req, res, async function (err) {
      const reqFiles = [];
      const result = [];
      if (err) {
        return res.status(500).send(err);
      }
      let profile_image = ""; // ตั้งตัวแปรรูป
      if (req.files) {
        const url = req.protocol + "://" + req.get("host");
        for (var i = 0; i < req.files.length; i++) {
          const src = await uploadFileCreate(req.files, res, { i, reqFiles });
          result.push(src);
          //   reqFiles.push(url + "/public/" + req.files[i].filename);
        }
        profile_image = reqFiles[0];
      }
      const { error } = validateLawyer(req.body);
      if (error)
        return res
          .status(400)
          .send({ message: error.details[0].message, status: false });

      const user = await Lawyer.findOne({
        lawyer_username: req.body.lawyer_username,
      });
      if (user) {
        return res
          .status(409)
          .send({ status: false, message: "username นี้มีคนใช้แล้ว" });
      }
      const lawyerNumber = await Lawyernumber();
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.lawyer_password, salt);
      const lawyer = new Lawyer({
        lawyer_number: lawyerNumber,
        profile_image: profile_image,
        lawyer_username: req.body.lawyer_username,
        card_number: req.body.card_number,
        lawyer_name: req.body.lawyer_name,
        lawyer_tel: req.body.lawyer_tel,
        lawyer_password: hashPassword,
        lawyer_position: req.body.lawyer_position,
      });
      const add = await lawyer.save();
      return res.status(200).send({
        status: true,
        message: "คุณได้สร้างไอดี user เรียบร้อย",
        data: add,
      });
    });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

async function Lawyernumber(date) {
  const admin = await Lawyer.find();
  let admin_number = null;
  if (admin.length !== 0) {
    let data = "";
    let num = 0;
    let check = null;
    do {
      num = num + 1;
      data = `ADMIN${dayjs(date).format("YYYYMMDD")}`.padEnd(10, "0") + num;
      check = await Lawyer.find({ adminnumber: data });
      if (check.length === 0) {
        admin_number =
          `ADMIN${dayjs(date).format("YYYYMMDD")}`.padEnd(10, "0") + num;
      }
    } while (check.length !== 0);
  } else {
    admin_number =
      `ADMIN${dayjs(date).format("YYYYMMDD")}`.padEnd(10, "0") + "1";
  }
  return admin_number;
}
