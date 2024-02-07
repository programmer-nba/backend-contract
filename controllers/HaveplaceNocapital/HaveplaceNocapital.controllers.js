const bcrypt = require("bcrypt");
const dayjs = require("dayjs");
const Joi = require("joi");
const { google } = require("googleapis");
const { default: axios } = require("axios");
const req = require("express/lib/request.js");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const {
  HaveplaceNocapital,
  validate,
} = require("../../model/HaveplaceNocapital/HaveplaceNocapital.models");

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
const { admin } = require("googleapis/build/src/apis/admin");

exports.create = async (req, res) => {
  try {
    await new HaveplaceNocapital({
      ...req.body,
    }).save();
    res.status(201).send({
      message: "เพิ่มข้อมูล สัญญามีทุน ไม่มีที่ สำเร็จ",
      status: true,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: "มีบางอย่างผิดพลาด" });
  }
};
exports.GetAllContract = async (req, res) => {
  try {
    const details = await HaveplaceNocapital.find();
    if (details.length > 0) {
      return res.status(200).send({
        status: true,
        message: "ดึงข้อมูล สัญญา มีที่่ไม่มีทุน สำเร็จ",
        data: details,
      });
    } else {
      return res
        .status(404)
        .send({ message: "ไม่พบข้อมูลสัญญา", status: false });
    }
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};
exports.GetContractByID = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await HaveplaceNocapital.findById(id);
    if (details) {
      return res.status(200).send({
        status: true,
        message: "ดึงข้อมูล สัญญา มีที่่ไม่มีทุน สำเร็จ",
        data: details,
      });
    } else {
      return res
        .status(404)
        .send({ message: "ไม่พบข้อมุลสัญญา", status: false });
    }
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};
