const bcrypt = require("bcrypt");
const dayjs = require("dayjs");
const Joi = require("joi");
const { google } = require("googleapis");
const { default: axios } = require("axios");
const req = require("express/lib/request.js");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
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

    if (!detail1) {
      return res.status(404).send({
        status: false,
        message: "ไม่พบข้อมูลสัญญาที่ตรงกับที่ระบุ",
      });
    }

    const contractCode = detail1.contract_code;
    const contract_code = `${contractCode}${req.body.contract_code}`;

    const newData = {
      contract_base_id: detail1._id,
      ...detail1.toObject(),
      contract_code: contract_code,
    };
    delete newData._id;

    const detail = await new PartnerHaveplaceNocapital(newData).save();

    res.status(201).send({
      message: "เพิ่มข้อมูล สัญญา สำเร็จ",
      status: true,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

exports.createCode = async (req, res) => {
  try {
    const name = req.body.name;
    const detail1 = await HaveplaceNocapital.findOne({ contract_code: name });

      if (!detail1) {
        return res.status(404).send({
          status: false,
          message: "ไม่พบข้อมูลสัญญาที่ตรงกับที่ระบุ",
        });
      }

    const contractCode = detail1.contract_code;
    const contract_code = `${contractCode}${req.body.contract_code}`;

    const newData = {
      contract_base_id: detail1._id,
      ...detail1.toObject(),
      contract_code: contract_code,
      partner: {
        id: req.body.partner_id,
        name: req.body.partner_name,
        address: req.body.partner_address,
        stamp: req.body.partner_stamp,
        tax_id: req.body.partner_tax_id,
        tel: req.body.partner_tel,
        signature: req.body.partner_signature,
      },
    };
    delete newData._id;
    const detail = await new PartnerHaveplaceNocapital(newData).save();
    res.status(201).send({
      message: "เพิ่มข้อมูล สัญญา สำเร็จ",
      status: true,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
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
