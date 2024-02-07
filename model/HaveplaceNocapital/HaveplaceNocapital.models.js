const mongoose = require("mongoose");
const Joi = require("joi");

const HaveplaceNocapitalSchema = new mongoose.Schema({
  contract_name: { type: String, required: false },
  contract_head: [
    {
      type: String,
      required: false,
    },
  ],
  contract_sub_head: { type: String, required: false },
  contract_start: { type: Date, required: false, default: Date.now() },
  contract_end: { type: Date, required: false },
  contract_code: { type: String, required: false },
  contractor: {
    id: { type: String, required: false },
    name: { type: String, required: false },
    address: { type: String, required: false },
    stamp: { type: String, required: false },
    tax_id: { type: String, required: false },
    tel: { type: String, required: false },
    signature: [
      {
        name: { type: String, required: false },
        role: { type: String, required: false },
        position: { type: String, required: false },
        sign: { type: String, required: false },
        stamp: { type: Boolean, required: false },
      },
    ],
  },
  partner: {
    id: { type: String, required: false },
    name: { type: String, required: false },
    address: { type: String, required: false },
    stamp: { type: String, required: false },
    tax_id: { type: String, required: false },
    tel: { type: String, required: false },
    signature: [
      {
        name: { type: String, required: false },
        role: { type: String, required: false },
        position: { type: String, required: false },
        sign: { type: String, required: false },
        stamp: { type: Boolean, required: false },
      },
    ],
  },
  body: [
    {
      no: { type: String, required: false },
      title: { type: String },
      subtitle: { type: String, required: false },
      detail: [{ type: String, required: false }],
    },
  ],
  status: [
    {
      name: { type: String, required: false },
      date: { type: Date, required: false, default: Date.now() },
    },
  ],
  refer_doc: [
    {
      code: { type: String, required: false },
      name: { type: String, required: false },
    },
  ],
  remark: { type: String, required: false },
});

const HaveplaceNocapital = mongoose.model(
  "HaveplaceNocapital",
  HaveplaceNocapitalSchema
);
const validate = (data) => {
  const schema2 = Joi.object({
    contract_name: Joi.string().label("กรอกชื่อหนังสือสัญญา"),
    contract_start: Joi.date().default(Date.now()),
    contract_end: Joi.date(),
    contract_code: Joi.string().label("กรอกเลขที่หนังสือสัญญา"),
    remark: Joi.string().default(""),
    contractor: Joi.object({
      id: Joi.string().label("กรอก stamp ผู้ว่าจ้าง"),
      name: Joi.string().label("กรอก ชื่อ ของผู้ว่าจ้าง"),
      address: Joi.string().label("กรอกที่อยู่ผู้ว่าจ้าง"),
      stamp: Joi.string().label("กรอก stamp ผู้ว่าจ้าง"),
      tax_id: Joi.string().label("กรอก stamp ผู้ว่าจ้าง"),
      tel: Joi.string().label("กรอก stamp ผู้ว่าจ้าง"),
      signature: Joi.array().items(
        Joi.object({
          name: Joi.string().label("กรอกชื่อผู้ว่าจ้าง2"),
          role: Joi.string().label("กรอก Role ผู้ว่าจ้าง"),
          position: Joi.string().label("กรอกตำแหน่งผู้ว่าจ้าง"),
          sign: Joi.string().label("กรอกลายเซ็นต์ชื่อผู้ว่าจ้าง"),
          stamp: Joi.boolean().label("ตรวจสอบ stamp ผู้ว่าจ้าง"),
        })
      ),
    }),
    partner: Joi.object({
      id: Joi.string().label("กรอก ไอดี ของผู้รับจ้างในสัญญา"),
      name: Joi.string().label("กรอก ชื่อ ของผู้รับจ้างในสัญญา"),
      address: Joi.string().label("กรอก ที่อยุ่ ของผู้รับจ้างในสัญญา"),
      stamp: Joi.string().label("กรอก stamp ของผู้รับจ้างในสัญญา"),
      tax_id: Joi.string().label("กรอก tax_id ผู้รับจ้างในสัญญา"),
      tel: Joi.string().label("กรอก tel ผู้รับจ้างในสัญญา"),
      signature: Joi.array().items(
        Joi.object({
          name: Joi.string().label("กรอกชื่อผู้รับจ้างในสัญญา2"),
          role: Joi.string().label("กรอก Role ผู้รับจ้างในสัญญา"),
          position: Joi.string().label("กรอกตำแหน่งผู้รับจ้างในสัญญา"),
          sign: Joi.string().label("กรอกลายเซ็นต์ชื่อผู้รับจ้างในสัญญา"),
          stamp: Joi.boolean().label("ตรวจสอบ stamp ผู้รับจ้างในสัญญา"),
        })
      ),
    }),
    status: Joi.array().items(
      Joi.object({
        name: Joi.string().label("กรอก name in status"),
        date: Joi.date().default(Date.now()),
        sender: Joi.string().label("กรอก sender in status"),
      })
    ),
    refer_doc: Joi.array().items(
      Joi.object({
        code: Joi.string().label("กรอก code in refer_doc"),
        name: Joi.string().label("กรอก name in refer_doc"),
      })
    ),
  });
  //return schema.validate(data);
  return schema2(data);
};
module.exports = { HaveplaceNocapital, validate };
