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
const { Partner } = require("../../model/partner/partner.models");
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
    const data = {
      partner_name: req.body.partner_name,
      partner_phone: req.body.partner_phone,
      partner_email: req.body.partner_email,
      partner_iden_number: req.body.partner_iden_number,
      partner_address: req.body.partner_address,
      partner_district: req.body.partner_district,
      partner_amphure: req.body.partner_amphure,
      partner_province: req.body.partner_province,
      partner_postcode: req.body.partner_postcode,
      partner_company_name: req.body.partner_company_name,
      partner_company_number: req.body.partner_company_number,
      partner_company_address: req.body.partner_company_address,
      partner_company_district: req.body.partner_company_district,
      partner_company_amphure: req.body.partner_company_amphure,
      partner_company_province: req.body.partner_company_province,
      partner_company_postcode: req.body.partner_company_postcode,
      partner_company_phone: req.body.partner_company_phone,
      contract_type: req.body.contract_type,
      filecompany: req.body.filecompany,
      logo: req.body.logo,
      signature: req.body.signa,
    };
    const details = await Partner.create(data);
    res.status(201).send({
      message: "เพิ่มข้อมูล สัญญามี สำเร็จ",
      status: true,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};