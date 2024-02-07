const bcrypt = require("bcrypt");
const dayjs = require("dayjs");
const Joi = require("joi");
const { google } = require("googleapis");
const { default: axios } = require("axios");
const req = require("express/lib/request.js");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const {
  PartnerHaveplaceNocapital,
  validate,
} = require("../../model/HaveplaceNocapital/partner_HaveplaceNocapital.models");
const {
  HaveplaceNocapital,
  validate2,
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

exports.createNew = async (req, res) => {
  try {
    const id = req.params.id;
    const detail1 = await HaveplaceNocapital.findById(id);
    
    const newData = {
      ...detail1.toObject(),
      ...req.body,
    };
    const detail = await new PartnerHaveplaceNocapital(newData).save();
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
exports.GetAllContractNew = async (req, res) => {
  try {
    const details = await PartnerHaveplaceNocapital.find();
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
exports.GetContractByIDNew = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await PartnerHaveplaceNocapital.findById(id);
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
exports.EditContractNew = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.body) {
      return res
        .status(400)
        .send({ status: false, message: error.details[0].message });
    }
    const edit = await PartnerHaveplaceNocapital.findByIdAndUpdate(id, {
      ...req.body,
    });
    if (edit) {
      return res.send({
        status: true,
        message: "เเก้ไขข้อมูลสัญญาสำเร็จ",
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "เเก้ไขข้อมูลสัญญาไมสำเร็จ",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: "มีบางอย่างผิดพลาด" });
  }
};
