const mongoose = require("mongoose");
const Joi = require("joi");

const DocumentsASchema = new mongoose.Schema({
    contract_name: { type: String, required: true },
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
            }
        ]
    },
    body: [
        {
            no: { type: String, required: false },
            title: { type: String, required: false },
            subtitle: { type: String, required: false },
            detail: []
        }
    ],
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
            }
        ]
    },
    status: [
        {
            name: { type: String, required: false },
            date: { type: Date, required: false, default: Date.now() },
            sender: { type: String, required: false },
        }
    ],
    refer_doc: [
        {
            code: { type: String, required: false },
            name: { type: String, required: false },
        }
    ],
    remark: { type: String, required: false },

})

const DocA = mongoose.model("contract_docs", DocumentsASchema);
const validate = (data) => {
    const schema = Joi.object({
        contract_name: Joi.string().required().label("กรอกชื่อหนังสือสัญญา"),
        contract_start: Joi.date().default(Date.now()),
        contract_end: Joi.date(),
        contract_code: Joi.string().required().label("กรอกเลขที่หนังสือสัญญา"),
        remark: Joi.string().default(""),
        contractor: Joi.object({
            name: Joi.string().required().label("กรอกชื่อผู้ว่าจ้าง1"),
            address: Joi.string().required().label("กรอกที่อยู่ผู้ว่าจ้าง"),
            stamp: Joi.string().required().label("กรอก stamp ผู้ว่าจ้าง"),
            tax_id: Joi.string().required().label("กรอก stamp ผู้ว่าจ้าง"),
            tel: Joi.string().required().label("กรอก stamp ผู้ว่าจ้าง"),
            signature: Joi.array().items(
                Joi.object({
                    name: Joi.string().required().label("กรอกชื่อผู้ว่าจ้าง2"),
                    role: Joi.string().required().label("กรอก Role ผู้ว่าจ้าง"),
                    position: Joi.string().required().label("กรอกตำแหน่งผู้ว่าจ้าง"),
                    sign: Joi.string().required().label("กรอกลายเซ็นต์ชื่อผู้ว่าจ้าง"),
                    stamp: Joi.boolean().required().label("ตรวจสอบ stamp ผู้ว่าจ้าง")
                })
            )
        }),
        body: Joi.array().items(
            Joi.object({
                no: Joi.string().required().label("กรอก no in body"),
                title: Joi.string().required().label("กรอก title in body"),
                subtitle: Joi.string().required().label("กรอก subtitle in body"),
                //detail: []
            })
        ),
        partner: Joi.object({
            id: Joi.string().required().label("กรอก ชื่อ ของผู้รับจ้างในสัญญา"),
            name: Joi.string().required().label("กรอก ชื่อ ของผู้รับจ้างในสัญญา"),
            address: Joi.string().required().label("กรอก ที่อยุ่ ของผู้รับจ้างในสัญญา"),
            stamp: Joi.string().required().label("กรอก stamp ของผู้รับจ้างในสัญญา"),
            signature: Joi.array().items(
                Joi.object({
                    name: Joi.string().required().label("กรอกชื่อผู้รับจ้างในสัญญา2"),
                    role: Joi.string().required().label("กรอก Role ผู้รับจ้างในสัญญา"),
                    position: Joi.string().required().label("กรอกตำแหน่งผู้รับจ้างในสัญญา"),
                    sign: Joi.string().required().label("กรอกลายเซ็นต์ชื่อผู้รับจ้างในสัญญา"),
                    stamp: Joi.boolean().required().label("ตรวจสอบ stamp ผู้รับจ้างในสัญญา")
                }
                )
            )

        }),
        status: Joi.array().items(
            Joi.object({
                name: Joi.string().required().label("กรอก name in status"),
                date: Joi.date().default(Date.now()),
                sender: Joi.string().required().label("กรอก sender in status"),
            })
        ),
        refer_doc: Joi.array().items(
            Joi.object({
                code: Joi.string().required().label("กรอก code in refer_doc"),
                name: Joi.string().required().label("กรอก name in refer_doc"),
            })
        )
    });

    const schema2 = Joi.object({
        contract_name: Joi.string().label("กรอกชื่อหนังสือสัญญา"),
        contract_start: Joi.date().default(Date.now()),
        contract_end: Joi.date(),
        contract_code: Joi.string().label("กรอกเลขที่หนังสือสัญญา"),
        remark: Joi.string().default(""),
        contractor: Joi.object({
            id: Joi.string().label("กรอก stamp ผู้ว่าจ้าง"),
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
                    stamp: Joi.boolean().label("ตรวจสอบ stamp ผู้ว่าจ้าง")
                })
            )
        }),
        body: Joi.array().items(
            Joi.object({
                no: Joi.string().label("กรอก no in body"),
                title: Joi.string().label("กรอก title in body"),
                subtitle: Joi.string().label("กรอก subtitle in body"),
                //detail: []
            })
        ),
        partner: Joi.object({
            id: Joi.string().label("กรอก ชื่อ ของผู้รับจ้างในสัญญา"),
            name: Joi.string().label("กรอก ชื่อ ของผู้รับจ้างในสัญญา"),
            address: Joi.string().label("กรอก ที่อยุ่ ของผู้รับจ้างในสัญญา"),
            stamp: Joi.string().label("กรอก stamp ของผู้รับจ้างในสัญญา"),
            signature: Joi.array().items(
                Joi.object({
                    name: Joi.string().label("กรอกชื่อผู้รับจ้างในสัญญา2"),
                    role: Joi.string().label("กรอก Role ผู้รับจ้างในสัญญา"),
                    position: Joi.string().label("กรอกตำแหน่งผู้รับจ้างในสัญญา"),
                    sign: Joi.string().label("กรอกลายเซ็นต์ชื่อผู้รับจ้างในสัญญา"),
                    stamp: Joi.boolean().label("ตรวจสอบ stamp ผู้รับจ้างในสัญญา")
                }
                )
            )

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
        )
    });
    //return schema.validate(data);
    return schema2.validate(data);
}
module.exports = { DocA, validate }